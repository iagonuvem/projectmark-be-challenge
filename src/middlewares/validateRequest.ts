import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ErrorType } from '../enums/errors';

export function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err: Error = {
      name: ErrorType.BAD_REQUEST,
      message: 'Invalid Request params',
      stack: JSON.stringify(errors.array().map((e) => (e.msg)))
    }
    throw err;
  }
  return next();
}