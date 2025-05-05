import { useEffect, useState } from 'react';

const PairHeader = ({ symbol = 'BTCUSDT' }) => {
	const [price, setPrice] = useState(null);
	const [stats, setStats] = useState(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const res = await fetch(
					`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
				);
				const data = await res.json();
				setPrice(parseFloat(data.lastPrice).toFixed(1));
				setStats({
					change: parseFloat(data.priceChangePercent).toFixed(2),
					markPrice: parseFloat(data.weightedAvgPrice).toFixed(1),
					high: parseFloat(data.highPrice).toFixed(1),
					low: parseFloat(data.lowPrice).toFixed(1),
					volumeBTC: parseFloat(data.volume).toFixed(1),
					volumeUSDT: parseFloat(data.quoteVolume).toFixed(1),
				});
			} catch (err) {
				console.error('Failed to fetch stats:', err);
			}
		};

		fetchStats();
		const interval = setInterval(fetchStats, 5000);
		return () => clearInterval(interval);
	}, [symbol]);

	const baseAsset = symbol.slice(0, symbol.indexOf('USDT')).toUpperCase();

	return (
		<div className='text-white bg-[#0b0b0b] flex flex-wrap justify-between items-center gap-4 text-sm font-medium px-4 py-2'>
			<div className='flex items-center gap-2'>
				{/* <img
					src={`/mobile/${baseAsset.toLowerCase()}.png`}
					alt={baseAsset}
					className='w-5 h-5'
				/> */}
				<span className='text-lg font-bold'>{symbol.toUpperCase()}</span>
			</div>

			<div className='flex items-center gap-6 overflow-auto scrollbar-hide'>
				<span className='text-red-500 text-xl font-bold'>
					{price ? `$${price}` : 'Loading...'}
				</span>
				<span
					className={`text-sm ${
						stats?.change > 0 ? 'text-green-500' : 'text-red-500'
					}`}>
					24H Change: {stats?.change || '--'}%
				</span>
				<span className='text-gray-400'>
					Mark Price: {stats?.markPrice || '--'}
				</span>
				<span className='text-gray-400'>Index Price: --</span>
				<span className='text-gray-400'>24H High: {stats?.high || '--'}</span>
				<span className='text-gray-400'>24H Low: {stats?.low || '--'}</span>
				<span className='text-gray-400'>
					24H Volume ({baseAsset}): {stats?.volumeBTC || '--'}
				</span>
				<span className='text-gray-400'>
					24H Volume (USDT): {stats?.volumeUSDT || '--'}B
				</span>
				<span className='text-green-500'>
					Funding Rate/Countdown: 0.0009% / 02:22:53
				</span>
			</div>
		</div>
	);
};

export default PairHeader;
