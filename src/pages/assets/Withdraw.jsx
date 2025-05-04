import { useState, useEffect } from 'react';
import { ChevronRight, Copy } from 'lucide-react';
import FAQ from '../../components/FAQ';

const MOCK_COINS = [
	{ symbol: 'USDT', name: 'Tether' },
	{ symbol: 'BTC', name: 'Bitcoin' },
	{ symbol: 'ETH', name: 'Ethereum' },
	{ symbol: 'WLD', name: 'Worldcoin' },
];

const MOCK_NETWORKS = {
	USDT: [
		{ name: 'Tron (TRC-20)', fee: '1 USDT' },
		{ name: 'Ethereum (ERC-20)', fee: '5 USDT' },
		{ name: 'Polygon', fee: '1 USDT' },
	],
	BTC: [{ name: 'Bitcoin', fee: '0.0005 BTC' }],
	ETH: [{ name: 'Ethereum', fee: '0.005 ETH' }],
	WLD: [{ name: 'Ethereum', fee: '0.01 WLD' }],
};

export default function Withdraw() {
	const [selectedCoin, setSelectedCoin] = useState(null);
	const [selectedNetwork, setSelectedNetwork] = useState(null);
	const [withdrawalAddress, setWithdrawalAddress] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');

	const networks = selectedCoin ? MOCK_NETWORKS[selectedCoin] || [] : [];
	const currentNetworkDetails = networks.find(
		(n) => n.name === selectedNetwork
	);

	return (
		<div className='p-4 md:p-6 lg:p-8 text-white'>
			<h2 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-6'>
				Withdrawal
			</h2>

			{/* Coin selection */}
			<div className='mb-4'>
				<label className='text-sm block mb-1'>Coin</label>
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
							{coin.symbol}
						</option>
					))}
				</select>
				<div className='flex gap-2 mt-2'>
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
			</div>

			{/* Network */}
			{selectedCoin && (
				<div className='mb-4'>
					<label className='text-sm block mb-1'>Network</label>
					<select
						className='w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded'
						value={selectedNetwork || ''}
						onChange={(e) => setSelectedNetwork(e.target.value)}>
						<option
							value=''
							disabled>
							Select network
						</option>
						{networks.map((net) => (
							<option
								key={net.name}
								value={net.name}>
								{net.name} - Fee: {net.fee}
							</option>
						))}
					</select>
				</div>
			)}

			{/* Withdrawal address */}
			<div className='mb-4'>
				<label className='text-sm block mb-1'>Withdrawal address</label>
				<input
					className='w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded'
					type='text'
					value={withdrawalAddress}
					placeholder='Enter withdrawal address'
					onChange={(e) => setWithdrawalAddress(e.target.value)}
				/>
			</div>

			{/* Amount */}
			<div className='mb-4'>
				<label className='text-sm block mb-1'>Withdrawal amount</label>
				<input
					className='w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded'
					type='number'
					placeholder={`Minimum: ${selectedCoin === 'USDT' ? '2 USDT' : '--'}`}
					value={withdrawAmount}
					onChange={(e) => setWithdrawAmount(e.target.value)}
				/>
			</div>

			{/* Info section */}
			<div className='text-sm text-gray-300 mb-6'>
				<p>
					Withdrawal available:{' '}
					<span className='text-white'>0.00000000 {selectedCoin || ''}</span>
				</p>
				<p>
					24-hour withdrawal limit:{' '}
					<span className='text-lime-400'>
						10,000.00/ 10,000 {selectedCoin || 'USDT'}
					</span>
				</p>
				<p>
					Received amount:{' '}
					<span className='text-white'>
						{withdrawAmount || 0} {selectedCoin || ''}
					</span>
				</p>
				<p>
					Network fee:{' '}
					<span className='text-white'>
						{currentNetworkDetails?.fee || '--'}
					</span>
				</p>
			</div>

			<button className='w-full duration-300 transition-colors border border-gray-700 px-4 py-2 rounded text-gray-300'>
				Withdraw
			</button>

			{/* FAQ */}
			<FAQ />

			{/* Withdraw Records */}
			<div className='mt-10'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-white text-lg font-semibold'>Withdrawal records</h3>
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
}
