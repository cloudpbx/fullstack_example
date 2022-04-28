import React from 'react';
import PropTypes from 'prop-types';
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

ErrorSnackbar.propTypes = {
	error: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired
};

export default ErrorSnackbar;
