import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/', UserController.create);
router.get('/', UserController.findAll);

export default router;