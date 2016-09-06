import supertest from 'supertest';

import app from '../../src/app';

describe('occurrences', () => {
  describe('get', () => {
    it('returns 200', (done) => {
      supertest(app).get('/users').expect(200).end(done);
    });
  });

  describe('post', () => {
    it('returns 200', (done) => {
      const data = {
        name: 'fake user name',
        password: 'fake password'
      };
      supertest(app).post('/users').send(data).expect(200).end(done);
    });
  });
});
