import express from 'express';
import OccurrencesController from '../controllers/occurrences';
import OccurrencesDb from '../dbcollections/occurrences';

const router = express.Router();
const occurrencesController = new OccurrencesController(OccurrencesDb);

router.get('/', occurrencesController.get);

export default router;
