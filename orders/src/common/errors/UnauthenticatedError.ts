import { HttpError } from './HttpError';

export class UnauthenticatedError extends HttpError {
  constructor(message = 'Unauthenticated') {
    super(
      401,
      message,
    );
  }
}
