import { useEffect, useReducer } from 'react';
import { update_languages_list } from '../lib/Api';
import Language from '../classes/Language';

/** Reducer accepts an action type and returns the current state, dispatch pair. */

/** Action types */
const SET_LANGUAGES = 'SET_LANGUAGES';
const SET_EXPANDED = 'SET_EXPANDED';
const SET_OPEN = 'SET_OPEN';
const SET_FIELDS = 'SET_FIELDS';

/** Reducer switch statements */
const reducer = (state, action) => {
	switch (action.type) {
		case SET_LANGUAGES:
			return { ...state, languages: action.value };
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

const defaultLanguages = [
	{ name: 'C#',
	 	description: '',
		link: 'https://cloud.google.com/dotnet/docs/setup'},
];

/** Return App initial state */
const initApp = () => {
	return {
		languages: [],
		expanded: '',
		open: false,
		fields: new Language(),
	};
};

const useAppData = () => {
	const [state, dispatch] = useReducer(reducer, initApp());

	// Set methods for each state
	const setLanguages = (languages) => dispatch({ type: SET_LANGUAGES, value: languages });
	const setExpanded = (expanded) => dispatch({ type: SET_EXPANDED, value: expanded });
	const setOpen = (open) => dispatch({ type: SET_OPEN, value: open });
	const setFields = (fields) => dispatch({ type: SET_FIELDS, value: fields });

	useEffect(() => {
		update_languages_list(defaultLanguages[0]).then(data => {
			setLanguages([new Language(data)]);
		}).catch(err => console.log('update_language_list::err - ', err));
	}, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setOpen(false);
		setFields(new Language());
	}

	const handleFieldsChange = () => {
		setFields({ ...state.fields, [event.target.name]: event.target.value });
	}

	const saveLanguage = () => {
		const newLanguage = {...state.fields};
		update_languages_list(newLanguage).then(data => {
			setLanguages([...state.languages, new Language(data)])
			setOpen(false);
			setFields(new Language());
		}).catch(err => console.log('update_language_list::err - ', err));
	}

	return {
		state,
		handleChange,
		handleOpen,
		handleClose,
		handleFieldsChange,
		saveLanguage,
	}
};

export default useAppData;
