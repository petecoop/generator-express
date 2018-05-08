<% if(options.coffee){ %>require('coffee-script/register');<% } %>

const express = require('express');
const config = require('./config/config');<% if(options.database == 'none'){ %>;<% } %><% if(options.database == 'mongodb'){ %>
const glob = require('glob');
const mongoose = require('mongoose');<% } %><% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
const db = require('./app/models');<% } %>
<% if(options.database == 'mongodb'){ %>
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

const models = glob.sync(config.root + '/app/models/*.<%= filetype %>');
models.forEach(function (model) {
  require(model);
});<% } %>
const app = express();

module.exports = require('./config/express')(app, config);
<% if(options.database == 'mysql' ||
  options.database == 'postgresql' ||
  options.database == 'sqlite'){ %>
db.sequelize
  .sync()
  .then(() => {
    if (!module.parent) {
      app.listen(config.port, () => {
        console.log('Express server listening on port ' + config.port);
      });
    }
  }).catch((e) => {
    throw new Error(e);
  });
<% } else { %>
app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});
<% } %>
