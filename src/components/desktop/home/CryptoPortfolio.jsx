import React, { useEffect, useState } from 'react';

const CryptoPortfolio = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [hoveredRow, setHoveredRow] = useState(null);

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

	const splitCoins = () => {
		const distribution = [13, 13, 12, 12];
		let start = 0;
		return distribution.map((count) => {
			const slice = coins.slice(start, start + count);
			start += count;
			return Array(10).fill(slice).flat(); // Duplicate x10
		});
	};

	const rows = coins.length > 0 ? splitCoins() : [];

	return (
		<section className='relative bg-stone-900 flex flex-col items-center justify-center px-16 py-12 overflow-hidden max-w-7xl mx-auto'>
			<h2 className='text-white text-3xl md:text-4xl font-bold mb-10 text-center'>
				Build Your Cryptocurrency Portfolio
			</h2>

			{/* Gradient Overlays */}
			<div className='pointer-events-none absolute top-0 left-16 h-full w-32 z-20 bg-gradient-to-r from-stone-900 via-stone-900/70 to-transparent' />
			<div className='pointer-events-none absolute top-0 right-16 h-full w-32 z-20 bg-gradient-to-l from-stone-900 via-stone-900/70 to-transparent' />

			{loading ? (
				<div className='text-white py-10'>Loading coins...</div>
			) : error ? (
				<div className='text-red-500 py-10'>Failed to load coin data.</div>
			) : (
				<div className='space-y-6 w-full'>
					{rows.map((rowCoins, rowIdx) => (
						<div
							key={rowIdx}
							onMouseEnter={() => setHoveredRow(rowIdx)}
							onMouseLeave={() => setHoveredRow(null)}
							className='overflow-hidden w-full'>
							<div
								className={`min-w-[300%] flex gap-8 whitespace-nowrap ${
									hoveredRow === rowIdx ? '' : 'animate-scroll-left'
								}`}>
								{rowCoins.map((coin, index) => (
									<div
										key={index}
										className='group flex items-center gap-3 px-8 border border-gray-300/50 py-4 rounded-full hover:bg-lime-400 hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer flex-shrink-0'>
										<img
											src={coin.image}
											alt={coin.name}
											loading='lazy'
											className='h-8 w-8 object-contain rounded-full'
											onError={(e) => {
												e.currentTarget.src =
													'https://via.placeholder.com/32?text=?';
											}}
										/>
										<span className='text-white group-hover:text-black text-sm font-medium'>
											{coin.symbol.toUpperCase()}
										</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}

			<button className='mt-14 bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 px-6 rounded-md text-sm z-20'>
				Trade Now with $10
			</button>

			{/* <style jsx>{`
				@keyframes scroll-left {
					0% {
						transform: translateX(0%);
					}
					100% {
						transform: translateX(-50%);
					}
				}
				.animate-scroll-left {
					animation: scroll-left 12s linear infinite;
				}
			`}</style> */}
		</section>
	);
};

export default CryptoPortfolio;
