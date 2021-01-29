import { useEffect, useRef } from 'react';

import { useHistory } from 'react-router-dom';

import {} from './../../store/actions/index';

import gsap from 'gsap';

const useSuccess = () => {
	const successSvgRef = useRef(null);

	const headerRef = useRef(null);

	useEffect(() => {
		const headerElements = headerRef.current.children;

		const successSvgElement = successSvgRef.current;

		gsap.fromTo(
			headerElements,
			{ y: '+=50', opacity: 0 },
			{ y: '-=50', opacity: 1, duration: 1, stagger: 0.5, ease: 'power3.inOut' }
		);

		gsap.fromTo(
			successSvgElement,
			{ y: '+=60', autoAlpha: 0 },
			{
				y: '-=60',
				autoAlpha: 1,
				duration: 0.9,

				delay: 1.2,
			}
		);
	}, []);

	const history = useHistory();

	const handleRedirectToQuestions = () => {
		history.push('/questions');
	};

	return { successSvgRef, headerRef, handleRedirectToQuestions };
};

export default useSuccess;
