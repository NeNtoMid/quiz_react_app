import React, { lazy, Suspense } from 'react';

import { Switch, Route } from 'react-router-dom';

import Spinner from './../UI/Spinner/Spinner';

import PrivateRoute from './../../hoc/PrivateRoute/PrivateRoute';

const Home = lazy(() => import('./../../components/Home/Home'));

const Form = lazy(() => import('./../../containers/Form/Form'));

const Success = lazy(() => import('./../Success/Success'));

const Questions = lazy(() => import('./../../containers/Questions/Questions'));

const Result = lazy(() => import('./../Result/Result'));

const Error = lazy(() => import('./../Error/Error'));

const Quiz = (props) => {
	return (
		<>
			<Switch>
				<Route exact path='/'>
					<Suspense fallback={<Spinner />}>
						<Home />
					</Suspense>
				</Route>

				<Route exact path='/form'>
					<Suspense fallback={<Spinner />}>
						<Form />
					</Suspense>
				</Route>

				<PrivateRoute exact path='/success'>
					<Success />
				</PrivateRoute>

				<PrivateRoute exact path='/questions'>
					<Questions />
				</PrivateRoute>

				<PrivateRoute exact path='/result'>
					<Result />
				</PrivateRoute>

				<Route path='/'>
					<Suspense fallback={<Spinner />}>
						<Error />
					</Suspense>
				</Route>
			</Switch>
		</>
	);
};

export default Quiz;
