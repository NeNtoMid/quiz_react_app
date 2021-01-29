import React, { memo } from 'react';

import PropTypes from 'prop-types';

import classes from './Pagination.module.css';

const Pagination = (props) => {
	return (
		<div className={classes.pagination}>
			{[...new Array(3)].map((el, i) => (
				<span
					key={i}
					className={props.pageNumber - 1 === i ? classes.active : null}
				></span>
			))}
		</div>
	);
};

Pagination.propTypes = {
	pageNumber: PropTypes.number.isRequired,
};

export default memo(Pagination);
