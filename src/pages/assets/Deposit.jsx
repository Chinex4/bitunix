import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Copy } from 'lucide-react';
// import QRCode from 'qrcode.react';
import FAQ from '../../components/FAQ';

const MOCK_COINS = [
	{ symbol: 'USDT', name: 'Tether' },
	{ symbol: 'BTC', name: 'Bitcoin' },
	{ symbol: 'ETH', name: 'Ethereum' },
	{ symbol: 'WLD', name: 'Worldcoin' },
];

const MOCK_NETWORKS = {
	USDT: ['Tron (TRC-20)', 'Ethereum (ERC-20)', 'Polygon'],
	BTC: ['Bitcoin'],
	ETH: ['Ethereum'],
	WLD: ['Ethereum'],
};

const MOCK_DEPOSIT_DETAILS = {
	USDT: {
		'Tron (TRC-20)': {
			address: 'TCqwhDiKAQdCJQ9wGxdSXZy3f2Cp6TEnXA',
			qr: 'TCqwhDiKAQdCJQ9wGxdSXZy3f2Cp6TEnXA',
			min: '0.1 USDT',
			confirmations: '1 block confirmations',
			contract: '****gjL6t',
		},
	},
};

const Deposit = () => {
	const [selectedCoin, setSelectedCoin] = useState(null);
	const [selectedNetwork, setSelectedNetwork] = useState(null);
	const [networks, setNetworks] = useState([]);
	const [details, setDetails] = useState(null);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (selectedCoin) {
			setNetworks(MOCK_NETWORKS[selectedCoin] || []);
			setSelectedNetwork(null);
			setDetails(null);
		}
	}, [selectedCoin]);

	useEffect(() => {
		if (selectedCoin && selectedNetwork) {
			const data =
				MOCK_DEPOSIT_DETAILS[selectedCoin]?.[selectedNetwork] || null;
			setDetails(data);
		}
	}, [selectedCoin, selectedNetwork]);

	return (
		<div className='p-4 md:p-6 lg:p-8 text-white'>
			<h2 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-6'>
				Deposit cryptos
			</h2>

			{/* Coin Selector */}
			<div className='mb-4'>
				<label className='text-sm mb-1 block'>Select coin</label>
				<select
					className='w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded'
					value={selectedCoin || ''}
					onChange={(e) => setSelectedCoin(e.target.value)}>
					<option
						value=''
						disabled>
						Select coin
					</option>
					{MOCK_COINS.map((coin) => (
						<option
							key={coin.symbol}
							value={coin.symbol}>
							{coin.symbol} - {coin.name}
						</option>
					))}
				</select>
			</div>

			{/* Popular Buttons */}
			<div className='flex gap-2 flex-wrap mb-4'>
				{MOCK_COINS.map((coin) => (
					<button
						key={coin.symbol}
						onClick={() => setSelectedCoin(coin.symbol)}
						className={`px-3 py-1 rounded bg-[#111] border text-sm ${
							selectedCoin === coin.symbol
								? 'border-lime-400 text-lime-400'
								: 'border-gray-700'
						}`}>
						{coin.symbol}
					</button>
				))}
			</div>

			{/* Network Selector */}
			{networks.length > 0 && (
				<div className='mb-4'>
					<label className='text-sm mb-1 block'>Select network</label>
					<select
						className='w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded'
						value={selectedNetwork || ''}
						onChange={(e) => setSelectedNetwork(e.target.value)}>
						<option
							value=''
							disabled>
							Select network
						</option>
						{networks.map((network) => (
							<option
								key={network}
								value={network}>
								{network}
							</option>
						))}
					</select>
				</div>
			)}

			{/* Details */}
			<div className='mb-6'>
				<label className='text-sm mb-1 block'>Details</label>
				<div className='bg-[#1A1A1A] border border-gray-700 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4'>
					{details ? (
						<>
							<div className='flex gap-3 items-center'>
								{/* <QRCode value={details.qr} size={64} /> */}
								<div>
									<p className='text-sm text-gray-400 mb-1'>Deposit address</p>
									<p className='text-white text-sm font-semibold'>
										{details.address}
									</p>
								</div>
							</div>
							<button
								onClick={() => {
									navigator.clipboard.writeText(details.address);
									setCopied(true);
								}}
								className='flex items-center gap-1 text-sm text-lime-400'>
								<Copy className='w-4 h-4' />
								{copied ? 'Copied!' : 'Copy'}
							</button>
						</>
					) : (
						<span className='text-gray-500'>--</span>
					)}
				</div>

				{details && (
					<div className='text-sm text-gray-400 mt-3 space-y-1'>
						<div>
							Min. deposit: <span className='text-white'>{details.min}</span>
						</div>
						<div>
							Deposit confirmations:{' '}
							<span className='text-white'>{details.confirmations}</span>
						</div>
						<div>
							Contract Address:{' '}
							<span className='text-white'>{details.contract}</span>
						</div>
					</div>
				)}
			</div>

			{/* FAQ */}
			<FAQ />

			{/* DEPOSIT RECORDS  */}
			{/* Deposit Records */}
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
		</div>
	);
};

export default Deposit;
