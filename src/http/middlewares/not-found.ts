import { NextFunction, Request, Response } from "express";
import { DomainCatch } from "./domain.js";
import { EntityNotFoundError } from "typeorm";

export default async function notFound(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (!err || err instanceof DomainCatch || err instanceof EntityNotFoundError)
    return res.sendStatus(404);
  return next(err);
}
