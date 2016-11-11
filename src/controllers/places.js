const placesController = (googlePlaces) => {
  return {
    get: get(googlePlaces)
  };
};

const get = (googlePlaces) => (req, res) => {
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
    const places = response.body.results.map(addPlaceDuration(geoLocation));
    res.json(places);
  });
};

const addPlaceDuration = (geoLocation) => (place) => {
  const transportDuration = 26981;
  return {
    ...place,
    transportDuration
  };
};

export default placesController;
