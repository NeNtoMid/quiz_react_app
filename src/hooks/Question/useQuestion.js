import { useRef, useEffect } from 'react';

import gsap from 'gsap';

const useQuestion = (questNum, click, isClicked) => {
	const timerRef = useRef(null);

	const timeLabelRef = useRef(null);

	const questionWrapperRef = useRef(null);

	useEffect(() => {
		const TIME_LIMIT = 5;

		let timePassed = -1;

		let timerInterval = null;

		let timeLeft = TIME_LIMIT;

		const FULL_DASH_ARRAY = 283;

		let timer = timerRef.current;
		let timeLabel = timeLabelRef.current;

		const timeIsUp = () => {
			clearInterval(timerInterval);
		};

		const startTimer = () => {
			timerInterval = setInterval(() => {
				timePassed = timePassed += 1;
				timeLeft = TIME_LIMIT - timePassed;

				timeLabel.innerHTML = formatTime(timeLeft);

				setCircleDasharray();

				if (timeLeft === -1 && !isClicked) {
					click('', 0);
					timeIsUp();
				}
			}, 1000);
		};

		const formatTime = (time) => {
			const minutes = Math.floor(time / 60);

			let seconds = time % 60;

			if (seconds < 10) {
				seconds = `0${seconds}`;
			}

			return `${minutes}:${seconds}`;
		};

		const calculateTimeFraction = () => {
			const rawTimeFraction = timeLeft / TIME_LIMIT;
			return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
		};

		const setCircleDasharray = () => {
			const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY < 0
				? 0
				: calculateTimeFraction() * FULL_DASH_ARRAY
			).toFixed(0)} 283`;

			timer.setAttribute('stroke-dasharray', circleDasharray);
		};

		startTimer();

		return () => {
			clearInterval(timerInterval);
		};
	}, [isClicked, click]);

	useEffect(() => {
		const questionWrapperElement = questionWrapperRef.current;

		gsap.fromTo(
			questionWrapperElement,
			{ autoAlpha: 0, y: '+=20' },
			{ autoAlpha: 1, y: '-=20', duration: 0.8 }
		);
	}, []);

	return {
		timerRef,
		timeLabelRef,
		questionWrapperRef,
	};
};

export default useQuestion;
