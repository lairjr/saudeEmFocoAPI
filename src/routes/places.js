import placesController from '../controllers/places';
import express from 'express';
import GooglePlaces from 'node-googleplaces';
import distance from 'google-distance';
import PlacesDb from '../dbcollections/places';
import UsersDb from '../dbcollections/users';

const router = express.Router();
const places = new GooglePlaces(process.env.GOOGLE_API_KEY);
distance.apiKey = process.env.GOOGLE_API_KEY;
const controller = placesController(places, distance, PlacesDb, UsersDb);

router.get('/:lng/:lat', controller.get);
router.post('/:username', controller.post);

export default router;
