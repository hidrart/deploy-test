const express = require('express');
const router = express.Router();

// get movie controller
const movieController = require('../controllers/movie.controller');

// get all movies
router.get('/movies', movieController.getAllMovies);

// get movie by id
router.get('/movies/:id', movieController.getMovieById);

// create a new movie
router.post('/movies', movieController.createMovie);

// update a movie
router.put('/movies/:id', movieController.updateMovie);

// delete a movie
router.delete('/movies/:id', movieController.deleteMovie);

// search movies
router.get('/movies/search/:keyword', movieController.searchMovies);

module.exports = router;
