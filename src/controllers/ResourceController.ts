import { Request, Response, NextFunction } from 'express';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { Resource } from '../models/Resource';
import { v4 as uuidv4 } from 'uuid';

export const ResourceController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const now = new Date().toISOString();
      const resource: Resource = {
        id: uuidv4(),
        topicId: req.body.topicId,
        url: req.body.url,
        description: req.body.description,
        type: req.body.type,
        createdAt: now,
        updatedAt: now
      };

      await ResourceRepository.init();
      await ResourceRepository.save(resource);

      res.status(201).json(resource);
    } catch (err) {
      next(err);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      await ResourceRepository.init();
      const resources = await ResourceRepository.findAll();
      res.json(resources);
    } catch (err) {
      next(err);
    }
  }
};
