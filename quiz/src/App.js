import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import QuizSetting from './components/quizSetting';
import Quiz from './components/main';

function App(props) {
	return (
		<React.Fragment>
			<Route path="/" exact component={QuizSetting} />
			<Route path="/quiz" exact component={Quiz} />
		</React.Fragment>
	);
}

export default App;
