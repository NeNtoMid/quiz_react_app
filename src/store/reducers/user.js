import {
	AUTHENTICATE_USER,
	SAVE_USER_CREDENTIALS,
	SAVE_USER_CORRECT_ANSWER,
	RESET_USER_SCORE,
} from './../actions/actionsType';

const initialState = {
	isAuth: false,
	data: {},
	score: 0,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE_USER:
			return { ...state, isAuth: true };

		case SAVE_USER_CREDENTIALS:
			return { ...state, data: action.payload.data };

		case SAVE_USER_CORRECT_ANSWER:
			return { ...state, score: state.score + 1, isAuth: true };

		case RESET_USER_SCORE:
			return { ...state, score: 0, isAuth: true };

		default:
			return state;
	}
};

export default userReducer;
