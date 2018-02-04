
// Angular JS

// load the app module.
var app = angular.module("app", ['myDraggable']);

// controller
var prodsCtrl = app.controller("prods-ctrl", prodsCtrlCallback);

var prodEditCtrl = app.controller("prod-edit-ctrl", prodEditCtrlCallback);

// controller callback
function prodsCtrlCallback($scope, $http){
	$scope.listStyle = 'card';
	$scope.activeU = UserService.geActiveUser();
	$scope.products = [];
		
	$scope.edit = function(id){
		var loc = "edit_product.html#!search?";
		var qp="";
		if(id){
			qp = qp + "pid=" + id;
		}
		window.location = loc + encodeURI(qp);
	}
	
	$scope.addToCart = function(id, name){
		var url_addToCart = "orders/addToCart";
		//alert(appBase.getRemoteURL(url_addToCart));
		$http.post(appBase.getRemoteURL(url_addToCart), {'pid':id, 'uid':$scope.activeU.uname}).then(
		function(result){
			alert("Product '" + name +"' added to cart");
		},
		function(error){
			alert("Error adding product to cart");
			//clbk();
		});
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
	
	$scope.isAdmin = function isAdmin(){
		return false;
	}
	
	
	// load once;
	$scope.reload();
	
}

function prodEditCtrlCallback($scope, $http, $location){
	$scope.editing = false;
	var prod = new Product();
	//alert(prod._id);
	
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
				//base properties.
				prod._id = data[0]._id;
				prod.name = data[0].name;
				prod.photo = data[0].photo;
				prod.description = data[0].description;
				prod.unitprice = data[0].unitprice;
				// attributes
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
			$scope.editingAttrib = {"type":"text"};
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
	
	// upload file.
	$scope.uploadFile = function(ele, clbk) {
		var files = ele.files;
		//alert("uploading files " + files);
		var url_upload = "upload/img";
	    var fd = new FormData();
	    //Take the first selected file
	    fd.append("filetoupload", files[0]);

	    $http.post(appBase.getRemoteURL(url_upload), fd, {
	        withCredentials: true,
	        headers: {'Content-Type': undefined },
	        transformRequest: angular.identity
	    }).then(
	    	function(result){
	    		if(result.data.success){
	    			//alert("Saved as - " + result.data.file);
	    			clbk(result);
	    		}
	    	},
	    	function(error){
	    		clbk();
	    	}
	    );

	};
	
	$scope.uploadForAttrib = function(ele){
		$scope.uploadFile(ele, function(result){
			if(result){
				$scope.editingAttrib.value = result.data.file;
			}
		});
	}
	
	$scope.changePhoto = function(ele){
		$scope.uploadFile(ele, function(result){
			if(result){
				$scope.product.photo = result.data.file;
				$editingPhoto = false;
			}
		});
	}
}

function Product(id, name, attribs){
	this._id = "prod_" + (Math.random() * new Date().getTime());
	if(id){
		this._id = id;
	}
	
	this.name = this._id;
	if(name){
		this.name = name;
	}
	
	this.photo = "no_photo.jpg"
	this.description = "No Description";
	this.unitprice = 0;
	
	this.attribs = new Array();
	if(attribs){
		this.attribs = attribs;
	}
}


