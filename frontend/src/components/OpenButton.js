import React from 'react';
import { Button, Grid } from '@mui/material';

const AddButton = (props) => {
	const { onClickOpen, } = props;

	return (
		<Grid
			container
			direction='row-reverse'
			sx={{ marginTop: '5%' }}
		>
			<Button
				variant='contained'
				disableElevation
				onClick={onClickOpen}
			>
				Add New Language
			</Button>
		</Grid>
	);
};

export default AddButton;
