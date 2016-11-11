import supertest from 'supertest';

import app from '../../src/app';

describe('places', () => {
  describe('get', () => {
    it('returns 200', (done) => {
      supertest(app).get('/places/-30.0573828/-51.1806058').expect(200).end(done);
    });
  });
});
