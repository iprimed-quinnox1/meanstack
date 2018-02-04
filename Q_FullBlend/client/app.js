var appBase = {
	storage: localStorage,
	// <html lang="en">
	lang: "en",

	//<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	bs: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",

	//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	jq: "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",

	//<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	bsjs: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
	
	// <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
	angular: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js",

	//<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>
	ng_route: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js",

	//<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.js"></script>
	ng_anim: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.js",

	//<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-sanitize.js"></script>
	ng_sanitize:"https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-sanitize.js",
	
	//<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	w3css:"https://www.w3schools.com/w3css/4/w3.css",

	// <meta name="viewport" content="width=device-width, initial-scale=1.0">
	view: "width=device-width, initial-scale=1.0",
	
	// <meta charset="utf-8">
	chset:"utf-8",
	
	init: function (){
		//alert("Initializing");
		
		document.documentElement.lang = this.lang;
		this.head = document.getElementsByTagName("head")[0];
		
		this.addScript(this.angular);
		this.addScript(this.ng_route);
		this.addScript(this.jq);
		this.addScript(this.bsjs);

		this.addMeta([["name", "viewport"], ["content", this.view],]);
		this.addMeta([["charset", this.chset],]);
		
		this.addStylesheet(this.w3css);
		this.addStylesheet(this.bs);
		
		
		//alert("Init Completed<br>" + head.innerHTML);
	},
	
	addChild: function (/* parent element*/ parent, /*child tag name*/ childName, /* key-value pairs*/ attribs ){
		//alert("adding : '" + childName + "'\nattributes: " + JSON.stringify(attribs));
		if(parent){
			var child = document.createElement(childName);
			for(var i=0; i<attribs.length; i++){
				var prop = attribs[i];
				child[prop[0]] = prop[1];
			}
			
			parent.appendChild(child);
		}
	},
	
	addScript: function (src){
		//alert(this.head);
		this.addChild(this.head, "script", [["src", src],]);
	},
	
	addStylesheet: function (href){
		//alert(this.head);
		this.addChild(this.head, "link", [["rel", "stylesheet"],["href", href],]);
	},

	addMeta: function (metaAttribs){
		//alert(this.head);
		this.addChild(this.head, "meta", metaAttribs);
	},
	
	getRemoteURL: function (relPath){
		var basePath = "";
		var matches = new RegExp("(http[s]?://[^/]*)/").exec(window.location);
		if(matches){
			basePath = matches[0];
		}
		
		return basePath + relPath;
	},
	
	http : function(){
		if(angular){
			return angular.injector(["ng"]).get("$http");
		}
	},
	
};

//initialize
appBase.init();


