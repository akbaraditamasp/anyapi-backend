import { NextFunction, Request, Response } from "express";
import { mainDomain, subdomain } from "../http/middlewares/domain.js";
import app from "../modules/app.js";
import secret from "../http/middlewares/secret.js";
import operate from "../http/handlers/operate.js";
import domain from "../http/handlers/domain.js";
import db from "../http/middlewares/db.js";

app.use(
  "/api",
  subdomain,
  secret,
  db,
  async (req: Request, _res: Response, next: NextFunction) => {
    req.dataType =
      (req.get("any-type") as "single" | "collection") || "collection";

    return next();
  },
  operate
);

app.use("/api/domain", mainDomain, domain);
