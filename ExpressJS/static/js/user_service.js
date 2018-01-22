
var UserService = 
	{
		ws: localStorage,
		
		init: function(){
			if(this.ws.userList){
				return;
			}
			//alert('building master user list');
			var userList = [
				new User("X", "Y"),
				new User("Y", "X"),
				new User("R", "P"),
				new User("P", "R"),
			];

			//alert(userList);

			var ulJson = JSON.stringify(userList);
			//alert(ulJson);
			
			this.ws.userList = ulJson;
			//alert("Master list created as : " + this.ws.userList)
		},
		
		newUser: function(uname, upwd){
			//alert("creating new user object - " + uname);
			return new User(uname, upwd);
		},
		
		addUser: function(user){
			//alert(user.toString());
			var userList = JSON.parse(this.ws.userList);
			userList[userList.length] = user;
			this.ws.userList = JSON.stringify(userList);
			//alert("Added " + JSON.stringify(user));
			return user;
		},
		
		getUserList: function(){
			return JSON.parse(this.ws.userList);
		},
		
		saveUserList: function(userList){
			this.ws.userList = JSON.stringify(userList);
		},
		
		setActiveUser: function(usr){
			if(usr){
				this.ws.activeUser = JSON.stringify(usr);
			} else {
				this.ws.activeUser = undefined;
			}
			//alert("setting active user - " + this.ws.activeUser);
		},
		
		geActiveUser: function(usr){
			if(this.ws.activeUser){
				//alert("getting active user - " + this.ws.activeUser);
				var activeUser = new User();
				activeUser.fromJS(this.ws.activeUser);
				return activeUser;
			} else {
				return undefined;
			}
		},
		
		authenticate: function (uname, upwd){
			var inputUsr = new User(uname, upwd);
			//alert(inputUsr.toStr());
			
			var userList = this.getUserList(); 
			for(var i=0; i<userList.length; i++){
				var usr = new User().copy(userList[i]);
				
				//alert(usr.toStr());
				if(usr.equals(inputUsr)){
					//alert("matched");
					return usr;
				}
			}
			return undefined;
		},

};

UserService.init();


/**
 * ClassName User
 * @param uname
 * @param upwd
 * @returns User object
 */

function User(uname, upwd){
	//alert("Creating a user object");
	//properties
	this.uname = uname;
	this.upwd = upwd;
	
	//methods
	this.equals = _equals;
	this.toStr = _toString;
	this.fromJS = _fromJSON;
	this.toJS = _toJSON;
	this.copy = _copy;
	
	//location functions
	function _toString (){
		return "{Name:" + this.uname /*+ ", Password:" + this.upwd*/ + "}";
	}
	
	function _equals(usr){
		//alert("Checking equality");
		var isSame = (this.uname == usr.uname
				&& this.upwd == usr.upwd);
		//alert(isSame);
		return isSame;
	}
	
	// build object from JSON String
	function _fromJSON(json){
		//alert(json);
		var uObj = JSON.parse(json);
		//alert(uObj);
		this.uname = uObj.uname;
		this.upwd = uObj.upwd;
		//alert(this.toStr());
		return this;
	}
	
	// to JSON String
	function _toJSON(){
		return JSON.stringify(this);
	}
	
	function _copy(obj){
		//alert(obj.uname + " " + obj.upwd);
		this.uname = obj.uname;
		this.upwd = obj.upwd;
		return this;
	}
}
