var serverPort = 9090;
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://192.168.10.26:27017"; //"mongodb://localhost:27017";

app.get("/", function(req, res){
	
	MongoClient.connect(url, function(err, client) {
		if(err){
			res.send("Problem connecting to database. - " + err);
			return;
		} else {
			var dbhandle = client.db("fullblend");
			var coll = dbhandle.collection('users');
			var userDoc = {uname: req.query.un};
			coll.insert(userDoc, function(err, result){
				if(err){
					res.write("Problem in inserting document - " + JSON.stringify(userDoc));
				} else {
					res.write("Inserted document - " + JSON.stringify(userDoc));
				}
				res.end();
				return;
			});
		}
	});
	
});

app.listen(serverPort, function(){
	console.log("Listenting on port: " + serverPort );
}); 
