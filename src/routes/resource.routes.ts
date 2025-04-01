import { Router } from 'express';
import { ResourceController } from '../controllers/ResourceController';
import { validateRequest } from '../middlewares/validateRequest';
import { createResourceValidator } from '../validators/resourceValidator';
import { requireRole } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', requireRole('Admin', 'Editor'), createResourceValidator, validateRequest, ResourceController.create);
router.get('/', requireRole('Admin', 'Editor', 'Viewer'), ResourceController.findAll);

export default router;