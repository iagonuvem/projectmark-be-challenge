import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

export const UserController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
};
