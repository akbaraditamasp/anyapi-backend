var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "dotenv/config";
import app from "./modules/app.js";
import logger from "./modules/logger.js";
import rxdb from "./modules/rxdb.js";
import error from "./http/middlewares/error.js";
(() => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.PORT || 5270;
    yield rxdb.boot();
    app.boot();
    yield import("./start/route.js");
    app.use(error);
    app.listen(port, () => {
        logger.info("Server running on port " + port);
    });
}))();
