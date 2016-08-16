import express from 'express';
import occurrencesController from '../controllers/occurrences';

const router = express.Router();

router.get('/', occurrencesController.get);

export default router;
