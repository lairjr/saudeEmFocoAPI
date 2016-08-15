import { expect } from 'chai';
import occurrencesDb from '../../src/dbcollections/occurrences';
import sinon from 'sinon';

import occurrences from '../../src/controllers/occurrences';

describe('occurrences controller', () => {
  const res = {
    json: sinon.spy()
  };

  beforeEach(() => {
    sinon.spy(occurrencesDb, 'find');
  });

  describe('get', () => {
    it('return database results', () => {
      occurrences.get({}, res);
      const callback = occurrencesDb.find.getCall(0).args[0];
      callback(null, ['occurrence1', 'occurrence2']);

      sinon.assert.calledWith(res.json, ['occurrence1', 'occurrence2']);
    });
  });
});
