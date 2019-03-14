const usersRouter = require('express').Router();
const {
  getUsersController,
  postUserController,
} = require('../controllers/users');

usersRouter
  .route('/')
  .get(getUsersController)
  .post(postUserController);

module.exports = usersRouter;
