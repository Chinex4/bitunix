import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import SpotOpenOrders from './orderTabs/SpotOpenOrders';
import SpotOrderHistory from './orderTabs/SpotOrderHistory';

const spotTabs = [
	{ name: 'Open Orders', tab: '1' },
	{ name: 'Order History', tab: '2' },
];

const SpotOrders = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get('tab') || '1';

	const handleTabChange = (tab) => setSearchParams({ tab });

	return (
		<div className='text-white p-4'>
			{/* Tab Header */}
			<div className='flex space-x-6 border-b border-neutral-700 mb-4'>
				{spotTabs.map((t) => (
					<button
						key={t.tab}
						onClick={() => handleTabChange(t.tab)}
						className={`pb-2 border-b-2 ${
							activeTab === t.tab
								? 'border-white text-white font-semibold'
								: 'border-transparent text-gray-400'
						}`}>
						{t.name}
					</button>
				))}
			</div>

			{/* Tab Body */}
			{activeTab === '1' && <SpotOpenOrders />}
			{activeTab === '2' && <SpotOrderHistory />}
		</div>
	);
};

export default SpotOrders;
