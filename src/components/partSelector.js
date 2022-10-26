import { Button, Box, Typography } from '@mui/material';
import React from 'react';

const PartSelector = (props) => {
	const { handleSelectedPart, selectedPart, items } = props;

	const handleSetSelectedPart = (name) => {
		if (name) {
			handleSelectedPart(name);
		}
	};

	return (
		<Box
			style={{
				justifyContent: 'space-between',
			}}
		>
			<Box display={'flex'} flexWrap={'wrap'}>
				{items.map((item, index) =>
					item.name.value === selectedPart ? (
						<Button
							key={item.name.name}
							onClick={() => handleSetSelectedPart(item.name.value)}
							style={{
								backgroundColor: '#12141d',
								color: '#fff',
								...(index !== 0
									? { marginLeft: '5px' }
									: { marginLeft: 'unset' }),
							}}
						>
							{item.name.name}
						</Button>
					) : (
						<Button
							key={item.name.name}
							onClick={() => handleSetSelectedPart(item.name.value)}
							style={{
								backgroundColor: '#fff',
								color: '#12141d',
								border: '.5px solid #12141d',
								...(index !== 0
									? { marginLeft: '5px' }
									: { marginLeft: 'unset' }),
							}}
						>
							{item.name.name}
						</Button>
					)
				)}
			</Box>
		</Box>
	);
};

export default PartSelector;
