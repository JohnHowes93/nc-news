const apiTopics = {
  'GET /api/articles':
    'Responds with an array of topic objects, each of which should have the following properties: slug, description',
  'POST /api/articles':
    'Request body accepts an object containing the following properties: slug (which must be unique), description. Responds with the posted topic object',
};

const apiArticles = {
  'GET /api/articles':
    'Responds with an articles array of article objects, each of which should have the following properties: author (which is the username from the users table), title, article_id, topic, created_at, votes & comment_count (which is the total count of all the comments with this article_id). It accepts queries:  (which filters the articles by the username value specified in the query), topic (which filters the articles by the topic value specified in the query), sort_by (which sorts the articles by any valid column and defaults to date, order (which can be set to asc or desc for ascending or descending and defaults to descending), limit which limits the number of responses and defaults to 10',
  'POST /api/articles':
    'Request body accepts an object containing the following properties: title, body, topic, username',
  'GET /api/articles/:article_id':
    'Responds with an article object, which should have the following properties: author (which is the username from the users table), title, article_id, body, topic, created_at, votes, comment_count (which is the total count of all the comments with this article_id)',
  'PATCH /api/articles/:article_id':
    'Request body accepts an object in the form { inc_votes: newVote } (newVote will indicate how much the votes property in the database should be updated by). Responds with the updated article',
  'DELETE /api/articles/:article_id':
    'Should delete the given article by article_id. Respons with status 204 and no content',
  'GET /api/articles/:article_id/comments':
    'Responds with an array of comments for the given article_id of which each comment should have the following properties: comment_id, votes, created_at, author (which is the username from the users table), body. Accepts queries sort_by (which sorts the articles by any valid column and defaults to date), order (which can be set to asc or desc for ascending or descending and defaults to descending), limit (which limits the number of responses and defaults to 10)',
  'POST /api/articles/:article_id/comments':
    'Request body accepts an object with the following properties: username, body. Responds with the posted comment',
};

const apiComments = {
  'PATCH /api/comments/:comment_id':
    'Request body accepts an object in the form { inc_votes: newVote } (newVote will indicate how much the votes property in the database should be updated by).Responds with the updated comment',
  'DELETE /api/comments/:comment_id':
    'Should delete the given comment by comment_id. Responds with status 204 and no content',
};

const apiUsers = {
  'GET /api/users':
    'Responds with an array of user objects, each of which should have the following properties: username, avatar_url, name',
  'POST /api/users':
    'Request body accepts an object containing the following properties: username, avatar_url, name. Responds with the posted user',
  'GET /api/users/:username':
    'Responds with a user object which should have the following properties: username, avatar_url, name',
};

const apiInfo = {
  'GET /api':
    'Responds with JSON describing all the available endpoints on your API',
};

const apiInfoToSend = {
  apiTopics,
  apiArticles,
  apiComments,
  apiUsers,
  apiInfo,
};

const sendApiInfo = (req, res, next) => res.status(200).send(apiInfoToSend);

module.exports = sendApiInfo;

// GET /api/articles
// POST /api/articles

// GET /api/articles/:article_id
// PATCH /api/articles/:article_id
// DELETE /api/articles/:article_id

// GET /api/articles/:article_id/comments
// POST /api/articles/:article_id/comments

// PATCH /api/comments/:comment_id
// DELETE /api/comments/:comment_id

// GET /api/users
// POST /api/users

// GET /api/users/:username

// GET /api
