import { useState } from 'react';
import { FileSearch } from 'lucide-react';

const tabs = [
	'Positions(0)',
	'Open Orders(0)',
	'Order History',
	'Position History',
	'Trade History',
	'Funding History',
	'Futures Bonus',
];

const TradeTabs = () => {
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const [currentOnly, setCurrentOnly] = useState(true);

	return (
		<div className='bg-black text-white px-4 py-4 min-h-[300px]'>
			{/* Tab List */}
			<div className='flex items-center overflow-x-auto whitespace-nowrap hide-scrollbar gap-6 border-b border-gray-700 text-sm'>
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`py-2 ${
							activeTab === tab
								? 'text-lime-400 border-b-2 border-lime-400'
								: 'text-gray-400'
						}`}>
						{tab}
					</button>
				))}

				{/* Filter */}
				<div className='ml-auto flex items-center gap-2 text-xs text-gray-400'>
					<label className='flex items-center gap-1 cursor-pointer'>
						<input
							type='radio'
							checked={currentOnly}
							onChange={() => setCurrentOnly(true)}
							className='accent-lime-400'
						/>
						Current only
					</label>
					<button className='text-gray-500 hover:text-white text-xs'>
						Close all
					</button>
				</div>
			</div>

			{/* Tab Content */}
			<div className='flex flex-col items-center justify-center h-64 text-gray-400'>
				<FileSearch
					size={40}
					className='mb-2 text-gray-500'
				/>
				<p>No Data</p>
			</div>
		</div>
	);
};

export default TradeTabs;
