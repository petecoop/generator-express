<% if(options.coffee){ %>require('coffee-script/register');<% } %>

var express = require('express'),
  config = require('./config/config')<% if(options.database == 'none'){ %>;<% } %><% if(options.database == 'mongodb'){ %>,
  glob = require('glob'),
  mongoose = require('mongoose');<% } %><% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>,
  db = require('./app/models');<% } %>
<% if(options.database == 'mongodb'){ %>
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.<%= filetype %>');
models.forEach(function (model) {
  require(model);
});<% } %>
var app = express();

require('./config/express')(app, config);
<% if(options.database == 'mysql' ||
  options.database == 'postgresql' ||
  options.database == 'sqlite'){ %>
db.sequelize
  .sync()
  .then(function () {
    app.listen(config.port, function () {
      console.log('Express server listening on port ' + config.port);
    });
  }).catch(function (e) {
    throw new Error(e);
  });
<% } else { %>
app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
<% } %>
