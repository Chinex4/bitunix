import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
	return (
		<div className='flex border-b border-gray-700 bg-[#0b0b0b] text-white text-sm font-semibold'>
			{['Chart', 'Trade'].map((tab) => (
				<button
					key={tab}
					onClick={() => setActiveTab(tab)}
					className={`px-4 py-2 transition-all ${
						activeTab === tab
							? 'border-b-2 border-white text-white'
							: 'text-gray-400'
					}`}>
					{tab}
				</button>
			))}
		</div>
	);
};

export default Tabs;
