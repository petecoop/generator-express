const express = require('express');
const router = express.Router();<% if(options.database == 'mongodb'){ %>
const mongoose = require('mongoose');
const Article = mongoose.model('Article');<% } %><% if(options.database == 'mysql' || options.database == 'postgresql'  || options.database == 'sqlite'){ %>
const db = require('../models');<% } %><% if(options.database == 'none'){ %>
const Article = require('../models/article');<% } %><% if(options.database == 'rethinkdb'){ %>
const models = require('../models');
const Article = models.Article;<% } %>

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {<% if(options.database == 'mongodb'){ %>
  Article.find((err, articles) => {
    if (err) return next(err);<% } %><% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
  db.Article.findAll().then((articles) => {<% } %><% if(options.database == 'rethinkdb'){ %>
  Article.run().then((articles) => {<% } %><% if(options.database == 'none'){ %>
  const articles = [new Article(), new Article()];<% if(options.viewEngine == 'marko'){ %>
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
