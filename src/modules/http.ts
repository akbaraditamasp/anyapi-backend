import {
  IncomingMessage,
  RequestListener,
  Server,
  ServerResponse,
  createServer,
} from "http";
import Module from "../types/Module.js";

function http() {
  let mod: Module<
    (() => Server) & {
      create: (
        app: RequestListener<typeof IncomingMessage, typeof ServerResponse>
      ) => void;
    }
  >;
  let server: Server;

  const create: (typeof mod)["create"] = (app) => {
    server = createServer(app);
  };

  mod = Object.assign(() => server, { create });

  return mod;
}

export default http();
