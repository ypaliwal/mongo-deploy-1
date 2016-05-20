var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

var CarSchema = new Schema({
	make: String,
	model: String,
	year: Number,
	description: String
});

module.exports = mongoose.model('Car', CarSchema);