import { FileSearch } from 'lucide-react';

const FuturesTransactions = () => {
	return (
		<div className='text-white p-4'>
			<h2 className='text-lg font-semibold mb-6'>Spot Transactions</h2>

			{/* Filters */}
			<div className='flex flex-wrap items-center gap-2 mb-6'>
				{/* Time Filter */}
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>Last 1 month</option>
					<option>Last 7 days</option>
					<option>Last 3 months</option>
				</select>

				{/* Date Range */}
				<input
					type='date'
					defaultValue='2025-04-29'
					className='bg-[#121212] border border-gray-600 px-3 py-2 rounded text-sm'
				/>
				<input
					type='date'
					defaultValue='2025-05-28'
					className='bg-[#121212] border border-gray-600 px-3 py-2 rounded text-sm'
				/>

				{/* Coin Filter */}
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>All</option>
				</select>

				{/* Type Filter */}
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

export default FuturesTransactions;
