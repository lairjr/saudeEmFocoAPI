import { expect } from 'chai';
import sinon from 'sinon';

import userController from '../../../src/controllers/users';

describe('user controller', () => {
  const res = {
    json: sinon.spy(),
    sendStatus: sinon.spy()
  };

  describe('get', () => {
    let controller;

    const userDb = {
      find: sinon.spy()
    };

    before(() => {
      controller = userController(userDb);
    });

    it('return database results', () => {
      controller.get({}, res);
      const callback = userDb.find.getCall(0).args[0];
      callback(null, ['user1', 'user2']);

      sinon.assert.calledWith(res.json, ['user1', 'user2']);
    });
  });

  describe('post', () => {
    const user = {
      name: 'fake user name'
    };

    const fakePromise = {
      then: sinon.spy()
    };

    const returnedMock = {
      save: sinon.stub().returns(fakePromise)
    };

    const userDb = sinon.stub().returns(returnedMock);

    let controller;

    before(() => {
      controller = userController(userDb);
    });

    it('saves in the database a record', () => {
      controller.put({ body: user }, res);
      sinon.assert.calledWith(userDb, user);
      sinon.assert.called(returnedMock.save);

      const callback = fakePromise.then.getCall(0).args[0];
      callback(null);

      sinon.assert.calledWith(res.sendStatus, 200);
    });
  });
});
