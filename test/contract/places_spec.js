import supertest from 'supertest';

import app from '../../src/app';

describe('places', () => {
  describe('get', () => {
    it('returns 200', (done) => {
      supertest(app).get('/places/300573828/511806058').expect(200).end(done);
    });
  });
});
