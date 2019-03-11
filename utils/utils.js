const dateParser = array =>
  array.map(item => {
    const newDate = new Date(item.created_at);
    const newItem = { ...item, created_at: newDate.toISOString() };
    return newItem;
  });

const createBelongsToArticleIdRef = (belongsTo, articleId) => {};

module.exports = { dateParser };
