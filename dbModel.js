const mongoose = require('mongoose');

const QuizDB = new mongoose.Schema({
	questions: {
		type: String
	},
	values: {
		type: Array
	}
});

module.exports = mongoose.model('quizDB', QuizDB);
