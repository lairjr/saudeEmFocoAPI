import { expect } from 'chai';
import sinon from 'sinon';

import occurrencesController from '../../../src/controllers/occurrences';

describe('occurrences controller', () => {
  const res = {
    json: sinon.spy(),
    sendStatus: sinon.spy()
  };

  describe('get', () => {
    let controller;

    const occurrencesDb = {
      find: sinon.spy()
    };

    before(() => {
      controller = occurrencesController(occurrencesDb);
    });

    it('return database results', () => {
      controller.get({}, res);
      const callback = occurrencesDb.find.getCall(0).args[0];
      callback(null, ['occurrence1', 'occurrence2']);

      sinon.assert.calledWith(res.json, ['occurrence1', 'occurrence2']);
    });
  });
});
