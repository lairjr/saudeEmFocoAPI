import express from 'express';
import userController from '../controllers/users';
import UserDb from '../dbcollections/users';

const router = express.Router();
const controller = userController(UserDb);

router.get('/', controller.get);
router.get('/:username', controller.getByUsername);
router.put('/', controller.put);

export default router;
