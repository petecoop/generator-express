# Example model
<% if(options.database == 'mongodb'){ %>
mongoose = require 'mongoose'
Schema   = mongoose.Schema

ArticleSchema = new Schema(
  title: String
  url: String
  text: String
)

ArticleSchema.virtual('date')
  .get (-> this._id.getTimestamp())

mongoose.model 'Article', ArticleSchema<% } %>
<% if(options.database == 'mysql' || options.database == 'postgresql' || options.database == 'sqlite'){ %>
module.exports = (sequelize, DataTypes) ->

  Article = sequelize.define 'Article',
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    text: DataTypes.STRING
  ,
    classMethods:
      associate: (models) ->
        # example on how to add relations
        # Article.hasMany models.Comments
<% } %><% if(options.database == 'rethinkdb'){%>
thinky = require('../../config/thinky')
r = thinky.r
type = thinky.type

Article = thinky.createModel 'Article',
  title: String
  url: String
  text: String

module.exports = Article

# example on how to add relations
# Comment = require('./comment')
# Article.hasMany(Comment, 'comments', 'id', 'article_id')
<% } %>
