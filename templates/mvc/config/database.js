var MongoClient = require('mongodb').MongoClient,
	config = require('./config');

function Db(){}

Db.prototype.connect = function(callback){
	MongoClient.connect(config.db, function(err, db){
		if(err){
			console.dir(err);
		}else{
			callback(db);
		}
	});
};

Db.prototype.getCollection = function(collection_name, callback){
	if(collection_name){
		this.connect(function(db){
			db.collection(collection_name, function(err, collection){
				if(err){
					console.dir(err);
				}else{
					callback(collection);
				}
			});
		});
	}
};

module.exports = new Db();