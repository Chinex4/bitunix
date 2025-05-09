import React from 'react';
import { Link } from 'react-router-dom';
import NewListingsCarousel from '../desktop/home/NewListingsCarousel';

const DepositBuySection = () => {
	return (
		<section className='flex items-center justify-between'>
			{/* Left: Carousel */}
			<div className='w-full md:w-2/3 lg:w-3/4'>
				<NewListingsCarousel />
			</div>

			{/* Right: Deposit / Buy */}
			<div className='w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4'>
				{/* Deposit Button */}
				<Link to='/assets/deposit'>
					<button className='w-full border text-xs border-white/20 hover:border-lime-400 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-between gap-2'>
						<span>Deposit</span>
						<span className='w-10'>
							{/* Inline SVG: Deposit Icon */}
							<img src="/begin-journey/deposit2.svg" alt="" />
						</span>
					</button>
				</Link>

				{/* Buy Crypto Button */}
				<Link to='/trade/third-party'>
					<button className='w-full border text-xs border-white/20 hover:border-lime-400 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-between gap-2'>
						<span>Buy Crypto</span>
						<span className='w-10'>
							{/* Inline SVG: Buy Crypto Icon */}
							<img src="/begin-journey/trading2.svg" alt="" />
							
						</span>
					</button>
				</Link>
			</div>
		</section>
	);
};

export default DepositBuySection;
