import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance'; // Your pre-configured Axios
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ViewWallets = () => {
	const [wallets, setWallets] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchWallets = async () => {
			try {
				const res = await axiosInstance.get('/user/fetchUserWallets');
				if (res.data && Array.isArray(res.data.wallets)) {
					setWallets(res.data.wallets);
				} else {
					toast.error('Invalid wallet data received');
				}
			} catch (error) {
				console.error('Error fetching wallets:', error);
				toast.error('Failed to fetch wallets');
			} finally {
				setLoading(false);
			}
		};

		fetchWallets();
	}, []);

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold mb-6'>My Wallets</h1>

			{loading ? (
				<div className='flex justify-center items-center'>
					<Loader2 className='animate-spin w-6 h-6 text-gray-400' />
				</div>
			) : wallets.length === 0 ? (
				<div className='text-center text-gray-500'>No wallet data found</div>
			) : (
				<div className='overflow-x-auto'>
					<table className='min-w-full text-sm border border-gray-700 rounded-lg overflow-hidden'>
						<thead className='bg-[#1F1F1F] text-gray-300'>
							<tr>
								<th className='px-4 py-2 text-left'>Coin</th>
								<th className='px-4 py-2 text-left'>Symbol</th>
								<th className='px-4 py-2 text-left'>Balance</th>
								<th className='px-4 py-2 text-left'>Value (USD)</th>
							</tr>
						</thead>
						<tbody className='text-white'>
							{wallets.map((wallet) => (
								<tr
									key={wallet.symbol}
									className='border-t border-gray-700 hover:bg-[#1A1A1A]'>
									<td className='px-4 py-2 capitalize'>{wallet.name}</td>
									<td className='px-4 py-2'>{wallet.symbol.toUpperCase()}</td>
									<td className='px-4 py-2'>{wallet.balance}</td>
									<td className='px-4 py-2'>${wallet.value_usd}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default ViewWallets;
