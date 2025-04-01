import { Request, Response, NextFunction } from 'express';
import { TopicService } from '../services/TopicService';
import { ErrorType } from '../enums/errors';

export const TopicController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const topic = await TopicService.create(req.body);
      res.status(201).json(topic);
    } catch (err) {
      next(err);
    }
  },

  async updateVersion(req: Request, res: Response, next: NextFunction) {
    try {
      const topic = await TopicService.updateVersion(req.params.id, req.body);
      res.json(topic);
    } catch (err) {
      next(err);
    }
  },

  async getVersion(req: Request, res: Response, next: NextFunction) {
    try {
      const topic = await TopicService.getVersion(req.params.id, Number(req.params.version));
      res.json(topic);
    } catch (err) {
      next(err);
    }
  },

  async getTree(req: Request, res: Response, next: NextFunction) {
    try {
      const tree = await TopicService.getTree(req.params.id);
      res.json(tree);
    } catch (err) {
      next(err);
    }
  },

  async getShortestPath(req: Request, res: Response, next: NextFunction) {
    try {
      const { from, to } = req.query;
      if(!from || !to){
        const err: Error = {
          name: ErrorType.BAD_REQUEST,
          message: "Missing Required query params 'from' or 'to'",
        };
        throw err;
      }
      const path = await TopicService.getShortestPath(String(from), String(to));
      res.json({ path });
    } catch (err) {
      next(err);
    }
  }
};
