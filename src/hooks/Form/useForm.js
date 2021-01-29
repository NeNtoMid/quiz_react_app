import { useEffect, useRef, useState } from 'react';

import { useForm as useReactHookForm } from 'react-hook-form';

import { isMobile } from 'mobile-device-detect';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
	authenticateUser,
	saveUserCredentials,
} from './../../store/actions/index';

import gsap from 'gsap';

const authValidation = {
	name: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			name: 'name',
		},
		validation: {
			required: { value: true, message: 'Name is mandatory' },
			minLength: { value: 3, message: 'Name is too short' },
			maxLength: { value: 126, message: 'Name is too long' },
			setValueAs: (value) => value.trim(),
		},
	},

	email: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			name: 'email',
		},
		validation: {
			required: { value: true, message: 'Email is mandatory' },
			minLength: { value: 3, message: 'Email is too short' },
			pattern: {
				// eslint-disable-next-line
				value: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
				message: 'Email is not proper',
			},
			setValueAs: (value) => value.trim(),
		},
	},
};

const useForm = (props) => {
	const setupSvgRef = useRef(null);

	const headerTitleRef = useRef(null);

	useEffect(() => {
		const headerTitleElements = headerTitleRef.current.children;

		gsap.fromTo(
			headerTitleElements,
			{ y: '+=50', opacity: 0 },
			{
				y: '-=50',
				opacity: 1,
				duration: 1,
				ease: 'power3.inOut',
				stagger: 0.5,
			}
		);

		const setupSvgElement = setupSvgRef.current;

		const card1 = setupSvgElement.getElementById('card1');
		const card2 = setupSvgElement.getElementById('card2');
		const card3 = setupSvgElement.getElementById('card3');

		const upperCircle = setupSvgElement.getElementById('upper-circle');
		const midCircle = setupSvgElement.getElementById('mid-circle');
		const lower = setupSvgElement.getElementById('lower-circle');

		const tl = gsap.timeline({
			delay: 1,
			defautls: { duration: 0.8, autoAlhpa: 0 },
		});

		tl.to(lower, { autoAlpha: 1 })
			.fromTo(card1, { y: '+=150' }, { y: '-=150', autoAlpha: 1 })
			.to(midCircle, { autoAlpha: 1 })
			.fromTo(card2, { y: '+=150' }, { y: '-=150', autoAlpha: 1 })
			.to(upperCircle, { autoAlpha: 1 })
			.fromTo(card3, { y: '+=150' }, { y: '-=150', autoAlpha: 1 });

		gsap.to(card1, { y: 10, repeat: -1, duration: 4, yoyo: true, delay: 2 });
	}, []);

	const {
		handleSubmit,
		errors,
		register,
		watch,
		formState,
	} = useReactHookForm();

	const dispatch = useDispatch();

	const handleRegisterData = (data) => {
		dispatch(saveUserCredentials(data));

		dispatch(authenticateUser());
	};

	const isAuth = useSelector((state) => state.user.isAuth);

	const history = useHistory();

	useEffect(() => {
		if (isAuth) {
			history.push('/success');
		}
	}, [isAuth, history]);

	const [inputClasses, setInputClasses] = useState(
		[...Object.keys(authValidation)].map((name) => ({
			name,
			activeClass: false,
		}))
	);

	const handleInputFocus = ({ target: { name } }) => {
		const index = inputClasses.findIndex((el) => el.name === name);

		if (index !== -1) {
			setInputClasses((prevState) => [
				...prevState.map((current, index) =>
					current.name === name
						? { ...current, activeClass: true }
						: { ...current }
				),
			]);
		}
	};

	const formRef = useRef(null);

	const watchAllInputs = watch();

	useEffect(() => {
		let timer;

		if (
			Object.keys(errors).length === 0 &&
			Object.keys(watchAllInputs).every(
				(input) => watchAllInputs[input] !== ''
			) &&
			isMobile &&
			formState.submitCount > 0
		) {
			timer = setTimeout(() => {
				const inputElements = [...formRef.current.children];

				inputElements.forEach((el) => {
					const inputEl = el.children[1];

					if (inputEl) {
						inputEl.blur();
					}
				});
			}, 1200);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [formRef, watchAllInputs, errors, formState]);

	return {
		register,
		errors,
		setupSvgRef,
		formRef,
		headerTitleRef,
		authValidation,
		inputClasses,
		watchAllInputs,
		handleSubmit,
		handleInputFocus,
		handleRegisterData,
	};
};

export default useForm;
