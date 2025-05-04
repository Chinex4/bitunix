import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const futuresAssets = [
	{ symbol: 'usdt', name: 'Tether' },
	{ symbol: 'bnb', name: 'Binance Coin' },
	{ symbol: 'btc', name: 'Bitcoin' },
	{ symbol: 'doge', name: 'Dogecoin' },
	{ symbol: 'eth', name: 'Ethereum' },
	{ symbol: 'fdusd', name: 'First Digital USD' },
];

const FuturesAccount = () => {
	const [activeTab, setActiveTab] = useState('Assets');

	return (
		<div className='space-y-6'>
			{/* Header Section */}
			<div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4'>
				<h2 className='text-2xl font-bold'>Futures Account</h2>
				<button className='bg-lime-400 text-black px-5 py-2 rounded text-sm w-fit'>
					Transfer
				</button>
			</div>

			{/* Balance Summary */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{/* Total Assets */}
				<div>
					<p className='text-sm text-gray-400'>Total Assets</p>
					<h3 className='text-xl font-bold mt-1'>0.00 USDT</h3>
					<p className='text-xs text-gray-500'>≈ A$0.00</p>
				</div>

				{/* Today's PnL */}
				<div>
					<p className='text-sm text-gray-400'>
						Today's PnL
						<span className='ml-2 bg-green-800 text-green-300 text-xs px-2 py-0.5 rounded'>
							PnL Analysis
						</span>
					</p>
					<h3 className='text-xl font-bold mt-1'>--</h3>
					<p className='text-xs text-gray-500'>≈ --</p>
				</div>

				{/* Unrealized PnL */}
				<div>
					<p className='text-sm text-gray-400'>Total Unrealized PnL</p>
					<h3 className='text-xl font-bold mt-1'>0.00 USDT</h3>
					<p className='text-xs text-gray-500'>≈ A$0.00</p>
				</div>
			</div>

			{/* Tabs */}
			<div className='flex items-center gap-6 border-b border-[#333] text-sm mt-4'>
				{['Assets', 'Positions'].map((tab) => (
					<button
						key={tab}
						className={`pb-2 ${
							activeTab === tab
								? 'border-b-2 border-white font-semibold'
								: 'text-gray-400'
						}`}
						onClick={() => setActiveTab(tab)}>
						{tab}
					</button>
				))}
			</div>

			{/* Desktop Table */}
			{activeTab === 'Assets' && (
				<div className='hidden lg:block overflow-x-auto'>
					<table className='w-full text-sm text-left mt-4 border-collapse'>
						<thead>
							<tr className='text-gray-400 border-b border-[#333]'>
								<th className='py-3'>Coin</th>
								<th className='py-3'>Currency Equity</th>
								<th className='py-3'>Wallet Balance</th>
								<th className='py-3'>Available</th>
								<th className='py-3'>In Use</th>
								<th className='py-3'>Futures Bonus</th>
								<th className='py-3'>Action</th>
							</tr>
						</thead>
						<tbody>
							{futuresAssets.map((asset) => (
								<tr
									key={asset.symbol}
									className='border-b border-[#222] hover:bg-[#111]'>
									<td className='py-3 px-3'>
										<div className='font-semibold flex items-center gap-2'>
											<img
												className='size-6 rounded-full'
												src={`/assets/${asset.symbol}.png`}
												alt=''
											/>

											<div className='text-sm text-white'>{asset.name}</div>
										</div>
									</td>
									<td className='py-3'>0.00</td>
									<td className='py-3'>0.00</td>
									<td className='py-3'>0.00</td>
									<td className='py-3'>0.00</td>
									<td className='py-3'>0.00</td>
									<td className='py-3 text-lime-400'>
										<button>Transfer</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{/* Mobile Cards */}
			{activeTab === 'Assets' && (
				<div className='space-y-4 lg:hidden'>
					{futuresAssets.map((asset) => (
						<div
							key={asset.symbol}
							className='bg-[#1A1A1A] rounded p-4 text-sm'>
							<div className='flex justify-between items-center mb-2'>
								<div className='font-semibold flex items-center gap-2'>
									<img
										className='size-6 rounded-full'
										src={`/assets/${asset.symbol}.png`}
										alt=''
									/>

									<div className='text-sm text-white'>{asset.name}</div>
								</div>
								<button className='text-lime-400 text-xs'>Transfer</button>
							</div>
							<div className='grid grid-cols-2 gap-y-1 text-xs text-gray-400'>
								<div>Currency Equity:</div>
								<div>0.00</div>
								<div>Wallet Balance:</div>
								<div>0.00</div>
								<div>Available:</div>
								<div>0.00</div>
								<div>In Use:</div>
								<div>0.00</div>
								<div>Futures Bonus:</div>
								<div>0.00</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FuturesAccount;
