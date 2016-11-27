const citiesController = (dbModel) => {
  return {
    get: get(dbModel)
  };
};

const get = (dbModel) => (req, res) => {
  dbModel.aggregate([
    {
      $project: {
        city: 1
      }
    },
    {
      $group: {
        _id: "$city",
        numberOfOccurrences: { $sum: 1 }
      }
    }
  ], (e, results) => {
    console.log(e);
    res.json(results);
  });
};

export default citiesController;
