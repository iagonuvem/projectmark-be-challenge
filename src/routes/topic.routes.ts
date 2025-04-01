import { Router } from 'express';
import { TopicController } from '../controllers/TopicController';

const router = Router();

router.post('/', TopicController.create);
router.put('/:id', TopicController.updateVersion);
router.get('/:id/version/:version', TopicController.getVersion);
router.get('/:id/tree', TopicController.getTree);
router.get('/path', TopicController.getShortestPath);

export default router;
