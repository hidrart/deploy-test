const Movie = require('../models/movie.model');
const client = require('../database/cache');

// get all movies
const getAllMovies = (req, res) => {
	// get limit from req query
	const limit = req.query.limit ? parseInt(req.query.limit) : 10;

	// validate limit
	if (limit < 1 || limit > 100) {
		return res.status(400).json({
			error: 'Limit must be between 1 and 100',
		});
	}

	// add sorting by rating, year, title
	const sort = req.query.sort ? req.query.sort : 'title';

	// validate sort
	if (sort !== 'rating' && sort !== 'year' && sort !== 'title') {
		return res.status(400).json({
			error: 'Sort must be rating, year or title',
		});
	}

	// ascending or descending
	const order = req.query.order ? req.query.order : 'asc';

	// validate order
	if (order !== 'asc' && order !== 'desc') {
		return res.status(400).json({
			error: 'Order must be asc or desc',
		});
	}

	// check redis cache
	client.get('movies', (err, movies) => {
		// handle error
		if (err) {
			return res.status(500).json({
				error: err.message,
			});
		}

		// return data from cache
		if (movies) {
			console.log('from cache');
			return res.status(200).json(
				JSON.parse(movies)
					.sort((a, b) => {
						return order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort];
					})
					.slice(0, limit)
			);
		}

		// return data from database
		else {
			// add sorting by rating, year, title
			Movie.find()
				.limit(limit)
				.sort({ [sort]: order })
				.then((movies) => {
					console.log('from database');
					// save to redis cache
					client.setex('movies', 3600, JSON.stringify(movies));
					return res.status(200).json(movies);
				})
				.catch((err) => {
					return res.status(500).json({
						error: err.message,
					});
				});
		}
	});
};

const createMovie = (req, res) => {
	try {
		// validate request body
		if (!req.body) {
			return res.status(400).json({
				error: 'Request body is missing',
			});
		}

		// create a new movie
		const { title, director, year, description, rating, imageUrl } = req.body;

		// create a new movie
		const movie = new Movie({
			title,
			director,
			year,
			description,
			rating,
			imageUrl,
		});

		// save movie to database
		movie
			.save()
			.then((movie) => {
				return res.status(201).json(movie);
			})
			.catch((err) => {
				return res.status(500).json({
					error: err.message,
				});
			});

		// clear redis cache
		client
			.del('movies')
			.then(() => {
				console.log('Cache cleared');
			})
			.catch((err) => {
				console.log(err);
			});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
};

// get movie by id
const getMovieById = (req, res) => {
	// get id from req params
	const id = req.params.id;

	// check redis cache
	client.get(id, (err, movie) => {
		// handle error
		if (err) {
			console.log(err);
			return res.status(500).json({
				error: err.message,
			});
		}

		// return data from cache
		if (movie) {
			console.log('from cache');
			return res.status(200).json(JSON.parse(movie));
		}

		// return data from database
		else {
			Movie.findById(id)
				.then((movie) => {
					console.log('from database');
					// save to redis cache
					client.setex(id, 3600, JSON.stringify(movie));
					return res.status(200).json(movie);
				})
				.catch((err) => {
					return res.status(500).json({
						error: err.message,
					});
				});
		}
	});
};

// update a movie
const updateMovie = (req, res) => {
	// get id from req params
	const id = req.params.id;

	// validate request body
	if (!req.body) {
		return res.status(400).json({
			error: 'Request body is missing',
		});
	}

	// create a new movie
	const { title, director, year, description, rating, imageUrl } = req.body;

	// find and update movie
	Movie.findByIdAndUpdate(
		id,
		{
			title,
			director,
			year,
			description,
			rating,
			imageUrl,
		},
		{ new: true }
	)
		.then((movie) => {
			return res.status(200).json(movie);
		})
		.catch((err) => {
			return res.status(500).json({
				error: err.message,
			});
		});

	// clear redis cache
	client
		.del('movies')
		.then(() => {
			console.log('Cache cleared');
		})
		.catch((err) => {
			console.log(err);
		});
};

// delete a movie
const deleteMovie = (req, res) => {
	// get id from req params
	const id = req.params.id;

	// delete movie from database
	Movie.findByIdAndDelete(id)
		.then((movie) => {
			return res.status(200).json(movie);
		})
		.catch((err) => {
			return res.status(500).json({
				error: err.message,
			});
		});

	// clear redis cache
	client
		.del('movies')
		.then(() => {
			console.log('Cache cleared');
		})
		.catch((err) => {
			console.log(err);
		});
};

const searchMovies = (req, res) => {
	// get search query from :keyword
	const keyword = req.params.keyword;

	// check redis cache
	client.get(keyword, (err, movies) => {
		// handle error
		if (err) {
			console.log(err);
			return res.status(500).json({
				error: err.message,
			});
		}

		// return data from cache
		if (movies) {
			console.log('from cache');
			res.status(200).json(JSON.parse(movies));
		}

		// return data from database
		else {
			Movie.find({
				$or: [{ title: { $regex: keyword, $options: 'i' } }, { director: { $regex: keyword, $options: 'i' } }],
			})
				.then((movies) => {
					console.log('from database');
					// save to redis cache
					client.setex(keyword, 3600, JSON.stringify(movies));
					return res.status(200).json(movies);
				})
				.catch((err) => {
					return res.status(500).json({
						error: err.message,
					});
				});
		}
	});
};

module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie, searchMovies };
