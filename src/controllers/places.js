const placesController = (googlePlaces) => {
  return {
    get: get(googlePlaces)
  };
};

const get = (googlePlaces) => (req, res) => {
  const params = {
    location: '-30.0573828,-51.1806058',
    radius: 1000,
    type: ['hospital']
  };

  googlePlaces.nearbySearch(params).then((response) => {
    res.json(response.body.results);
  });
};

export default placesController;
