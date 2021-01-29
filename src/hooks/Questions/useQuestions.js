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
		isClicked: false,
		isCorrect: '',
	});

	const handleLeaveCountdown = useCallback(() => {
		setDisplayQuestion((prevState) => ({
			...prevState,
			display: true,
			isClicked: false,
			isCorrect: '',
		}));
	}, []);

	const dispatch = useDispatch();

	const checkAnswerValidity = useCallback(
		(answer, questionNum) => {
			const correctAnswer = questionsAndAnswers[questionNum].correctAnswer;

			if (displayQuestion.isClicked) {
				return;
			}

			if (
				answer.toString() === correctAnswer.toString() &&
				!displayQuestion.isClicked
			) {
				setDisplayQuestion((prevState) => ({
					...prevState,
					isClicked: true,
					isCorrect: correctAnswer.toString(),
				}));

				dispatch(saveUserCorrectAnswer());
			} else if (
				answer.toString() !== correctAnswer.toString() &&
				!displayQuestion.isClicked
			) {
				setDisplayQuestion((prevState) => ({
					...prevState,
					isClicked: true,
					isCorrect: answer.toString(),
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
		[displayQuestion.isClicked, dispatch]
	);

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
		handleLeaveCountdown,
	};
};

export default useQuestions;
