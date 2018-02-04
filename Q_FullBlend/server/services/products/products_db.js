// requires..
var baseDB = require('../base/base_db');

//collection name
var productsCollection ="products";

exports.getProducts = function (selector, options, clbk)
{
	baseDB.findDocuments(productsCollection, selector, options, clbk);
};


exports.saveProducts = function (productDocs, options, clbk)
{
	baseDB.saveDocuments(productsCollection, productDocs, options, clbk);
};
