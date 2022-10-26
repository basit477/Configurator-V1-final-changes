import { Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid #777777`,
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
	({ theme }) => ({
		'& .MuiAccordionSummary-content': {
			marginLeft: theme.spacing(0.5),
			'& p': {
				fontSize: '0.8rem',
				display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                textTransform: "uppercase"
			},
		},
	})
);

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
	padding: '10px !important',
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Accordions = (props) => {
	const { accordionName, accordionDetails, defaultOpen } = props;
	const [expanded, setExpanded] = useState();

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	return (
		<Accordion
			expanded={defaultOpen || expanded === accordionName}
			onChange={handleChange(accordionName)}
			style={{
				marginTop: '10px',
				...(expanded === accordionName
					? {
							backgroundColor: '#12141d',
							color: '#fff',
					  }
					: {
							backgroundColor: '#fff',
					  }),
			}}
		>
			<AccordionSummary
				aria-controls='panel1d-content'
				id='panel1d-header'
				expandIcon={
					expanded === accordionName ? (
						<RemoveIcon style={{ color: '#fff', fontSize: "15px" }} />
					) : (
						<AddIcon style={{ color: '#12141d', fontSize: "15px" }} />
					)
				}
			>
				<Typography>{accordionName}</Typography>
			</AccordionSummary>
			<AccordionDetails
				style={{
					backgroundColor: '#fff',
					padding: '15px',
				}}
			>
				{accordionDetails}
			</AccordionDetails>
		</Accordion>
	);
};

export default Accordions;
