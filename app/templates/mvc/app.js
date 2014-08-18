var express = require('express'),
  config = require('./config/config')<% if(options.database == 'none'){ %>;<% } %><% if(options.database == 'mongodb'){ %>,
  fs = require('fs'),
  mongoose = require('mongoose');<% } %><% if(options.database == 'mysql' || options.database == 'postgresql'){ %>,
  db = require('./app/models');<% } %>
<% if(options.database == 'mongodb'){ %>
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/\.js$/.test(file)) {
    require(modelsPath + '/' + file);
  }
});<% } %>
var app = express();

require('./config/express')(app, config);
<% if(options.database == 'mysql' || options.database == 'postgresql'){ %>
db.sequelize
  .sync()
  .complete(function (err) {
    if(err){
      throw err[0];
    }else{
      app.listen(config.port);
    }
  });
<% } else { %>
app.listen(config.port);
<% } %>
