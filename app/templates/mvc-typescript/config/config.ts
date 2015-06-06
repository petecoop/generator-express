var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: '<%= slugify(appname) %>'
    },
    port: 3000,<% if(options.database == 'mongodb'){ %>
    db: 'mongodb://localhost/<%= slugify(appname) %>-development'<% } %><% if(options.database == 'mysql'){ %>
    db: 'mysql://localhost/<%= slugify(appname) %>-development'<% } %><% if(options.database == 'postgresql'){ %>
    db: 'postgres://localhost/<%= slugify(appname) %>-development'<% } %><% if(options.database == 'sqlite'){ %>
    db: 'sqlite://localhost/<%= slugify(appname) %>-development',
    storage: rootPath + '/data/<%= slugify(appname) %>-development'<% } %><% if(options.database == 'rethinkdb'){ %>
    db: {db: '<%= slugify(appname) %>_development'}<% } %>
  },

  test: {
    root: rootPath,
    app: {
      name: '<%= slugify(appname) %>'
    },
    port: 3000,<% if(options.database == 'mongodb'){ %>
    db: 'mongodb://localhost/<%= slugify(appname) %>-test'<% } %><% if(options.database == 'mysql'){ %>
    db: 'mysql://localhost/<%= slugify(appname) %>-test'<% } %><% if(options.database == 'postgresql'){ %>
    db: 'postgres://localhost/<%= slugify(appname) %>-test'<% } %><% if(options.database == 'sqlite'){ %>
    db: 'sqlite://localhost/<%= slugify(appname) %>-test',
    storage: rootPath + '/data/<%= slugify(appname) %>-test'<% } %><% if(options.database == 'rethinkdb'){ %>
    db: {db: '<%= slugify(appname) %>_test'}<% } %>
  },

  production: {
    root: rootPath,
    app: {
      name: '<%= slugify(appname) %>'
    },
    port: 3000,<% if(options.database == 'mongodb'){ %>
    db: 'mongodb://localhost/<%= slugify(appname) %>-production'<% } %><% if(options.database == 'mysql'){ %>
    db: 'mysql://localhost/<%= slugify(appname) %>-production'<% } %><% if(options.database == 'sqlite'){ %>
    db: 'sqlite://localhost/<%= slugify(appname) %>-production',
    storage: rootPath + 'data/<%= slugify(appname) %>-production'<% } %><% if(options.database == 'postgresql'){ %>
    db: 'postgres://localhost/<%= slugify(appname) %>-production'<% } %><% if(options.database == 'rethinkdb'){ %>
    db: {db: '<%= slugify(appname) %>_production'}<% } %>
  }
};

module.exports = config[env];
