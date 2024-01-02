import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestHandler } from 'express';

import { BadRequestError } from '../errors/BadRequestError';

export const validateBody = (
  bodyClass: new () => object
): RequestHandler => async (req, res, next): Promise<void> => {
  const instance = plainToClass(
    bodyClass,
    req.body
  );
  const validationResult = await validate(
    instance,
    {
      validationError: { target: false },
      whitelist: true,
      forbidNonWhitelisted: true,
    }
  );

  if (validationResult && validationResult.length) {
    return next(new BadRequestError(JSON.stringify(
      validationResult,
      null,
      2
    )));
  }

  next();
};
