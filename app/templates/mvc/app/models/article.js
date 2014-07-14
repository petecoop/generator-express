// Example model
<% if(options.database == 'mongodb'){ %>
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: String,
  url: String,
  text: String
});

ArticleSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Article', ArticleSchema);<% } %>
<% if(options.database == 'mysql' || options.database == 'postgresql'){ %>
module.exports = function (sequelize, DataTypes) {

  var Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    text: DataTypes.STRING
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
<% } %>
