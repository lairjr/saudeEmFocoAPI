import express from 'express';
import ocurrencesController from '../controllers/occurrences';
import OccurrencesDb from '../dbcollections/occurrences';
import UsersDb from '../dbcollections/users';

const router = express.Router();
const controller = ocurrencesController(OccurrencesDb, UsersDb);

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/:id/review', controller.postReview);
router.post('/:username', controller.post);

export default router;
