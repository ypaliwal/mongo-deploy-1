var express = require('express');
var Car		= require('./models/car');

var router = express.Router();  // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// logging
	console.log('Car Routes loaded.');
	next();
})

// test route to make sure everything is working (accessed at GET http://localhost:8080/)
router.get('/', function(req, res) {
	res.json({ message: 'Car routes GET request.' });
});

// more routes for our API will happen here

// Return Info About The Object
router.route('/objInfo')
	.get(function(req, res) {
		res.json({ message: 'Car object properties; Make, Model, Year & Description.' });
	});

router.route('/newcar')
// Create a car (accessed via POST)
	.post(function(req, res) {
		var car = new Car();
		car.make = req.body.make;
		car.model = req.body.model;
		car.year = req.body.year;
		car.description = req.body.description;

		car.save(function(err) {
			if(err)
				res.send(err);

			res.json({ message: 'Car created!' });
		});
	});

// Return ALL CARS
router.route('/cars')
	.get(function(req, res) {
		Car.find(function(err, cars) {
			if(err)
				res.send(err);

			res.json(cars);
		});
	});


router.route('/cars/:car_id')
// Return a specific car by ID
	.get(function(req, res) {
		Car.findById(req.params.car_id, function(err, car) {
			if(err)
				res.send(err);

			res.json(car);
		})
	})
// Update a specific car by ID
	.put(function(req, res) {
		Car.findById(req.params.car_id, function(err, car) {
			if(err)
				res.send(err);
			car.name = req.body.name;

			car.save(function(err) {
				if(err)
					res.send(err);

				res.json({ message: 'Car updated!' });
			});
		});
	})
	.delete(function(req, res) {
		Car.remove({
			_id: req.params.car_id
		}, function(err, car) {
			if(err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});

module.exports = router;

