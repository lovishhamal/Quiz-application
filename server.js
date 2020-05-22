const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const mongoose = require('mongoose');

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

app.use('/', require('./routes/routes'));

app.listen(port, () => {
	console.log(`Server listening at port ${5000}`);
});
