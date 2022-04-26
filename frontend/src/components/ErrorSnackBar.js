import React from 'react';
import { Snackbar, Typography, Alert } from '@mui/material';

function ErrorSnackbar(props) {
	const { error, onClose } = props;

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={error !== ''}
			onClose={onClose}
		>
			<Alert variant="filled" severity="error" onClose={onClose}>
				<Typography variant="body1"><b>{error}</b></Typography>
			</Alert>
		</Snackbar>
	);
}

export default ErrorSnackbar;
