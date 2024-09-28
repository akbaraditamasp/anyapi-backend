import { NextFunction, Request, Response } from "express";
import { Domain } from "../../models/domain.js";

export class DomainCatch extends Error {
  public isMain!: boolean;

  constructor(isMain: boolean) {
    super("DOMAIN CATCH!");
    this.isMain = isMain;
  }
}

export function domainCatch(req: Request, _res: Response) {
  const host = req.get("host");

  if (host === process.env.MAIN_DOMAIN) {
    throw new DomainCatch(true);
  }

  throw new DomainCatch(false);
}

export function mainDomain(
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  if (err instanceof DomainCatch && err.isMain) {
    return next();
  }

  return next(err);
}

export async function subdomain(
  err: Error,
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (err instanceof DomainCatch && err.isMain) {
    return next(err);
  }

  const host = req.get("host");
  const domain = await Domain.findOneByOrFail({
    name: host,
  });

  req.domain = domain;

  return next();
}
