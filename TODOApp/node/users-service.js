//local variables.
var ct = "Content-Type";
var ct_json = "application/json";
var ct_html = "text/html";

// requires..
var mon = require('./mongo');

//express
var express = require('express');
var router = express.Router();

// load todoLists objects
router.post('/load', function(req, res){
	console.log("loading...");
	setHeader(res);
	var selector = {};
	if(req.body.selector){
		selector = req.body.selector;
		console.log("Selector: " + JSON.stringify(selector));
	}
	mon.getUsers(selector, function(result){
		console.log("sending " + result);
		res.send(result); //send the response
	});
});


//save todoLists objects
router.post('/save', function(req, res){
	var users = req.body.users;
	console.log("saving...  array = " + JSON.stringify(users));
	setHeader(res);
	mon.saveUsers(users, function(result){
		console.log("saved " + result);
		res.send(result); //send the response
	});
});


//export this router to use in our server.js
module.exports = router;


//utility to set headers with JSON.
function setHeader(res){
	var header = {
	    	ct: ct_json,
			"Access-Control-Allow-Origin" : "*", // Required for CORS support to work
	    	"Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS 
			};
	res.set(header);
	return header;

}
