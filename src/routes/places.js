import placesController from '../controllers/places';
import express from 'express';
import GooglePlaces from 'node-googleplaces';
import distance from 'google-distance';
import PlacesDb from '../dbcollections/places';

const router = express.Router();
const places = new GooglePlaces(process.env.GOOGLE_API_KEY);
distance.apiKey = process.env.GOOGLE_API_KEY;
const controller = placesController(places, distance, OccurrencesDb);

router.get('/:lng/:lat', controller.get);

export default router;
