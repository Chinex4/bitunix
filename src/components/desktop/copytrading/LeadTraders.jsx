import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';


const TIMEFRAMES = ['7d', '30d'];
const SORT_OPTIONS = ['PnL', 'ROI', 'AUM'];

const generateFakeTraders = () => {
    return Array.from({ length: 27 }, (_, i) => {
      return {
        id: i + 1,
        name: faker.internet.userName(),
        avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
        roi7d: +(Math.random() * 200 - 50).toFixed(2),
        roi30d: +(Math.random() * 300 - 100).toFixed(2),
        pnl7d: faker.number.int({ min: 1000, max: 50000 }),     // ✅ FIXED
        pnl30d: faker.number.int({ min: 5000, max: 150000 }),   // ✅ FIXED
        aum: faker.number.int({ min: 50000, max: 300000 }),     // ✅ FIXED
        drawdown: +(Math.random() * 20).toFixed(2),
        winRate: +(Math.random() * 100).toFixed(2),
        followers: faker.number.int({ min: 5, max: 100 }),      // ✅ FIXED
        maxFollowers: 100,
        followed: 0,
        tokens: ['btc', 'eth', 'usdt'].filter(() => Math.random() > 0.5),
      };
    });
  };
  

const LeadTraders = () => {
	const [traders, setTraders] = useState([]);
	const [page, setPage] = useState(1);
	const [timeframe, setTimeframe] = useState('7d');
	const [sortBy, setSortBy] = useState('PnL');
	const [selectedTrader, setSelectedTrader] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			const data = generateFakeTraders();
			setTraders(data);
			setLoading(false);
		}, 1000);
	}, []);

	const sortedTraders = [...traders].sort((a, b) => {
		if (sortBy === 'PnL') {
			return timeframe === '7d' ? b.pnl7d - a.pnl7d : b.pnl30d - a.pnl30d;
		}
		if (sortBy === 'ROI') {
			return timeframe === '7d' ? b.roi7d - a.roi7d : b.roi30d - a.roi30d;
		}
		return b.aum - a.aum;
	});

	const tradersPerPage = 9;
	const paginatedTraders = sortedTraders.slice(
		(page - 1) * tradersPerPage,
		page * tradersPerPage
	);

	const totalPages = Math.ceil(traders.length / tradersPerPage);

	return (
		<div className='text-white px-4 py-10 max-w-7xl mx-auto'>
			<div className='flex flex-wrap justify-between mb-6'>
				<h2 className='text-2xl font-bold'>Lead Traders</h2>
				<div className='flex gap-4 items-center'>
					{TIMEFRAMES.map((tf) => (
						<button
							key={tf}
							className={`px-3 py-1 rounded border text-sm ${
								timeframe === tf
									? 'bg-lime-400 text-black'
									: 'text-gray-400 border-zinc-600'
							}`}
							onClick={() => setTimeframe(tf)}>
							{tf}
						</button>
					))}
					{SORT_OPTIONS.map((opt) => (
						<button
							key={opt}
							className={`px-3 py-1 rounded border text-sm ${
								sortBy === opt
									? 'bg-lime-400 text-black'
									: 'text-gray-400 border-zinc-600'
							}`}
							onClick={() => setSortBy(opt)}>
							{opt}
						</button>
					))}
				</div>
			</div>

			{loading ? (
				<div className='flex justify-center py-20'>
					<div className='animate-spin w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full' />
				</div>
			) : (
				<>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{paginatedTraders.map((t) => (
							<div
								key={t.id}
								className='border border-zinc-700 rounded-lg p-5 relative cursor-pointer'
								onClick={() => setSelectedTrader(t)}>
								<div className='flex items-center gap-3 mb-2'>
									<img
										src={t.avatar}
										className='w-10 h-10 rounded-full object-cover'
										alt={t.name}
									/>
									<div>
										<p className='font-semibold'>{t.name}</p>
										<p className='text-sm text-gray-500'>
											{t.followers}/{t.maxFollowers}
										</p>
									</div>
								</div>
								<div className='text-sm space-y-1 mb-3'>
									<div className='text-green-400 font-semibold'>
										ROI: +{timeframe === '7d' ? t.roi7d : t.roi30d}%
									</div>
									<div className='text-gray-400'>
										PnL: $
										{timeframe === '7d'
											? t.pnl7d.toLocaleString()
											: t.pnl30d.toLocaleString()}
									</div>
									<div className='text-gray-400'>Drawdown: {t.drawdown}%</div>
									<div className='text-gray-400'>
										AUM: ${t.aum.toLocaleString()}
									</div>
									<div className='text-gray-400'>Win Rate: {t.winRate}%</div>
								</div>
								<div className='flex gap-2 mb-2'>
									{t.tokens.map((token) => (
										<img
											key={token}
											src={`/mobile/${token}.png`}
											alt={token}
											className='w-5 h-5'
										/>
									))}
								</div>
								<button
									onClick={(e) => {
										e.stopPropagation();
										setTraders((prev) =>
											prev.map((trader) =>
												trader.id === t.id
													? { ...trader, followed: !trader.followed }
													: trader
											)
										);
									}}
									className={`w-full rounded-md py-2 text-sm font-semibold ${
										t.followed
											? 'bg-zinc-700 text-white'
											: 'bg-lime-400 text-black'
									}`}>
									{t.followed ? 'Unfollow' : 'Copy Now'}
								</button>
							</div>
						))}
					</div>

					{/* Pagination */}
					<div className='flex justify-center gap-2 mt-8'>
						{Array.from({ length: totalPages }, (_, i) => (
							<button
								key={i + 1}
								onClick={() => setPage(i + 1)}
								className={`px-3 py-1 rounded text-sm border ${
									page === i + 1
										? 'bg-lime-400 text-black'
										: 'text-gray-400 border-zinc-600'
								}`}>
								{i + 1}
							</button>
						))}
					</div>

					{/* Modal */}
					{selectedTrader && (
						<div
							className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
							onClick={() => setSelectedTrader(null)}>
							<div
								className='bg-zinc-900 p-6 rounded-lg w-full max-w-md relative'
								onClick={(e) => e.stopPropagation()}>
								<button
									className='absolute top-2 right-3 text-gray-500 text-xl'
									onClick={() => setSelectedTrader(null)}>
									&times;
								</button>
								<div className='flex items-center gap-4 mb-4'>
									<img
										src={selectedTrader.avatar}
										className='w-12 h-12 rounded-full'
										alt='avatar'
									/>
									<div>
										<h3 className='text-xl font-semibold'>
											{selectedTrader.name}
										</h3>
										<p className='text-sm text-gray-400'>
											{selectedTrader.followers}/{selectedTrader.maxFollowers}{' '}
											followers
										</p>
									</div>
								</div>
								<p className='text-green-400 font-semibold mb-2'>
									ROI ({timeframe}): +
									{timeframe === '7d'
										? selectedTrader.roi7d
										: selectedTrader.roi30d}
									%
								</p>
								<ul className='text-sm text-gray-300 space-y-1'>
									<li>
										PnL: $
										{timeframe === '7d'
											? selectedTrader.pnl7d
											: selectedTrader.pnl30d}
									</li>
									<li>Max Drawdown: {selectedTrader.drawdown}%</li>
									<li>AUM: ${selectedTrader.aum.toLocaleString()}</li>
									<li>Win Rate: {selectedTrader.winRate}%</li>
								</ul>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default LeadTraders;
