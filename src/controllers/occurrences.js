const occurrencesController = (dbModel, userDbModel) => {
  return {
    get: get(dbModel),
    getById: getById(dbModel),
    post: post(dbModel, userDbModel),
    postReview: postReview(dbModel)
  };
};

const get = (dbModel) => (req, res) => {
  dbModel.find((e, results) => {
    res.json(results);
  });
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

const post = (dbModel, userDbModel) => (req, res) => {
  const model = new dbModel(req.body);
  const savePromise = model.save();

  savePromise.then((m) => {
      const query = { name: req.params.username };
      const updateData = { $inc: { reportNumber: 5 } }
      const userPromise = userDbModel.update(query, updateData);
      userPromise.then((model) => {
        return res.sendStatus(200);
      }, (e) => {
        return res.sendStatus(400);
      });
    },
    (e) => {
      return res.sendStatus(400);
    }
  );
};

export default occurrencesController;
