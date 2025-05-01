import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HotProducts = () => {
	const [products, setProducts] = useState([]);
	const [expanded, setExpanded] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchStakingProducts = async () => {
		try {
			setLoading(true);
			setError(false);

			// Simulated API call delay
			const res = await new Promise((resolve) => {
				setTimeout(() => {
					resolve({
						data: [
							{
								name: 'USDT',
								icon: '/mobile/usdt.png',
								apr: '1.82%~2.40%',
								period: 'Flexible / Fixed',
								children: [
									{
										name: 'USDT Flexible',
										apr: '1.82%',
										period: 'Subscribe and redeem at any time',
									},
									{
										name: 'USDT Fixed Term 7day(s)',
										apr: '2.00%',
										period: '7day(s)',
									},
									{
										name: 'USDT Fixed Term 14day(s)',
										apr: '2.40%',
										period: '14day(s)',
									},
								],
							},
							{
								name: 'USDC',
								icon: '/mobile/usdc.png',
								apr: '1.20%',
								period: 'Flexible',
								children: [
									{
										name: 'USDC Flexible',
										apr: '1.20%',
										period: 'Subscribe and redeem at any time',
									},
								],
							},
							{
								name: 'BTC',
								icon: '/mobile/btc.png',
								apr: '1.10%',
								period: 'Flexible',
								children: [
									{
										name: 'BTC Flexible',
										apr: '1.10%',
										period: 'Subscribe and redeem at any time',
									},
								],
							},
						],
					});
				}, 1500);
			});

			setProducts(res.data);
		} catch (err) {
			console.error('Fetch error:', err);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStakingProducts();
	}, []);

	const toggleExpand = (idx) => {
		setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
	};

	return (
		<div className='bg-black text-white px-4 py-10 max-w-7xl mx-auto'>
			<h2 className='text-2xl font-bold mb-6'>Hot Products</h2>

			{loading ? (
				<div className='flex justify-center py-10'>
					<div className='animate-spin w-8 h-8 border-4 border-lime-400 border-t-transparent rounded-full' />
				</div>
			) : error ? (
				<p className='text-center text-red-400'>
					Failed to load products. Please try again.
				</p>
			) : products.length === 0 ? (
				<p className='text-center text-gray-400'>
					No staking products available.
				</p>
			) : (
				<div className='overflow-x-auto'>
					<table className='min-w-full text-sm'>
						<thead className='text-left text-gray-400 border-b border-zinc-700'>
							<tr>
								<th className='py-2'>Products</th>
								<th className='py-2'>Est. APR</th>
								<th className='py-2'>Period</th>
								<th className='py-2 text-right'>Action</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product, idx) => (
								<React.Fragment key={idx}>
									<tr
										className='border-b border-zinc-800 font-semibold cursor-pointer'
										onClick={() => toggleExpand(idx)}>
										<td className='py-3 flex items-center gap-2'>
											<img
												src={product.icon}
												className='w-5 h-5'
												alt={product.name}
											/>
											{product.name}
										</td>
										<td className='py-3'>{product.apr}</td>
										<td className='py-3'>{product.period}</td>
										<td className='py-3 text-right text-gray-500'>
											{expanded[idx] ? '▾' : '▸'}
										</td>
									</tr>
									{expanded[idx] &&
										product.children?.map((child, cIdx) => (
											<tr
												key={cIdx}
												className='border-b border-zinc-900'>
												<td className='py-3 pl-6'>{child.name}</td>
												<td className='py-3 text-green-400'>{child.apr}</td>
												<td className='py-3'>{child.period}</td>
												<td className='py-3 text-right'>
													<button className='bg-lime-400 text-black px-3 py-1 rounded-md text-xs'>
														Subscribe
													</button>
												</td>
											</tr>
										))}
								</React.Fragment>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default HotProducts;
