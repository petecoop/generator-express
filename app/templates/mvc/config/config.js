var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: '<%= _.slugify(appname) %>'
    },
    port: 3000,
    db: 'mongodb://localhost/<%= _.slugify(appname) %>-development'
  },

  test: {
    root: rootPath,
    app: {
      name: '<%= _.slugify(appname) %>'
    },
    port: 3000,
    db: 'mongodb://localhost/<%= _.slugify(appname) %>-test'
  },

  production: {
    root: rootPath,
    app: {
      name: '<%= _.slugify(appname) %>'
    },
    port: 3000,
    db: 'mongodb://localhost/<%= _.slugify(appname) %>-production'
  }
};

module.exports = config[env];
