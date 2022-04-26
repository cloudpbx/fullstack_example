import React from 'react';
import { Button, Dialog, DialogContent, DialogActions, Grid, Input, Typography } from '@mui/material';

const FormDialog = (props) => {
	const { open, handleClose } = props;

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>

			<DialogContent sx={{ overflowX: 'hidden' }}>

				<Grid container direction="row" alignContent="center" style={{ margin: 0 }}>
					<Typography variant="body1"><b>Language</b></Typography>
					&nbsp;&nbsp;
					<Input
						name='language'
						value={''}
						fullWidth={true}
					/>
				</Grid>

			</DialogContent>

			<DialogActions sx={{ marginBottom: '1rem' }}>
				<Button variant="outlined" onClick={handleClose}>
					CANCEL
				</Button>
				<Button variant="outlined" autoFocus onClick={() => console.log('delete')}>
					DELETE
				</Button>
				<Button variant="contained" color='primary' autoFocus onClick={() => console.log('Add')}>
					ADD
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default FormDialog;
