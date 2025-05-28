import { FileSearch } from 'lucide-react';

const FiatTransactions = () => {
	return (
		<div className='text-white p-4'>
			<h2 className='text-lg font-semibold mb-4'>Fiat Transactions</h2>

			{/* Filters */}
			<div className='flex flex-wrap items-center gap-2 mb-6'>
				<input
					type='date'
					defaultValue='2025-04-28'
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

				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>Status</option>
					<option>All</option>
				</select>

				<button className='bg-lime-400 text-black px-4 py-2 rounded text-sm font-semibold'>
					Search
				</button>
				<button className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					Reset
				</button>
			</div>

			{/* No Data */}
			<div className='flex flex-col items-center justify-center py-24 text-gray-400'>
				<FileSearch
					size={48}
					strokeWidth={1.5}
					className='mb-2'
				/>
				<p>No data</p>
			</div>
		</div>
	);
};

export default FiatTransactions;
