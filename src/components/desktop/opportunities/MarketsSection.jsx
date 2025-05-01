import React, { useEffect, useState } from 'react';
import axios from 'axios';

const coinIds = ['bitcoin', 'ethereum', 'tron', 'litecoin'];

const MarketsSection = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCoins = async () => {
			try {
				setLoading(true);
				const res = await axios.get(
					'https://api.coingecko.com/api/v3/coins/markets',
					{
						params: {
							vs_currency: 'usd',
							ids: coinIds.join(','),
							order: 'market_cap_desc',
							price_change_percentage: '24h',
						},
					}
				);
				setCoins(res.data);
			} catch (err) {
				console.error('Error fetching markets data:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchCoins();
	}, []);

	const formatNumber = (num) => {
		if (!num && num !== 0) return '--';
		if (num > 1e9) return (num / 1e9).toFixed(2) + 'B';
		if (num > 1e6) return (num / 1e6).toFixed(2) + 'M';
		return num.toLocaleString();
	};

	return (
		<div className='text-white px-4 py-10 max-w-7xl mx-auto'>
			<h2 className='text-2xl font-bold mb-6'>Markets</h2>

			{loading ? (
				<div className='flex justify-center py-10'>
					<div className='animate-spin w-8 h-8 border-4 border-lime-400 border-t-transparent rounded-full' />
				</div>
			) : coins.length === 0 ? (
				<p className='text-center text-gray-400'>No market data available.</p>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
					{coins.map((coin) => (
						<div
							key={coin.id}
							className='bg-zinc-900 border border-zinc-700 rounded-lg p-4'>
							<div className='flex items-center justify-between mb-2'>
								<div className='flex items-center gap-2'>
									<img
										src={coin.image}
										alt={coin.name}
										className='w-6 h-6'
									/>
									<span className='text-sm font-medium'>
										{coin.symbol.toUpperCase()}/USDT
									</span>
								</div>
								<span
									className={`text-sm font-medium ${
										coin.price_change_percentage_24h > 0
											? 'text-green-400'
											: 'text-red-400'
									}`}>
									{coin.price_change_percentage_24h?.toFixed(2)}%
								</span>
							</div>
							<div className='text-2xl font-bold mb-1'>
								{coin.current_price?.toLocaleString()}
							</div>
							<div className='text-xs text-gray-400'>
								24H Vol {formatNumber(coin.total_volume)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MarketsSection;
