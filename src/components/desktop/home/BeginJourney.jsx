import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
	{
		title: 'Create your Bitunix account',
		iconColor: 'bg-lime-400',
		arrow: true,
		route: '/register',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='white'
				viewBox='0 0 24 24'
				className='h-6 w-6'>
				<path d='M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.86 6.44 9.28L9 20.5l-.39-2.3L9 17.5l-.39-2.3L9 13.5l-.39-2.3L9 9.5l-.39-2.3L9 5.5l-.39-2.3L12 2zm0 2c4.42 0 8 3.58 8 8s-3.58 8-8 8v-8l-6-6c1.6-1.2 3.6-2 6-2z' />
			</svg>
		),
	},
	{
		title: 'Deposit funds',
		iconColor: 'bg-black',
		arrow: false,
		route: '/assets/deposit',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='white'
				viewBox='0 0 24 24'
				className='h-6 w-6'>
				<path d='M20 6H4c-1.1 0-2 .9-2 2v2h20V8c0-1.1-.9-2-2-2zM2 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-6H2v6zm4-2h6v2H6v-2z' />
			</svg>
		),
	},
	{
		title: 'Start trading',
		iconColor: 'bg-black',
		arrow: false,
		route: '/contract-trade/BTC-USDT',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='white'
				viewBox='0 0 24 24'
				className='h-6 w-6'>
				<path d='M12 2L6.5 6v12l5.5 4 5.5-4V6L12 2zm0 1.75l3.5 2.54v10.42l-3.5 2.54-3.5-2.54V6.29L12 3.75z' />
			</svg>
		),
	},
];

const CryptoIllustration = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 300 300'
		className='w-full max-w-sm'>
		<rect
			width='300'
			height='300'
			fill=''
		/>
		<g transform='translate(50, 200)'>
			<rect
				x='0'
				y='0'
				width='40'
				height='40'
				fill='#A3E635'
			/>
			<rect
				x='40'
				y='0'
				width='40'
				height='40'
				fill='#121212'
			/>
			<rect
				x='80'
				y='0'
				width='40'
				height='40'
				fill='#A3E635'
			/>
			<rect
				x='120'
				y='0'
				width='40'
				height='40'
				fill='#121212'
			/>
		</g>
		<g transform='translate(50, 160)'>
			<rect
				x='0'
				y='0'
				width='40'
				height='40'
				fill='#121212'
			/>
			<rect
				x='40'
				y='0'
				width='40'
				height='40'
				fill='#A3E635'
			/>
			<rect
				x='80'
				y='0'
				width='40'
				height='40'
				fill='#121212'
			/>
			<rect
				x='120'
				y='0'
				width='40'
				height='40'
				fill='#A3E635'
			/>
		</g>
		<g transform='translate(50, 100)'>
			<rect
				x='0'
				y='0'
				width='40'
				height='60'
				fill='#121212'
			/>
			<rect
				x='0'
				y='-40'
				width='40'
				height='40'
				fill='#FFFFFF'
			/>
		</g>
		<g transform='translate(90, 100)'>
			<rect
				x='0'
				y='0'
				width='40'
				height='60'
				fill='#A3E635'
			/>
			<rect
				x='0'
				y='-40'
				width='40'
				height='40'
				fill='#FFFFFF'
			/>
		</g>
		<g transform='translate(70, 70)'>
			<circle
				cx='80'
				cy='50'
				r='30'
				fill='#A3E635'
			/>
			<rect
				x='70'
				y='40'
				width='20'
				height='10'
				fill='white'
				rx='2'
			/>
			<rect
				x='73'
				y='45'
				width='14'
				height='3'
				fill='#121212'
			/>
		</g>
	</svg>
);

const BeginJourney = () => {
	return (
		<section className='flex flex-col items-center justify-center py-8 md:py-16 px-4 overflow-hidden'>
			<h2 className='text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-14 text-left md:text-center leading-tight'>
				Begin Your Cryptocurrency Journey Effortlessly
			</h2>

			<div className='border border-stone-900/50 rounded-xl p-0 md:p-6 flex flex-col lg:flex-row items-center gap-10 max-w-6xl w-full shadow-lg'>
				{/* Left Illustration */}
				<div className='hidden md:flex justify-center w-full lg:w-1/2'>
					<img
						src='/crypto-journey.svg'
						alt='cryptojourney'
					/>
				</div>

				{/* Steps */}
				<div className='flex flex-col w-full lg:w-1/2 gap-6'>
					{steps.map((step, index) => (
						<Link
							key={index}
							to={step.route}
							className='flex items-center justify-between p-4 rounded-lg border-b border-gray-800 hover:bg-[#1e1e1e] transition transform hover:scale-[1.02]'>
							<div className='flex items-center gap-4'>
								<div className={`rounded-full p-3 ${step.iconColor}`}>
									{step.icon}
								</div>
								<span
									className={`text-sm md:text-base ${
										index === 0 ? 'text-lime-400' : 'text-white'
									}`}>
									{step.title}
								</span>
							</div>
							{step.arrow && (
								<div className='text-lime-400'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										viewBox='0 0 24 24'
										className='h-5 w-5'>
										<path d='M9 5l7 7-7 7' />
									</svg>
								</div>
							)}
						</Link>
					))}
				</div>
			</div>

			{/* Get Started Button */}
			<Link to='/register'>
				<button className='w-full md:w-auto mt-12 bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 px-8 rounded-md text-base animate-pulse hover:animate-none transition'>
					Get Started
				</button>
			</Link>
		</section>
	);
};

export default BeginJourney;
