var url = "mongodb://localhost:27017";
var dbname = "fullblend";

var MongoClient = require('mongodb').MongoClient;
// utility functions.

exports.findDocuments = function findDocuments(collection, selector, callback){
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db(dbname);
		console.log("Database created!");
		var coll = db.collection(collection);
		coll.find(selector).toArray(function(err, res){
			if(err){
				console.log("Error in find.");
			}
			console.log("found: " + res);
			client.close();
			// callback the listener
			callback(res);
		});
	});
}

exports.saveDocuments = function saveDocuments(collection, docs, callback){
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db(dbname);
		console.log(dbname + " Database created!");
		var coll = db.collection(collection);
		console.log("saving docs : " + JSON.stringify(docs) + "\n in coll - " + collection );
		
		for(var i=0; i<docs.length; i++){
			coll.save(docs[i]);
		}
		// callback the listener
		callback({status:"success", docs:docs});
	});
}

exports.updateDocuments = function updateDocuments(collection, selector, updates, options, callback){
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db(dbname);
		console.log(dbname + " Database created!");
		var coll = db.collection(collection);
		console.log("updating " + JSON.stringify(updates) + " in docs for selector : " + JSON.stringify(selector) + "\n in coll - " + collection );
		
		coll.update(selector, updates, options);
		// callback the listener
		callback({status:"success"});
	});
}
