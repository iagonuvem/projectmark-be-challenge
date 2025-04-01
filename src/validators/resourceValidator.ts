import { body } from 'express-validator';

export const createResourceValidator = [
  body('topicId').notEmpty().withMessage('topicId required'),
  body('url').isURL().withMessage('invalid URL'),
  body('type').isIn(['video', 'article', 'pdf']).withMessage('invalid type')
];
