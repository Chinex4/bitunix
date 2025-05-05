import { useState } from 'react';

const TradePanel = ({ livePrice }) => {
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');

	return (
		<div className='rounded-lg p-4'>
			<div className='flex justify-between items-center mb-3'>
				<h2 className='text-xl font-semibold'>Trade</h2>
				<span className='text-sm text-gray-400'>
					Live: ${livePrice || '---'}
				</span>
			</div>

			<div className='space-y-3'>
				<div>
					<label className='block text-sm text-gray-400'>Price (USDT)</label>
					<input
						type='number'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className='w-full px-3 py-2 bg-stone-800 text-white rounded'
						placeholder={livePrice || 'Market Price'}
					/>
				</div>

				<div>
					<label className='block text-sm text-stone-400'>Quantity (BTC)</label>
					<input
						type='number'
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
						className='w-full px-3 py-2 bg-stone-800 text-white rounded'
					/>
				</div>

				<div className='flex gap-2 pt-2'>
					<button className='flex-1 bg-green-600 hover:bg-green-700 py-2 rounded text-white font-bold'>
						Open Long
					</button>
					<button className='flex-1 bg-red-600 hover:bg-red-700 py-2 rounded text-white font-bold'>
						Open Short
					</button>
				</div>
			</div>
		</div>
	);
};

export default TradePanel;
