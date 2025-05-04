import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const TABS = [
	{ label: 'All Records', key: 'all' },
	{ label: 'Futures Bonus', key: 'futures' },
];

const Rewards = () => {
	const [activeTab, setActiveTab] = useState('all');

	return (
		<div className='p-4 md:p-6 lg:p-8 text-white'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl md:text-3xl font-bold'>My Rewards</h2>
				{/* <button className='text-sm text-blue-400 flex items-center gap-1'>
					Reward History <ChevronRight className='w-4 h-4' />
				</button> */}
			</div>

			{/* Tabs */}
			<div className='flex gap-2 mb-8'>
				{TABS.map((tab) => (
					<button
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						className={`px-4 py-1.5 rounded border text-sm ${
							activeTab === tab.key
								? 'bg-white text-black font-semibold'
								: 'border-gray-700 text-gray-400'
						}`}>
						{tab.label}(0)
					</button>
				))}
			</div>

			{/* No Data Display */}
			<div className='flex flex-col items-center justify-center py-20'>
				<svg
					className='w-10 h-10 mb-3 text-gray-600'
					fill='none'
					stroke='currentColor'
					strokeWidth={1.5}
					viewBox='0 0 24 24'>
					<path d='M4 4h16v16H4z' />
					<path d='M9 9h6M9 13h6M9 17h6' />
				</svg>
				<p className='text-sm text-gray-500'>No record</p>
			</div>
		</div>
	);
};

export default Rewards;
