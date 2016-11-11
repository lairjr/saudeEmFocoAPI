const placesController = (googlePlaces, distance, dbModel) => {
  return {
    get: get(googlePlaces, distance, dbModel)
  };
};

const get = (googlePlaces, distance, dbModel) => (req, res) => {
  const geoLocation = {
    lng: req.params.lng,
    lat: req.params.lat
  }
  const location = `${geoLocation.lng},${geoLocation.lat}`;
  const params = {
    location,
    radius: 1000,
    type: ['hospital']
  };

  googlePlaces.nearbySearch(params).then(handleGooglePlacesResponse(res, distance, dbModel, location));
};

const handleGooglePlacesResponse = (res, distance, dbModel, location) => (response) => {
  const searchedPlaces = response.body.results;
  const placesLocations = searchedPlaces.map(getLocation);
  const placesIds = searchedPlaces.map(getPlaceId);
  const distanceParams = {
    origin: location,
    destinations: placesLocations
  };

  distance.get(distanceParams, handleDistanceResponse(res, searchedPlaces));
};

const handleDistanceResponse = (res, searchedPlaces) => (error, distances) => {
  if (error) {
    res.json(searchedPlaces);
  }

  const places = searchedPlaces.map(addPlaceDuration(distances));

  res.json(places);
};

const addPlaceDuration = (distances) => (place, index) => {
  const distance = distances[index];
  const transportDuration = distance ? distance.durationValue : -1;
  const distanceMeasure = distance ? distance.distance : '';

  return {
    ...place,
    distanceMeasure,
    transportDuration
  };
};

const getLocation = (place) => (place.vicinity);

const getPlaceId = (place) => (place.place_id);

export default placesController;
