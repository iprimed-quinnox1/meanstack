
// Angular JS

// load the app module.
var app = angular.module("app", ['myDraggable']);

// controller
var prodsCtrl = app.controller("prods-ctrl", prodsCtrlCallback);

var prodEditCtrl = app.controller("prod-edit-ctrl", prodEditCtrlCallback);

// controller callback
function prodsCtrlCallback($scope, $http){
	$scope.products = [];
		
	$scope.edit = function(id){
		var loc = "edit_product.html#!search?";
		var qp="";
		if(id){
			qp = qp + "pid=" + id;
		}
		window.location = loc + encodeURI(qp);
	}
	
	$scope.reload = function(){
		var url_load = "products/load";
		//alert(appBase.getRemoteURL(url_load));
		$http.post(appBase.getRemoteURL(url_load), {'selector':{}}).then(
		function(result){
			data = result.data;
			//alert(data);
			$scope.products = data;
		},
		function(error){
			alert("Error loading product lists");
			//clbk();
		});
	}
	
	// load once;
	$scope.reload();
	
}

function prodEditCtrlCallback($scope, $http, $location){
	$scope.editing = false;
	var prod = new Product();
	var params = $location.search();
	
	//alert(JSON.stringify(prod));
	//alert(JSON.stringify(params));
	
	if(params.pid){
		var url_load = "products/load";
		//alert(appBase.getRemoteURL(url_load));
		$http.post(appBase.getRemoteURL(url_load), {'selector':{'_id': params.pid}}).then(
		function(result){
			data = result.data;
			if(data && data.length >0){
				prod._id = data[0]._id;
				prod.name = data[0].name;
				if(data[0].attribs){
					prod.attribs = data[0].attribs;
				}
				//alert(JSON.stringify(prod));
				
				// found the product data to edit;
				$scope.editing = true;
			}
		},
		function(error){
			alert("Error loading product lists");
			//clbk();
		});
	}
	
	$scope.product = prod;
	$scope.editingAttrib = null;
	var editingAttribIdx = -1;
	
	$scope.save = function(){
		var url_save = "products/save";
		var products = [$scope.product];

		//alert(appBase.getRemoteURL(url_save));
		$http.post(appBase.getRemoteURL(url_save), { 'products': products}).then(
			function(result){
				alert("saved product: " + products[0].name);
				$scope.editing = true;
			},
			function (error) {
		        alert("error: " + JSON.stringify(error));
		    }
		);
	}
	
	$scope.editAttrib = function(attr){
		//alert(attr);
		
		if(attr){
			editingAttribIdx = $scope.product.attribs.indexOf(attr);
			//alert(editingAttribIdx);
			$scope.editingAttrib = angular.copy(attr);
			//alert(JSON.stringify($scope.editingAttrib));
		} else {
			$scope.editingAttrib = {};
		}
	}
	
	$scope.saveAttrib = function(){
		//alert("saving attribute " + JSON.stringify($scope.editingAttrib) + " to " + JSON.stringify($scope.product.attribs));
		if(editingAttribIdx < 0){
			$scope.product.attribs.push($scope.editingAttrib);
		} else {
			$scope.product.attribs.splice(editingAttribIdx, 1, $scope.editingAttrib);
		}
		//alert("saved: " + JSON.stringify($scope.editingAttrib) + " as attribute no: " + $scope.product.attribs.length);
		$scope.save();
		
		$scope.resetEditAttrib();
	}
	
	$scope.resetEditAttrib = function(){
		editingAttribIdx = -1;
		$scope.editingAttrib = null;
	}
}

function Product(id, name, attribs){
	this._id = id;
	this.name = name;
	this.attribs = new Array();
	if(attribs){
		this.attribs = attribs;
	}
}


