express  = require 'express'
router = express.Router()<% if(options.viewEngine == 'marko'){ %>
marko = require 'marko'<% } %><% if(options.database == 'mongodb'){ %>
mongoose = require 'mongoose'
Article  = mongoose.model 'Article'<% } %><% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
db = require '../models'<% } %><% if(options.database == 'rethinkdb'){ %>
models = require('../models')
Article = models.Article<% } %>

// Register the 'articles' path, All router items defined below will start with /articles.
module.exports = (app) ->
  app.use '/articles', router

<% if(options.viewEngine == 'marko'){ %>
indexTemplate = marko.load require.resolve '../views/list.marko'<% } %>
router.get '/', (req, res, next) -><% if(options.database == 'mongodb'){ %>
  Article.find (err, articles) ->
    return next(err) if err<% } if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
router.get '/', (req, res) ->
  db.Article.findAll().then (articles) -><% } %><% if(options.database == 'rethinkdb'){ %>
  Article.run().then (articles) -><% } %><% if(options.viewEngine == 'marko'){ %>
    indexTemplate.render
      $global: locals: req.app.locals
      title: 'Articles'
      articles: articles
    , res<% } else { %>
    res.render 'index',
      title: 'Articles'
      articles: articles<% } %>

<% if(options.viewEngine == 'marko'){ %>
indexTemplate = marko.load require.resolve '../views/view.marko'<% } %>
router.get '/:articleId', (req, res, next) -><% if(options.database == 'mongodb'){ %>
  Article.findById req.params.articleId,  (err, article) ->
    return next(err) if err<% } if(options.database == 'mysql'  || options.database == 'postgresql' || options.database == 'sqlite'){ %>
  db.Article.findById(req.params.articleId).then((article) -> <% } %><% if(options.database == 'rethinkdb'){ %>
  Article.get(req.params.articleId).run().then((article) -> <% } %><% if(options.database == 'none'){ %>
  var article = new Article();<% } %><% if(options.viewEngine == 'marko'){ %>
    indexTemplate.render
      $global: {locals: req.app.locals},
      title: article.title,
      article: article
    , res<% } else { %>
    res.render 'articles/view',
      title: article.title
      article: article
    <% } %><% if(options.database !== 'none'){ %>
  <% } %>
