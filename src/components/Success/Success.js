import React from 'react';

import classes from './Success.module.css';

import Pagination from './../UI/Pagination/Pagination';

import Button from './../UI/Button/Button';

import { ReactComponent as SuccessSvg } from './../../assets/images/success.svg';

import useSuccess from './../../hooks/Success/useSuccess';

import { isMobile } from 'mobile-device-detect';

const Success = (props) => {
	const { successSvgRef, headerRef, handleRedirectToQuestions } = useSuccess();

	return (
		<div className={classes.Success}>
			<header className={classes.header}>
				<div className={classes.textWrapper} ref={headerRef}>
					<h1 className={classes.title}>Congrats!</h1>
					<p className={classes.description}>
						You successfully filled credentials. Now let's get started with
						quiz. There's 10 questions
					</p>
				</div>
			</header>
			<main className={!isMobile ? classes.main : ''}>
				<SuccessSvg className={classes.SuccessSvg} ref={successSvgRef} />
				<Pagination pageNumber={3} />

				<Button click={handleRedirectToQuestions} content={'Start'} />
			</main>
		</div>
	);
};

export default Success;
