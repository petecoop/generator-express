var express = require('express'),
  router = express.Router(),<% if(options.viewEngine == 'marko'){ %>
  marko = require('marko'),<% } %><% if(options.database == 'mongodb'){ %>
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');<% } %><% if(options.database == 'mysql' || options.database == 'postgresql'  || options.database == 'sqlite'){ %>
  db = require('../models');<% } %><% if(options.database == 'none'){ %>
  Article = require('../models/article');<% } %><% if(options.database == 'rethinkdb'){ %>
  models = require('../models'),
  Article = models.Article;<% } %>

// Register the 'articles' path, All router items defined below will start with /articles.
module.exports = function (app) {
  app.use('/articles', router);
};
<% if(options.viewEngine == 'marko'){ %>
var indexTemplate = marko.load(require.resolve('../views/articles/list.marko'));<% } %>
router.get('/', function (req, res, next) {<% if(options.database == 'mongodb'){ %>
  Article.find(function (err, articles) {
    if (err) return next(err);<% } %><% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
  db.Article.findAll().then(function (articles) {<% } %><% if(options.database == 'rethinkdb'){ %>
  Article.run().then(function (articles) {<% } %><% if(options.database == 'none'){ %>
  var articles = [new Article(), new Article()];<% } %><% if(options.viewEngine == 'marko'){ %>
    indexTemplate.render({
      $global: {locals: req.app.locals},
      title: 'Articles',
      articles: articles
    }, res);<% } else { %>
    res.render('articles/list', {
      title: 'Articles',
      articles: articles
    });<% } %><% if(options.database !== 'none'){ %>
  });<% } %>
});

<% if(options.viewEngine == 'marko'){ %>
var indexTemplate = marko.load(require.resolve('../views/articles/view.marko'));<% } %>
router.get('/:articleId', function (req, res, next) {<% if(options.database == 'mongodb'){ %>
  Article.findOne({ '_id':  req.params.articleId }, function (err, article) {
    if (err) return next(err);<% } %>
    <% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
  db.Article.findById(req.params.articleId).then(function (article) {<% } %><% if(options.database == 'rethinkdb'){ %>
  Article.filter(r.row('id').eq(req.params.articleId)).run().then(function (article) {<% } %><% if(options.database == 'none'){ %>
  var articles = [new Article(), new Article()];<% } %><% if(options.viewEngine == 'marko'){ %>
    indexTemplate.render({
      $global: {locals: req.app.locals},
      title: article.title,
      article: article
    }, res);<% } else { %>
    res.render('articles/view', {
      title: article.title,
      article: article
    });<% } %><% if(options.database !== 'none'){ %>
  });<% } %>
});
