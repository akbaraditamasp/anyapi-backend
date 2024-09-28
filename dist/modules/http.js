import { createServer, } from "http";
function http() {
    let mod;
    let server;
    const create = (app) => {
        server = createServer(app);
    };
    mod = Object.assign(() => server, { create });
    return mod;
}
export default http();
