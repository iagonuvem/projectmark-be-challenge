import { Request, Response, NextFunction } from 'express';
import { Role, User } from '../models/User';
import { ErrorType } from '../enums/errors';
import { UserRepository } from '../repositories/UserRepository';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: Role };
    }
  }
}

/**
 * Check user roles by user_id Header
 */
export function requireRole(...allowedRoles: Role[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.header("user_id");
    let error: Error = {
      name: ErrorType.UNAUTHORIZED,
      message: "This resource can only be accessed by authenticated and allowed users.",
    };

    if (!userId) throw error;
    const user: User | undefined = await UserRepository.findById(userId);
    if (!user || !allowedRoles.includes(user.role)) {
      error.name = ErrorType.FORBIDDEN;
      error.message = "User not allowed to access this resource";
      throw error;
    }

    next();
  };
}