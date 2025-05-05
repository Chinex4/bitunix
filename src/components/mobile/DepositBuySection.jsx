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
						<span className='w-5 h-5'>
							{/* Inline SVG: Deposit Icon */}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='#A3E635'
								viewBox='0 0 24 24'>
								<path d='M12 2a1 1 0 0 1 1 1v14.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L11 17.586V3a1 1 0 0 1 1-1z' />
							</svg>
						</span>
					</button>
				</Link>

				{/* Buy Crypto Button */}
				<Link to='//trade/third-party'>
					<button className='w-full border text-xs border-white/20 hover:border-lime-400 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-between gap-2'>
						<span>Buy Crypto</span>
						<span className='w-5 h-5'>
							{/* Inline SVG: Buy Crypto Icon */}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='#A3E635'
								viewBox='0 0 24 24'>
								<path d='M4 4h16a1 1 0 0 1 1 1v3h-2V6H5v12h14v-2h2v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm8 5a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2H9a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1z' />
							</svg>
						</span>
					</button>
				</Link>
			</div>
		</section>
	);
};

export default DepositBuySection;
