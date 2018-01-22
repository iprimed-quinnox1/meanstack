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
var todos = require('./todos-service.js');
app.use('/todos', todos);

//Link : users service
var users = require('./users-service.js');
app.use('/users', users);

// web server 
app.listen(8080, function(){
	console.log("Listenting on 8080.")
}); 

