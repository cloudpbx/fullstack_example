import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@mui/material';

const OpenButton = (props) => {
	const { text, onClick, } = props;

	return (
		<Grid
			container
			direction='row-reverse'
			sx={{ marginTop: '5%' }}
		>
			<Button
				variant='contained'
				disableElevation
				onClick={onClick}
			>
				{text}
			</Button>
		</Grid>
	);
};

OpenButton.propTypes = {
	text: PropTypes.string,
	onClick: PropTypes.func.isRequired
};

export default OpenButton;
