import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Language = (props) => {
	const { languages, handleChange, expanded } = props;

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
								For more information see
								<a href={link} target="_blank" rel="noreferrer">{`Setting up a ${label} Development Environment`}</a>
							</Typography>
						</AccordionSummary>

						<AccordionDetails>
							{description ? description : 'Add a description ...'}
						</AccordionDetails>

						<AccordionActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button variant="outlined" color='error' onClick={() => console.log('delete')}>
								DELETE
							</Button>
							<Button variant="contained" color='secondary' autoFocus onClick={() => console.log('edit')}>
								EDIT
							</Button>
						</AccordionActions>
					</Accordion>
				);
			})}
    </div>
  );
};

export default Language;
