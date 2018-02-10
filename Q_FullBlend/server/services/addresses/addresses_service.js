// requires..
var addressesDB = require('./addresses_db');
var httpBase = require('../base/base_service');

//express
var express = require('express');
var router = express.Router();

// load Address objects
router.post('/load', function(req, res){
	console.log("loading addresses...");
	// set the basic headers
	httpBase.setHeader(res);
	// client input - find the selector
	var selector = {};
	if(req.body.selector){
		selector = req.body.selector;
		console.log("Selector: " + JSON.stringify(selector));
	}
	// db call - fetch addresses for the given selector
	addressesDB.getAddresses(selector, {}, function(result){
		//data retrieved - send back to client.
		console.log("sending " + result);
		res.send(result); //send the response
	});
});


//save Address objects
router.post('/save', function(req, res){
	var addresses = req.body.addresses;
	console.log("saving...  array = " + JSON.stringify(addresses));
	httpBase.setHeader(res);
	addressesDB.saveAddresses(addresses, {}, function(result){
		console.log("saved " + result);
		res.send(result); //send the response
	});
});

//update address to set as default
router.post('/setdefault', function(req, res){
	var _uname = req.body.uname;
	var _aid = req.body.aid;
	
	console.log("uname:" + _uname + " :: setting " + _aid + " as default address");
	httpBase.setHeader(res);
	
	addressesDB.updateAddresses({uname:_uname}, {$set:{is_default:false}}, {multi:true}, function(result){
		addressesDB.updateAddresses({_id:_aid}, {$set:{is_default:true}}, {multi:true}, function(result){
			console.log("default address updated");
			res.send(result); //send the response
		});
	});

});

//export this router to use in our server.js
module.exports = router;
