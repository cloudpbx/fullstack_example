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
	{ label: 'Go', link: 'https://cloud.google.com/go/docs/setup'},
	{ label: 'Java', link: 'https://cloud.google.com/java/docs/setup'},
	{ label: 'Node.js', link: 'https://cloud.google.com/nodejs/docs/setup'},
	{ label: 'PHP', link: 'https://cloud.google.com/php/docs/setup'},
	{ label: 'Python', link: 'https://cloud.google.com/python/docs/setup'},
	{ label: 'Ruby', link: 'https://cloud.google.com/ruby/docs/setup'},
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
