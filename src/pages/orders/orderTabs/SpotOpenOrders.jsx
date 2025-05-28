import { FileSearch } from 'lucide-react';

const SpotOpenOrders = () => {
	return (
		<div>
			{/* Filters */}
			<div className='flex flex-wrap gap-2 mb-4'>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>All</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>Limit | Market</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>All</option>
				</select>
				<button className='ml-auto bg-[#1e1e1e] border border-gray-600 px-4 py-2 rounded text-sm'>
					Cancel all
				</button>
			</div>

			{/* Table */}
			<table className='w-full text-sm text-left'>
				<thead className='text-gray-400 border-b border-gray-700'>
					<tr>
						<th className='px-2 py-1'>Pair</th>
						<th className='px-2 py-1'>Time</th>
						<th className='px-2 py-1'>Type</th>
						<th className='px-2 py-1'>Direction</th>
						<th className='px-2 py-1'>Order Price</th>
						<th className='px-2 py-1'>Amount</th>
						<th className='px-2 py-1'>TP/SL</th>
						<th className='px-2 py-1'>Total</th>
						<th className='px-2 py-1'>Filled | Completion</th>
						<th className='px-2 py-1'>Action</th>
					</tr>
				</thead>
			</table>

			{/* No Data */}
			<div className='flex flex-col items-center justify-center py-16 text-gray-400'>
				<FileSearch
					size={40}
					strokeWidth={1.5}
					className='mb-2'
				/>
				<p>No data</p>
			</div>
		</div>
	);
};

export default SpotOpenOrders;
