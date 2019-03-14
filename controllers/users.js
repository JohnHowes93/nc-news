const { getUsersModel, postUserModel } = require('../models/users');

const getUsersController = (req, res, next) => getUsersModel()
  .then((fetchedUsers) => {
    if (fetchedUsers) res.status(200).send({ fetchedUsers });
    else Promise.reject({ status: 404, msg: 'Users Not Found' });
  })
  .catch(next);

const postUserController = (req, res, next) => {
  const { username, avatar_url, name } = req.body;
  if (typeof username !== 'string') {
    res.status(400).send({ msg: 'Invalid Username' });
  } else if (typeof name !== 'string') {
    res.status(400).send({ msg: 'Invalid Name' });
  } else if (
    /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(avatar_url) === false
  ) {
    res.status(400).send({ msg: 'Invalid Avatar URL - Must Be (JPG/PNG/GIF)' });
  } else {
    return postUserModel(username, avatar_url, name)
      .then(([postedUser]) => {
        res.status(201).send({ postedUser });
      })
      .catch(next);
  }
};

module.exports = { getUsersController, postUserController };
