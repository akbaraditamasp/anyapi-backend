import express from "express";
import http from "./http.js";
import cors from "cors";
import bodyParser from "body-parser";
import db from "../http/middlewares/db.js";
function app() {
    let booted = false;
    let mod = express();
    mod.use(cors());
    mod.use(bodyParser.json());
    mod.use(db);
    mod.boot = () => {
        if (booted)
            return;
        booted = true;
        http.create(app);
    };
    return mod;
}
export default app();
