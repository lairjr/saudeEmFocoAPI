const usersController = (dbModel) => {
  return {
    get: get(dbModel),
    getByUsername: getByUsername(dbModel),
    put: put(dbModel)
  };
};

const get = (dbModel) => (req, res) => {
  dbModel.find((e, results) => {
    res.json(results);
  });
};

const put = (dbModel) => (req, res) => {
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

const getByUsername = (dbModel) => (req, res) => {
  const query = {
    name: req.params.username
  };

  const findPromise = dbModel.findOne(query);
  findPromise.then((m) => {
    if (m) {
      return res.json(m);
    }
    return res.sendStatus(404);
  });
};

export default usersController;
