const usersRouter = require('express').Router();
const {
  getUsersController,
  postUserController,
  getUserByUsernameController,
} = require('../controllers/users');

usersRouter
  .route('/')
  .get(getUsersController)
  .post(postUserController);

usersRouter.get('/:username', getUserByUsernameController);

module.exports = usersRouter;
