import express from 'express';
import ocurrencesController from '../controllers/occurrences';
import OccurrencesDb from '../dbcollections/occurrences';

const router = express.Router();
const controller = ocurrencesController(OccurrencesDb);

router.get('/', controller.get);

export default router;
