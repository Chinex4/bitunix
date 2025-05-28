import { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const SearchModal = ({ isOpen, closeModal }) => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (isOpen) {
			setLoading(true);
			fetch(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
			)
				.then((res) => res.json())
				.then((data) => {
					setCoins(data); // rich metadata
					setLoading(false);
				})
				.catch(() => setLoading(false));
		}
	}, [isOpen]);

	const filteredCoins = coins.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<Transition
			appear
			show={isOpen}
			as={Fragment}>
			<Dialog
				as='div'
				className='relative z-50'
				onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black bg-opacity-60' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-md bg-[#121212] text-white p-6 text-left align-middle shadow-xl transition-all'>
								<div className='flex justify-between items-center mb-4'>
									<input
										type='text'
										placeholder='Search'
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										className='w-full px-4 py-2 border border-lime-400 bg-[#1a1a1a] rounded text-white outline-none'
									/>
									<button
										onClick={closeModal}
										className='ml-2 text-gray-400 hover:text-white'>
										<X size={18} />
									</button>
								</div>

								{loading ? (
									<p className='text-center text-gray-400'>Loading...</p>
								) : (
									<div className='max-h-[400px] overflow-y-auto space-y-3'>
										{filteredCoins.length === 0 ? (
											<p className='text-center text-sm text-gray-500'>
												No results for "{search}"
											</p>
										) : (
											filteredCoins.map((coin) => (
												<div
													key={coin.id}
													className='flex justify-between items-center p-3 bg-[#1d1d1f] rounded hover:bg-[#222]'
													onClick={() => {
														navigate(
															`/contract-trade/${coin.symbol.toUpperCase()}-USDT`
														);
														closeModal();
													}}>
													<div className='flex items-center gap-3'>
														<img
															src={coin.image}
															alt={coin.name}
															className='w-6 h-6 rounded-full'
														/>
														<div>
															<p className='font-medium text-sm'>
																{coin.name} ({coin.symbol.toUpperCase()})
															</p>
															<p className='text-[11px] text-gray-500'>
																${coin.current_price.toLocaleString()}
															</p>
														</div>
													</div>
													<p
														className={`text-sm ${
															coin.price_change_percentage_24h >= 0
																? 'text-green-400'
																: 'text-red-400'
														}`}>
														{coin.price_change_percentage_24h?.toFixed(2)}%
													</p>
												</div>
											))
										)}
									</div>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default SearchModal;
