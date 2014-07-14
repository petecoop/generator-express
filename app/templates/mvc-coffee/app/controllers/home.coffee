express  = require 'express'
router = express.Router()<% if(options.database == 'mongodb'){ %>
mongoose = require 'mongoose'
Article  = mongoose.model 'Article'<% } %><% if(options.database == 'mysql' || options.database == 'postgresql'){ %>
db = require '../models'<% } %>

module.exports = (app) ->
  app.use '/', router

router.get '/', (req, res, next) ->
<% if(options.database == 'mongodb'){ %>
  Article.find (err, articles) ->
    return next(err) if err<% } %><% if(options.database == 'mysql' || options.database == 'postgresql'){ %>
  db.Article.findAll().success (articles) -><% } %>
    res.render 'index',
      title: 'Generator-Express MVC'
      articles: articles
