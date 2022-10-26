import { Button } from '@mui/material';
import React, { useState } from 'react';
import LoadAdmin from './loadAdmin';

export default function Admin() {
	const [productLoaded, setProductLoaded] = useState();
	const [loading, setLoading] = useState(false);

	const handleProductLoad = async () => {
		const url =
			'https://test-allen-wesley.s3.us-west-1.amazonaws.com/quincy_1_order.json';

		try {
			const response = await fetch(url);
			const json = await response.json();
			setProductLoaded(json);
			setLoading(true);
		} catch (error) {
			console.log('error', error);
		}
	};

	return (
		<>
			{loading ? (
				<LoadAdmin product={productLoaded} />
			) : (
				<Button onClick={handleProductLoad}>Show 3D Product</Button>
			)}
		</>
	);
}
