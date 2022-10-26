import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Box, Divider, Typography } from '@mui/material';
import { Html } from '@react-three/drei';
import Model from './model';
import CircularProgress from '@mui/material/CircularProgress';
import types from './data.json';

const Loader = () => {
	return (
		<Html center>
			<Box>
				<CircularProgress style={{ color: '#12141d' }} />
			</Box>
		</Html>
	);
};

const LoadAdmin = ({ product }) => {
	const allItems = product?.productDetails?.items;

	return (
		<>
			<Box display={'flex'}>
				<Box padding={'30px'} style={{ width: '60%', position: 'relative' }}>
					<Box
						style={{
							outline: 'none',
							border: '1px solid #cdcdcd',
							height: '500px',
						}}
					>
						<Canvas
							shadows
							dpr={[1, 2]}
							camera={{ position: [0, 0, 4], fov: 50 }}
							style={{
								opacity: 1,
								transition: 'opacity 1s',
							}}
						>
							<ambientLight intensity={0.8} />
							<spotLight
								intensity={0.9}
								angle={1}
								penumbra={10}
								position={[10, 10, 10]}
								castShadow={true}
							/>
							<Suspense fallback={<Loader />}>
								<Model
									items={allItems}
									url={'/quincy.glb'}
									type={product?.productDetails?.type}
									types={types}
								/>
								<Environment preset='city' />
							</Suspense>
							<OrbitControls
								maxPolarAngle={Math.PI / 3}
								enableZoom={true}
								enablePan={false}
							/>
						</Canvas>
					</Box>
				</Box>
				<Divider orientation='vertical' />
				<Box
					style={{
						width: '40%',
						padding: '10px',
						background: 'rgb(244 244 244)',
						paddingTop: '30px',
					}}
				>
					<Typography>Name: {product?.productDetails?.name}</Typography>
					<Typography>No. of Items Ordered: {product.count}</Typography>
					<Typography>Notes: {product.note}</Typography>
				</Box>
			</Box>
		</>
	);
};

export default LoadAdmin;
