import { NextFunction, Request, Response } from "express";
import { JSONFilePreset } from "lowdb/node";
import { resolve } from "path";
import rxdb from "../../modules/rxdb.js";

export default async function db(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  let db = await rxdb().alldb.findOne(req.domain!.name).exec();

  if (!db) {
    const defaultData = {};
    const low = await JSONFilePreset<Record<string, any>>(
      resolve("db", "lows", `${req.domain!.name}.json`),
      defaultData
    );
    db = await rxdb().alldb.insert({
      host: req.domain!.name,
      db: () => low,
    });
  }

  req.db = db.db();
  return next();
}
