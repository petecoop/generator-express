express  = require 'express'
router = express.Router()<% if(options.database == 'mongodb'){ %>
mongoose = require 'mongoose'
Article  = mongoose.model 'Article'<% } %><% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
db = require '../models'<% } %><% if(options.database == 'rethinkdb'){ %>
models = require('../models')
Article = models.Article<% } %>

module.exports = (app) ->
  app.use '/', router

router.get '/', (req, res, next) -><% if(options.database == 'mongodb'){ %>
  Article.find (err, articles) ->
    return next(err) if err<% } if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
router.get '/', (req, res) ->
  db.Article.findAll().then (articles) -><% } %><% if(options.database == 'rethinkdb'){ %>
  Article.run().then (articles) -><% } %><% if(options.database == 'none'){ %><% if(options.viewEngine == 'marko'){ %>
  res.marko require('../views/index'),
    $global: locals: req.app.locals
    title: 'Generator-Express MVC'<% } else { %>
  res.render 'index',
    title: 'Generator-Express MVC'<% } %><% } else { %><% if(options.viewEngine == 'marko'){ %>
    res.marko require('../views/index'),
      $global: locals: req.app.locals
      title: 'Generator-Express MVC'
      articles: articles<% } else { %>
    res.render 'index',
      title: 'Generator-Express MVC'
      articles: articles<% } %><% } %>
