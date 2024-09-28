import { errors } from "@vinejs/vine";
import { NextFunction, Request, Response } from "express";

export default async function validation(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof errors.E_VALIDATION_ERROR)
    return res.status(422).json(err.messages);
  return next(err);
}
