import { Search, ChevronRight } from 'lucide-react';

const tokenList = [
	{ symbol: 'btc', name: 'Bitcoin' },
	{ symbol: 'usdt', name: 'Tether' },
	{ symbol: 'eth', name: 'Ethereum' },
	{ symbol: 'aave', name: 'AAVE' },
	{ symbol: '1inch', name: '1inch Network' },
];

const SpotAccount = () => {
	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4'>
				<div>
					<h2 className='text-2xl font-bold'>Spot Account</h2>
					<div className='mt-2'>
						<p className='text-sm text-gray-400'>Total Assets</p>
						<div className='text-xl font-bold'>0.00 USDT</div>
						<p className='text-xs text-gray-500'>≈ A$0.00</p>
					</div>
				</div>
				<div>
					<p className='text-sm text-gray-400'>
						Today's PnL{' '}
						<span className='bg-green-800 text-xs text-green-300 ml-1 px-2 py-0.5 rounded'>
							PnL Analysis
						</span>
					</p>
					<div className='text-xl font-bold mt-1'>A$0.00</div>
					<p className='text-xs text-gray-500'>0.00%</p>
				</div>
				<div className='flex gap-3 mt-2 lg:mt-0'>
					<button className='bg-lime-400 text-black px-4 py-2 rounded text-sm'>
						Deposit
					</button>
					<button className='bg-[#1A1A1A] text-white px-4 py-2 rounded text-sm'>
						Withdraw
					</button>
					<button className='bg-[#1A1A1A] text-white px-4 py-2 rounded text-sm'>
						Transfer
					</button>
				</div>
			</div>

			{/* Search & Filters */}
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
				<div className='flex items-center border border-[#333] bg-[#1A1A1A] rounded px-3 py-2 w-full md:w-1/3'>
					<Search className='w-4 h-4 text-gray-400' />
					<input
						type='text'
						placeholder='Search'
						className='bg-transparent outline-none text-sm ml-2 w-full'
					/>
				</div>
				<div className='flex items-center justify-between text-xs text-gray-400 mt-2 md:mt-0'>
					<label className='flex items-center gap-1'>
						<input
							type='checkbox'
							className='form-checkbox bg-transparent'
						/>
						Hide 0 balance assets
					</label>
					<button className='flex items-center gap-1 hover:text-white'>
						Convert Small Balance{' '}
						<span className='rotate-90 inline-block'>↻</span>
					</button>
				</div>
			</div>

			{/* Desktop Table */}
			<div className='hidden lg:block overflow-x-auto'>
				<table className='w-full text-sm text-left mt-4 border-collapse'>
					<thead>
						<tr className='text-gray-400 border-b border-[#333]'>
							<th className='py-3'>Coin</th>
							<th className='py-3'>Total</th>
							<th className='py-3'>Available</th>
							<th className='py-3'>In Order</th>
							<th className='py-3'>Withdrawing</th>
							<th className='py-3'>P2P Frozen</th>
							<th className='py-3'>Action</th>
						</tr>
					</thead>
					<tbody>
						{tokenList.map((token) => (
							<tr
								key={token.symbol}
								className='border-b border-[#222] hover:bg-[#111]'>
								<td className='py-3 px-3'>
                                <div className='font-semibold flex items-center gap-2'>
									<img
										className='size-6 rounded-full'
										src={`/assets/${token.symbol}.png`}
										alt=''
									/>

									<div className='text-sm text-white'>{token.name}</div>
								</div>
								</td>
								<td className='py-3'>
									0.00000000{' '}
									<div className='text-xs text-gray-400'>≈ A$0.00</div>
								</td>
								<td className='py-3'>0.00000000</td>
								<td className='py-3'>0.00000000</td>
								<td className='py-3'>0.00000000</td>
								<td className='py-3'>0.00000000</td>
								<td className='py-3 text-lime-400'>
									<div className='flex gap-2'>
										<button>Deposit</button>
										<button>Withdraw</button>
										<button>Trade</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile Cards */}
			<div className='space-y-4 lg:hidden'>
				{tokenList.map((token) => (
					<div
						key={token.symbol}
						className='bg-[#1A1A1A] rounded p-4 text-sm'>
						<div className='flex justify-between items-center mb-2'>
							<div>
								<div className='font-semibold flex items-center gap-2'>
									<img
										className='size-6 rounded-full'
										src={`/assets/${token.symbol}.png`}
										alt=''
									/>

									<div className='text-sm text-gray-400'>{token.name}</div>
								</div>
							</div>
							<div className='text-right text-xs text-gray-400'>
								<div>Total: 0.00000000</div>
								<div>≈ A$0.00</div>
							</div>
						</div>
						<div className='grid grid-cols-2 gap-y-1 text-xs text-gray-400'>
							<div>Available:</div>
							<div>0.00000000</div>
							<div>Withdrawing:</div>
							<div>0.00000000</div>
							<div>In Order:</div>
							<div>0.00000000</div>
							<div>P2P Frozen:</div>
							<div>0.00000000</div>
						</div>
						<div className='flex gap-3 mt-3 text-lime-400 text-xs'>
							<button>Deposit</button>
							<button>Withdraw</button>
							<button>Trade</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SpotAccount;
