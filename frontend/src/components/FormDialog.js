import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Typography } from '@mui/material';

const FormDialog = (props) => {
	const { open, handleClose, fields, handleFieldsChange, saveLanguage, addNew, namesList } = props;

	const createField = (name, label) => {
		const value = fields[name];
		const error = (name === 'name') && (namesList.indexOf(value.toLowerCase()) !== -1);
		const text = 'The language name is already taken. Please choose another one.';
			return (
				<React.Fragment>
					<Grid container direction="row" alignContent="center" sx={{ margin: 0, marginTop: '3%' }}>
						<Typography variant="body1"><b>{label}</b></Typography>
						&nbsp;&nbsp;
					</Grid>
					<TextField
						error={error}
						helperText={error && text}
						name={name}
						onChange={(e) => handleFieldsChange(e)}
						value={value ? value : ''}
						fullWidth={true}
						rows={4}
						multiline={name === 'description'}
					/>
				</React.Fragment>
		);
	};

	return (
		<Dialog open={open} onClose={() => handleClose()} fullWidth>
			<DialogTitle>{addNew ? 'New' : 'Edit' } Language</DialogTitle>

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
					{addNew ? 'SAVE' : 'EDIT'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default FormDialog;
