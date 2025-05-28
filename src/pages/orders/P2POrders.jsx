import { useState } from 'react';
import { FileSearch } from 'lucide-react';

const P2POrders = () => {
	const [activeTab, setActiveTab] = useState('in-progress');

	const tabs = [
		{ label: 'In Progress', key: 'in-progress' },
		{ label: 'Completed', key: 'completed' },
	];

	return (
		<div className='text-white p-4'>
			{/* Tabs */}
			<div className='flex space-x-6 border-b border-neutral-700 mb-4'>
				{tabs.map((tab) => (
					<button
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						className={`pb-2 border-b-2 text-sm font-medium ${
							activeTab === tab.key
								? 'border-lime-400 text-white'
								: 'border-transparent text-gray-500'
						}`}>
						{tab.label}
					</button>
				))}
			</div>

			{/* Filter Bar */}
			<div className='flex flex-wrap items-center gap-2 mb-6'>
				<input
					type='date'
					defaultValue='2025-02-27'
					className='bg-[#121212] border border-gray-600 px-3 py-2 rounded text-sm'
				/>
				<input
					type='date'
					defaultValue='2025-05-28'
					className='bg-[#121212] border border-gray-600 px-3 py-2 rounded text-sm'
				/>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>Side</option>
					<option>Buy</option>
					<option>Sell</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>Crypto</option>
					<option>All</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>Fiat</option>
					<option>All</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>Status</option>
					<option>All</option>
				</select>
			</div>

			{/* Table Header */}
			<table className='w-full text-sm text-left'>
				<thead className='text-gray-400 border-b border-gray-700'>
					<tr>
						<th className='px-2 py-1'>Order</th>
						<th className='px-2 py-1'>Side</th>
						<th className='px-2 py-1'>Quantity</th>
						<th className='px-2 py-1'>Amount</th>
						<th className='px-2 py-1'>Price</th>
						<th className='px-2 py-1'>Counterparty</th>
						<th className='px-2 py-1'>Status</th>
					</tr>
				</thead>
			</table>

			{/* No Data Display */}
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

export default P2POrders;
