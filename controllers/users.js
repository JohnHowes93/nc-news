const {
  getUsersModel,
  postUserModel,
  getUserByUsernameModel,
} = require('../models/users');

const getUsersController = (req, res, next) => getUsersModel()
  .then((fetchedUsers) => {
    if (fetchedUsers) res.status(200).send({ fetchedUsers });
    else Promise.reject({ status: 404, msg: 'Users Not Found' });
  })
  .catch(next);

const postUserController = (req, res, next) => {
  const avatarUrlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  const { username, avatar_url, name } = req.body;
  if (typeof username !== 'string') {
    res.status(400).send({ msg: 'Invalid Username' });
  } else if (typeof name !== 'string') {
    res.status(400).send({ msg: 'Invalid Name' });
  } else if (avatarUrlRegex.test(avatar_url) === false) {
    res.status(400).send({ msg: 'Invalid Avatar URL - Must Be (JPG/PNG/GIF)' });
  } else {
    return postUserModel(username, avatar_url, name)
      .then(([postedUser]) => {
        res.status(201).send({ postedUser });
      })
      .catch(next);
  }
};

const getUserByUsernameController = (req, res, next) => {
  if (req.body.username) {
    return getUserByUsernameModel(req.body.username).then(([requestedUser]) => {
      if (requestedUser) return { requestedUser };
      return { msg: 'Unprocessable Entity' };
    });
  }
  getUserByUsernameModel(req.params.username).then(([requestedUser]) => {
    if (requestedUser) res.status(200).send({ requestedUser });
    else res.status(404).send({ msg: 'User Not Found' });
  });
};

module.exports = {
  getUsersController,
  postUserController,
  getUserByUsernameController,
};
