import { body, query, param} from 'express-validator';

export const createTopicValidator = [
  body('name').notEmpty().withMessage('name required'),
  body('content').notEmpty().withMessage('content required')
];

export const updateTopicValidator = [
  param('id').notEmpty().withMessage('id required'),
  body('content').notEmpty().withMessage('content required')
];

export const getTopicTreeValidator = [
  param('id').notEmpty().withMessage('id required'),
];

export const getShortestPathValidator = [
  query('from').notEmpty().withMessage('from required'),
  query('to').notEmpty().withMessage('to required')
];