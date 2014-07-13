express = require 'express'

module.exports = (app, config) ->
  app.configure ->
    app.use express.compress()
    app.use express.static(config.root + '/public')
    app.set 'port', config.port
    app.set 'views', config.root + '/app/views'
    <% if (options.viewEngine == 'ejs') { %>
    app.engine 'ejs', require('ejs-locals')
    <% } %>
    app.set 'view engine', '<%= options.viewEngine %>'
    app.use express.favicon(config.root + '/public/img/favicon.ico')
    app.use express.logger('dev')
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use app.router
    app.use (req, res) ->
      res.status(404).render '404', { title: '404' }
