import { body } from 'express-validator';

export const createTopicValidator = [
  body('name').notEmpty().withMessage('"name" required'),
  body('content').notEmpty().withMessage('"content" required')
];