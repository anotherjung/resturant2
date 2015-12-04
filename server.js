//require
var express = require("express");
var path = require("path");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
//create app object for express
var app = express();
//require bodyParser to handle post data 
app.use(passport.initialize());
app.use(passport.session());
require('./server/config/passport.js')(passport);

var mongoose = require('mongoose');
	//MVC3e require
require('./server/config/mongoose.js');

//static content
app.use(express.static(path.join(__dirname, "./client")));

	//start MVC1b require for routes
var routes_setter = require('./server/config/routes.js');
	//invoke the function stored in routes_setter and pass it the "app" variable
	routes_setter(app, passport);
	//ends MVC require

//tell express to listen on port 
app.listen(8000, function() {
	console.log("listening on port 8000");
})
