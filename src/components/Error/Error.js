import React from 'react';

import classes from './Error.module.css';

const Error = (props) => {
	return (
		<div className={classes.Error}>
			<header className={classes.header}>
				<h1>Error 404</h1>
				<h2>Page not found</h2>
			</header>
		</div>
	);
};

export default Error;
