
// Angular JS

// load the app module.
var app = angular.module("app", ['myDraggable']);

// controller
var todoCtrl = app.controller("todo-ctrl", todoCtrlCallback);

// controller callback
function todoCtrlCallback($scope, $http){
	// model
	$scope.activeU = UserService.geActiveUser();
	
	$scope.listOfLists = [];

	UserService.loadOtherUsers(function(data){
		$scope.users = data;
	});
	
	//event handlers
	$scope.addNewList = function(name){
		$scope.listOfLists.push(new ToDoList(name, $scope.activeU.uname));
		$scope.newList = "";
	}
	
	$scope.saveAll = function(){
		saveAll($scope.listOfLists);
	}
	
	$scope.reload = function(){
		reload(function(listOfLists){
			$scope.listOfLists = listOfLists;
			alert("Loaded " + $scope.listOfLists.length + " TO-DO listings");
		});
	}
	
	$scope.showUsers = function(){
		alert("Sharing " + todolist.name);
		/*
		$scope.showShare = true;
		UserService.loadOtherUsers($http, function(users){
			//alert(users);
			$scope.users = users;
		});
		*/
	}
	
	$scope.share = function(todolist){
		$scope.showShare = false;
	}
	
	function saveAll(listOfLists){
		var url_save = "todos/save";
		//alert(appBase.getRemoteURL(url_save));
		$http.post(appBase.getRemoteURL(url_save), { 'listOfLists': listOfLists}).then(
			function(result){
				alert("saved " + listOfLists.length + " listings.");
			},
			function (error) {
		        alert("error: " + JSON.stringify(error));
		    }
		);
	}

	function reload(clbk){
		var url_load = "todos/load";
		//alert(appBase.getRemoteURL(url_load));
		$http.post(appBase.getRemoteURL(url_load), {'selector':{'owner': $scope.activeU.uname}}).then(
		function(result){
			listOfLists = result.data;
			//alert(listOfLists);
			clbk(toListOfLists(listOfLists));
		},
		function(error){
			alert("Error loading todo lists");
			clbk(listOfLists);
		});
		}
}

function toListOfLists(loadedData){
	var listOfLists = [];
	for(var i=0; i< loadedData.length; i++){
		listOfLists.push(new ToDoList().fromJson(loadedData[i]));
	}
	return listOfLists;
}


// Data Model.
// class: ToDoItem
function ToDoItem(txt, done){
	this.text = txt;
	this.done = done; 
	
	if(!this.done){ // handle case of undefined
		this.done = false;
	}
	
}

ToDoItem.prototype.fromJson = function(json){
	this.text = json.text;
	this.done = json.done;
	return this;
}

ToDoItem.prototype.toggleStatus = function(){
	this.done = !(this.done);
}

ToDoItem.prototype.getStyle = function(){
	return (this.done?'item-done':'item-new');	
}

// class: ToDoList
function ToDoList(name, owner, items, alldone, sharings){
	// members...
	this._id = "todolist_" + new Date().getTime() + "_" + this.name;

	this.name = name;
	this.owner = owner;
	this.alldone = alldone;
	this.items = [];
	this.sharings = [];
	
	if(!this.alldone){ // handle case of undefined
		this.alldone = false;
	}
	
	if(items){
		this.items = items;
	}
	
	if(sharings){
		this.sharings = sharings;
	}
}

// functionalities

ToDoList.prototype.fromJson = function(json){
	this._id = json._id;
	this.name = json.name;
	this.owner = json.owner;
	this.alldone = json.alldone;
	this.items = [];
	
	for(var i=0; i<json.items.length; i++){
		this.items.push(new ToDoItem().fromJson(json.items[i]));
	}

	this.sharings = json.sharings;

	return this;
}

ToDoList.prototype.addNewItem = function(){
	this.add(new ToDoItem(this.newitem, false));
	this.alldone = false;
	// reinitialize
	this.initAddNewItem();
}

ToDoList.prototype.add = function(item){
	this.items.push(item);
}

ToDoList.prototype.remove = function(item){
	//this.items.push(item);
}

ToDoList.prototype.toggleStatusAll = function(){
	this.alldone = !(this.alldone);
	var list = this.items;
	for(var i=0; i<list.length; i++){
		list[i].done = this.alldone;
	}
}

ToDoList.prototype.initAddNewItem = function(){
	this.newitem = "";
	this.addingNewItem = !this.addingNewItem;
}

ToDoList.prototype.initSharing = function(show, users){
	if(show){
		this.sharing = true;
		//alert(users.length);
		for(var i=0; i<users.length; i++){
			this.sharings.push(new Sharing(users[i].uname));
		}
	} else {
		this.sharing = false;
	}
}

ToDoList.prototype.share = function(){
	alert("sharing");
	this.sharing = !this.sharing;
}

ToDoList.prototype.shareWith = function(sharing){
	//alert("Adding to/Removing from shared With array")
	if(!this.sharings){
		this.sharings = [];
	}
	/*
	if(user.shared){
		//alert("added")'
		if(this.sharings.indexOf(user.uname) < 0){
			this.sharings.push(sharing);
		}
	} else {
		//alert("removed")
		this.sharings.splice(this.sharings.indexOf(user.uname), 1);
	}
	*/
	alert(this.sharings);
}

function Sharing(user, perm){
	this.uname = user;
	this.permission = Permission.NONE; // NONE, READ, EDIT
	if(perm){
		this.permission = perm;
	}
}

var Permission = {"NONE":"NONE", "READ":"READ", "EDIT":"EDIT",}