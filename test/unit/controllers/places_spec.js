import { expect } from 'chai';
import GooglePlaces from 'node-googleplaces';
import sinon from 'sinon';

import placesController from '../../../src/controllers/places';

describe('places controller', () => {
  const res = {
    json: sinon.spy(),
    sendStatus: sinon.spy()
  };

  describe('get', () => {
    let controller;

    const fakePromise = {
      then: sinon.spy()
    };

    const fakeGooglePlace = {
      nearbySearch: sinon.stub().returns(fakePromise)
    };

    before(() => {
      controller = placesController(fakeGooglePlace);
    });

    it('creates node google place object', () => {
      controller.get('', res);
      const callback = fakePromise.then.getCall(0).args[0];
      const fakeGoogleResponse = {
        body: {
          results: 'fake google results'
        }
      };

      callback(fakeGoogleResponse);
      sinon.assert.calledWith(res.json, 'fake google results');
    });

    // it('return google results', () => {
    //   controller.get({ location: '49.250964,-123.102192', radius: 10000 }, res);
    //
    //   sinon.assert.calledWith(res.json, ['occurrence1', 'occurrence2']);
    // });
  });
});