var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JSONFilePreset } from "lowdb/node";
import rxdb from "../../modules/rxdb.js";
import { resolve } from "path";
import logger from "../../modules/logger.js";
export default function db(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const host = req.get("host");
        let db = yield rxdb().alldb.findOne(host).exec();
        if (!db) {
            const defaultData = {};
            db = yield rxdb().alldb.insert({
                host,
                db: yield JSONFilePreset(resolve("db", `${host}.json`), defaultData),
            });
        }
        req.db = db.db;
        logger.info(req.db);
        return next();
    });
}
