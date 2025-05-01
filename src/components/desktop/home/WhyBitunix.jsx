import React from 'react';

const features = [
	{
		title: 'Secure',
		description:
			'We offer industry-leading secure cryptocurrency trading platform, maintaining a robust reserve fund that exceeds 1:1 ratio against user holdings.',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				className='size-10 md:size-16 fill-lime-400'>
				<path d='M12 2L4 5v6c0 5.25 3.25 9.66 8 11 4.75-1.34 8-5.75 8-11V5l-8-3zM10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z' />
			</svg>
		),
	},
	{
		title: 'Seamless',
		description:
			'Enjoy the benefits of efficient and real-time online trading. Start your crypto journey with just $10 investment.',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				className='size-10 md:size-16 fill-lime-400'>
				<path d='M20 4H4c-1.1 0-2 .9-2 2v2h20V6c0-1.1-.9-2-2-2zM2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10H2v8zm4-3h6v2H6v-2z' />
			</svg>
		),
	},
	{
		title: 'Insights',
		description:
			'Get real-time updates and sharp insights about the cryptocurrency market.',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				className='size-10 md:size-16 fill-lime-400'>
				<path d='M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm1 17.93c-2.83.48-5.63-.5-7.56-2.44C3.5 15.63 2.52 12.83 3 10h7v10c.34 0 .67-.02 1-.07V19.93zM20.94 13c-.48 2.83-2.48 5.1-5.17 6.07L15 10h5.94c.04.34.06.67.06 1 0 .34-.02.67-.06 1zM19.07 9H15V4.07c2.69.97 4.69 3.24 5.17 6.07c.04.31.06.63.06.93 0 .3-.02.62-.06.93-.01.11-.03.21-.05.32c-.22-.05-.44-.08-.66-.08H15v5.07c.28.07.56.13.85.18c1.75-.46 3.12-1.83 3.58-3.58c.05-.29.11-.57.18-.85H19.07z' />
			</svg>
		),
	},
	{
		title: 'Service',
		description:
			'Experience unparalleled assistance with multilingual 24/7 customer support. Ensuring a seamless and satisfying trading experience.',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				className='size-10 md:size-16 fill-lime-400'>
				<path d='M12 1C6.48 1 2 5.48 2 11v5c0 1.66 1.34 3 3 3h1v-6H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-1v6h1c1.66 0 3-1.34 3-3v-5c0-5.52-4.48-10-10-10z' />
			</svg>
		),
	},
];

const WhyBitunix = () => {
	return (
		<section className='bg-black flex flex-col items-center justify-center mt-16 py-10 px-4'>
			<h2 className='text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-12 md:mb-24 text-left md:text-center'>
				Why Bitunix?
			</h2>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl w-full'>
				{features.map((feature, index) => (
					<div
						key={index}
						className='flex flex-row gap-4 md:flex-col items-center  transform transition duration-500 hover:scale-105'>
						<div className='bg-[#121212] rounded-full p-6 mb-6 transform transition duration-500 hover:rotate-12'>
							{feature.icon}
						</div>
						<div>
							<h3 className='text-white text-left md:text-center font-semibold text-lg mb-4'>
								{feature.title}
							</h3>
							<p className='text-gray-400 text-left md:text-center text-sm leading-relaxed max-w-xs'>
								{feature.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default WhyBitunix;
