import express, { Express } from "express";
import Module from "../types/Module.js";
import http from "./http.js";

import bodyParser from "body-parser";
import cors from "cors";
import { domainCatch } from "../http/middlewares/domain.js";

function app() {
  let booted = false;
  let mod: Module<Express> = express();

  mod.use(cors());
  mod.use(bodyParser.json());
  mod.use(domainCatch);

  mod.boot = () => {
    if (booted) return;
    booted = true;

    http.create(app);
  };

  return mod;
}

export default app();
