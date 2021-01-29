import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const Button = ({ click, content, ...restAttributes }) => {
	return (
		<div className={classes.buttonWrapper}>
			<button className={classes.button} onClick={click} {...restAttributes}>
				<h2 className={classes.buttonTitle}>{content}</h2>
			</button>
		</div>
	);
};

Button.propTypes = {
	click: PropTypes.func.isRequired,
	content: PropTypes.string.isRequired,
};

export default Button;
