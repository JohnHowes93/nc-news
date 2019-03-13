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
    // GET
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

    // POST
    it('responds to POST requests with an array of topics', () => {
      const testTopic = { description: '123', slug: 'test' };
      return request
        .post('/api/topics')
        .send(testTopic)
        .expect(201)
        .then((response) => {
          expect(response.body.postedTopic).to.eql({
            description: '123',
            slug: 'test',
          });
        });
    });
  });
  describe('/articles', () => {
    // GET

    it('responds to GET requests with an array of topics and their associated comment count', () => request
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        expect(response.body.fetchedArticles).to.be.an('array');
        expect(response.body.fetchedArticles[0]).to.have.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
      }));

    it('filters the articles by the username value specified in the query', () => request
      .get('/api/articles?author=butter_bridge')
      .expect(200)
      .then((response) => {
        expect(response.body.fetchedArticles[0].author).to.be.equal(
          'butter_bridge',
        );
        expect(response.body.fetchedArticles[1].author).to.be.equal(
          'butter_bridge',
        );
      }));

    it('filters the articles by the username value specified in the query', () => request
      .get('/api/articles?topic=mitch')
      .expect(200)
      .then((response) => {
        expect(response.body.fetchedArticles[0].topic).to.be.equal('mitch');
        expect(response.body.fetchedArticles[1].topic).to.be.equal('mitch');
      }));

    it('by default, it sorts the articles by created_at, descending', () => request
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        expect(
          Date.parse(response.body.fetchedArticles[0].created_at),
        ).to.be.greaterThan(
          Date.parse(response.body.fetchedArticles[1].created_at),
        );
        expect(
          Date.parse(response.body.fetchedArticles[1].created_at),
        ).to.be.greaterThan(
          Date.parse(response.body.fetchedArticles[2].created_at),
        );
      }));

    it('by request, it sorts the articles by votes, ascending', () => request
      .get('/api/articles?sort_by?=votes&order=asc')
      .expect(200)
      .then((response) => {
        expect(response.body.fetchedArticles[0].votes).to.not.be.greaterThan(
          response.body.fetchedArticles[1].votes,
        );
        expect(response.body.fetchedArticles[0].votes).to.not.be.greaterThan(
          response.body.fetchedArticles[2].votes,
        );
      }));
  });
});
