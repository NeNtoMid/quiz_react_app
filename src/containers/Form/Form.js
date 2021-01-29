import React, { useMemo } from 'react';

import { ReactComponent as ConfirmSvg } from './../../assets/images/form_confirm.svg';

import { ReactComponent as CancelSvg } from './../../assets/images/form_cancel.svg';

import { ReactComponent as SetupSvg } from './../../assets/images/form_setup.svg';

import { isMobile } from 'mobile-device-detect';

import classes from './Form.module.css';

import useForm from './../../hooks/Form/useForm';

import Button from './../../components/UI/Button/Button';

import Pagination from './../../components/UI/Pagination/Pagination';

const Form = (props) => {
	const {
		register,
		setupSvgRef,
		headerTitleRef,
		authValidation,
		errors,
		inputClasses,
		formRef,
		handleSubmit,
		handleRegisterData,
		handleInputFocus,
	} = useForm();

	const header = useMemo(
		() => (
			<header className={classes.header} ref={headerTitleRef}>
				<h1 className={classes.headerTitle}>Before starting</h1>
				<p className={classes.headerDescription}>Fill some information</p>
			</header>
		),
		[headerTitleRef]
	);

	const inputs = Object.keys(authValidation).map((validation) => {
		const formValidation = authValidation[validation];
		return (
			<section
				className={
					inputClasses.find((el) => el.name === validation).activeClass
						? classes.inputActive
						: null
				}
				key={validation}
			>
				<p style={{ marginBottom: '0.5rem' }}>
					{validation.charAt(0).toUpperCase() + validation.slice(1)}
				</p>

				<input
					type={formValidation.elementConfig.type}
					name={formValidation.elementConfig.name}
					onFocus={handleInputFocus}
					ref={register(formValidation.validation)}
				/>
				{errors[validation] ? (
					<>
						<CancelSvg className={classes.CancelSvg} />
						<p className={classes.errorMessage}>
							{errors[validation].message}
						</p>{' '}
					</>
				) : Object.keys(errors).length > 0 ? (
					<ConfirmSvg className={classes.ConfirmSvg} />
				) : null}
			</section>
		);
	});

	return (
		<div className={classes.Form}>
			{header}

			<main className={classes.main}>
				<form
					className={classes.form}
					onSubmit={handleSubmit(handleRegisterData)}
					ref={formRef}
				>
					{inputs}

					<Button click={() => {}} content={'Proceed'} type='submit' />
				</form>

				<Pagination pageNumber={2} />

				{(inputClasses.every((el) => !el.activeClass) && isMobile) ||
				!isMobile ? (
					<SetupSvg ref={setupSvgRef} className={classes.SetupSvg} />
				) : null}
			</main>
		</div>
	);
};

export default Form;
