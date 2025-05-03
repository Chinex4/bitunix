import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center'>
			{/* Inline SVG */}
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 64 64'
				fill='none'
				className='w-24 h-24 mb-6'>
				<circle
					cx='32'
					cy='32'
					r='30'
					stroke='limegreen'
					strokeWidth='4'
				/>
				<path
					d='M20 26h4v12h-4zM40 26h4v12h-4z'
					fill='lime'
				/>
				<path
					d='M24 42c2.5 3 10.5 3 13 0'
					stroke='lime'
					strokeWidth='2'
					strokeLinecap='round'
				/>
			</svg>

			<h1 className='text-4xl font-bold mb-2'>404 - Page Not Found</h1>
			<p className='text-gray-400 mb-6'>
				Sorry, the page you’re looking for doesn’t exist or has been moved.
			</p>
			<button
				onClick={() => navigate('/')}
				className='bg-lime-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-lime-500 transition'>
				Back to Home
			</button>
		</div>
	);
};

export default NotFound;
