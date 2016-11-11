const placesController = (googlePlaces, distance) => {
  return {
    get: get(googlePlaces, distance)
  };
};

const get = (googlePlaces, distance) => (req, res) => {
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

  googlePlaces.nearbySearch(params).then((response) => {
    const searchedPlaces = response.body.results;
    const placesLocations = searchedPlaces.map(getLocation);
    const distanceParams = {
      origin: location,
      destinations: placesLocations
    };

    distance.get(distanceParams, (err, distances) => {
      if (err) return res.json(searchedPlaces);

      const places = searchedPlaces.map(addPlaceDuration(distances));
      return res.json(places);
    });
  });
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

const getLocation = (place) => {
  return place.vicinity;
};

export default placesController;
