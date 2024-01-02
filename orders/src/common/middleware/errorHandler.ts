import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../errors/HttpError';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (err instanceof HttpError) {
    return res.status(err.status).send(err.message);
  }

  return res.status(500).send(err);
};
