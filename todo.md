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

## app & Routes

- Each route should have a `.all` method attached which serves a `405` for `Method Not Allowed` (but test for this first!)

## Controllers

- extract the `/api` route data into a `.json` file that can be required in
- should consistently respond with correct key for the resource that you are serving up. e.g: `{ articles: [...] }` / `{ article: {...} }`. This makes it much more predictable on the client side.
- `if (articles)` might be problematic. An empty array might be `truthy`... We also need to differentiate between a `topic` / `author` that exists but has no articles (`[]`) and a `topic` / `author` that does not exist (`404`)
- Set mysterious values to variables so that it is more obvious what they are (`/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g`)

## Our Test Output

### `POST /api/topics`

status:422 client sends a body with a duplicate slug:
Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.

**UNHANDLED PROMISE REJECTION** - No `.catch` block!

### `POST /api/topics`

status:400 if request body is malformed (missing description property):
Error: expected 400 "Bad Request", got 201 "Created"

- Up to you whether you want to change this. Might be nicer to deal with in the front end if it is always there.

### `GET /api/articles`

status:200 will ignore an invalid sort_by query:
Error: expected 200 "OK", got 500 "Internal Server Error"

- You can decide whether this should be a `400` or just ignored and `200`. Be consistent though. (this definitely shouldn't cause a `500` though)

### `GET /api/articles/:article_id`

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

- Don't serve the article body on the `/api/articles` route

### `PATCH /api/articles/:article_id`

PATCH status:200s no body responds with an unmodified article:
Error: expected 200 "OK", got 400 "Bad Request"

- Up to you whether you want to change this. Just make sure you are consistent.

### `DELETE /api/articles/:article_id`

status:204 and removes the article when given a valid article_id:
Error: expected 404 "Not Found", got 400 "Bad Request"

- Check whether something has been deleted. If not, send `404`.

### `GET /api/articles/:article_id

status:404 url contains a non-existent (but potentially valid) article_id:
Error: expected 404 "Not Found", got 400 "Bad Request"

- Any number (or, numeric string) should count as a valid id. Then, we can check whether an article was found and give a `404` if not.

### `DELETE /api/articles/:article_id`

status:404 when given a non-existent article_id:
Error: expected 404 "Not Found", got 204 "No Content"

- Check how many things have been deleted. If `0` -> give `404`

### `GET /api/articles/:article_id/comments`

responds with 400 for an invalid article_id:
Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.

- **UNHANDLED PROMISE REJECTION** - No `.catch` block!

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
