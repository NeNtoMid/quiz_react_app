import { useRef, useEffect } from 'react';

import gsap from 'gsap';

import { useHistory } from 'react-router-dom';

const useHome = () => {
	const homeSvgRef = useRef(null);

	const headerRef = useRef(null);

	useEffect(() => {
		const headerElements = headerRef.current.children;

		const homeSvgElement = homeSvgRef.current;

		const breakLine = homeSvgElement.getElementById('break_line');
		const character = homeSvgElement.getElementById('character');
		const clip1 = homeSvgElement.getElementById('clip1');
		const clip2 = homeSvgElement.getElementById('clip2');
		const clip3 = homeSvgElement.getElementById('clip3');
		const clip4 = homeSvgElement.getElementById('clip4');
		const clipQuestion = homeSvgElement.getElementById('clip_question');
		const board = homeSvgElement.getElementById('board');

		gsap.fromTo(
			headerElements,
			{ y: '+=30', opacity: 0 },
			{ y: '-=30', duration: 1, opacity: 1, stagger: 0.5 }
		);

		const tl = gsap.timeline({
			defaults: { opacity: 0, duration: 0.3 },
		});

		tl.from(breakLine, { opacity: 0, duration: 0.4, transformOrigin: 'center' })
			.fromTo(board, { y: '-=150' }, { y: '+=150', opacity: 1, duration: 0.7 })
			.fromTo(clip1, { y: '+=200' }, { y: '-=200', opacity: 1 })
			.fromTo(clip2, { y: '+=200' }, { y: '-=200', opacity: 1 })
			.fromTo(clip3, { y: '+=200' }, { y: '-=200', opacity: 1 })
			.fromTo(clip4, { y: '+=200' }, { y: '-=200', opacity: 1 })
			.fromTo(clipQuestion, { y: '+=200' }, { y: '-=200', opacity: 1 })
			.fromTo(character, { scale: 0 }, { scale: 1, opacity: 1 });

		gsap.to(clip1, { y: 10, duration: 2, repeat: -1, yoyo: true, delay: 4.2 });
		gsap.to(clip2, { y: 10, duration: 2, repeat: -1, yoyo: true, delay: 4.4 });
		gsap.to(clip3, { y: 10, duration: 2, repeat: -1, yoyo: true, delay: 4.6 });
		gsap.to(clip4, { y: 10, duration: 2, repeat: -1, yoyo: true, delay: 4.8 });
		gsap.to(clipQuestion, {
			y: 10,
			duration: 2,
			repeat: -1,
			yoyo: true,
			delay: 5,
		});
	}, []);

	const history = useHistory();

	const handleRedirectToForm = () => {
		history.push('/form');
		history.go(0);
	};

	return {
		homeSvgRef,
		headerRef,
		handleRedirectToForm,
	};
};

export default useHome;
