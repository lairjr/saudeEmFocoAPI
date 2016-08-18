const occurrencesController = (dbModel) => {
  return {
    get: get(dbModel),
    post: post(dbModel)
  };
};

const get = (dbModel) => (req, res) => {
  dbModel.find((e, results) => {
    res.json(results);
  });
};

const post = (dbModel) => (req, res) => {
  const model = new dbModel(req.body);
  const savePromise = model.save();

  savePromise.then((m) => {
      res.sendStatus(200);
    },
    (e) => {
      res.sendStatus(400);
    }
  );
};

export default occurrencesController;
