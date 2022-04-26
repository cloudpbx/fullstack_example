import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LanguageAccordion = (props) => {
	const { languages } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
			{languages.map(language => Object.keys(language).map((label, index) => {
				const moreInfo = language[label];
				return (

					<Accordion key={index} expanded={expanded === label} onChange={handleChange(label)}>

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
									<a href={moreInfo} target="_blank" rel="noreferrer">{`Setting up a ${label} Development Environment`}</a>
							</Typography>
						</AccordionSummary>

						<AccordionDetails>
							<Typography>
								Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
								Aliquam eget maximus est, id dignissim quam.
							</Typography>
						</AccordionDetails>
					</Accordion>
				)
			}))}
    </div>
  );
}

export default LanguageAccordion;
