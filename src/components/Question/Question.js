import React from 'react';
import PropTypes from 'prop-types';

import classes from './Question.module.css';

import useQuestion from './../../hooks/Question/useQuestion';

const Question = (props) => {
	const { timerRef, timeLabelRef, questionWrapperRef } = useQuestion(
		props.questionNum,
		props.click,
		props.isCorrectAnswer,
		props.handleTimeIsUp
	);

	return (
		<div className={classes.Question} ref={questionWrapperRef}>
			<h1 className={classes.title}>{props.question}</h1>

			<div
				className={classes.timer}
				style={{
					display:
						props.timeIsUp || props.isCorrectAnswer !== 0 ? 'none' : 'block',
				}}
			>
				<div className={classes.baseTimer}>
					<svg
						className={classes.baseTimer__svg}
						viewBox='0 0 100 100'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g className={classes.baseTimer__circle}>
							<circle
								className={classes.baseTimer__pathElapsed}
								cx='50'
								cy='50'
								r='45'
							></circle>
							<path
								ref={timerRef}
								id='base-timer-path-remaining'
								strokeDasharray='283'
								className={`${classes.baseTimer__pathRemaining} ${classes.arc}`}
								d='
                   M 50, 50
                   m -45, 0
                   a 45,45 0 1,0 90,0
                   a 45,45 0 1,0 -90,0
                   '
							></path>
						</g>
					</svg>

					<span
						ref={timeLabelRef}
						id='base-timer-label'
						className={classes.baseTimer__label}
					></span>
				</div>
			</div>

			{(props.timeIsUp || props.isCorrectAnswer !== 0) && (
				<div className={classes.timer}>
					<div className={classes.baseTimer}>
						<svg
							className={classes.baseTimer__svg}
							viewBox='0 0 100 100'
							xmlns='http://www.w3.org/2000/svg'
						>
							<g className={classes.baseTimer__circle}>
								<circle
									className={classes.baseTimer__pathElapsed}
									cx='50'
									cy='50'
									r='45'
								></circle>
								<path
									strokeDasharray='283'
									className={`${classes.baseTimer__pathRemaining} ${classes.arc}`}
									d='
                   M 50, 50
                   m -45, 0
                   a 45,45 0 1,0 90,0
                   a 45,45 0 1,0 -90,0
                   '
								></path>
							</g>
						</svg>

						<span className={classes.baseTimer__label}> 0:05</span>
					</div>
				</div>
			)}

			<div className={classes.answers}>
				{Object.keys(props.answers).map((answer, i) => {
					let sectionStyles = {};

					sectionStyles = { backgroundColor: '#fff', color: 'black' };

					if (
						props.correctAnswer.toString() === answer.toString() &&
						props.isCorrectAnswer !== 0
					) {
						sectionStyles = { backgroundColor: '#2ecc71', color: 'white' };
					} else if (
						props.userAnswerId === answer.toString() &&
						props.isCorrectAnswer === -1
					) {
						sectionStyles = { backgroundColor: '#e74c3c', color: 'white' };
					} else if (
						props.correctAnswer.toString() === answer.toString() &&
						props.timeIsUp
					) {
						sectionStyles = { backgroundColor: '#f1c40f', color: 'white' };
					}

					return (
						<section
							className={classes.answer}
							key={props.answers[answer]}
							onClick={() => props.click(answer, props.questionNum)}
							style={sectionStyles}
						>
							<p className={classes.answerContent}>{props.answers[answer]}</p>
						</section>
					);
				})}
			</div>
		</div>
	);
};

Question.propTypes = {
	answers: PropTypes.object.isRequired,
	question: PropTypes.string.isRequired,
	click: PropTypes.func.isRequired,
	questionNum: PropTypes.number.isRequired,
	correctAnswer: PropTypes.string.isRequired,
	isClicked: PropTypes.bool.isRequired,
	isCorrect: PropTypes.string.isRequired,
	isDisplay: PropTypes.bool.isRequired,
};

export default Question;
