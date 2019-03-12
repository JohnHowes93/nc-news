process.env.NODE_ENV = 'test';

// requirements
const supertest = require('supertest');
const { expect } = require('chai');
const connection = require('../db/connection');
const app = require('../app');

const request = supertest(app);

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/topics', () => {
    it('responds to GET requests with an array of topics', () => request
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        expect(response.body.fetchedTopics).to.be.an('array');
        expect(response.body.fetchedTopics[0]).to.have.keys(
          'description',
          'slug',
        );
      }));
  });
});
