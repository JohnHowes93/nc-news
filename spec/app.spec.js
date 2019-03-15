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

  describe('/', () => {
    describe('GET', () => {
      it('returns a JSON describing all the available endpoints on the API ', () =>
        request.get('/api').expect(200));
    });
    describe('OTHER METHODS', () => {
      it('responds to invalid method requests with 405 method not allowed', () =>
        request
          .put('/api')
          .expect(405)
          .then(response => {
            expect(response.body.msg).to.eql('Method Not Allowed');
          }));
    });
  });

  describe('/topics', () => {
    // GET
    it('responds to GET requests with an array of topics', () =>
      request
        .get('/api/topics')
        .expect(200)
        .then(response => {
          expect(response.body.fetchedTopics).to.be.an('array');
          expect(response.body.fetchedTopics[0]).to.have.keys(
            'description',
            'slug'
          );
        }));

    // POST
    it('responds to POST requests with an array of topics', () => {
      const testTopic = { description: '123', slug: 'test' };
      return request
        .post('/api/topics')
        .send(testTopic)
        .expect(201)
        .then(response => {
          expect(response.body.postedTopic).to.eql({
            description: '123',
            slug: 'test'
          });
        });
    });
    it('responds to invalid POST request (duplicate slug) with 422 status and message: Topic Already Exists', () => {
      const testTopic = { description: '123', slug: 'mitch' };
      return request
        .post('/api/topics')
        .send(testTopic)
        .expect(422)
        .then(response => {
          expect(response.body.msg).to.eql('Topic Already Exists');
        });
    });
    it('responds to invalid POST request (if body is missing description property) with 400 status and message: Topic Description Required', () => {
      const testTopic = { slug: 'testslug' };
      return request
        .post('/api/topics')
        .send(testTopic)
        .expect(422)
        .then(response => {
          expect(response.body.msg).to.eql('Topic Description Required');
        });
    });
    // OTHER METHODS
    it('responds to invalid method requests with 405 method not allowed', () => {
      const testTopic = { description: '123', slug: 'test' };
      return request
        .patch('/api/topics')
        .send(testTopic)
        .expect(405)
        .then(response => {
          expect(response.body.msg).to.eql('Method Not Allowed');
        });
    });
  });

  describe('/articles', () => {
    // GET
    describe('GET', () => {
      it('responds to GET requests with an array of topics and their associated comment count', () =>
        request
          .get('/api/articles')
          .expect(200)
          .then(response => {
            expect(response.body.articles).to.be.an('array');
            expect(response.body.articles[0]).to.have.keys(
              'author',
              'title',
              'article_id',
              'topic',
              'created_at',
              'votes',
              'comment_count'
            );
          }));

      it('filters the articles by the username value specified in the query', () =>
        request
          .get('/api/articles?author=butter_bridge')
          .expect(200)
          .then(response => {
            expect(response.body.articles[0].author).to.be.equal(
              'butter_bridge'
            );
            expect(response.body.articles[1].author).to.be.equal(
              'butter_bridge'
            );
          }));

      it('filters the articles by the topic value specified in the query', () =>
        request
          .get('/api/articles?topic=mitch')
          .expect(200)
          .then(response => {
            expect(response.body.articles[0].topic).to.be.equal('mitch');
            expect(response.body.articles[1].topic).to.be.equal('mitch');
          }));

      it('by default, it sorts the articles by created_at, descending', () =>
        request
          .get('/api/articles')
          .expect(200)
          .then(response => {
            expect(
              Date.parse(response.body.articles[0].created_at)
            ).to.be.greaterThan(
              Date.parse(response.body.articles[1].created_at)
            );
            expect(
              Date.parse(response.body.articles[1].created_at)
            ).to.be.greaterThan(
              Date.parse(response.body.articles[2].created_at)
            );
          }));

      it('by request, it sorts the articles by votes, ascending', () =>
        request
          .get('/api/articles?sort_by?=votes&order=asc')
          .expect(200)
          .then(response => {
            expect(response.body.articles[0].votes).to.not.be.greaterThan(
              response.body.articles[1].votes
            );
            expect(response.body.articles[0].votes).to.not.be.greaterThan(
              response.body.articles[2].votes
            );
          }));
      it('ignores invalid column to sort by', () =>
        request
          .get('/api/articles?sort_by=test')
          .expect(400)
          .then(response =>
            expect(response.body.msg).to.equal('Invalid Sort_By Query')
          ));
    });

    // POST
    describe('POST', () => {
      it('responds to POST requests with the posted article', () => {
        const testArticle = {
          title: 'testTitle',
          body: 'testBody',
          topic: 'mitch',
          author: 'butter_bridge'
        };
        return request
          .post('/api/Articles')
          .send(testArticle)
          .expect(201)
          .then(response => {
            expect(response.body.article).to.include({
              title: 'testTitle',
              body: 'testBody',
              topic: 'mitch',
              author: 'butter_bridge'
            });
          });
      });

      it('POST request with invalid author returns status: "400" message: "Bad Request"', () => {
        const testArticle = {
          title: 'testTitle',
          body: 'testBody',
          topic: 'mitch',
          author: 'testAuthor'
        };
        return request
          .post('/api/Articles')
          .send(testArticle)
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal('Bad Request');
          });
      });

      it('POST request with invalid topic returns status: "400" message: "Bad Request"', () => {
        const testArticle = {
          title: 'testTitle',
          body: 'testBody',
          topic: 'testTopic',
          author: 'butter_bridge'
        };
        return request
          .post('/api/Articles')
          .send(testArticle)
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal('Bad Request');
          });
      });
    });

    // GET BY ID

    describe('GET BY ID', () => {
      it("responds to GET requests with a single article and it's associated comment count", () =>
        request
          .get('/api/articles/2')
          .expect(200)
          .then(response => {
            expect(response.body.article).to.have.keys(
              'author',
              'title',
              'article_id',
              'topic',
              'created_at',
              'votes',
              'comment_count'
            );
            expect(response.body.article.article_id).to.equal(2);
          }));

      it('returns the correct error for invalid article_id input (ie. a word)', () =>
        request
          .get('/api/articles/aaaaaaaa')
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal('Invalid Article ID');
          }));
      it("returns the correct error for article_id that is correct format, but doesn't exist, ie (article_id:9999999)", () =>
        request
          .get('/api/articles/999')
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.equal('Article Not Found');
          }));
    });

    // PATCH
    describe('PATCH', () => {
      it("increments the article's votes by the specified amount", () => {
        const testVote = { inc_votes: 2 };
        return request
          .patch('/api/articles/1')
          .send(testVote)
          .then(response => {
            expect(response.body.article.votes).to.equal(102);
          });
      });
      it("increments the article's votes by the specified amount, even if its a negative number", () => {
        const testVote = { inc_votes: -100 };
        return request
          .patch('/api/articles/1')
          .send(testVote)
          .then(response => {
            expect(response.body.article.votes).to.equal(0);
          });
      });
      it('returns status 400 if no inc_votes is passed', () => {
        const testVote = { aaa: -100 };
        return request
          .patch('/api/articles/1')
          .send(testVote)
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal('Vote Not Found');
          });
      });
      it('returns status 400 if inc_votes is not a number', () => {
        const testVote = { inc_votes: 'cat' };
        return request
          .patch('/api/articles/1')
          .send(testVote)
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal('Vote Not Valid Number');
          });
      });
    });

    // DELETE
    describe('DELETE', () => {
      it('deletes the given article by article_id', () =>
        request
          .delete('/api/articles/1')
          .expect(204)
          .then(() => request.get('/api/articles/1').expect(400)));
      it('responds with a 204 if given incorrect article_id', () =>
        request.delete('/api/articles/999').expect(204));
    });

    // GET COMMENTS BY ID
    describe('GET COMMENTS BY ID', () => {
      it('retrives an array of comments for the given article_id which by default is sorted by date and is limited to 10 comments', () =>
        request
          .get('/api/articles/1/comments')
          .expect(200)
          .then(response => {
            expect(response.body.comments[0]).to.have.keys(
              'comment_id',
              'votes',
              'created_at',
              'author',
              'body'
            );
            expect(
              Date.parse(response.body.comments[0].created_at)
            ).to.not.be.greaterThan(Date.parse(response.body.comments[1]));
            expect(
              Date.parse(response.body.comments[0].created_at)
            ).to.not.be.greaterThan(Date.parse(response.body.comments[2]));
            expect(response.body.comments.length).to.equal(10);
          }));
      it('accepts queries stating which column to sort by', () =>
        request
          .get('/api/articles/1/comments?sort_by=votes')
          .expect(200)
          .then(response => {
            expect(response.body.comments[0].votes).to.be.greaterThan(
              response.body.comments[1].votes
            );
          }));
      it('accepts queries stating which column to sort by and what order to be sorted by (asc/desc)', () =>
        request
          .get('/api/articles/1/comments?sort_by=votes&order=asc')
          .expect(200)
          .then(response => {
            expect(response.body.comments[0].votes).to.not.be.greaterThan(
              response.body.comments[1].votes
            );
          }));
      it('returns a 404 error for an article which does not exist', () =>
        request
          .get('/api/articles/999/comments')
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.equal('Article Not Found');
          }));
    });

    // POST COMMENTS TO ARTICLE_ID
    describe('POST COMMENTS TO ARTICLE_ID', () => {
      it('accepts comments on articles returning the posted comment', () => {
        const testPost = {
          username: 'butter_bridge',
          body: 'test test test this is the comment body'
        };
        return request
          .post('/api/articles/1/comments')
          .send(testPost)
          .expect(201)
          .then(response => {
            expect(response.body.comment).to.contain({
              article_id: 1,
              author: 'butter_bridge',
              body: 'test test test this is the comment body'
            });
          });
      });
      it('returns 400 error if article does not exist', () => {
        const testPost1 = {
          username: 'butter_bridge',
          body: 'test test test this is the comment body'
        };
        return request
          .post('/api/articles/a/comments')
          .send(testPost1)
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal('Invalid Article ID');
          });
      });
    });
    describe('OTHER METHODS', () => {
      it('responds to invalid method requests with 405 method not allowed on /', () =>
        request
          .put('/api/articles')
          .expect(405)
          .then(response => {
            expect(response.body.msg).to.eql('Method Not Allowed');
          }));
      it('responds to invalid method requests with 405 method not allowed on /article:id', () =>
        request
          .put('/api/articles/1')
          .expect(405)
          .then(response => {
            expect(response.body.msg).to.eql('Method Not Allowed');
          }));
      it('responds to invalid method requests with 405 method not allowed on /article:id/comments', () =>
        request
          .put('/api/articles/comments/')
          .expect(405)
          .then(response => {
            expect(response.body.msg).to.eql('Method Not Allowed');
          }));
    });
  });
  describe('/comments', () => {
    // PATCH COMMENT BY COMMENT_ID
    describe('PATCH COMMENT BY COMMENT_ID', () => {
      it("increments the article's votes by the specified amount", () => {
        const testVote = { inc_votes: 2 };
        return request
          .patch('/api/comments/5')
          .send(testVote)
          .then(response => {
            expect(response.body.patchedComment.votes).to.equal(2);
          });
      });
      it('returns status 400 if no inc_votes is passed', () => {
        const testVote = { aaa: -100 };
        return request
          .patch('/api/comments/1')
          .send(testVote)
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal('Vote Not Found');
          });
      });
      it('returns status 400 if inc_votes is not a number', () => {
        const testVote = { inc_votes: 'cat' };
        return request
          .patch('/api/comments/1')
          .send(testVote)
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal('Vote Not Valid Number');
          });
      });
    });
    // DELETE COMMENT BY COMMENT_ID
    describe('DELETE COMMENT BY COMMENT_ID', () => {
      it('deletes the given comment by comment_id', () =>
        request
          .delete('/api/comments/1')
          .expect(204)
          .then(() => request.get('/api/comment/1').expect(404)));
      it('responds with a 404 error if given incorrect comment_id', () =>
        request.delete('/api/comments/999').expect(204));
    });
    describe('OTHER METHODS', () => {
      it('responds to invalid method requests with 405 method not allowed on /', () =>
        request
          .put('/api/comments')
          .expect(405)
          .then(response => {
            expect(response.body.msg).to.eql('Method Not Allowed');
          }));
      it('responds to invalid method requests with 405 method not allowed on /comment:id', () =>
        request
          .put('/api/comments')
          .expect(405)
          .then(response => {
            expect(response.body.msg).to.eql('Method Not Allowed');
          }));
    });
  });
  // USERS
  describe('/users', () => {
    describe('GET', () => {
      it('responds with an array of user objects, each with username, avatar_url & name', () =>
        request
          .get('/api/users')
          .expect(200)
          .then(response => {
            expect(response.body.fetchedUsers[0]).to.have.keys(
              'username',
              'avatar_url',
              'name'
            );
          }));
    });
    describe('POST', () => {
      it('responds with the posted user, containing their username, avatar_url & name', () => {
        const testUser = {
          username: 'testUsername',
          avatar_url: 'http://testAvatarURL.jpg',
          name: 'testName'
        };
        return request
          .post('/api/users')
          .send(testUser)
          .expect(201)
          .then(response => {
            expect(response.body.postedUser).to.include({
              username: 'testUsername',
              avatar_url: 'http://testAvatarURL.jpg',
              name: 'testName'
            });
          });
      });
      it('request with invalid username returns status: 400 message: Invalid Username', () => {
        const testUser = {
          username: 1,
          avatar_url: 'http://testAvatarURL.jpg',
          name: 'testName'
        };
        return request
          .post('/api/users')
          .send(testUser)
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal('Invalid Username');
          });
      });
      it('request with invalid name returns status: 400 message: Invalid Name', () => {
        const testUser = {
          username: 'testUser',
          avatar_url: 'http://testAvatarURL.jpg',
          name: 1
        };
        return request
          .post('/api/users')
          .send(testUser)
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal('Invalid Name');
          });
      });
      it('request with invalid avatar_url returns status: 400 message: Invalid Avatar URL - Must Be (JPG/PNG/GIF)', () => {
        const testUser = {
          username: 'testUser',
          avatar_url: 'testAvatarURL',
          name: 'testName'
        };
        return request
          .post('/api/users')
          .send(testUser)
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal(
              'Invalid Avatar URL - Must Be (JPG/PNG/GIF)'
            );
          });
      });
    });
    describe('GET BY USERNAME', () => {
      it('responds with a user object that contains username, avatar_url & name', () =>
        request
          .get('/api/users/butter_bridge')
          .expect(200)
          .then(response => {
            expect(response.body.requestedUser).to.eql({
              username: 'butter_bridge',
              name: 'jonny',
              avatar_url:
                'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
            });
          }));
      it('responds with status 404, message: User Not Found if user does not exist', () =>
        request
          .get('/api/users/test')
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.eql('User Not Found');
          }));
    });
    describe('OTHER METHODS', () => {
      it('responds to invalid method requests with 405 method not allowed on /', () =>
        request
          .put('/api/users')
          .expect(405)
          .then(response => {
            expect(response.body.msg).to.eql('Method Not Allowed');
          }));
      it('responds to invalid method requests with 405 method not allowed on /:username', () =>
        request
          .put('/api/users/mitch')
          .expect(405)
          .then(response => {
            expect(response.body.msg).to.eql('Method Not Allowed');
          }));
    });
  });
});
