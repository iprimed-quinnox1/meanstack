var mon = require('./mongo');
var express = require('express');
var app = express();

var ct = "Content-Type";
var ct_json = "application/json";
var ct_html = "text/html";

var header = {
    	"Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    	"Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS 
		};

app.use(express.static('static'));
app.use(express.static('html'));

app.get('/', function(req, res){
	res.writeHead(200, header);
	header[ct] = ct_html;
	res.write("<a href='./products'>Product List</a>");
	res.write("<br>");
	res.write("<a href='./carts'>Cart List</a>");
    return res.end();
});

app.get('/products', function(req, res){
	res.writeHead(200, header);
	// load products
	mon.getProducts(function(data){
		console.log(data);
		header[ct] = ct_json;
		res.write(JSON.stringify(data));
		res.end(); //end the response
	});
});

app.get('/carts', function(req, res){
	res.writeHead(200, header);
	// load carts
	mon.getCarts(function(carts){
		console.log(carts);
		header[ct] = ct_json;
		res.write(JSON.stringify(carts));
		res.end(); //end the response
	});
});

app.listen(8080, function(){
	console.log("Running on 8080");
});

