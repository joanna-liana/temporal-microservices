import { RequestHandler } from 'express';

export const asyncWrapper = (
  fn: RequestHandler
): RequestHandler => async (req, res, next): Promise<void> => {
  try {
    await fn(
      req,
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};
