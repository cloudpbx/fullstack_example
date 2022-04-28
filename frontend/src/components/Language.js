import React from 'react';
import PropTypes from 'prop-types';
import { Accordion,
				 AccordionSummary,
				 AccordionDetails,
				 AccordionActions,
				 Button,
				 Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Language = (props) => {
	const { languages,
					handleChange,
					expanded,
					handleLanguageClick,
					removeLanguage, } = props;

  return (
    <div>
			{languages.map((language, index) => {
				const label = language['name'];
				const description = language['description'];
				const link = language['link'];

				return (
					<Accordion
						key={index}
						expanded={expanded === label}
						onChange={handleChange(label)}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header"
						>
							<Typography sx={{ width: '33%', flexShrink: 0 }}>
								{label}
							</Typography>
							<Typography sx={{ color: 'text.secondary' }}>
								For more information see {' '}
								<a href={link} target="_blank" rel="noreferrer">{`Setting up a ${label} Development Environment`}</a>
							</Typography>
						</AccordionSummary>

						<AccordionDetails>
							<Typography variant='body2' paragraph gutterBottom>
								{description ? description : 'Add a description ...'}
							</Typography>
						</AccordionDetails>

						<AccordionActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button variant="outlined" color='error' onClick={(e,) => removeLanguage(e, language, index)}>
								DELETE
							</Button>
							<Button variant="contained" color='secondary' autoFocus onClick={(e) => handleLanguageClick(e, language)}>
								EDIT
							</Button>
						</AccordionActions>
					</Accordion>
				);
			})}
    </div>
  );
};

Language.propTypes = {
	languages: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleChange: PropTypes.func.isRequired,
	expanded: PropTypes.string,
	handleLanguageClick: PropTypes.func.isRequired,
	removeLanguage: PropTypes.func.isRequired,
};

export default Language;
