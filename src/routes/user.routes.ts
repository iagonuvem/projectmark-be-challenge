import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { requireRole } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', requireRole('Admin'), UserController.create);
router.get('/', requireRole('Admin', 'Editor', 'Viewer'), UserController.findAll);

export default router;