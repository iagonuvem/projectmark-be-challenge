import { Request, Response, NextFunction } from 'express';
import { ErrorType } from '../enums/errors';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  switch (err.name) {
    case ErrorType.BAD_REQUEST:
      res.status(422).json({ message: 'Bad Request', error: err.message });
      break;

    case ErrorType.NOT_FOUND:
      res.status(404).json({ message: 'Not Found', error: err.message });
      break;
    
    case ErrorType.UNAUTHORIZED:
      res.status(401).json({ message: 'Unauthorized', error: err.message });
      break;

    default:
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}
