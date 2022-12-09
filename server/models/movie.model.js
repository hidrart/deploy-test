const mongoose = require('mongoose');
const validator = require('validator');

// Create a new Mongoose schema for movies
const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 100,
	},
	director: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 100,
	},
	year: {
		type: Number,
		required: true,
		min: 1800,
		max: 2100,
	},
	description: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 500,
	},
	rating: {
		type: Number,
		required: true,
		min: 0,
		max: 10,
	},
	imageUrl: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 500,
		validate: {
			validator: (value) => validator.isURL(value),
			message: 'Invalid URL',
		},
	},
});

// Create a new Mongoose model for movies
const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
