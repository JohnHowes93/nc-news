const usersRouter = require('express').Router();
const {
  getUsersController,
  postUserController,
  getUserByUsernameController,
} = require('../controllers/users');

const { handle405 } = require('../errors/index');

usersRouter
  .route('/')
  .get(getUsersController)
  .post(postUserController)
  .all(handle405);

usersRouter.get('/:username', getUserByUsernameController);

module.exports = usersRouter;
