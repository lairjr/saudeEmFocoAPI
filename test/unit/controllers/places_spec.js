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

    const fakeGoogleDistance = {
      get: sinon.stub()
    };

    const fakePlacesDb = {
      find: sinon.spy()
    };

    before(() => {
      controller = placesController(fakeGooglePlace, fakeGoogleDistance, fakePlacesDb);
    });

    it('creates node google place object', () => {
      controller.get({ params: { lng: 123, lat:456  }}, res);
      const callback = fakePromise.then.getCall(0).args[0];

      sinon.assert.calledWith(fakeGooglePlace.nearbySearch, sinon.match({ location: '123,456' }));

      const fakeGoogleResponse = {
        body: {
          results: [
            {
              id: 1,
              geometry: {
                location: {
                  lat: 1,
                  lng: 2
                }
              },
              rating: 4
            },
            {
              id: 2,
              geometry: {
                location: {
                  lat: 1,
                  lng: 2
                }
              },
              rating: 4
            }
          ]
        }
      };

      callback(fakeGoogleResponse);
      const dbCallback = fakePlacesDb.find.getCall(0).args[1];
      dbCallback(null, []);
      const distanceCallback = fakeGoogleDistance.get.getCall(0).args[1];
      distanceCallback(null, []);
      sinon.assert.calledWith(res.json, [ sinon.match({ id: 1, }), sinon.match({ id: 2 }) ]);
    });

    it('returns places with transportDuration', () => {
      controller.get({ params: { lng: 123, lat:456  }}, res);
      const callback = fakePromise.then.getCall(0).args[0];

      sinon.assert.calledWith(fakeGooglePlace.nearbySearch, sinon.match({ location: '123,456' }));

      const fakeGoogleResponse = {
        body: {
          results: [
            {
              id: 1,
              geometry: {
                location: {
                  lat: 1,
                  lng: 2
                }
              }
            },
            {
              id: 2,
              geometry: {
                location: {
                  lat: 1,
                  lng: 2
                }
              }
            }
          ]
        }
      };

      callback(fakeGoogleResponse);
      const dbCallback = fakePlacesDb.find.getCall(0).args[1];
      dbCallback(null, []);
      const distanceCallback = fakeGoogleDistance.get.getCall(0).args[1];
      distanceCallback(null, [ { durationValue: 12 }, { durationValue: 13 } ]);
      sinon.assert.calledWith(res.json, [ sinon.match({ transportDuration: 12 }), sinon.match({ transportDuration: 13 }) ]);
    });
  });
});
