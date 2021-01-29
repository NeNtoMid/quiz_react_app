import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import emailjs from 'emailjs-com';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { resetUserScore } from './../../store/actions/index';

const useResult = () => {
	const medalSvgRef = useRef(null);

	const score = useSelector((state) => state.user.score);

	const data = useSelector((state) => state.user.data);

	const history = useHistory();

	const dispatch = useDispatch();

	const handleRedirectToQuestions = () => {
		dispatch(resetUserScore());
		history.replace('/questions');
	};

	useEffect(() => {
		const medalSvgElement = medalSvgRef.current;

		const goldPlate = medalSvgElement.getElementById('gold_plate');

		const redBars = medalSvgElement.getElementById('red_bars');

		gsap.fromTo(
			goldPlate,
			{ autoAlpha: 0, y: '+=100' },
			{ autoAlpha: 1, y: '-=100', duration: 0.8 }
		);

		gsap.fromTo(
			redBars,
			{ autoAlpha: 0, y: '+=100' },
			{ autoAlpha: 1, y: '-=100', duration: 1, delay: 0.7 }
		);

		gsap.to(medalSvgElement, {
			y: 6,
			yoyo: true,
			repeat: -1,
			repeatDelay: 0.5,
			duration: 4,
		});
	}, []);

	useEffect(() => {
		const sendEmail = async () => {
			const sendData = {
				to_name: data.name,
				from_name: 'Kacper Sarnowski',
				message: score,
				to_email: data.email,
			};

			try {
				await emailjs.send(
					'service_iiybh3t',
					'template_aj6oivu',
					sendData,
					'user_8Yr93MfCkFrCv4YiHoxUQ'
				);
			} catch ({ message }) {
				console.log(message);
			}
		};

		sendEmail();
		// eslint-disable-next-line
	}, []);
	return { medalSvgRef, score, handleRedirectToQuestions };
};

export default useResult;
