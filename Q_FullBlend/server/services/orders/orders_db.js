// requires..
var baseDB = require('../base/base_db');

var ordersCollection ="orders";

exports.OrderStatus={
	"INCART": "in-cart",
	"CHECKEDOUT": "checked-out",
	"SHIPPED": "shipped",
	"OUT_FOR_DELIVERY": "out-for-delivery",
	"DELIVERED": "delivered",
	"RETURN_INITIATED": "return-initiated",
};
/*
 	{
 		_id:"",
 		pid: "",
 		uid:"",
 		status:"in-cart",
 		qty:0,
 		price:0,
 		address:"",
 	}
 
 */


exports.getOrders = function (selector, options, clbk)
{
	baseDB.findDocuments(ordersCollection, selector, options, clbk);
};


exports.saveOrders = function (docs, options, clbk)
{
	baseDB.saveDocuments(ordersCollection, docs, options, clbk);
};


exports.updateOrders = function (selector, updates, options, clbk)
{
	baseDB.updateDocuments(ordersCollection, selector, updates, options, clbk);
};