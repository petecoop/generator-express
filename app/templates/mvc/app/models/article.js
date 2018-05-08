// Example model
<% if(options.database == 'mongodb'){ %>
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  url: String,
  text: String
});

ArticleSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Article', ArticleSchema);<% } %>
<% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
module.exports = (sequelize, DataTypes) => {

  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return Article;
};
<% } %><% if(options.database == 'none'){ %>
function Article (opts) {
  if(!opts) opts = {};
  this.title = opts.title || '';
  this.url = opts.url || '';
  this.text = opts.text || '';
}

module.exports = Article;
<% } %><% if(options.database == 'rethinkdb'){%>
const thinky = require('../../config/thinky');
const r = thinky.r;
const type = thinky.type;

const Article = thinky.createModel('Article', {
  title: String,
  url: String,
  text: String
});

module.exports = Article;

// example on how to add relations
// var Comment = require('./comment');
// Article.hasMany(Comment, 'comments', 'id', 'article_id');
<% } %>
