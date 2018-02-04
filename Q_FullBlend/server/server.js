// requires
var serverPort = 8080;

var bodyParser = require('body-parser');

var express = require('express');
var app = express();

//express logic
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Link: static HTML/angular pages 
app.use(express.static("../client"));

// Link : products service
var productsService = require('./services/products/products_service.js');
app.use('/products', productsService);

//Link : addresses service
var addressesService = require('./services/addresses/addresses_service.js');
app.use('/addresses', addressesService);

//Link : upload service
var uploadService = require('./services/common/upload_service.js');
app.use('/upload', uploadService);

//Link : users service
var usersService = require('./services/users/users_service.js');
app.use('/users', usersService);

//Link : users service
var ordersService = require('./services/orders/orders_service.js');
app.use('/orders', ordersService);

// web server 
app.listen(serverPort, function(){
	console.log("Listenting on port: " + serverPort )
}); 

