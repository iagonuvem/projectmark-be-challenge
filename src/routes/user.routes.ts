import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { requireRole } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { createUserValidator } from '../validators/userValidator';

const router = Router();

router.post('/', requireRole('Admin'), createUserValidator, validateRequest, UserController.create);
router.get('/', requireRole('Admin', 'Editor', 'Viewer'), UserController.findAll);

export default router;