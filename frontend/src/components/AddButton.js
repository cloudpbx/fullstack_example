import React from 'react';
import { Button, Grid } from '@mui/material';

const AddButton = (props) => {
	return (
		<Grid container direction='row-reverse' sx={{ marginTop: '5%' }}>
			<Button variant='contained'>Add New Language</Button>
		</Grid>
	)
};

export default AddButton;
