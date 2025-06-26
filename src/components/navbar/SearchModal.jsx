import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import SweetLoader from '../SweetLoader';

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const CACHE_KEY = 'popularCoinsCache';
const CACHE_TTL = 60 * 1000 * 60; // 60 mins

const SearchModal = ({ isOpen, closeModal }) => {
	const [data, setData] = useState({ futures: [], spot: [] });
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [showAllFutures, setShowAllFutures] = useState(false);
	const [showAllSpot, setShowAllSpot] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPopularCoins = async () => {
			try {
				setLoading(true);
				const res = await fetch(
					`https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h&x_cg_pro_api_key=${API_KEY}`
				);
				const markets = await res.json();

				if (!Array.isArray(markets))
					throw new Error('Invalid response from CoinGecko');

				// Just duplicate the markets for both futures & spot if you don't have separate identifiers
				const result = {
					futures: markets.slice(0, 50), // You can filter differently if needed
					spot: markets.slice(0, 7),
				};

				setData(result);
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ ...result, _ts: Date.now() })
				);
			} catch (err) {
				console.error('Fetch failed:', err);
			} finally {
				setLoading(false);
			}
		};

		if (isOpen) {
			const cached = localStorage.getItem(CACHE_KEY);
			if (cached) {
				try {
					const parsed = JSON.parse(cached);
					if (Date.now() - parsed._ts < CACHE_TTL) {
						setData({
							futures: Array.isArray(parsed.futures) ? parsed.futures : [],
							spot: Array.isArray(parsed.spot) ? parsed.spot : [],
						});
						setLoading(false);
					} else {
						fetchPopularCoins();
					}
				} catch {
					fetchPopularCoins();
				}
			} else {
				fetchPopularCoins();
			}
		}
	}, [isOpen]);

	const filteredFutures = data.futures.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);
	const filteredSpot = data.spot.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);

	const coinsToShow = (coins, showAll) =>
		search ? coins : showAll ? coins : coins.slice(0, 3);

	const renderCoinRow = (coin, isFutures = false) => {
		return (
		  <div
			key={coin.id}
			className='grid grid-cols-5 gap-3 items-center px-2 py-3 border-b border-[#2a2a2a] cursor-pointer hover:bg-[#1c1c1c]'
			onClick={() => {
			  navigate(`/contract-trade/${coin.symbol.toUpperCase()}-USDT`);
			  closeModal();
			}}>
			<div className='flex items-center gap-2'>
			  <img src={coin.image} alt={coin.name} className='w-5 h-5' />
			  <span className='text-sm font-medium text-white'>
				{coin.symbol.toUpperCase()}USDT {isFutures && 'Perpetual'}
			  </span>
			</div>
	  
			<div className='text-right text-xs'>
			  {coin.high_24h && coin.low_24h ? (
				<>
				  <div>{coin.high_24h.toLocaleString()}</div>
				  <div className='text-gray-500'>{coin.low_24h.toLocaleString()}</div>
				</>
			  ) : '--'}
			</div>
	  
			<div className='text-right text-xs'>
			  {coin.market_cap ? coin.market_cap.toLocaleString() : '--'}
			</div>
	  
			<div
			  className={`text-xs text-right ${
				coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
			  }`}>
			  {coin.price_change_percentage_24h?.toFixed(2)}%
			</div>
	  
			<div className='hidden sm:flex justify-end'>
			  <Sparklines
				data={coin.sparkline_in_7d?.price || []}
				width={80}
				height={24}>
				<SparklinesLine
				  style={{
					strokeWidth: 2,
					stroke: coin.price_change_percentage_24h >= 0 ? '#4ade80' : '#f87171',
					fill: 'none',
				  }}
				/>
			  </Sparklines>
			</div>
		  </div>
		);
	  };

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
							<Dialog.Panel className='w-full max-w-3xl max-h-[80vh] overflow-y-auto transform rounded bg-[#121212] text-white p-4 text-left align-middle shadow-xl transition-all scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent'>
								<div className='flex items-center gap-2 mb-4'>
									<input
										type='text'
										placeholder='Search'
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										className='w-full px-4 py-2 border border-lime-400 bg-[#1a1a1a] rounded text-white outline-none'
									/>
									<button
										onClick={closeModal}
										className='ml-2 text-red-500 hover:text-red-300 text-sm font-semibold'>
										Cancel
									</button>
								</div>

								{loading ? (
									<SweetLoader />
								) : (
									<>
										{/* === Shared Header === */}
										<div className='grid grid-cols-5 gap-3 text-xs text-gray-400 font-semibold px-2 pb-2'>
											<div>Pair</div>
											<div className='text-right'>H/L(24H)</div>
											<div className='text-right'>Mcap(24H)</div>
											<div className='text-right'>Volume</div>
											<div className='text-right hidden sm:block'>7D</div>
										</div>

										{/* === FUTURES === */}
										<p className='text-sm text-lime-400 mb-2 px-2'>
											Popular Futures
										</p>
										<div className='rounded border border-[#2a2a2a] mb-6'>
											{coinsToShow(filteredFutures, showAllFutures).map(
												(coin) => renderCoinRow(coin, true)
											)}
											{!search && (
												<button
													onClick={() => setShowAllFutures(!showAllFutures)}
													className='w-full text-left px-2 py-2 text-xs text-lime-400 hover:underline'>
													{showAllFutures
														? 'Show Less'
														: `View More(${filteredFutures.length})`}
												</button>
											)}
										</div>

										{/* === SPOT === */}
										<p className='text-sm text-lime-400 mb-2 px-2'>
											Popular Spot
										</p>
										<div className='rounded border border-[#2a2a2a]'>
											{coinsToShow(filteredSpot, showAllSpot).map((coin) =>
												renderCoinRow(coin)
											)}
											{!search && (
												<button
													onClick={() => setShowAllSpot(!showAllSpot)}
													className='w-full text-left px-2 py-2 text-xs text-lime-400 hover:underline'>
													{showAllSpot
														? 'Show Less'
														: `View More(${filteredSpot.length})`}
												</button>
											)}
										</div>
									</>
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
