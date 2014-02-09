var mongoose = require('mongoose'),
  Article = mongoose.model('Article');


module.exports = function (app) {

  app.get('/', function (req, res, next) {
    Article.find(function (err, articles) {
      if (err) return next(err);
      res.render('index', {
        title: 'Generator-Express MVC',
        articles: articles
      });
    });
  });

};