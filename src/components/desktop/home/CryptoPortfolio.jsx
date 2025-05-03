import React, { useEffect, useState } from 'react';

const CryptoPortfolio = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchCoins = async () => {
			try {
				const response = await fetch(
					'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
				);
				const data = await response.json();
				setCoins(data);
			} catch (err) {
				console.error('Failed to fetch coins:', err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchCoins();
	}, []);

	// Divide 50 coins into [13, 13, 12, 12]
	const splitCoins = () => {
		const distribution = [13, 13, 12, 12];
		let start = 0;
		return distribution.map((count) => {
			const slice = coins.slice(start, start + count);
			start += count;
			// return slice.concat(slice); // Duplicate for seamless scroll
			return [...slice, ...slice]; // Duplicate for seamless scroll
		});
	};

	const rows = splitCoins();

	return (
		<section className='relative bg-stone-900 min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden'>
			<h2 className='text-white text-3xl md:text-4xl font-bold mb-10 text-center'>
				Build Your Cryptocurrency Portfolio
			</h2>

			{/* Gradient Overlays */}
			<div className='pointer-events-none absolute top-0 left-0 h-full w-32 z-20 bg-gradient-to-r from-stone-900 via-stone-900/70 to-transparent' />
			<div className='pointer-events-none absolute top-0 right-0 h-full w-32 z-20 bg-gradient-to-l from-stone-900 via-stone-900/70 to-transparent' />

			{loading ? (
				<div className='text-white py-10'>Loading coins...</div>
			) : error ? (
				<div className='text-red-500 py-10'>Failed to load coin data.</div>
			) : (
				<div className='space-y-6 w-full'>
					{rows.map((rowCoins, rowIdx) => (
						<div
							key={rowIdx}
							className={`flex gap-4 w-full whitespace-nowrap overflow-hidden animate-scroll-${
								rowIdx % 2 === 0 ? 'left' : 'right'
							} group-hover:[animation-play-state:paused]`}>
							{rowCoins.map((coin, index) => (
								<div
									key={index}
									className='flex items-center gap-2 bg-[#121212] px-4 py-3 rounded-xl hover:scale-105 transition duration-300 cursor-pointer flex-shrink-0'>
									<img
										src={coin.image}
										alt={coin.name}
										loading='lazy'
										className='h-7 w-7 object-contain rounded-full'
										onError={(e) => {
											e.currentTarget.src =
												'https://via.placeholder.com/32?text=?';
										}}
									/>
									<span className='text-white text-sm'>
										{coin.symbol.toUpperCase()}
									</span>
								</div>
							))}
						</div>
					))}
				</div>
			)}

			<button className='mt-14 bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 px-6 rounded-md text-sm z-20'>
				Trade Now with $10
			</button>

			<style jsx>{`
				@keyframes scroll-left {
					0% {
						transform: translateX(0%);
					}
					100% {
						transform: translateX(-50%);
					}
				}
				@keyframes scroll-right {
					0% {
						transform: translateX(0%);
					}
					100% {
						transform: translateX(50%);
					}
				}
				.animate-scroll-left {
					animation: scroll-left 30s linear infinite;
				}
				.animate-scroll-right {
					animation: scroll-right 30s linear infinite;
				}
			`}</style>
		</section>
	);
};

export default CryptoPortfolio;
