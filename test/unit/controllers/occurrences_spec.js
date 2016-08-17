import { expect } from 'chai';
import sinon from 'sinon';

import OccurrencesController from '../../../src/controllers/occurrences';

describe('occurrences controller', () => {
  const res = {
    json: sinon.spy()
  };
  let occurrencesController, occurrencesDb;

  describe('get', () => {
    before(() => {
      occurrencesDb = {
        find: sinon.spy()
      };
      occurrencesController = new OccurrencesController(occurrencesDb);
    });

    it('return database results', () => {
      occurrencesController.get({}, res);
      const callback = occurrencesDb.find.getCall(0).args[0];
      callback(null, ['occurrence1', 'occurrence2']);

      sinon.assert.calledWith(res.json, ['occurrence1', 'occurrence2']);
    });
  });

  describe('post', () => {
    const occurrence = {
      description: 'something creepy'
    };

    before(() => {
      occurrencesDb = sinon.createStubInstance(() => {
        save: sinon.spy()
      });
      occurrencesController = new OccurrencesController(occurrencesDb);
    });

    it('saves in the database a record', () => {
      occurrencesController.post({ body: occurrence }, res);
      sinon.assert.calledWith(occurrencesDb, occurrence);
      sinon.assert.called(occurrencesDb.save);
    });
  });
});
