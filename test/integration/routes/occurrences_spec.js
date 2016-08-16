import supertest from 'supertest';

import app from '../../../src/app';

describe('occurrences', () => {
  describe('get', () => {
    it('returns 200', (done) => {
      supertest(app).get('/occurrences').expect(200).end(done);
    });
  })
});
