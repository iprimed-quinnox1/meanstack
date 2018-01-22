var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var db = "todo";
var coll_todos ="todolists";
var coll_users ="users";

exports.getToDoLists = function(selector, clbk)
{
	findDocuments(url, db, coll_todos, selector, clbk);
};


exports.saveToDoLists = function(docs, clbk)
{
	saveDocuments(url, db, coll_todos, docs, clbk);
};

exports.getUsers = function(selector, clbk)
{
	findDocuments(url, db, coll_users, selector, clbk);
};


exports.saveUsers = function(docs, clbk)
{
	saveDocuments(url, db, coll_users, docs, clbk);
};







// utility functions.

function findDocuments(url, dbname, collection, selector, callback){
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

function saveDocuments(url, dbname, collection, docs, callback){
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db(dbname);
		console.log(dbname + " Database created!");
		var coll = db.collection(collection);
		console.log("saving docs : " + JSON.stringify(docs) + "\n in coll - " +collection );
		
		for(var i=0; i<docs.length; i++){
			coll.save(docs[i]);
		}
		// callback the listener
		callback({status:"success", docs:docs});
	});
}