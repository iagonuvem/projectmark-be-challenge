import { Router } from 'express';
import topicRoutes from './topic.routes';
import userRoutes from './user.routes';
import resourceRoutes from './resource.routes';

const router = Router();

router.use('/topics', topicRoutes);
router.use('/users', userRoutes);
router.use('/resources', resourceRoutes);

export default router;