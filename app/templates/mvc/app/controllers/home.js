var express = require('express'),
  router = express.Router(),<% if(options.database == 'mongodb'){ %>
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');<% } %><% if(options.database == 'mysql' || options.database == 'postgresql'){ %>
  db = require('../models');<% } %><% if(options.database == 'none'){ %>
  Article = require('../models/article');<% } %>

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
<% if(options.database == 'mongodb'){ %>
  Article.find(function (err, articles) {
    if (err) return next(err);<% } %><% if(options.database == 'mysql' || options.database == 'postgresql'){ %>
  db.Article.findAll().success(function (articles) {<% } %><% if(options.database == 'none'){ %>
  var articles = [new Article(), new Article()];<% } %>
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });<% if(options.database !== 'none'){ %>
  });<% } %>
});
