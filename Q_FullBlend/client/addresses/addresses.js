
// Angular JS

// load the app module.
var app = angular.module("app", ['myDraggable']);

// controllers
app.controller("addresses-ctrl", addressesController);

app.controller("address-edit-ctrl", addressEditController);

// controller callback
function addressesController($scope, $http){
	$scope.uname = "";
	$scope.addresses = [];
		
	$scope.edit = function(uname, id){
		var loc = "edit_address.html#!search?";
		var qp="";
		if(uname){
			qp = qp + "&_un=" + uname;
		}
		if(id){
			qp = qp + "&_aid=" + id;
		}
		window.location = loc + encodeURI(qp);
	}
	
	$scope.reload = function(selector){
		var url_load = "addresses/load";
		//alert(appBase.getRemoteURL(url_load));
		if(!selector){
			selector = {};
		}
		$http.post(appBase.getRemoteURL(url_load), {'selector':selector}).then(
		function(result){
			data = result.data;
			//alert(data);
			$scope.addresses = data;
		},
		function(error){
			alert("Error loading address lists");
			//clbk();
		});
	}
	
	$scope.loadAddresses = function(name){
		if(!name){
			name = $scope.uname;
		} else {
			$scope.uname = name;
		}
		//alert(name);
		$scope.reload({"uname": name})
	}
	
	$scope.setDefault = function(uname, aid){
		var url_setdafault = "addresses/setdefault";
		//alert(appBase.getRemoteURL(url_setdafault));
		$http.post(appBase.getRemoteURL(url_setdafault), {'uname' : uname, 'aid' : aid}).then(
			function(result){
				$scope.loadAddresses(uname);
			},
			function(error){
				
			}
		);

	}
	
	// load once;
	//$scope.reload();
	
}

function addressEditController($scope, $http, $location){
	$scope.editing = false;
	
	var address = new Address();
	//alert(JSON.stringify(address));
	
	var params = $location.search();
	//alert(JSON.stringify(params));
	if(params._un){
		address.uname = params._un;
	}
	
	if(params._aid){
		var url_load = "addresses/load";
		alert(appBase.getRemoteURL(url_load));
		$http.post(appBase.getRemoteURL(url_load), {'selector':{'_id': params._aid}}).then(
		function(result){
			data = result.data;
			if(data && data.length >0){
				address.fromJSON(data[0]);
				//alert(JSON.stringify(address));
				
				// found the address data to edit;
				$scope.editing = true;
			}
		},
		function(error){
			alert("Error loading address list");
			//clbk();
		});
	}
	
	$scope.address = address;
	$scope.editingAttrib = null;
	var editingAttribIdx = -1;
	//alert("editAddress");

	$scope.save = function(){
		var url_save = "addresses/save";
		//alert("ID " + $scope.address._id);
		if(!$scope.address._id){
			$scope.address._id = $scope.address.uname + "_" + new Date().getTime();
		}
		var addresses = [$scope.address];

		//alert(appBase.getRemoteURL(url_save));
		$http.post(appBase.getRemoteURL(url_save), { 'addresses': addresses}).then(
			function(result){
				alert("saved address: " + addresses[0].uname);
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
			editingAttribIdx = $scope.address.attribs.indexOf(attr);
			//alert(editingAttribIdx);
			$scope.editingAttrib = angular.copy(attr);
			//alert(JSON.stringify($scope.editingAttrib));
		} else {
			$scope.editingAttrib = {"type":"text"};
		}
	}
	
	$scope.saveAttrib = function(){
		//alert("saving attribute " + JSON.stringify($scope.editingAttrib) + " to " + JSON.stringify($scope.address.attribs));
		if(editingAttribIdx < 0){
			$scope.address.attribs.push($scope.editingAttrib);
		} else {
			$scope.address.attribs.splice(editingAttribIdx, 1, $scope.editingAttrib);
		}
		//alert("saved: " + JSON.stringify($scope.editingAttrib) + " as attribute no: " + $scope.address.attribs.length);
		$scope.save();
		
		$scope.resetEditAttrib();
	}
	
	$scope.resetEditAttrib = function(){
		editingAttribIdx = -1;
		$scope.editingAttrib = null;
	}
	
}

// Address object
function Address(id, uname /* user name */){
	this._id = id;
	this.uname = uname;
	
	this.is_default = false;
	
	this.country = "";
	this.full_name = "";
	this.mobile_number= "";
	this.pincode = "";
	this.street_line1 = "";
	this.street_line2 = "";
	this.landmark = "";
	this.city = "";
	this.state = "";
	
	this.attribs = new Array();
	
	this.fromJSON = function(json){
		this._id = json._id;
		this.uname = json.uname;
		this.is_default = json.is_default;
		
		this.country = json.country;
		this.full_name = json.full_name;
		this.mobile_number = json.mobile_number;
		this.pincode = json.pincode;
		this.street_line1 = json.street_line1;
		this.street_line2 = json.street_line2;
		this.landmark = json.landmark;
		this.city = json.city;
		this.state = json.state;
		
		this.attribs = 	json.attribs;
	}
}


