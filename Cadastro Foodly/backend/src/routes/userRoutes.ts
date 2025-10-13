import { Router } from 'express';
import { userController } from '../controllers/userController';

const router = Router();

router.get('/:email', userController.getUserByEmail);
router.post('/', userController.createUser);

export default router;
