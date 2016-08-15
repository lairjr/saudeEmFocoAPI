import occurrences from '../../src/dbcollections/occurrences';

const get = (req, res) => {
  occurrences.find((e, results) => {
    res.json(results);
  });
};

export default {
  get
};
