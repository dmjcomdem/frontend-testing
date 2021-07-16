/* eslint no-param-reassign: ["error", { "props": false }] */

const _ = require('lodash');

module.exports = (app, data) => {
  app.get('/', { name: 'root' }, (req, reply) => {
    reply.view('index');
  });

  app
    .get('/articles', { name: 'articles' }, (req, reply) => {
      const { articles, categories } = data;
      reply.view('articles/index', { articles, categories });
    })
    .get('/articles/new', { name: 'newArticle' }, (req, reply) => {
      const { categories } = data;
      reply.view('articles/new', { categories });
    })
    .post('/articles', (req, reply) => {
      const article = {
        ...req.body.article,
        id: _.uniqueId(),
      };
      data.articles.push(article);
      reply.redirect(app.reverse('articles'));
    })
    .get('/articles/:id/edit', { name: 'editArticle' }, (req, reply) => {
      const { articles, categories } = data;
      const { id } = req.params;
      const article = _.find(articles, ['id', id]);
      reply.view('articles/edit', { article, categories });
    })
    .patch('/articles/:id', { name: 'article' }, (req, reply) => {
      const { id } = req.params;
      const article = _.find(data.articles, ['id', id]);
      _.assign(article, req.body.article);
      reply.redirect(app.reverse('articles'));
    })
    .delete('/articles/:id', (req, reply) => {
      const { id } = req.params;
      data.articles = data.articles.filter((article) => id !== article.id);
      reply.redirect(app.reverse('articles'));
    });
};
