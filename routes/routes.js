const router = require('express').Router();
const QuizDb = require('../dbModel');

router.get('/getquestions', async (req, res) => {
	try {
		const find = await QuizDb.find();

		return res.json(find);
	} catch (error) {}
});

router.post('/add', async (req, res) => {
	try {
		console.log('done ,');

		const { question, options } = req.body;

		const quiz = new QuizDb({
			questions: question,
			values: options
		});
		await quiz.save();
		return res.status(200).json('success');
	} catch (error) {}
});

router.get('/addoption/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const find = await QuizDb.findOne({ _id: id });
		return res.json(find);
	} catch (error) {}
});

router.put('/update/', async (req, res) => {
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

module.exports = router;
