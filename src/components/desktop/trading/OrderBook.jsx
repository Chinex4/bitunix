import { Fragment } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const OrderBook = ({ bids = [], asks = [], trades = [] }) => {
	return (
		<div className='w-full rounded-lg bg-[#1A1A1A] p-4 text-white'>
			<Tab.Group>
				<Tab.List className='flex space-x-1 rounded-md bg-black/40 p-1 mb-4'>
					<Tab
						className={({ selected }) =>
							classNames(
								'w-full py-2.5 text-sm font-medium leading-5 rounded-md',
								selected
									? 'bg-accent text-white shadow'
									: 'text-gray-400 hover:bg-black hover:text-white'
							)
						}>
						Order Book
					</Tab>
					<Tab
						className={({ selected }) =>
							classNames(
								'w-full py-2.5 text-sm font-medium leading-5 rounded-md',
								selected
									? 'bg-accent text-white shadow'
									: 'text-gray-400 hover:bg-black hover:text-white'
							)
						}>
						Recent Trades
					</Tab>
				</Tab.List>

				<Tab.Panels>
					<Tab.Panel>
						<div className='grid grid-cols-1 gap-4 text-xs'>
							{/* Bids */}
							<div>
								<h3 className='text-green-500 mb-2'>Bids</h3>
								<ul className='space-y-1'>
									{bids.map(([price, qty], i) => (
										<li
											key={i}
											className='flex justify-between text-green-400'>
											<span>{parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 1 })}</span>
											<span className='text-white'>{parseFloat(qty).toFixed(5)}</span>
										</li>
									))}
								</ul>
							</div>
							{/* Asks */}
							<div>
								<h3 className='text-red-500 mb-2'>Asks</h3>
								<ul className='space-y-1'>
									{asks.map(([price, qty], i) => (
										<li
											key={i}
											className='flex justify-between text-red-400'>
											<span>{parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 1 })}</span>
											<span className='text-white'>{parseFloat(qty).toFixed(5)}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</Tab.Panel>
					<Tab.Panel>
						<div className='text-xs space-y-2'>
							{trades.length === 0 && (
								<p className='text-gray-400 text-center'>No recent trades</p>
							)}
							{trades.map((trade, i) => (
								<div
									key={i}
									className='flex justify-between border-b border-gray-800 pb-1'>
									<span>{trade.time}</span>
									<span className='text-accent'>{trade.price}</span>
									<span>{trade.amount}</span>
								</div>
							))}
						</div>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};

export default OrderBook;
