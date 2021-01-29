import { useEffect, useRef } from 'react';

import gsap from 'gsap';

const useCountdown = (leaveCountdown) => {
	const wrappedElementRef = useRef(null);

	const countdownRef = useRef(null);

	useEffect(() => {
		let i = 3;

		let starTimer = null;

		let endTimer = null;

		const wrappedElement = wrappedElementRef.current;

		const countdown = () => {
			wrappedElement.removeAttribute('class');
			starTimer = setTimeout(() => {
				wrappedElement.classList.add(`wrap-${i}`);
				endTimer = setTimeout(() => {
					i--;

					if (i === -1) {
						leaveCountdown();
					}

					if (i > -1) {
						countdown();
					}
				}, 700);
			}, 800);
		};

		countdown();

		return () => {
			clearTimeout(starTimer);
			clearTimeout(endTimer);
		};
	}, [leaveCountdown]);

	useEffect(() => {
		const countdownElement = countdownRef.current;

		const wrappedElement = wrappedElementRef.current;

		gsap.fromTo(
			wrappedElement,
			{ autoAlpha: 0 },
			{ autoAlpha: 1, duration: 0.6 }
		);
		gsap.fromTo(
			countdownElement,
			{ autoAlpha: 0, y: '+=100' },
			{ autoAlpha: 1, y: '-=100', duration: 0.7, stagger: 0.5 }
		);
	}, []);

	return {
		wrappedElementRef,
		countdownRef,
	};
};

export default useCountdown;
