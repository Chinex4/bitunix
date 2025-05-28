import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FileSearch } from 'lucide-react';

const tabs = [
	{ label: 'Open Orders', tab: '1' },
	{ label: 'Order History', tab: '2' },
	{ label: 'Trade History', tab: '3' },
	{ label: 'Position History', tab: '4' },
];

const OpenOrders = () => {
	return (
		<div className='text-white mt-4'>
			<div className='text-sm text-white font-semibold mb-2'>USDT-M</div>
			<div className='flex flex-wrap gap-2 mb-4'>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>Limit</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>Futures</option>
					<option>Spot</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>All</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>Side</option>
					<option>Buy</option>
					<option>Sell</option>
				</select>
				<button className='bg-lime-400 text-black px-4 py-2 rounded font-semibold'>
					Search
				</button>
				<button className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					Reset
				</button>
			</div>

			<div className='overflow-x-auto'>
				<table className='w-full text-sm text-left'>
					<thead className='text-gray-400 border-b border-gray-600'>
						<tr>
							<th>Futures</th>
							<th>Order Time</th>
							<th>Side</th>
							<th>Type | Expiration</th>
							<th>Avg. Price | Price</th>
							<th>Filled | Quantity</th>
							<th>TP | SL</th>
							<th>Reduce Only</th>
							<th>Cancel all</th>
						</tr>
					</thead>
				</table>
				<div className='flex flex-col items-center justify-center py-16 text-gray-400'>
					<FileSearch
						size={48}
						className='mb-4'
					/>
					<p>No Data</p>
				</div>
			</div>
		</div>
	);
};

const OrderHistory = () => {
	return (
		<div className='text-white mt-4'>
			<div className='text-sm text-white font-semibold mb-2'>USDT-M</div>
			<div className='flex flex-wrap gap-2 mb-4'>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>Limit</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>Futures</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>All</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>Side</option>
				</select>
				<input
					type='date'
					className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'
				/>
				<input
					type='date'
					className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'
				/>
				<button className='bg-lime-400 text-black px-4 py-2 rounded font-semibold'>
					Search
				</button>
				<button className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					Reset
				</button>
			</div>

			<div className='overflow-x-auto'>
				<table className='w-full text-sm text-left'>
					<thead className='text-gray-400 border-b border-gray-600'>
						<tr>
							<th>Futures</th>
							<th>Order Time</th>
							<th>Side</th>
							<th>Type | Expiration Avg. Price | Price</th>
							<th>Filled | Quantity</th>
							<th>PnL</th>
							<th>Fee</th>
							<th>Reduce Only</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
				</table>
				<div className='flex flex-col items-center justify-center py-16 text-gray-400'>
					<FileSearch
						size={48}
						className='mb-4'
					/>
					<p>No Data</p>
				</div>
			</div>
		</div>
	);
};

const TradeHistory = () => {
	return (
		<div className='text-white mt-4'>
			<div className='flex flex-wrap gap-2 mb-4'>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>Futures</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>All</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>Side</option>
				</select>
				<input
					type='date'
					className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'
				/>
				<input
					type='date'
					className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'
				/>
				<button className='bg-lime-400 text-black px-4 py-2 rounded font-semibold'>
					Search
				</button>
				<button className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					Reset
				</button>
			</div>

			<div className='overflow-x-auto'>
				<table className='w-full text-sm text-left'>
					<thead className='text-gray-400 border-b border-gray-600'>
						<tr>
							<th>Futures</th>
							<th>Date</th>
							<th>Side</th>
							<th>Average Price</th>
							<th>Volume</th>
							<th>Closed Value</th>
							<th>Realized PnL</th>
							<th>Fee</th>
							<th>Taker / Maker</th>
						</tr>
					</thead>
				</table>
				<div className='flex flex-col items-center justify-center py-16 text-gray-400'>
					<FileSearch
						size={48}
						className='mb-4'
					/>
					<p>No Data</p>
				</div>
			</div>
		</div>
	);
};

const PositionHistory = () => {
	return (
		<div className='text-white mt-4'>
			<div className='flex flex-wrap gap-2 mb-4'>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>Futures</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>All</option>
				</select>
				<select className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					<option>Side</option>
				</select>
				<input
					type='date'
					className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'
				/>
				<input
					type='date'
					className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'
				/>
				<button className='bg-lime-400 text-black px-4 py-2 rounded font-semibold'>
					Search
				</button>
				<button className='bg-[#121212] border border-gray-600 px-4 py-2 rounded'>
					Reset
				</button>
			</div>

			<div className='flex flex-col items-center justify-center py-16 text-gray-400'>
				<FileSearch
					size={48}
					className='mb-4'
				/>
				<p>No Data</p>
			</div>
		</div>
	);
};

const FutureOrders = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get('tab') || '1';

	const handleTabClick = (tab) => {
		setSearchParams({ tab });
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case '1':
				return <OpenOrders />;
			case '2':
				return <OrderHistory />;
			case '3':
				return <TradeHistory />;
			case '4':
				return <PositionHistory />;
			default:
				return <OpenOrders />;
		}
	};

	return (
		<div className='text-white'>
			<div className='flex space-x-6 border-b border-gray-700'>
				{tabs.map(({ label, tab }) => (
					<button
						key={tab}
						onClick={() => handleTabClick(tab)}
						className={`pb-2 border-b-2 ${
							activeTab === tab
								? 'border-lime-400 font-semibold text-white'
								: 'border-transparent text-gray-400'
						}`}>
						{label}
					</button>
				))}
			</div>

			<div className='mt-4'>{renderTabContent()}</div>
		</div>
	);
};

export default FutureOrders;
