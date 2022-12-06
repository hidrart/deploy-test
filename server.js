const express = require('express');
const connection = require('./server/database/connection');
const routes = require('./server/routes/movie.routes');
const app = express();

// setup dotenv
require('dotenv').config();

// mongodb
connection();

// setup cors, body-parser, and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes for api
app.use('/api', routes);

// handle 404
app.use('*', (req, res) => {
	res.status(404).json({
		error: 'Not found',
	});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
