var serverPort = 10000;
var express = require('express');
var app = express();

app.get("/", function(req, res){
	res.send("Welcome!");
});

app.get("/raul", function(req, res){
	res.send("Welcome Raul!");
});

app.listen(serverPort, function(){
	console.log("Listenting on port: " + serverPort );
}); 
