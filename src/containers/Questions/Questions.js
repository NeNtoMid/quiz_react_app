import React from 'react';

import classes from './Questions.module.css';

import Countdown from './../../components/Countdown/Countdown';

import useQuestions from './../../hooks/Questions/useQuestions';

import Question from './../../components/Question/Question';

const Questions = (props) => {
	const {
		questionsAndAnswers,
		displayQuestion,
		checkAnswerValidity,
		handleLeaveCountdown,
		handleTimeIsUp,
	} = useQuestions();

	let render = null;

	if (!displayQuestion.display) {
		render = <Countdown leave={handleLeaveCountdown} />;
	} else {
		render = (
			<Question
				answers={questionsAndAnswers[displayQuestion.number].answers}
				question={questionsAndAnswers[displayQuestion.number].question}
				click={checkAnswerValidity}
				handleTimeIsUp={handleTimeIsUp}
				questionNum={displayQuestion.number}
				correctAnswer={
					questionsAndAnswers[displayQuestion.number].correctAnswer
				}
				timeIsUp={displayQuestion.timeIsUp}
				isCorrectAnswer={displayQuestion.isCorrectAnswer}
				userAnswerId={displayQuestion.userAnswerId}
			/>
		);
	}

	return (
		<main className={classes.main} data-barba='wrapper'>
			{render}
		</main>
	);
};

export default Questions;
