import {
	AUTHENTICATE_USER,
	SAVE_USER_CREDENTIALS,
	SAVE_USER_CORRECT_ANSWER,
	RESET_USER_SCORE,
} from './actionsType';

export const authenticateUser = () => {
	return {
		type: AUTHENTICATE_USER,
	};
};

export const saveUserCredentials = (data) => {
	return {
		type: SAVE_USER_CREDENTIALS,
		payload: {
			data,
		},
	};
};

export const saveUserCorrectAnswer = () => {
	return {
		type: SAVE_USER_CORRECT_ANSWER,
	};
};

export const resetUserScore = () => {
	return {
		type: RESET_USER_SCORE,
	};
};
