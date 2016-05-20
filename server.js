// BASE SETUP
// call the packages we need: 
var express 	= require('express');			// call express
var app			= express(); 						// define our app using express
var bodyParser 	= require('body-parser');
var db 			= require('./api/config/db');
var Car 		= require('./api/models/car');

app.use(express.static(__dirname + '/app'));

// config app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 80;	// set our port

// _________________________________
// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
var car_routes = require('./api/carroutes');
app.use('/', car_routes);


// _________________________________
// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);




