import pino, { Logger } from "pino";
import Module from "../types/Module.js";

function logger() {
  const mod: Module<Logger> = pino.default({
    transport: {
      target: "pino-pretty",
    },
  });

  return mod;
}

export default logger();
