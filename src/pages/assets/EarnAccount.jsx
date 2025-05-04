import { useState } from 'react';

const EarnAccount = () => {
	const [tab, setTab] = useState('Flexible');
	const tabOptions = ['Flexible', 'Fixed Terms', 'Dual Investments(0)'];

	return (
		<div className='space-y-6'>
			{/* Title */}
			<h2 className='text-2xl font-bold'>Earn Account</h2>

			{/* Total Asset Display */}
			<div>
				<p className='text-sm text-gray-400'>Total Assets</p>
				<h3 className='text-xl font-bold mt-1'>0.00 USDT</h3>
				<p className='text-xs text-gray-500'>≈ A$0.00</p>
			</div>

			{/* Tab Buttons */}
			<div className='flex items-center gap-6 border-b border-[#333] text-sm mt-4 overflow-x-auto whitespace-nowrap hide-scrollbar'>
				{tabOptions.map((item) => (
					<button
						key={item}
						className={`pb-2 ${
							tab === item
								? 'border-b-2 border-white font-semibold'
								: 'text-gray-400'
						}`}
						onClick={() => setTab(item)}>
						{item}
					</button>
				))}
			</div>

			{/* Content Area */}
			<div className='flex flex-col items-center justify-center text-gray-500 text-sm py-16'>
				<svg
					className='w-10 h-10 mb-3 text-gray-600'
					fill='none'
					stroke='currentColor'
					strokeWidth={1.5}
					viewBox='0 0 24 24'>
					<path d='M4 4h16v16H4z' />
					<path d='M9 9h6M9 13h6M9 17h6' />
				</svg>
				<p>No data</p>
			</div>
		</div>
	);
};

export default EarnAccount;
