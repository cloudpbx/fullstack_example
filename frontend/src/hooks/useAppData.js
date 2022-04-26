import { useReducer } from 'react';

/** Reducer accepts an action type and returns the current state, dispatch pair. */

/** Action types */
const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP';

/** Reducer switch statements */
const reducer = (state, action) => {
	switch (action.type) {
		case SET_ACTIVE_STEP:
			return { ...state, activeStep: action.value };
		default:
			throw new Error(`App::reducer::error - Invalid action type: ${action.type}`);
	}
};

const languages = [
	{'C#': 'https://cloud.google.com/dotnet/docs/setup'},
	{'Go': 'https://cloud.google.com/go/docs/setup'},
	{'Java': 'https://cloud.google.com/java/docs/setup'},
	{'Node.js': 'https://cloud.google.com/nodejs/docs/setup'},
	{'PHP': 'https://cloud.google.com/dotnet/php/setup'},
	{'Python': 'https://cloud.google.com/python/docs/setup'},
	{'Ruby': 'https://cloud.google.com/ruby/docs/setup'},
];

/** Return App initial state */
const initApp = () => {
	return {
		activeStep: 0,
	};
};

const useAppData = () => {
	const [state, dispatch] = useReducer(reducer, initApp());

	// Set methods for each state
	const setActiveStep = (activeStep) => dispatch({ type: SET_ACTIVE_STEP, value: activeStep });

	return {
		state,
		languages,
	}
};

export default useAppData;
