var express = require('express'),
  router = express.Router(),<% if(options.database == 'mongodb'){ %>
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');<% } %><% if(options.database == 'mysql' || options.database == 'postgresql'  || options.database == 'sqlite'){ %>
  db = require('../models');<% } %><% if(options.database == 'none'){ %>
  Article = require('../models/article');<% } %><% if(options.database == 'rethinkdb'){ %>
  models = require('../models'),
  Article = models.Article;<% } %>

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {<% if(options.database == 'mongodb'){ %>
  Article.find(function (err, articles) {
    if (err) return next(err);<% } %><% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
  db.Article.findAll().then(function (articles) {<% } %><% if(options.database == 'rethinkdb'){ %>
  Article.run().then(function (articles) {<% } %><% if(options.database == 'none'){ %>
  var articles = [new Article(), new Article()];<% if(options.viewEngine == 'marko'){ %>
  res.marko(require('../views/index'), {
    $global: {locals: req.app.locals},
    title: 'Generator-Express MVC',
    articles: articles
  });<% } else { %>
  res.render('index', {
    title: 'Generator-Express MVC',
    articles: articles
  });<% } %><% } else { %><% if(options.viewEngine == 'marko'){ %>
    res.marko(require('../views/index'), {
      $global: {locals: req.app.locals},
      title: 'Generator-Express MVC',
      articles: articles
    });<% } else { %>
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });<% } %>
  });<% } %>
});
