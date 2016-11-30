import geolib from 'geolib';

const occurrencesController = (dbModel, userDbModel, geocoder) => {
  return {
    get: get(dbModel),
    getWithDistance: getWithDistance(dbModel),
    getById: getById(dbModel),
    post: post(dbModel, userDbModel, geocoder),
    postReview: postReview(dbModel)
  };
};

const get = (dbModel) => (req, res) => {
  dbModel.find((e, results) => {
    return res.json(results);
  });
};

const getWithDistance = (dbModel) => (req, res) => {
  dbModel.find((e, results) => {
    const occurrencesWithDistance = results.map(addDistance(req));

    return res.json(occurrencesWithDistance);
  });
};

const addDistance = (req) => (occurrence) => {
  const distance = geolib.getDistance({ latitude: req.params.lat, longitude: req.params.lng }, { latitude: occurrence.location.coordinates[0], longitude: occurrence.location.coordinates[1] });

  return {
    ...occurrence._doc,
    distance
  };
};

const getById = (dbModel) => (req, res) => {
  dbModel.findById(req.params.id, (e, result) => {
    res.json(result);
  });
};

const postReview = (dbModel) => (req, res) => {
  const updateData = { $set: { status: 'REVIEW' } };
  const occurrencePromise = dbModel.findByIdAndUpdate(req.params.id, updateData);
  occurrencePromise.then((model) => {
    return res.sendStatus(200);
  }, (e) => {
    return res.sendStatus(400);
  });
};

const post = (dbModel, userDbModel, geocoder) => (req, res) => {
  const model = new dbModel(req.body);
  const getQuery = `${model.location.coordinates[0]},${model.location.coordinates[1]}`;

  geocoder.find(getQuery, (err, googleResponse) => {
    const currentCity = findCity(googleResponse);

    model.city = currentCity;

    const savePromise = model.save();

    savePromise.then((m) => {
        const query = { name: req.params.username };
        const updateData = { $inc: { reportNumber: 5 } }
        const userPromise = userDbModel.update(query, updateData);
        userPromise.then((model) => {
          return res.sendStatus(200);
        }).catch((e) => {
          return res.sendStatus(400);
        });
      },
      (e) => {
        return res.sendStatus(400);
      }
    );
  });
};

const findCity = (googleResponse) => {
  return googleResponse[0].administrative_area_level_2.long_name;
};

export default occurrencesController;
