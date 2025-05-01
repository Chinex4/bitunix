import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SectorsTable = () => {
	const [sectors, setSectors] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSectors = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					'https://api.coingecko.com/api/v3/coins/categories'
				);
				const data = response.data.slice(0, 10);
				setSectors(data);
			} catch (error) {
				console.error('Error fetching sector data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchSectors();
	}, []);

	const formatNumber = (num) => {
		if (!num) return '--';
		if (num > 1e9) return (num / 1e9).toFixed(2) + 'B';
		if (num > 1e6) return (num / 1e6).toFixed(2) + 'M';
		return num.toLocaleString();
	};

	return (
		<div className='text-white px-4 py-10 max-w-7xl mx-auto'>
			<h2 className='text-3xl md:text-4xl font-bold mb-6'>Sectors</h2>
			<div className='overflow-x-auto'>
				<table className='min-w-full text-sm'>
					<thead>
						<tr className='text-left border-b border-gray-700 text-gray-400'>
							<th className='py-2 pr-3'>#</th>
							<th className='py-2 pr-3'>Name</th>
							<th className='py-2 pr-3'>24H Avg. Change</th>
							<th className='py-2 pr-3'>Top Gainers</th>
							<th className='py-2 pr-3'>Market Cap</th>
							<th className='py-2 pr-3'>Volume</th>
							<th className='py-2'>Up / Down Distribution</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td
									colSpan='7'
									className='py-10 text-center'>
									<div className='animate-spin rounded-full h-12 w-12 border-t-4 border-lime-400 border-solid mx-auto'></div>
								</td>
							</tr>
						) : sectors.length === 0 ? (
							<tr>
								<td
									colSpan='7'
									className='py-10 text-center text-gray-500'>
									No data available.
								</td>
							</tr>
						) : (
							sectors.map((sector, i) => {
								const topCoin = sector.top_3_coins?.[0];
								const upCount = Math.floor(Math.random() * 50) + 1;
								const downCount = Math.floor(upCount * (Math.random() * 0.5));
								const total = upCount + downCount;
								const upPercent = ((upCount / total) * 100).toFixed(0);
								const downPercent = 100 - upPercent;

								return (
									<tr
										key={sector.id}
										className='border-b border-zinc-800'>
										<td className='py-2 pr-3 text-green-400 font-bold'>
											{i + 1}
										</td>
										<td className='py-2 pr-3'>{sector.name}</td>
										<td className='py-2 pr-3 text-green-500'>
											{sector.market_cap_change_24h.toFixed(2)}%
										</td>
										<td className='py-2 pr-3 flex items-center gap-2'>
											{topCoin && (
												<>
													<img
														src={topCoin}
														alt=''
														className='w-5 h-5 rounded-full'
													/>
													<span className='text-green-400 text-sm'>
														+{(Math.random() * 50 + 5).toFixed(2)}%
													</span>
												</>
											)}
										</td>
										<td className='py-2 pr-3'>
											{formatNumber(sector.market_cap)}
										</td>
										<td className='py-2 pr-3'>
											{formatNumber(sector.volume_24h)}
										</td>
										<td className='py-2'>
											<div className='w-full bg-zinc-800 h-2 rounded overflow-hidden flex'>
												<div
													className='bg-green-500 h-2'
													style={{ width: `${upPercent}%` }}></div>
												<div
													className='bg-red-500 h-2'
													style={{ width: `${downPercent}%` }}></div>
											</div>
											<div className='text-xs text-gray-400 mt-1'>
												{upCount} ({upPercent}%) / {downCount} ({downPercent}%)
											</div>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default SectorsTable;
