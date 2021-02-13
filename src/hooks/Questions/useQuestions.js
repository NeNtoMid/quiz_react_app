import { useState, useCallback, useEffect } from 'react';

import {
	saveUserCorrectAnswer,
	authenticateUser,
} from './../../store/actions/index';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

const questionsAndAnswers = [
	{
		question: 'HTML stands for:',
		answers: {
			a: 'HyperText Query Language',
			b: 'HyperType Markup Language',
			c: 'HyperText Markup Language',
			d: 'HyperText Markup Javascript',
		},
		correctAnswer: 'c',
	},
	{
		question: 'SASS it is:',
		answers: {
			a: 'CSS framework',
			b: 'CSS library',
			c: 'Preprocessor to CSS',
			d: 'There is no such thing',
		},
		correctAnswer: 'c',
	},
	{
		question: 'How many times  SEO allows to put the <h1> tag on a page?',
		answers: {
			a: '3',
			b: '1',
			c: '5',
			d: 'Infinitely',
		},
		correctAnswer: 'b',
	},
	{
		question: 'What is the prefix of a variable in CSS?',
		answers: {
			a: 'let',
			b: '$',
			c: 'There are no variables in CSS',
			d: '--',
		},
		correctAnswer: 'd',
	},
	{
		question: 'What is the most popular JS framework?',
		answers: {
			a: 'Angular',
			b: 'Vue',
			c: 'Ember',
			d: 'React',
		},
		correctAnswer: 'd',
	},
	{
		question: `In what environment we can run JavaScript outside the browser?`,
		answers: {
			a: 'NodeJs',
			b: 'SpringJs',
			c: 'DjangoJs',
			d: 'FlaskJS',
		},
		correctAnswer: 'a',
	},
	{
		question: `What we can use to show value in browser's console?`,
		answers: {
			a: 'show()',
			b: 'console.log()',
			c: 'display()',
			d: 'showInConsole()',
		},
		correctAnswer: 'b',
	},
	{
		question: `Which type of variable doesn't exist?`,
		answers: {
			a: 'let',
			b: 'int',
			c: 'const',
			d: 'var',
		},
		correctAnswer: 'b',
	},
	{
		question: 'Where asynchronous function go after it is called ?',
		answers: {
			a: 'Async Queue',
			b: 'Call Stack',
			c: 'Callback Queue',
			d: 'Event Loop',
		},
		correctAnswer: 'c',
	},
	{
		question: 'What type of value is object e.g. {} ?',
		answers: {
			a: 'Reference',
			b: 'Primitive',
			c: 'Advanced',
			d: 'Constans',
		},
		correctAnswer: 'a',
	},
];

const useQuestions = () => {
	const [displayQuestion, setDisplayQuestion] = useState({
		display: false,
		number: 0,
		isCorrectAnswer: 0,
		userAnswerId: '',
		timeIsUp: false,
	});

	const handleLeaveCountdown = useCallback(() => {
		setDisplayQuestion((prevState) => ({
			...prevState,
			display: true,
			isCorrectAnswer: 0,
			userAnswerId: '',
			timeIsUp: false,
		}));
	}, []);

	const dispatch = useDispatch();

	const checkAnswerValidity = useCallback(
		(answer, questionNum) => {
			const correctAnswer = questionsAndAnswers[questionNum].correctAnswer;

			if (displayQuestion.isCorrectAnswer !== 0) {
				return;
			}

			if (correctAnswer.toString() === answer.toString()) {
				//good answer
				setDisplayQuestion((prevState) => ({
					...prevState,
					isCorrectAnswer: 1,
				}));
				dispatch(saveUserCorrectAnswer());
			} else {
				//bad answer
				setDisplayQuestion((prevState) => ({
					...prevState,
					isCorrectAnswer: -1,
					userAnswerId: answer,
				}));
			}

			setTimeout(() => {
				setDisplayQuestion((prevState) => ({
					...prevState,
					display: false,
					number: prevState.number + 1,
				}));
			}, 2100);
		},

		[displayQuestion.isCorrectAnswer, dispatch]
	);

	const handleTimeIsUp = () => {
		setDisplayQuestion((prevState) => ({
			...prevState,
			timeIsUp: true,
		}));

		setTimeout(() => {
			setDisplayQuestion((prevState) => ({
				...prevState,
				display: false,
				number: prevState.number + 1,
			}));
		}, 2100);
	};

	const history = useHistory();
	useEffect(() => {
		if (displayQuestion.number === questionsAndAnswers.length) {
			history.replace('/result');
			dispatch(authenticateUser());
		}
	}, [displayQuestion.number, history, dispatch]);
	return {
		questionsAndAnswers,
		displayQuestion,
		checkAnswerValidity,
		handleTimeIsUp,
		handleLeaveCountdown,
	};
};

export default useQuestions;
