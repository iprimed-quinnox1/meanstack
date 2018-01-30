// requires..
var mon = require('../db/mongo');
var httpBase = require('./http-base');

//express
var express = require('express');
var router = express.Router();

// load Address objects
router.post('/load', function(req, res){
	console.log("loading...");
	httpBase.setHeader(res);
	var selector = {};
	if(req.body.selector){
		selector = req.body.selector;
		console.log("Selector: " + JSON.stringify(selector));
	}
	getAddresses(selector, function(result){
		console.log("sending " + result);
		res.send(result); //send the response
	});
});


//save Address objects
router.post('/save', function(req, res){
	var addresses = req.body.addresses;
	console.log("saving...  array = " + JSON.stringify(addresses));
	httpBase.setHeader(res);
	saveAddresses(addresses, function(result){
		console.log("saved " + result);
		res.send(result); //send the response
	});
});

//save Address objects
router.post('/setdefault', function(req, res){
	var _uname = req.body.uname;
	var _aid = req.body.aid;
	
	console.log("uname:" + _uname + " :: setting " + _aid + " as default address");
	httpBase.setHeader(res);
	
	updateAddresses({uname:_uname}, {$set:{is_default:false}}, {multi:true}, function(result){
		updateAddresses({_id:_aid}, {$set:{is_default:true}}, {multi:true}, function(result){
			console.log("default address updated");
			res.send(result); //send the response
		});
	});
	/*
	getAddresses({'uname':uname}, function(addresses){
		if(addresses && addresses.length > 0){
			for(var i=0; i<addresses.length; i++){
				if(addresses[i]._id == aid){
					addresses[i].is_default = true;
				} else {
					addresses[i].is_default = false;
				}
			}
			saveAddresses(addresses, function(result){
				console.log("default address updated");
				res.send(result); //send the response
			});

		}
	});
	*/

});

//export this router to use in our server.js
module.exports = router;

var coll_addresses ="addresses";

function getAddresses(selector, clbk)
{
	mon.findDocuments(coll_addresses, selector, clbk);
};


function saveAddresses(docs, clbk)
{
	mon.saveDocuments(coll_addresses, docs, clbk);
};


function updateAddresses(selector, updates, options, clbk)
{
	mon.updateDocuments(coll_addresses, selector, updates, options, clbk);
};