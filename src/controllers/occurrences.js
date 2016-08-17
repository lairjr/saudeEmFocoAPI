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
  model.save();
};

export default occurrencesController;
