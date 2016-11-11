const placesController = (googlePlaces) => {
  return {
    get: get(googlePlaces)
  };
};

const get = (googlePlaces) => (req, res) => {
  const location = `${req.params.lng},${req.params.lat}`;
  const params = {
    location,
    radius: 1000,
    type: ['hospital']
  };

  googlePlaces.nearbySearch(params).then((response) => {
    res.json(response.body.results);
  });
};

export default placesController;
