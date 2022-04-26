import { useReducer } from 'react';

/** Reducer accepts an action type and returns the current state, dispatch pair. */

/** Action types */
const SET_EXPANDED = 'SET_EXPANDED';

/** Reducer switch statements */
const reducer = (state, action) => {
	switch (action.type) {
		case SET_EXPANDED:
			return { ...state, expanded: action.value };
		default:
			throw new Error(`App::reducer::error - Invalid action type: ${action.type}`);
	}
};

const languages = [
	{ label: 'C#', link: 'https://cloud.google.com/dotnet/docs/setup'},
];

/** Return App initial state */
const initApp = () => {
	return {
		expanded: '',
	};
};

const useAppData = () => {
	const [state, dispatch] = useReducer(reducer, initApp());

	// Set methods for each state
	const setExpanded = (expanded) => dispatch({ type: SET_EXPANDED, value: expanded });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

	return {
		state,
		languages,
		handleChange,
	}
};

export default useAppData;
