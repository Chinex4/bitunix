import { useEffect, useState } from 'react';

const PairHeader = ({ symbol = 'BTCUSDT' }) => {
	const [price, setPrice] = useState(null);
	const [stats, setStats] = useState(null);

	useEffect(() => {
		const wsSymbol = symbol.toLowerCase();
		const ws = new WebSocket(
			`wss://stream.binance.com:9443/ws/${wsSymbol}@ticker`
		);

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);

			setPrice(parseFloat(data.c).toFixed(1)); // lastPrice (c = close price)
			setStats({
				change: parseFloat(data.P).toFixed(2), // priceChangePercent
				markPrice: parseFloat(data.w).toFixed(1), // weightedAvgPrice
				high: parseFloat(data.h).toFixed(1),
				low: parseFloat(data.l).toFixed(1),
				volumeBTC: parseFloat(data.v).toFixed(1), // base asset volume
				volumeUSDT: parseFloat(data.q).toFixed(1), // quote asset volume
			});
		};

		ws.onerror = (err) => {
			console.error('WebSocket error:', err);
		};

		return () => ws.close();
	}, [symbol]);

	const baseAsset = symbol.slice(0, symbol.indexOf('USDT')).toUpperCase();

	return (
		<div className='text-white bg-[#0b0b0b] flex flex-wrap justify-between items-center gap-4 text-sm font-medium px-4 py-2'>
			<div className='flex items-center gap-2'>
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
