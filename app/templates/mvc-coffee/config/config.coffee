path     = require 'path'
rootPath = path.normalize __dirname + '/..'
env      = process.env.NODE_ENV || 'development'

config =
  development:
    root: rootPath
    app:
      name: '<%= _.slugify(appname) %>'
    port: 3000<% if(options.database == 'mongodb'){ %>
    db: 'mongodb://localhost/<%= _.slugify(appname) %>-development'
    <% } %><% if(options.database == 'mysql'){ %>
    db: 'mysql://localhost/<%= _.slugify(appname) %>-development'
    <% } %><% if(options.database == 'postgresql'){ %>
    db: 'postgres://localhost/<%= _.slugify(appname) %>-development'
    <% } %>

  test:
    root: rootPath
    app:
      name: '<%= _.slugify(appname) %>'
    port: 3000<% if(options.database == 'mongodb'){ %>
    db: 'mongodb://localhost/<%= _.slugify(appname) %>-test'
    <% } %><% if(options.database == 'mysql'){ %>
    db: 'mysql://localhost/<%= _.slugify(appname) %>-test'
    <% } %><% if(options.database == 'postgresql'){ %>
    db: 'postgres://localhost/<%= _.slugify(appname) %>-test'
    <% } %>

  production:
    root: rootPath
    app:
      name: '<%= _.slugify(appname) %>'
    port: 3000<% if(options.database == 'mongodb'){ %>
    db: 'mongodb://localhost/<%= _.slugify(appname) %>-production'
    <% } %><% if(options.database == 'mysql'){ %>
    db: 'mysql://localhost/<%= _.slugify(appname) %>-production'
    <% } %><% if(options.database == 'postgresql'){ %>
    db: 'postgres://localhost/<%= _.slugify(appname) %>-production'
    <% } %>

module.exports = config[env]
