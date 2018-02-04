// requires..
var ordersDB = require('./orders_db');
var httpBase = require('../base/base_service');

//express
var express = require('express');
var router = express.Router();

// load Order objects
router.post('/load', function(req, res){
	console.log("loading orders...");
	httpBase.setHeader(res);
	var selector = {};
	if(req.body.selector){
		selector = req.body.selector;
		console.log("Selector: " + JSON.stringify(selector));
	}
	ordersDB.getOrders(selector, {}, function(result){
		console.log("sending " + result);
		res.send(result); //send the response
	});
});


//save Order objects
router.post('/save', function(req, res){
	var orders = req.body.orders;
	console.log("saving orders...  array = " + JSON.stringify(orders));
	httpBase.setHeader(res);
	ordersDB.saveOrders(orders, {}, function(result){
		console.log("saved " + result);
		res.send(result); //send the response
	});
});

//add product to Cart
router.post('/addToCart', function(req, res){
	var _pid = req.body.pid;
	var _uid = req.body.uid;
	
	console.log("adding product - '" +  _pid + "' to cart for user - '" + _uid + "'");
	httpBase.setHeader(res);
	
	ordersDB.getOrders({"uid": _uid, "pid": _pid, "status" : OrderStatus.INCART}, function(results){
		
	});
	
	ordersDB.updateOrders({uname:_uname}, {$set:{is_default:false}}, {multi:true}, function(result){
		ordersDB.updateOrders({_id:_aid}, {$set:{is_default:true}}, {multi:true}, function(result){
			console.log("default address updated");
			res.send(result); //send the response
		});
	});

});


//export this router to use in our server.js
module.exports = router;
