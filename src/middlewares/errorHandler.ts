import { Request, Response, NextFunction } from 'express';
import { ErrorType } from '../enums/errors';

interface IErrorResponse {
  message: string;
  error: string;
  stack?: string;
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  // Flag to avoid returning debug data in production, should came from env.
  const isProd: boolean = false;
  const errorObj: IErrorResponse = { message: 'Internal Server Error', error: err.message }

  switch (err.name) {
    case ErrorType.BAD_REQUEST:
      if(!isProd) errorObj.stack = err.stack;
      errorObj.message = 'Bad Request';
      res.status(422).json({ message: 'Bad Request', error: err.message, stack: err.stack });
      break;

    case ErrorType.NOT_FOUND:
      if(!isProd) errorObj.stack = err.stack;
      errorObj.message = 'Not Found';
      res.status(404).json(errorObj);
      break;
    
    case ErrorType.UNAUTHORIZED:
      if(!isProd) errorObj.stack = err.stack;
      errorObj.message = 'Unauthorized';
      res.status(401).json(errorObj);
      break;

    case ErrorType.FORBIDDEN:
      if(!isProd) errorObj.stack = err.stack;
      errorObj.message = 'Forbidden';
      res.status(403).json(errorObj);
      break;
      
    default:
      if(!isProd) errorObj.stack = err.stack;
      res.status(500).json(errorObj);
  }
}
