import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import userReducer from './store/reducers/user';

const rootReducer = combineReducers({
	user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware())
);
