exports.handle400s = (err, req, res, next) => {
  if (err.code === '23503') res.status(400).send({ msg: 'Bad Request' });
  if (err.code === '22P02') res.status(400).send({ msg: 'Invalid Article ID' });
  if (err.code === '22003') res.status(404).send({ msg: 'Article Not Found' });
  if (err.code === '23505') res.status(422).send({ msg: 'Topic Already Exists' });
  else next(err);
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};
