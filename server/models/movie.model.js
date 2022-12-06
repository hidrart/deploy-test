const mongoose = require('mongoose');

// Create a new Mongoose schema for movies
const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	director: String,
	year: Number,
	description: String,
	rating: {
		type: Number,
		min: 0,
		max: 5,
	},
	imageUrl: String,
});

// Create a new Mongoose model for movies
const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
