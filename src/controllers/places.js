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
  const placesIds = searchedPlaces.map(getPlaceId);
  const queryObject = { 'googleId': { $in: placesIds } };


  dbModel.find(queryObject, handleDatabaseQuery(res, distance, searchedPlaces, location));
};

const handleDatabaseQuery = (res, distance, searchedPlaces, location) => (error, records) => {
  const placesLocations = searchedPlaces.map(getLocation);
  const distanceParams = {
    origin: location,
    destinations: placesLocations
  };

  distance.get(distanceParams, handleDistanceResponse(res, searchedPlaces, records));
};

const handleDistanceResponse = (res, searchedPlaces, placesDbRecords) => (error, distances) => {
  if (error) {
    res.json(searchedPlaces);
  }

  const places = searchedPlaces.map(addPlaceDuration(distances)).map(addWaitingTime(placesDbRecords));

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

const addWaitingTime = (placesDbRecords) => (place) => {
  const dbRecord = placesDbRecords.find(filterByGoogleId(place.place_id));

  if (dbRecord) {
    const totalWaitingTime = dbRecord ? dbRecord.waitingTimeReports.reduce(sumWaitingTime) : -1
    const waitingTime = Math.round(totalWaitingTime / dbRecord.waitingTimeReports.length);

    return {
      ...place,
      waitingTime
    };
  }

  return {
    ...place,
    waitingTime: -1
  };
};

const getLocation = (place) => (place.vicinity);

const getPlaceId = (place) => (place.place_id);

const filterByGoogleId = (googleId) => (dbRecord) => (dbRecord.googleId === googleId);

const sumWaitingTime = (acc, current) => (acc += current);

export default placesController;
