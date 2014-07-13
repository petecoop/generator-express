mongoose = require('mongoose')
Article  = mongoose.model('Article')


module.exports = (app) ->

  app.get '/', (req, res, next) ->
    Article.find (err, articles) ->
      return next(err) if err
      res.render 'index',
        title: 'Generator-Express MVC'
        articles: articles
