module.exports = {
  root: require('path').normalize(__dirname + '/..'),
  app: {
    name: '<%= _.slugify(appname) %>'
  },
  port: 3000,
  db: 'mongodb://localhost/<%= _.slugify(appname) %>'
};