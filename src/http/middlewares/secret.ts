import { NextFunction, Request, Response } from "express";

export default function secret(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const secret = req.get("any-secret");
  if (req.domain!.secret !== secret) return res.sendStatus(401);

  return next();
}
