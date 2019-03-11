exports.up = function (knex, Promise) {
  console.log('creating articles table');
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable
      .string('title')
      .notNullable()
      .unique();
    articlesTable.string('body', 999999).notNullable();
    articlesTable.integer('votes').defaultTo(0);
    articlesTable
      .string('topic')
      .references('slug')
      .inTable('topics');
    articlesTable
      .string('author')
      .references('username')
      .inTable('users');
    articlesTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  console.log('removing articles table');
  return knex.schema.dropTable('articles');
};
