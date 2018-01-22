// requires
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

//express logic
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Link: static HTML/angular pages 
app.use(express.static("../angular"));

// Link : todos service
var todos = require('./chat-service.js');
app.use('/chat', todos);

//Link : users service
var todos = require('./users-service.js');
app.use('/users', todos);

// web server 
app.listen(9090, function(){
	console.log("Listenting on 9090.")
}); 

