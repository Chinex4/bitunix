import { FileSearch } from 'lucide-react';

const ConversionRecords = () => {
	return (
		<div className='text-white p-4'>
			<h2 className='text-lg font-semibold mb-4'>Conversion Records</h2>

			{/* Filters */}
			<div className='flex flex-wrap items-center gap-2 mb-6'>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded text-sm'>
					<option>Last 7</option>
					<option>Last 30</option>
					<option>All</option>
				</select>
				<input
					type='date'
					className='bg-[#121212] border border-gray-600 px-3 py-2 rounded text-sm'
					defaultValue='2025-05-21'
				/>
				<input
					type='date'
					className='bg-[#121212] border border-gray-600 px-3 py-2 rounded text-sm'
					defaultValue='2025-05-28'
				/>
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

export default ConversionRecords;
