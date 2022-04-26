import { useReducer } from 'react';

/** Reducer accepts an action type and returns the current state, dispatch pair. */

/** Action types */
const SET_EXPANDED = 'SET_EXPANDED';
const SET_OPEN = 'SET_OPEN';
const SET_FIELDS = 'SET_FIELDS';

/** Reducer switch statements */
const reducer = (state, action) => {
	switch (action.type) {
		case SET_EXPANDED:
			return { ...state, expanded: action.value };
		case SET_OPEN:
			return { ...state, open: action.value };
		case SET_FIELDS:
			return { ...state, fields: action.value };
		default:
			throw new Error(`App::reducer::error - Invalid action type: ${action.type}`);
	}
};

const languages = [
	{ label: 'C#', link: 'https://cloud.google.com/dotnet/docs/setup'},
];

const defaultFields = {
	'name': '',
	'description': '',
	'link': '',
};

/** Return App initial state */
const initApp = () => {
	return {
		expanded: '',
		open: false,
		fields: defaultFields,
	};
};

const useAppData = () => {
	const [state, dispatch] = useReducer(reducer, initApp());

	// Set methods for each state
	const setExpanded = (expanded) => dispatch({ type: SET_EXPANDED, value: expanded });
	const setOpen = (open) => dispatch({ type: SET_OPEN, value: open });
	const setFields = (fields) => dispatch({ type: SET_FIELDS, value: fields });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setOpen(false);
		setFields(defaultFields);
	}

	const handleFieldsChange = () => {
		setFields({ ...state.fields, [event.target.name]: event.target.value });
	}

	return {
		state,
		languages,
		handleChange,
		handleOpen,
		handleClose,
		handleFieldsChange,
	}
};

export default useAppData;
