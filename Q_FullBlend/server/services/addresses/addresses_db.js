// requires..
var dbBase = require('../base/base_db');

//service specific
var addressesCollection ="addresses";

exports.getAddresses = function (selector, options, clbk)
{
	dbBase.findDocuments(addressesCollection, selector, options, clbk);
};


exports.saveAddresses = function (addressDocs, options, clbk)
{
	dbBase.saveDocuments(addressesCollection, addressDocs, options, clbk);
};


exports.updateAddresses = function (selector, updates, options, clbk)
{
	dbBase.updateDocuments(addressesCollection, selector, updates, options, clbk);
};