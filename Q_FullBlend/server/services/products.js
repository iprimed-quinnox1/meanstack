//local variables.
var ct = "Content-Type";
var ct_json = "application/json";
var ct_html = "text/html";

// requires..
var mon = require('../db/mongo');

//express
var express = require('express');
var router = express.Router();

// load Product objects
router.post('/load', function(req, res){
	console.log("loading...");
	setHeader(res);
	var selector = {};
	if(req.body.selector){
		selector = req.body.selector;
		console.log("Selector: " + JSON.stringify(selector));
	}
	getProducts(selector, function(result){
		console.log("sending " + result);
		res.send(result); //send the response
	});
});


//save Product objects
router.post('/save', function(req, res){
	var products = req.body.products;
	console.log("saving...  array = " + JSON.stringify(products));
	setHeader(res);
	saveProducts(products, function(result){
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

var coll_products ="products";

function getProducts(selector, clbk)
{
	mon.findDocuments(coll_products, selector, clbk);
};


function saveProducts(docs, clbk)
{
	mon.saveDocuments(coll_products, docs, clbk);
};
