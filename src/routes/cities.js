import express from 'express';
import citiesController from '../controllers/cities';
import OccurrencesDb from '../dbcollections/occurrences';

const router = express.Router();
const controller = citiesController(OccurrencesDb);

router.get('/', controller.get);

export default router;
