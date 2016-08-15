import occurrences from '../../src/dbcollections/occurrences';

const get = (req, res) => {
  res.json(occurrences.find());
};

export default {
  get
};
