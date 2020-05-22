const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const mongoose = require('mongoose');
const QuizDb = require('./dbModel');

app.use(cors());
app.use(express.json());

mongoose.Promise = global.Promise;
mongoose
	.connect('mongodb://127.0.0.1/quiz', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => {
		console.log('Mongo not connected');
	});

app.post('/add', async (req, res) => {
	try {
		const { question, options } = req.body;

		const quiz = new QuizDb({
			questions: question,
			values: options
		});
		await quiz.save();
		return res.status(200).json('success');
	} catch (error) {}
});

app.get('/getquestions', async (req, res) => {
	try {
		const find = await QuizDb.find();
		return res.json(find);
	} catch (error) {}
});

app.get('/addoption/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const find = await QuizDb.findOne({ _id: id });
		return res.json(find);
	} catch (error) {}
});

app.put('/update/', async (req, res) => {
	try {
		const { checkOptions, Qid } = req.body;

		for (let i in checkOptions) {
			const update = await QuizDb.findOneAndUpdate(
				{
					_id: Qid
				},
				{ $push: { values: { item: checkOptions[i], value: false } } }
			);
		}
		res.status(200).json('updated');
	} catch (error) {}
});

app.listen(port, () => {
	console.log(`Server listening at port ${5000}`);
});
