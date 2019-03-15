# John Howes - NC News BE (15/03/2019)

## General

- Create your own `README.md`
- Fix all linting problems

## Seeding

- Can insert `users` and `topics` at the same time
- No need for the `Promise.all` at the end
- Avoid any mutations in seed functions, e.g.:

```js
newObj.article_id = articleRef[commentRef];
delete newObj.belongs_to;
newObj.author = comment.created_by;
delete newObj.created_by;
```

## Controllers

- extract the `/api` route data into a `.json` file that can be required in
- `if (articles)` might be problematic. An empty array might be `truthy`... We also need to differentiate between a `topic` / `author` that exists but has no articles (`[]`) and a `topic` / `author` that does not exist (`404`)
- Set mysterious values to variables so that it is more obvious what they are (`/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g`)

## Our Test Output

<!-- ### `GET /api/articles/:article_id`

status:200 responds with a single article object:

AssertionError: expected { Object (author, title, ...) } to have keys 'article_id', 'body', 'author', 'created_at', 'votes', 'topic', 'comment_count', and 'title'

```
   - expected - actual
  [
     "article_id"
     "author"
   - "body"
     "comment_count"
     "created_at"
     "title"
     "topic"
   ]
```

- Don't serve the article body on the `/api/articles` route -->

<!-- ### `PATCH /api/articles/:article_id`

PATCH status:200s no body responds with an unmodified article:
Error: expected 200 "OK", got 400 "Bad Request"

- Up to you whether you want to change this. Just make sure you are consistent. -->

### `POST /api/articles/:article_id/comments`

responds with a 404 when given a non-existent article id:
Error: expected 404 "Not Found", got 400 "Bad Request"

### `POST /api/articles/:article_id/comments`

responds with a 400 when given an invalid body referencing a non-existent column:
Error: expected 400 "Bad Request", got 201 "Created"

### `POST /api/articles/:article_id/comments`

responds with a 422 when given a non-existent username:
Error: expected 422 "Unprocessable Entity", got 400 "Bad Request"

### `PATCH /api/comments/:comment_id`

status:200 with no body responds with an unmodified comment:
Error: expected 200 "OK", got 400 "Bad Request"

### `PATCH /api/comments/:comment_id`

PATCH status:404 non-existent comment_id is used:
Error: expected 404 "Not Found", got 400 "Bad Request"

### `DELETE /api/comments/:comment_id`

status:404 client uses non-existent comment_id:
Error: expected 404 "Not Found", got 204 "No Content"
