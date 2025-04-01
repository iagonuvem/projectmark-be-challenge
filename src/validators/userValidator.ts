import { body } from 'express-validator';

export const createUserValidator = [
  body('name').notEmpty().withMessage('name required'),
  body('email').isEmail().withMessage('invalid email'),
  body('role').isIn(['Admin', 'Editor', 'Viewer']).withMessage('invalid role')
];
