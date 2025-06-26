import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Copy, ChevronRight } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { showSuccess } from '../../utils/toast'; // Assumes you have showSuccess()
import DepositConfirmModal from '../../components/ui/modals/DepositConfirmModal'; // Your modal
import FAQ from '../../components/FAQ';

const POPULAR = ['BTC', 'ETH', 'USDT', 'BNB'];
const MOCK_NETWORKS = {
	USDT: {
		'Tron (TRC-20)': {
			address: 'TAbc123XYZ456TRC',
			qr: 'TAbc123XYZ456TRC',
			min: '10 USDT',
			confirmations: '1 block',
		},
		'Ethereum (ERC-20)': {
			address: '0xabcDEF123456ERC',
			qr: '0xabcDEF123456ERC',
			min: '20 USDT',
			confirmations: '3 blocks',
		},
	},
	BTC: {
		Bitcoin: {
			address: '3Q1HmLVXCGXMgUXrJX6rVNEDRC7b2XD5jS',
			qr: '3Q1HmLVXCGXMgUXrJX6rVNEDRC7b2XD5jS',
			min: '0.0001 BTC',
			confirmations: '4 blocks',
		},
	},
	ETH: {
		Ethereum: {
			address: '0xETH123456789ABC',
			qr: '0xETH123456789ABC',
			min: '0.05 ETH',
			confirmations: '6 blocks',
		},
	},
};

const Deposit = () => {
	const [searchParams] = useSearchParams();
	const [coins, setCoins] = useState([]);
	const [filteredCoins, setFilteredCoins] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [selectedCoin, setSelectedCoin] = useState(null);
	const [copied, setCopied] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isInputFocused, setIsInputFocused] = useState(false);

	const [availableNetworks, setAvailableNetworks] = useState([]);
	const [selectedNetwork, setSelectedNetwork] = useState(null);

	const fetchCoins = async () => {
		const cached = localStorage.getItem('cached_deposit_coins');
		const cachedTime = localStorage.getItem('cached_deposit_time');

		if (
			cached &&
			cachedTime &&
			Date.now() - parseInt(cachedTime) < 10 * 60 * 1000
		) {
			setCoins(JSON.parse(cached));
			return;
		}

		try {
			const all = [];
			const totalPages = Math.ceil(986 / 250); // adjust if you want fewer

			for (let page = 1; page <= totalPages; page++) {
				const res = await fetch(
					`https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}`,
					{
						headers: {
							'x-cg-pro-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
						},
					}
				);
				const data = await res.json();
				all.push(...data);
			}

			setCoins(all);
			localStorage.setItem('cached_deposit_coins', JSON.stringify(all));
			localStorage.setItem('cached_deposit_time', Date.now().toString());
		} catch (err) {
			console.error('Failed to fetch coins', err);
		}
	};

	useEffect(() => {
		fetchCoins();
	}, []);

	useEffect(() => {
		const symbol = searchParams.get('symbol');
		if (symbol && coins.length > 0) {
			const match = coins.find(
				(c) => c.symbol.toLowerCase() === symbol.toLowerCase()
			);
			if (match) {
				setSelectedCoin(match);
				setSearchInput(match.name);
			}
		}
	}, [coins, searchParams]);

	useEffect(() => {
		const filtered = coins.filter(
			(coin) =>
				coin.name.toLowerCase().includes(searchInput.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(searchInput.toLowerCase())
		);
		setFilteredCoins(filtered.slice(0, 10));
	}, [searchInput, coins]);

	const handleCoinSelect = (coin) => {
		setSelectedCoin(coin);
		setSearchInput(coin.name);
		setFilteredCoins([]);

		// Set networks from MOCK_NETWORKS
		const networks = Object.keys(
			MOCK_NETWORKS[coin.symbol.toUpperCase()] || {}
		);
		setAvailableNetworks(networks);
		setSelectedNetwork(networks[0] || null);
	};

	const handleCopy = () => {
		if (!selectedCoin) return;
		navigator.clipboard.writeText(
			selectedCoin.address || 'example-wallet-address'
		);
		showSuccess('Copied');
		setShowModal(true);
	};

	const depositDetails = selectedCoin?.symbol
		? MOCK_NETWORKS[selectedCoin.symbol.toUpperCase()]?.[selectedNetwork] ||
		  null
		: null;

	return (
		<>
			<div className='flex flex-col md:flex-row gap-24 max-w-7xl mx-auto text-[11px]'>
				<div className='lg:basis-[70%] p-4 md:p-6 lg:p-8 text-white relative'>
					<h2 className='text-2xl font-bold mb-6'>Deposit cryptos</h2>

					{/* Searchable Coin Input */}
					<div className='mb-4 relative'>
						<label className='text-sm mb-1 block'>Select coin</label>
						<input
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							onFocus={() => setIsInputFocused(true)}
							onBlur={() => setTimeout(() => setIsInputFocused(false), 150)} // delayed to allow click
							placeholder='Search for a coin'
							className='w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded'
						/>
						{(isInputFocused || searchInput) && filteredCoins.length > 0 && (
							<ul className='absolute z-10 bg-[#111] border border-gray-700 w-full mt-1 rounded max-h-60 overflow-auto'>
								{filteredCoins.map((coin) => (
									<li
										key={coin.id}
										onClick={() => handleCoinSelect(coin)}
										className='px-3 py-2 hover:bg-black cursor-pointer flex items-center gap-2'>
										<img
											src={coin.image}
											alt=''
											className='w-5 h-5'
										/>
										{coin.name} ({coin.symbol.toUpperCase()})
									</li>
								))}
							</ul>
						)}
					</div>

					{/* Popular */}
					<div className='flex gap-2 flex-wrap mb-4'>
						{POPULAR.map((symbol) => {
							const coin = coins.find((c) => c.symbol.toUpperCase() === symbol);
							if (!coin) return null;
							return (
								<button
									key={symbol}
									onClick={() => handleCoinSelect(coin)}
									className={`px-3 py-1 rounded bg-[#111] border text-sm ${
										selectedCoin?.symbol.toUpperCase() === symbol
											? 'border-lime-400 text-lime-400'
											: 'border-gray-700'
									} flex items-center gap-1`}>
									<img
										src={coin.image}
										className='w-4 h-4'
									/>
									{symbol}
								</button>
							);
						})}
					</div>
					{/* NETWORKS */}
					{availableNetworks.length > 0 && (
						<div className='mb-4'>
							<label className='text-sm mb-1 block'>Select network</label>
							<select
								className='w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded'
								value={selectedNetwork || ''}
								onChange={(e) => setSelectedNetwork(e.target.value)}>
								{availableNetworks.map((net) => (
									<option
										key={net}
										value={net}>
										{net}
									</option>
								))}
							</select>
						</div>
					)}

					{/* Details */}
					<div className='flex justify-between'>
						<p className='text-sm'>Details:</p>
						{!depositDetails && <p className='text-white/80 text-xs'>--</p>}
					</div>
					{depositDetails ? (
						<div className='bg-[#1A1A1A] border border-gray-700 rounded p-4 mb-6'>
							<div className='flex gap-4 items-center'>
								<QRCodeCanvas
									value={depositDetails.qr}
									size={90}
								/>
								<div className='flex flex-col'>
									<span className='text-sm text-gray-400'>Deposit address</span>
									<span className='text-white text-sm font-semibold'>
										{depositDetails.address}
									</span>
								</div>
								<button
									onClick={() => {
										navigator.clipboard.writeText(depositDetails.address);
										showSuccess('Copied');
										setShowModal(true);
									}}
									className='flex items-center gap-1 text-sm text-lime-400 ml-auto'>
									<Copy className='w-4 h-4' />
									Copy
								</button>
							</div>

							<div className='text-sm text-gray-400 mt-3 space-y-1'>
								<div>
									Min. deposit:{' '}
									<span className='text-white'>{depositDetails.min}</span>
								</div>
								<div>
									Deposit confirmations:{' '}
									<span className='text-white'>
										{depositDetails.confirmations}
									</span>
								</div>
							</div>
						</div>
					) : (
						<p className='text-center text-white/60 mt-8'>
							There are no details yet for the selected coin.
						</p>
					)}

					{/* Modal after copy */}
					{showModal && (
						<DepositConfirmModal
							address={
								selectedCoin?.address || '3Q1HmLVXCGXMgUXrJX6rVNEDRC7b2XD5jS'
							}
							onClose={() => setShowModal(false)}
						/>
					)}
				</div>
				<FAQ />
			</div>
			{/* Withdraw Records */}
			<div className='mt-10'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-white text-lg font-semibold'>Deposit records</h3>
					<button className='text-xs text-gray-400 flex items-center gap-1 hover:text-white transition'>
						More <ChevronRight size={14} />
					</button>
				</div>

				<div className='w-full overflow-x-auto rounded-md'>
					<table className='w-full min-w-[700px] text-left'>
						<thead className='text-xs text-gray-500 border-b border-gray-800'>
							<tr>
								<th className='py-2 px-3'>Time</th>
								<th className='py-2 px-3'>Coin</th>
								<th className='py-2 px-3'>Received amount</th>
								<th className='py-2 px-3'>Type</th>
								<th className='py-2 px-3'>Status</th>
								<th className='py-2 px-3'>Action</th>
							</tr>
						</thead>
						<tbody>
							{/* No Data UI */}
							<tr>
								<td
									colSpan='6'
									className='text-center py-10'>
									<div className='flex flex-col items-center justify-center text-gray-500'>
										<svg
											className='w-10 h-10 mb-3 text-gray-600'
											fill='none'
											stroke='currentColor'
											strokeWidth={1.5}
											viewBox='0 0 24 24'>
											<path d='M4 4h16v16H4z' />
											<path d='M9 9h6M9 13h6M9 17h6' />
										</svg>
										<p className='text-sm'>No Data</p>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Deposit;
