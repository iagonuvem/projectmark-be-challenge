import { Router } from 'express';
import { ResourceController } from '../controllers/ResourceController';

const router = Router();

router.post('/', ResourceController.create);
router.get('/', ResourceController.findAll);

export default router;