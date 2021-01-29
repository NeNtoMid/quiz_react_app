import React from 'react';
import PropTypes from 'prop-types';

import classes from './Countdown.module.css';

import './styling.css';

import useCountdown from './../../hooks/Countdown/useCountdown';

const Countdown = (props) => {
	const { wrappedElementRef, countdownRef } = useCountdown(
		props.leave,
		props.isClicked
	);
	return (
		<div className={classes.container}>
			<main>
				<header ref={countdownRef}>
					<h1 className={classes.title}>Get Ready!</h1>
				</header>
				<div id='wrap' ref={wrappedElementRef}>
					<div className='c'></div>
					<div className='o'></div>
					<div className='u'></div>
					<div className='n'></div>
					<div className='t'></div>
				</div>

				<svg>
					<defs>
						<filter id='filter'>
							<feGaussianBlur
								in='SourceGraphic'
								stdDeviation='18'
								result='blur'
							/>
							<feColorMatrix
								in='blur'
								mode='matrix'
								values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -10'
								result='filter'
							/>
							<feComposite in='SourceGraphic' in2='filter' operator='atop' />
						</filter>
					</defs>
				</svg>
			</main>
		</div>
	);
};

Countdown.propTypes = {
	leave: PropTypes.func.isRequired,
};

export default Countdown;
