import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import Language from './components/Language';
import useAppData from './hooks/useAppData';
import AddButton from './components/AddButton';
import FormDialog from './components/FormDialog';
import ErrorSnackbar from './components/ErrorSnackBar';

const StyledGridWrapper = styled(Grid)((props) => ({
	margin: '0.5rem',
	justifyContent: 'center',
	width: '600px',
}));

const StyledBoxContainer = styled(Box)((props) => ({
	padding: '1rem',
	boxShadow: '0 5px 15px 0 hsla(0%, 0%, 0%, 0.15)'
}));

function App() {
	const { state, handleChange, handleOpen, handleClose, handleFieldsChange, handleErrorClose, saveLanguage } = useAppData();
	const { languages, expanded, open, fields, error } = state;

  return (
		<StyledGridWrapper container direction='column'>
			<StyledBoxContainer>

				<Language
					languages={languages}
					handleChange={handleChange}
					expanded={expanded}
				/>
				<AddButton
					onClickOpen={handleOpen}
				/>

				<FormDialog
					open={open}
					handleClose={handleClose}
					fields={fields}
					handleFieldsChange={handleFieldsChange}
					saveLanguage={saveLanguage}
				/>
			</StyledBoxContainer>
			<ErrorSnackbar error={error} onClose={handleErrorClose} />
		</StyledGridWrapper>
  );
}

export default App;
