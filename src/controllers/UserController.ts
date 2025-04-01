import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

export const UserController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        createdAt: new Date().toISOString(),
      };

      await UserRepository.init();
      await UserRepository.save(user);

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      await UserRepository.init();
      const users = await UserRepository.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
};
