class OccurrencesController {
  constructor(dbModel) {
    this.dbModel = dbModel;
  }

  get(req, res) {
    this.dbModel.find((e, results) => {
      res.json(results);
    });
  }

  post(req, res) {
    const model = new this.dbModel(req.body);
    model.save();
  }
}

export default OccurrencesController;
