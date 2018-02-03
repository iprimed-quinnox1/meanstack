//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/todo';
mongoose.connect(mongoDB, {
});

// Get Mongoose to use the global promise library
//mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    name: String,
    dt: Date
});

//Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );

load();
//Create an instance of model SomeModel
var awesome_instance = new SomeModel({ name: 'awesome', dt:new Date() });

// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
  if (err) return ;
  // saved!
  console.log("Saved : " + awesome_instance);
  load();
  
});

function load(){
	SomeModel.find({}, function(err, models){
		  if (err) {
			  console.log(err);
			  return ;
		  }
		  console.log("Loaded : " + models.length + " models.");
	});}
