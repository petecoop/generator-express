// Example model

var MongoClient = require('mongodb').MongoClient,
  Db = require('../../config/database');

module.exports = new Article();

function Article(){
  this.collection_name = "articles";
}

Article.prototype.findAll = function(callback){
  Db.getCollection(this.collection_name, function(collection){
    collection.find().toArray(function(err, items){
      items.forEach(function(item){
        item.date = getDate(item._id);
      });
      callback(items);
    });
  });
};
