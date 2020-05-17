import React from 'react';
import './quiz.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Backdrop = ({ close }) => {
	return (
		<div className="backdrop" onClick={close}>
			<FontAwesomeIcon
				icon={faTimesCircle}
				style={{ position: 'fixed', left: '90%', fontSize: '40px', top: '5%', color: 'red' }}
			/>
		</div>
	);
};

export default Backdrop;
