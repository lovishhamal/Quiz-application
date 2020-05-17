import React, { useState, useEffect } from 'react';
import './quiz.css';

import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import AddIcon from '@material-ui/icons/Add';

import SendIcon from '@material-ui/icons/Send';
import Backdrop from './backdrop';

import Swal from 'sweetalert2';
import axios from 'axios';
import Navbar from './navbar';

const notificationAlert = () => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		background: '#fff',
		onOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		}
	});
	Toast.fire({
		icon: 'error',
		title: 'Please fill all the areas.'
	});
};
const notificationAlertError = () => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		background: '#fff',
		onOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		}
	});
	Toast.fire({
		icon: 'error',
		title: 'Option already exists.'
	});
};
const notificationAlertSuccess = () => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		background: '#fff',
		onOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		}
	});
	Toast.fire({
		icon: 'success',
		title: 'Question added'
	});
};

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1)
	}
}));

const GreenRadio = withStyles({
	root: {
		color: green[400],
		'&$checked': {
			color: green[600]
		}
	},
	checked: {}
})((props) => <Radio color="default" {...props} />);

const PopUp = ({ onChangeOptions, onSubmitOptions, optionsNewArray }) => {
	const [ state, setstate ] = useState('');

	const classes = useStyles();
	const [ selectedValue, setSelectedValue ] = React.useState('a');
	const handleChange = (e) => {
		setSelectedValue(e.target.value);

		const find = optionsNewArray.find((val) => val.item === e.target.value);
		find.value = true;

		const filter = optionsNewArray.filter((val) => val.item !== e.target.value);
		filter.map((val) => (val.value = false));
	};

	const onChange = (e) => {
		e.preventDefault();
		setstate(e.target.value);
	};

	const Valid = (options) => {
		let valid = true;
		Object.values(options).forEach((val) => {
			val.value == true && (valid = false);
		});
		return valid;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const question = state;
		const options = optionsNewArray;

		if (!question || (options.length < 2 || Valid(options))) {
			notificationAlert();
			return;
		}

		const body = {
			question,
			options
		};

		const post = await axios.post('http://127.0.0.1:5000/add', body).then(() => notificationAlertSuccess());
		setTimeout(() => {
			window.location = '/';
		}, 700);
	};

	return (
		<div
			className="popup"
			style={{
				borderRadius: '5px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: '7%'
			}}
		>
			<div>
				<form onSubmit={onSubmit}>
					<div style={{ display: 'flex' }}>
						<TextField
							id="outlined-password-input"
							label="Add a question ?"
							type="text"
							autoComplete="current-password"
							variant="outlined"
							onChange={onChange}
						/>

						<TextField
							style={{ position: 'relative', left: '5%' }}
							id="outlined-password-input"
							label="Add options (lowercase)"
							type="text"
							autoComplete="current-password"
							variant="outlined"
							onChange={onChangeOptions}
						/>
						<Button
							style={{ position: 'relative', left: '5%' }}
							variant="contained"
							color="primary"
							className={classes.button}
							endIcon={<AddIcon />}
							onClick={onSubmitOptions}
							disabled={optionsNewArray.length >= 5 ? true : false}
						>
							{optionsNewArray.length < 2 ? `Add Atleast ${2 - optionsNewArray.length} q.` : 'Add'}
						</Button>
					</div>
					<br />

					{optionsNewArray.length >= 1 ? (
						<div>
							<p>Select the correct option.</p>
							{optionsNewArray.map((item) => {
								return (
									<div>
										<GreenRadio
											checked={selectedValue === item.item}
											onChange={handleChange}
											value={item.item}
											name="radio-button-demo"
											inputProps={{ 'aria-label': 'C' }}
										/>
										{item.item}
									</div>
								);
							})}
						</div>
					) : (
						''
					)}
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={classes.button}
						endIcon={<SendIcon />}
					>
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

const UpdateOption = ({ data, submitnewOptions, onchangenewOpt, optionsAdd, newData }) => {
	const count = 5 - data.values.length;

	return (
		<div
			className="popup"
			style={{
				borderRadius: '5px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: '7%'
			}}
		>
			<div>
				<form onSubmit={submitnewOptions}>
					<div style={{ display: 'flex' }}>
						<TextField
							style={{ position: 'relative', left: '5%' }}
							id="outlined-password-input"
							label="Add options ?"
							type="text"
							autoComplete="current-password"
							variant="outlined"
							onChange={onchangenewOpt}
						/>
						<Button
							style={{ position: 'relative', left: '7%' }}
							variant="contained"
							color="primary"
							endIcon={<AddIcon />}
							disabled={count === newData.length ? true : false}
							onClick={optionsAdd}
						>
							{`Add Option ${5 - data.values.length} max`}
						</Button>
					</div>
					<br />
					{newData.map((item) => {
						return (
							<div>
								<GreenRadio
									disabled
									value={item.item}
									name="radio-button-demo"
									inputProps={{ 'aria-label': 'C' }}
								/>
								{item}
							</div>
						);
					})}
					<Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}>
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

let optionArray = [];
let Qid = '';
export default function QuizSetting() {
	const [ state, setstate ] = useState(false);
	const [ options, setoptions ] = useState([]);
	const [ value, setValue ] = useState([]);
	const [ question, setquestion ] = useState([]);
	const [ updateoption, setaddoption ] = useState([]);
	const [ updateBool, setupdateBool ] = useState(false);
	const [ newoption, setnewoption ] = useState([]);
	const [ addnewopt, setaddnewopt ] = useState([]);
	const [ checkOptions, setcheckoptions ] = useState([]);

	const onChangeOptions = (e) => {
		e.preventDefault();

		setoptions({ item: e.target.value, value: false });
	};

	useEffect(
		() => {
			const fetch = async () => {
				const get = await axios.get('http://127.0.0.1:5000/getquestions');
				setquestion(get.data);
			};

			fetch();
		},
		[ value ]
	);

	const onSubmitOptions = (e) => {
		e.preventDefault();
		if (options.length <= 1) {
			return;
		}
		const match = optionArray.includes(options.item);
		if (match) {
			notificationAlertError();
			return;
		}

		optionArray.push(options.item);
		setValue((oldval) => [ ...oldval, options ]);
	};

	const addoption = async (id) => {
		Qid = id;

		const val = await axios.get('http://127.0.0.1:5000/addoption/' + id);
		setaddoption(val.data);
		const mapped = val.data.values.map((item) => item.item.toLowerCase());

		setaddnewopt(mapped);
		setupdateBool(true);
	};

	/*submit the option..send to database*/

	const submitnewOptions = async (e) => {
		e.preventDefault();
		if (checkOptions.length < 1) {
			return;
		}

		const put = await axios
			.put('http://127.0.0.1:5000/update/', { checkOptions, Qid })
			.then(() => window.location.reload('/'));
	};

	const onchangenewOpt = (e) => {
		e.preventDefault();
		setnewoption(e.target.value);
	};

	/*add new option..updated component*/
	const optionsAdd = (e) => {
		e.preventDefault();

		if (newoption.length < 1) {
			return;
		}
		//check if option already exists
		const check = addnewopt.includes(newoption.toLowerCase());
		if (check) {
			notificationAlertError();
			return;
		}

		setcheckoptions((oldval) => [ ...oldval, newoption ]);
	};

	let backdrop = '';
	let popup = '';
	if (state) {
		popup = <PopUp onChangeOptions={onChangeOptions} onSubmitOptions={onSubmitOptions} optionsNewArray={value} />;
		backdrop = <Backdrop close={() => setstate(false)} />;
	}

	let updatePopup = '';
	if (updateBool) {
		updatePopup = (
			<UpdateOption
				data={updateoption}
				submitnewOptions={submitnewOptions}
				onchangenewOpt={onchangenewOpt}
				optionsAdd={optionsAdd}
				newData={checkOptions}
			/>
		);
		backdrop = <Backdrop close={() => setupdateBool(false)} />;
	}

	return (
		<div className="setting-container">
			<Navbar />
			<br />

			<Button className="button" variant="contained" color="primary" onClick={() => setstate(!state)}>
				Add a new question
			</Button>
			<div className="setting-wrapper">
				<div className="body">
					{question.map((val, i) => {
						return (
							<div>
								<h1 className="questions">
									{`${i}. `}
									{val.questions}
								</h1>
								<div>
									{val.values.map((val, i) => (
										<ul>
											<li key={i} style={{ listStyle: 'none' }}>
												<GreenRadio
													checked={val.value}
													name="radio-button-demo"
													inputProps={{ 'aria-label': 'C' }}
												/>
												<span style={{ textTransform: 'capitalize' }}>{val.item}</span>
											</li>
										</ul>
									))}
									{val.values.length < 5 ? (
										<div
											onClick={() => {
												addoption(val._id);
											}}
										>
											<h3 style={{ color: 'blue', cursor: 'pointer' }}>Add another option</h3>
										</div>
									) : (
										''
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			{popup}
			{updatePopup}
			{backdrop}
		</div>
	);
}
