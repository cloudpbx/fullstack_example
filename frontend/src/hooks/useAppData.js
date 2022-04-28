import { useEffect, useReducer } from 'react';
import { get_languages_list, remove_language, update_language, update_languages_list } from '../lib/Api';
import { isEmptyString, isValidUrl } from '../helpers/validationHelpers';
import Language from '../classes/Language';

/** Reducer accepts an action type and returns the current state, dispatch pair. */

/** Action types */
const SET_LANGUAGES = 'SET_LANGUAGES';
const SET_EXPANDED = 'SET_EXPANDED';
const SET_OPEN = 'SET_OPEN';
const SET_FIELDS = 'SET_FIELDS';
const SET_ERROR = 'SET_ERROR';
const SET_ADD_NEW = 'SET_ADD_NEW';

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
		case SET_ERROR:
			return { ...state, error: action.value };
		case SET_ADD_NEW:
			return { ...state, addNew: action.value };
		default:
			throw new Error(`App::reducer::error - Invalid action type: ${action.type}`);
	}
};

/** Some constants */
const defaultLanguages = [
	{
		name: 'C#',
	 	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		link: 'https://cloud.google.com/dotnet/docs/setup',
	},
];

const defaultFields = {
	name: '',
	description: '',
	link:'',
};

const stringAttr = ['name', 'description', 'link'];

/** Return App initial state */
const initApp = () => {
	return {
		languages: [],
		expanded: '',
		open: false,
		fields: defaultFields,
		error: '',
		addNew: false,
	};
};

const useAppData = () => {
	const [state, dispatch] = useReducer(reducer, initApp());

	// Set methods for each state
	const setLanguages = (languages) => dispatch({ type: SET_LANGUAGES, value: languages });
	const setExpanded = (expanded) => dispatch({ type: SET_EXPANDED, value: expanded });
	const setOpen = (open) => dispatch({ type: SET_OPEN, value: open });
	const setFields = (fields) => dispatch({ type: SET_FIELDS, value: fields });
	const setError = (error) => dispatch({ type: SET_ERROR, value: error });
	const setAddNew = (addNew) => dispatch({ type: SET_ADD_NEW, value: addNew });

	const languageNamesList = state.languages.map(language => language.name.toLowerCase());

	useEffect(() => {
		get_languages_list().then(data => {
			console.log('data', data);
			setLanguages(data);
			if (!data.length) {
				update_languages_list(defaultLanguages[0]).then(data => {
					setLanguages([new Language(data)]);
				}).catch(err => console.log('update_language_list::err - ', err));
			}
		}).catch(err => console.log('get_language_list::err - ', err));
	}, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

	const handleOpen = () => {
		setExpanded('');
		setOpen(true);
		setAddNew(true);
	};

	const handleClose = () => {
		setOpen(false);
		setFields(defaultFields);
	};

	const handleFieldsChange = (event) => {
		setFields({ ...state.fields, [event.target.name]: event.target.value });
	};

	const handleErrorClose = () => setError('');

	const handleLanguageClick = (e, item) => {
		setFields(item);
		setAddNew(false);
		setOpen(true);
	};

	const saveLanguage = () => {
		if (state.addNew && languageNamesList.indexOf(state.fields.name.toLowerCase()) !== -1) {
			setError('The language name is already taken. Please choose another one.');
			return;
		}
		for (const attr in state.fields) {
			if (stringAttr.includes(attr) && isEmptyString(state.fields[attr])) {
				setError(`Please fill in the '${attr}' field.`);
				return;
			};
		};
		if (!isValidUrl(state.fields.link)) {
			setError('Please provide a valid link.');
			return;
		};
		if (state.addNew) {
			update_languages_list(state.fields).then(data => {
				setLanguages(([...state.languages, new Language(data)]));
				handleClose();
			}).catch(err => console.log('update_language_list::err - ', err));
		} else {
			update_language(state.fields.id, state.fields).then(data => {
				console.log('data edit: ', data);
				const index = state.languages.findIndex(item => item.id === state.fields.id);
				const newList = [...state.languages];
				newList[index] = data;
				setLanguages(newList);
				handleClose();
			}).catch(err => console.log('update_language::err - ', err));
		};
	};

	const removeLanguage = (e, language, index) => {
		remove_language(language.id).then((data) => {
			let newLanguages = [...state.languages];
			newLanguages.splice(index, 1);
			setExpanded('');
			setLanguages(newLanguages);
		}).catch(err => console.log('remove_language::err - ', err));
	}

	return {
		state,
		languageNamesList,
		handleChange,
		handleOpen,
		handleClose,
		handleFieldsChange,
		handleErrorClose,
		handleLanguageClick,
		saveLanguage,
		removeLanguage,
	};
};

export default useAppData;
