import React from 'react';
import { Button, Dialog, DialogContent, DialogActions, Grid, Input, Typography, DialogTitle } from '@mui/material';

const FormDialog = (props) => {
	const { open, handleClose, fields, handleFieldsChange, saveLanguage } = props;

	const createField = (name, label) => {
		const value = fields[name];
			return (
				<React.Fragment>
					<Grid container direction="row" alignContent="center" sx={{ margin: 0, marginTop: '3%' }}>
						<Typography variant="body1"><b>{label}</b></Typography>
						&nbsp;&nbsp;
					</Grid>
					<Input
						name={name}
						onChange={handleFieldsChange}
						value={value ? value : ''}
						fullWidth={true}
					/>
				</React.Fragment>
		);
	};

	return (
		<Dialog open={open} onClose={() => handleClose()} fullWidth>
			<DialogTitle>New Language</DialogTitle>

			<DialogContent sx={{ overflowX: 'hidden' }}>
				{createField('name', 'Name')}
				{createField('description', 'Description')}
				{createField('link', 'Link')}
			</DialogContent>

			<DialogActions sx={{ margin: '1rem' }}>
				<Button variant="outlined" onClick={() => handleClose()}>
					CANCEL
				</Button>
				<Button variant="contained" color='primary' autoFocus onClick={saveLanguage} sx={{ marginLeft: '3%' }}>
					ADD
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default FormDialog;
