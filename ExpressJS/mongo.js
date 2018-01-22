var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

exports.getCarts = function(clbk)
{
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db("mycart");
		console.log("Database created!");
		var coll = db.collection("carts");
		coll.find().toArray(function(err, res){
			if(err){
				console.log("Error in find.");
			}
			console.log(res);
			client.close();
			// callback the listener
			clbk(res);
		});
	});
};

exports.getProducts = function(clbk)
{
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db("mycart");
		console.log("Database created!");
		var coll = db.collection("products");
		coll.find({}, {"_id":0, "name":1}).toArray(function(err, res){
			if(err){
				console.log("Error in find.");
			}
			console.log(res);
			client.close();
			// callback the listener
			clbk(res);
		});
	});
};



