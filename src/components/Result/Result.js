import React from 'react';

import classes from './Result.module.css';

import { ReactComponent as MedalSvg } from './../../assets/images/result/medal.svg';

import Button from './../UI/Button/Button';

import useResult from './../../hooks/Result/useResult';

import { isMobile } from 'mobile-device-detect';

const Result = (props) => {
	const { medalSvgRef, score, handleRedirectToQuestions } = useResult();

	return (
		<div className={classes.Result}>
			<header style={{ width: '80%' }}>
				<div className={classes.headerTextWrapper}>
					<h1 className={classes.title}>Congrats!</h1>
					<p className={classes.description}>
						You just completed quiz with score <strong>{score}/10</strong> which
						is incredible! Checkout your email ;)
					</p>
				</div>
				<MedalSvg
					ref={medalSvgRef}
					className={classes.MedalSvg}
					style={{ width: !isMobile ? '25%' : '65%' }}
				/>
			</header>
			<main>
				<Button click={handleRedirectToQuestions} content={'Try again'} />
			</main>
		</div>
	);
};

export default Result;
