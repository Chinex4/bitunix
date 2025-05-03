import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HeatmapSection = () => {
	const [data, setData] = useState([]);
	const [interval, setInterval] = useState('24h');
	const [loading, setLoading] = useState(true);

	const intervalMap = {
		'1h': 'price_change_percentage_1h_in_currency',
		'24h': 'price_change_percentage_24h_in_currency',
		'7d': 'price_change_percentage_7d_in_currency',
	};

	useEffect(() => {
		const fetchHeatmapData = async () => {
			try {
				setLoading(true);
				const res = await axios.get(
					'https://api.coingecko.com/api/v3/coins/markets',
					{
						params: {
							vs_currency: 'usd',
							order: 'volume_desc',
							per_page: 50,
							page: 1,
							sparkline: false,
							price_change_percentage: '1h,24h,7d',
						},
					}
				);
				setData(res.data);
			} catch (error) {
				console.error('Heatmap fetch failed:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchHeatmapData();
	}, [interval]);

	const getChange = (coin) => {
		const key = intervalMap[interval];
		return coin[key] ?? 0;
	};

	const getColor = (change) => {
		if (change >= 3) return 'bg-green-500';
		if (change >= 2) return 'bg-green-400';
		if (change >= 1) return 'bg-green-300';
		if (change >= 0) return 'bg-green-200';
		if (change > -1) return 'bg-red-200';
		if (change > -2) return 'bg-red-300';
		if (change > -3) return 'bg-red-400';
		return 'bg-red-500';
	};

	const getSize = (volume) => {
		const scale = Math.sqrt(volume);
		return Math.min(Math.max(scale / 10, 60), 200);
	};

	return (
		<div className='text-white px-4 py-10 max-w-7xl mx-auto'>
			<h2 className='text-3xl font-bold mb-4'>Heatmap</h2>

			{/* Interval Toggle */}
			<div className='flex gap-3 mb-6'>
				{['1h', '24h', '7d'].map((intv) => (
					<button
						key={intv}
						onClick={() => setInterval(intv)}
						className={`px-3 py-1 rounded border ${
							interval === intv
								? 'bg-lime-400 text-black'
								: 'text-gray-400 border-gray-600'
						}`}>
						{intv}
					</button>
				))}
			</div>

			{loading ? (
				<div className='flex justify-center items-center py-20'>
					<div className='animate-spin w-10 h-10 border-t-4 border-lime-400 border-solid rounded-full' />
				</div>
			) : data.length === 0 ? (
				<div className='text-center text-gray-500 py-10'>
					No data available.
				</div>
			) : (
				<div className='grid grid-cols-6 md:grid-cols-10 gap-2'>
					{data.map((coin) => {
						const change = getChange(coin);
						return (
							<div
								key={coin.id}
								className={`relative rounded-md p-2 text-center text-xs font-medium text-black cursor-pointer transition hover:scale-105 ${getColor(
									change
								)}`}
								style={{ height: getSize(coin.total_volume) }}
								title={`${coin.name} (${coin.symbol.toUpperCase()}/USD)
Price: $${coin.current_price}
Change (${interval}): ${change.toFixed(2)}%
Vol: ${coin.total_volume.toLocaleString()}`}>
								<img
									src={coin.image}
									alt={coin.symbol}
									className='w-5 h-5 mx-auto mb-1 rounded-full'
								/>
								<div className='truncate'>{coin.symbol.toUpperCase()}/USD</div>
								<div className='text-sm font-semibold'>
									{change.toFixed(2)}%
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* Legend */}
			<div className='mt-8 text-sm text-gray-400'>
				<div className='flex gap-2 mb-2'>
					{[-3, -2, -1, 0, 1, 2, 3].map((n) => (
						<span
							key={n}
							className={`${getColor(n)} w-8 h-4 rounded`}
							title={`${n >= 0 ? '+' : ''}${n}%`}
						/>
					))}
				</div>
				<p>
					<span className='text-white font-medium'>Note:</span> The larger the
					box, the higher the trading volume. Darker green/red = stronger %
					change over selected interval.
				</p>
			</div>
		</div>
	);
};

export default HeatmapSection;
