import React from 'react';

import classes from './Home.module.css';

import { ReactComponent as HomeSvg } from './../../assets/images/home.svg';

import Button from './../UI/Button/Button';

import Pagination from './../UI/Pagination/Pagination';

import useHome from './../../hooks/Home/useHome';

const Home = (props) => {
	const { homeSvgRef, headerRef, handleRedirectToForm } = useHome();

	return (
		<div className={classes.Home}>
			<header style={{ width: '80%' }}>
				<HomeSvg ref={homeSvgRef} className={classes.HomeSvg} />

				<div className={classes.headerTextWrapper} ref={headerRef}>
					<h1 className={classes.title}>What's your programming knowdledge?</h1>
					<p className={classes.description}>
						By answering these questions, you can find out what programming
						knowledge do you have
					</p>
				</div>
			</header>
			<main>
				<Pagination pageNumber={1} />

				<Button click={handleRedirectToForm} content={'Start Quiz'} />
			</main>
		</div>
	);
};

export default Home;
