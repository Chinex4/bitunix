import React, { useEffect, useState } from 'react';
import axios from 'axios';

const sectionStyle = 'bg-zinc-900 p-4 rounded-lg border border-zinc-700';
const labelStyle = 'text-gray-400 text-sm';
const headingStyle = 'text-white font-semibold mb-2';
const tableCell = 'py-1 text-sm';

const MarketsDashboard = () => {
	const [tab, setTab] = useState('spot');
	const [spotCoins, setSpotCoins] = useState([]);
	const [futuresCoins, setFuturesCoins] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const res = await axios.get(
					'https://api.coingecko.com/api/v3/coins/markets',
					{
						params: {
							vs_currency: 'usd',
							order: 'volume_desc',
							per_page: 100,
							page: 1,
							sparkline: false,
							price_change_percentage: '24h',
						},
					}
				);

				setSpotCoins(res.data);
				// Simulate Futures using shuffled spot data
				const simulatedFutures = [...res.data]
					.sort(() => 0.5 - Math.random())
					.slice(0, 100);
				setFuturesCoins(simulatedFutures);
			} catch (err) {
				console.error('Failed to fetch market data', err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const getCoins = () => (tab === 'spot' ? spotCoins : futuresCoins);

	const topGainers = [...getCoins()]
		.sort(
			(a, b) =>
				b.price_change_percentage_24h_in_currency -
				a.price_change_percentage_24h_in_currency
		)
		.slice(0, 5);

	const topLosers = [...getCoins()]
		.sort(
			(a, b) =>
				a.price_change_percentage_24h_in_currency -
				b.price_change_percentage_24h_in_currency
		)
		.slice(0, 5);

	const topVolume = [...getCoins()]
		.sort((a, b) => b.total_volume - a.total_volume)
		.slice(0, 5);

	const newlyListed = [...getCoins()]
		.sort((a, b) => b.market_cap_rank - a.market_cap_rank)
		.slice(0, 5);

	const renderList = (data, type = 'price') => {
		if (loading) {
			return (
				<tr>
					<td
						colSpan='3'
						className='text-center py-6'>
						<div className='animate-spin w-6 h-6 border-4 border-lime-400 border-t-transparent rounded-full mx-auto' />
					</td>
				</tr>
			);
		}

		if (!data || data.length === 0) {
			return (
				<tr>
					<td
						colSpan='3'
						className='text-center py-6 text-gray-400'>
						No data available
					</td>
				</tr>
			);
		}

		return data.map((coin, i) => (
			<tr
				key={coin.id}
				className='text-white border-b border-zinc-800'>
				<td className={tableCell}>
					{i + 1}.{' '}
					<img
						src={coin.image}
						alt={coin.symbol}
						className='w-4 h-4 inline-block mx-1 rounded-full'
					/>
					<span>{coin.symbol.toUpperCase()}/USD</span>
				</td>
				<td className={`${tableCell} text-right`}>
					{type === 'price'
						? coin.current_price?.toFixed(4)
						: coin.total_volume?.toLocaleString()}
				</td>
				<td
					className={`${tableCell} text-right ${
						coin.price_change_percentage_24h_in_currency > 0
							? 'text-green-400'
							: 'text-red-400'
					}`}>
					{coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
				</td>
			</tr>
		));
	};

	return (
		<div className='text-white px-4 py-10 max-w-7xl mx-auto'>
			<div className='mb-6 flex gap-6 text-lg font-bold'>
				<button
					onClick={() => setTab('futures')}
					className={
						tab === 'futures'
							? 'text-purple-400 border-b-2 border-purple-400 pb-1'
							: 'text-gray-400'
					}>
					Futures Markets
				</button>
				<button
					onClick={() => setTab('spot')}
					className={
						tab === 'spot'
							? 'text-lime-400 border-b-2 border-lime-400 pb-1'
							: 'text-gray-400'
					}>
					Spot Markets
				</button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Gainers */}
				<div className={sectionStyle}>
					<p className={labelStyle}>Gainers ✅</p>
					<p className={headingStyle}>Top Gainers</p>
					<table className='w-full'>
						<thead>
							<tr className='text-gray-500 text-xs border-b border-zinc-800'>
								<th className='text-left py-1'># Market</th>
								<th className='text-right py-1'>Last Price</th>
								<th className='text-right py-1'>24H Change</th>
							</tr>
						</thead>
						<tbody>{renderList(topGainers)}</tbody>
					</table>
				</div>

				{/* Losers */}
				<div className={sectionStyle}>
					<p className={labelStyle}>Losers 🔻</p>
					<p className={headingStyle}>Top Losers</p>
					<table className='w-full'>
						<thead>
							<tr className='text-gray-500 text-xs border-b border-zinc-800'>
								<th className='text-left py-1'># Market</th>
								<th className='text-right py-1'>Last Price</th>
								<th className='text-right py-1'>24H Change</th>
							</tr>
						</thead>
						<tbody>{renderList(topLosers)}</tbody>
					</table>
				</div>

				{/* Volume */}
				<div className={sectionStyle}>
					<p className={labelStyle}>Top Volume 🔥</p>
					<p className={headingStyle}>Most Traded</p>
					<table className='w-full'>
						<thead>
							<tr className='text-gray-500 text-xs border-b border-zinc-800'>
								<th className='text-left py-1'># Market</th>
								<th className='text-right py-1'>Volume</th>
								<th className='text-right py-1'>24H Change</th>
							</tr>
						</thead>
						<tbody>{renderList(topVolume, 'volume')}</tbody>
					</table>
				</div>

				{/* Newly Listed */}
				<div className={sectionStyle}>
					<p className={labelStyle}>Newly Listed 🆕</p>
					<p className={headingStyle}>Recent Listings</p>
					<table className='w-full'>
						<thead>
							<tr className='text-gray-500 text-xs border-b border-zinc-800'>
								<th className='text-left py-1'># Market</th>
								<th className='text-right py-1'>Rank</th>
								<th className='text-right py-1'>24H Change</th>
							</tr>
						</thead>
						<tbody>{renderList(newlyListed)}</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default MarketsDashboard;
