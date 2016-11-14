const occurrencesController = (dbModel, userDbModel) => {
  return {
    get: get(dbModel),
    post: post(dbModel, userDbModel)
  };
};

const get = (dbModel) => (req, res) => {
  dbModel.find((e, results) => {
    res.json(results);
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
