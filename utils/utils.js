const dateParser = array => array.map((item) => {
  const newDate = new Date(item.created_at);
  const newItem = { ...item, created_at: newDate.toISOString() };
  return newItem;
});

function createRef(inputArray, key, value) {
  const refObj = {};
  inputArray.forEach((item) => {
    refObj[item[key]] = item[value];
  });
  return refObj;
}

function formatComments(commentData, articleRef) {
  return commentData.map((comment) => {
    const newObj = { ...comment };
    const commentRef = comment.belongs_to;
    newObj.article_id = articleRef[commentRef];
    delete newObj.belongs_to;
    newObj.author = comment.created_by;
    delete newObj.created_by;
    return newObj;
  });
}

module.exports = { dateParser, createRef, formatComments };
