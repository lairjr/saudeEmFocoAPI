import { expect } from 'chai';
import occurrencesDb from '../../src/dbcollections/occurrences';
import sinon from 'sinon';

import occurrences from '../../src/controllers/occurrences';

describe('occurrences controller', () => {
  const res = {
    json: sinon.spy()
  };

  beforeEach(() => {
    sinon.stub(occurrencesDb, 'find').returns(['occurrence1', 'occurrence2']);
  });

  describe('get', () => {
    it('return database results', () => {
      occurrences.get({}, res);

      sinon.assert.calledWith(res.json, ['occurrence1', 'occurrence2']);
    });
  });
});
