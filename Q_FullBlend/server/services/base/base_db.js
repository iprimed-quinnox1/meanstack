var url = "mongodb://localhost:27017";
var dbname = "fullblend";

var MongoClient = require('mongodb').MongoClient;

// utility functions.

// to find documents against given selector
exports.findDocuments = function (collection, selector, options, callback){
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db(dbname);
		console.log("Database created!");
		var coll = db.collection(collection);
		coll.find(selector, options).toArray(function(err, res){
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

// to save multiple documents
exports.saveDocuments = function (collection, docs, options, callback){
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db(dbname);
		console.log(dbname + " Database created!");
		var coll = db.collection(collection);
		console.log("saving docs : " + JSON.stringify(docs) + "\n in coll - " + collection );
		
		for(var i=0; i<docs.length; i++){
			coll.save(docs[i], options);
		}
		// callback the listener
		callback({status:"success", docs:docs});
	});
}

// to update documents against given selector 
exports.updateDocuments = function (collection, selector, updates, options, callback){
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


//to remove documents against given selector
exports.removeDocuments = function (collection, selector, options, callback){
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db(dbname);
		console.log("Database created!");
		var coll = db.collection(collection);
		coll.remove(selector, options, function(err, res){
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
