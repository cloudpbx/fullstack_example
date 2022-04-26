import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import LanguageAccordion from './components/LanguageAccordion';
import useAppData from './hooks/useAppData';

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
	const { state, languages } = useAppData();
	console.log('languages', languages);

  return (
		<StyledGridWrapper container direction='column'>
			<StyledBoxContainer>

			<LanguageAccordion />

			</StyledBoxContainer>
		</StyledGridWrapper>
  );
}

export default App;
