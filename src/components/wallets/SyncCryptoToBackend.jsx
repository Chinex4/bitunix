import { useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import axios from 'axios';

const SyncCryptoToBackend = () => {
	useEffect(() => {
		const fetchAndSendCoins = async () => {
			try {
				// Fetch top 180 coins from CoinGecko
				const response = await axios.get(
					'https://api.coingecko.com/api/v3/coins/markets',
					{
						params: {
							vs_currency: 'usd',
							order: 'market_cap_desc',
							per_page: 180,
							page: 1,
						},
					}
				);

				// Extract coin ids
				const coinIds = response.data.map((coin) => coin.id);

				// Form data where each coin id is a key with placeholder value (e.g., 0)
				const payload = {};
				coinIds.forEach((id) => {
					payload[id] = 0;
				});

				// Send to your backend
				const backendRes = await axiosInstance.post('/user/createWallet', payload);
				console.log('Sync Success:', backendRes.data);
			} catch (err) {
				console.error('Sync Failed:', err);
			}
		};

		fetchAndSendCoins();
	}, []);

	return null;
};

export default SyncCryptoToBackend;
