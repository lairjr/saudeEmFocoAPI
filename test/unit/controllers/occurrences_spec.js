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

  describe('post', () => {
    const occurrence = {
      description: 'something creepy'
    };

    const fakePromise = {
      then: sinon.spy()
    };

    const returnedMock = {
      save: sinon.stub().returns(fakePromise)
    };

    const occurrencesDb = sinon.stub().returns(returnedMock);

    const userDb = {
      update: sinon.stub().returns(fakePromise)
    };

    let controller;

    before(() => {
      controller = occurrencesController(occurrencesDb, userDb);
    });

    it('saves in the database a record', () => {
      controller.post({ body: occurrence, params: { username: 'username' } }, res);
      sinon.assert.calledWith(occurrencesDb, occurrence);
      sinon.assert.called(returnedMock.save);

      const callback = fakePromise.then.getCall(0).args[0];
      callback();
      const userDbCallback = fakePromise.then.getCall(1).args[0];
      userDbCallback();

      sinon.assert.calledWith(res.sendStatus, 200);
    });
  });
});
