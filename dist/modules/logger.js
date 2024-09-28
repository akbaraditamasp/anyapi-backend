import pino from "pino";
function logger() {
    const mod = pino.default({
        transport: {
            target: "pino-pretty",
        },
    });
    return mod;
}
export default logger();
