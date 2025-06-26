import React from 'react';

const SweetLoader = () => {
	return (
		<div className='flex justify-center items-center py-10'>
			<div className='animate-spin rounded-full h-12 w-12 border-t-4 border-lime-400 border-solid'></div>
		</div>
	);
};

export default SweetLoader;
