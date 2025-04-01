import { Router } from 'express';
import { TopicController } from '../controllers/TopicController';
import { createTopicValidator, getShortestPathValidator, getTopicTreeValidator, updateTopicValidator } from '../validators/topicValidator';
import { validateRequest } from '../middlewares/validateRequest';
import { requireRole } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', requireRole('Admin', 'Editor'), createTopicValidator, validateRequest, TopicController.create);
router.put('/:id', requireRole('Admin', 'Editor'), updateTopicValidator, validateRequest, TopicController.updateVersion);
router.get('/:id/version/:version', requireRole('Admin', 'Editor', 'Viewer'), TopicController.getVersion);
router.get('/:id/tree', requireRole('Admin', 'Editor', 'Viewer'), getTopicTreeValidator, TopicController.getTree);
router.get('/path', requireRole('Admin', 'Editor', 'Viewer'), getShortestPathValidator, validateRequest, TopicController.getShortestPath);

export default router;
