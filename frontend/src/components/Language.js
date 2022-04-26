import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Language = (props) => {
	const { languages, handleChange, expanded } = props;

  return (
    <div>
			{languages.map((language, index) => {
				const label = language['name'];
				const link = language['link'];

				if (expanded === label) {
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
						</Accordion>
					)
				}

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
					</Accordion>
				)

			})}
    </div>
  );
}

export default Language;
