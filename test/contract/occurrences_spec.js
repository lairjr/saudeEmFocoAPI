import supertest from 'supertest';

import app from '../../src/app';

describe('occurrences', () => {
  describe('get', () => {
    it('returns 200', (done) => {
      supertest(app).get('/occurrences').expect(200).end(done);
    });
  });

  describe('post', () => {
    it('returns 200', (done) => {
      const data = {
        description: 'contract-test-you-can-delete',
        status: 'ACTIVE',
        location: {
          type: 'Point',
          coordinates:[-30.034647, -51.217658]
        }
      };
      supertest(app).post('/occurrences').send(data).expect(200).end(done);
    });
  });
});
