import { ChevronRight } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import FAQ from '../../components/FAQ';

const Overview = () => {
	const accounts = [
		{ name: 'Spot Account', path: 'spot-account' },
		{ name: 'Futures Account', path: 'futures-account' },
		{ name: 'Earn Account', path: 'earn-account' },
		{ name: 'Copy Account', path: 'copy-account' },
	];

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
			{/* LEFT COLUMN */}
			<div className='lg:col-span-2 space-y-6'>
				{/* Total Assets */}
				<div>
					<h3 className='text-sm text-gray-400'>Total Assets</h3>
					<div className='text-2xl font-bold mt-1'>0.00 USDT</div>
					<div className='text-xs text-gray-500'>≈ $0.00</div>
				</div>

				{/* Quick Actions */}
				<div className='grid grid-cols-4 text-center text-sm'>
					{['Deposit', 'Buy Crypto', 'Withdraw', 'Transfer'].map((action) => (
						<div
							key={action}
							className='flex flex-col items-center gap-1'>
							<svg
								className='w-5 h-5 text-lime-400'
								fill='none'
								stroke='currentColor'
								strokeWidth={2}
								viewBox='0 0 24 24'>
								<path d='M12 4v16m8-8H4' />
							</svg>
							<span>{action}</span>
						</div>
					))}
				</div>

				{/* Assets Account */}
				<div className='bg-[#1A1A1A] rounded-xl p-4 space-y-4'>
					<h3 className='font-semibold text-base lg:text-lg'>Assets account</h3>
					{accounts.map((item) => (
						<NavLink
							to={`/assets/${item.path}`}
							key={item.name}
							className='text-xs flex items-center justify-between border-b border-[#333] pt-4 pb-2 last:border-none'>
							<span>{item.name}</span>
							<span className='flex items-center gap-2'>
								<span className='text-gray-400'>0.00 USDT ≈ $0.00</span>
								<ChevronRight className='w-4 h-4' />
							</span>
						</NavLink>
					))}
				</div>

				{/* Deposits & Withdrawals */}
				<div className='bg-[#1A1A1A] rounded-xl p-4'>
					<div className='flex items-center justify-between mb-3'>
						<h3 className='font-semibold text-base lg:text-lg'>
							Deposits & Withdrawals
						</h3>
						<Link
							to='#'
							className='text-sm text-gray-300'>
							View More
						</Link>
					</div>
					<div className='flex flex-col items-center justify-center text-center text-gray-500 text-sm py-8'>
						<svg
							className='w-10 h-10 mb-2 text-gray-600'
							fill='none'
							stroke='currentColor'
							strokeWidth={1.5}
							viewBox='0 0 24 24'>
							<path d='M4 4h16v16H4z' />
							<path d='M9 9h6M9 13h6M9 17h6' />
						</svg>
						<p>No Data</p>
					</div>
				</div>
			</div>

			{/* RIGHT COLUMN */}
			<div className='space-y-6'>
				{/* Fund Your Wallet */}
				<div>
					<h3 className='font-semibold text-base lg:text-lg mb-3'>
						Fund your wallet
					</h3>
					<div className='bg-[#1A1A1A] rounded-lg p-4 space-y-4'>
						{/* Deposit on-chain */}
						<div className='flex justify-between items-center'>
							<div className='flex items-start gap-3'>
								<div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
									<span className='text-lime-500 font-bold text-xl'>₮</span>
								</div>
								<div>
									<span className='text-xs bg-lime-400 text-black px-2 py-0.5 rounded mb-1 inline-block'>
										I have cryptos
									</span>
									<p className='text-sm font-semibold'>Deposit on-chain</p>
									<p className='text-xs text-gray-400'>
										Deposit your existing assets via blockchain
									</p>
								</div>
							</div>
							<ChevronRight className='w-4 h-4 text-gray-400' />
						</div>

						{/* Buy crypto */}
						<div className='flex justify-between items-center'>
							<div className='flex items-start gap-3'>
								<div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
									<svg
										className='w-5 h-5 text-black'
										fill='none'
										stroke='currentColor'
										strokeWidth={1.5}
										viewBox='0 0 24 24'>
										<path d='M5 12h14M12 5l7 7-7 7' />
									</svg>
								</div>
								<div>
									<span className='text-xs bg-blue-600 text-white px-2 py-0.5 rounded mb-1 inline-block'>
										I don't have crypto assets
									</span>
									<p className='text-sm font-semibold'>Buy crypto</p>
									<p className='text-xs text-gray-400'>
										Buy crypto including USDT directly with ease.
									</p>
								</div>
							</div>
							<ChevronRight className='w-4 h-4 text-gray-400' />
						</div>
					</div>
				</div>

				{/* FAQ Section */}
				<div>
					<h3 className='font-semibold text-2xl lg:text-lg'>
						Frequently asked questions
					</h3>
					<FAQ showHeader={false} />
				</div>
			</div>
		</div>
	);
};

export default Overview;
