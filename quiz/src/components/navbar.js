import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

export default function Navbar() {
	const [ state, setstate ] = useState(false);
	return (
		<div className="App">
			<div className="App-container">
				<div className="header">
					<NavLink exact to="/" style={{ textDecoration: 'none' }} activeClassName="active-nav">
						<h1>Quiz Setting</h1>
					</NavLink>
					<NavLink
						exact
						className="setting"
						to="/quiz"
						style={{ textDecoration: 'none' }}
						activeClassName="active-nav"
					>
						<h1>Quiz</h1>
					</NavLink>
				</div>
				<span className="divider" />
			</div>
		</div>
	);
}
