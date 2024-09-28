import { NextFunction, Request, Response } from "express";
import logger from "../../modules/logger.js";

export default async function error(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err);
  return res.sendStatus(500);
}
