import { Request, Response, NextFunction } from 'express';
import { ResourceService } from '../services/ResourceService';

export const ResourceController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const resource = await ResourceService.create(req.body);
      res.status(201).json(resource);
    } catch (err) {
      next(err);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const resources = await ResourceService.findAll();
      res.json(resources);
    } catch (err) {
      next(err);
    }
  }
};
