import { useState } from 'react';
import { FileSearch } from 'lucide-react';

const tabs = [
	{ label: 'Flexible', key: 'flexible' },
	{ label: 'Fixed-Term', key: 'fixed' },
	{ label: 'Dual Investments', key: 'dual' },
];

const EarnTransactions = () => {
	const [activeTab, setActiveTab] = useState('flexible');

	return (
		<div className='text-white p-4'>
			<h2 className='text-lg font-semibold mb-4'>Earn Transactions</h2>

			{/* Tabs */}
			<div className='flex gap-4 mb-6'>
				{tabs.map((tab) => (
					<button
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						className={`px-4 py-2 rounded text-sm font-medium ${
							activeTab === tab.key
								? 'bg-white text-black'
								: 'bg-transparent text-gray-400'
						}`}>
						{tab.label}
					</button>
				))}
			</div>

			{/* Filters */}
			<div className='flex flex-wrap items-center gap-2 mb-8'>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>Last 7 days</option>
					<option>Last 30 days</option>
					<option>Custom</option>
				</select>
				<input
					type='date'
					defaultValue='2025-05-21'
					className='bg-[#121212] border border-gray-600 px-3 py-2 rounded text-sm'
				/>
				<input
					type='date'
					defaultValue='2025-05-28'
					className='bg-[#121212] border border-gray-600 px-3 py-2 rounded text-sm'
				/>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>All</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>All</option>
				</select>
			</div>

			{/* No Data */}
			<div className='flex flex-col items-center justify-center py-24 text-gray-500'>
				<FileSearch
					size={48}
					strokeWidth={1.5}
					className='mb-2 opacity-50'
				/>
				<p>No Data</p>
			</div>
		</div>
	);
};

export default EarnTransactions;
