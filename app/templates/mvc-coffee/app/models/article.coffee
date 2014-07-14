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
<% if(options.database == 'mysql' || options.database == 'postgresql'){ %>
module.exports = (sequelize, DataTypes) ->

  Article = sequelize.define 'Article',
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    text: DataTypes.STRING
<% } %>