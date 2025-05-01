const OrderBook = ({ bids, asks }) => {
	return (
		<div className='bg-gray-900 rounded-lg p-4'>
			<h2 className='text-xl font-semibold mb-2'>Order Book</h2>
			<div className='grid grid-cols-2 gap-4 text-sm'>
				<div>
					<h3 className='text-green-400 mb-1'>Bids</h3>
					<ul>
						{bids.map(([price, qty], i) => (
							<li
								key={i}
								className='flex justify-between'>
								<span className='text-green-400'>
									{parseFloat(price).toFixed(2)}
								</span>
								<span>{parseFloat(qty).toFixed(5)}</span>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className='text-red-400 mb-1'>Asks</h3>
					<ul>
						{asks.map(([price, qty], i) => (
							<li
								key={i}
								className='flex justify-between'>
								<span className='text-red-400'>
									{parseFloat(price).toFixed(2)}
								</span>
								<span>{parseFloat(qty).toFixed(5)}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default OrderBook;
