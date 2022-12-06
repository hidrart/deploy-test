const mongoose = require('mongoose');

const connection = async () => {
	try {
		mongoose.set('strictQuery', true);
		const client = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB...');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connection;
