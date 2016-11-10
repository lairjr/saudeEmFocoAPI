import placesController from '../controllers/places';
import express from 'express';
import GooglePlaces from 'node-googleplaces';

const router = express.Router();
const places = new GooglePlaces(process.env.GOOGLE_API_KEY);
const controller = placesController(places);

router.get('/:lng/:lat', controller.get);

export default router;
