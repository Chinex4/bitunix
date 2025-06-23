import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ openModal }) => {
	return (
		<div
			onClick={openModal}
			className='md:w-[200px] flex items-center gap-2 px-3 py-1 bg-[#0D0D0D] text-gray-400 rounded-full cursor-pointer hover:border hover:border-lime-400'>
			<Search size={16} />
			<span className='text-sm'>Search</span>
		</div>
	);
};

export default SearchBar;
