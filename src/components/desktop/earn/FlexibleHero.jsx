import React from 'react';

const FlexibleHero = () => {
	return (
		<div className='max-w-7xl mx-auto bg-black text-white px-4 py-12 md:py-20 overflow-hidden'>
			<div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
			    <div className=''>
    				<h1 className='text-4xl font-bold mb-2'>Flexible / Fixed Term</h1>
    				<p className='text-gray-400 max-w-lg'>
    					Secure, accessible and professional financial platform that gives high
    					yield protection for crypto assets.
    				</p>
    			</div>
    
    			<div className=' bg-zinc-900 mt-10 lg:mt-0 border border-zinc-700 rounded-lg px-6 py-5 w-full lg:w-64 shadow-md'>
    				<div className='text-center mb-4'>
    					{/* <img
    						src='/icons/profit.svg'
    						alt='profit'
    						className='mx-auto mb-2'
    					/> */}
    					<p className='text-gray-300 text-sm'>
    						Please login first to view your profit.
    					</p>
    				</div>
    				<button className='w-full bg-lime-400 text-black font-semibold py-2 rounded-md hover:bg-lime-300'>
    					My Earnings
    				</button>
    			</div>
			</div>
		</div>
	);
};

export default FlexibleHero;
