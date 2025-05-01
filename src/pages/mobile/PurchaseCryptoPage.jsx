import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import countryList from 'react-select-country-list';
import FAQ from '../../components/FAQ';

const coinOptions = [
	{ value: 'USDT', label: 'USDT', icon: '🟢' },
	{ value: 'BTC', label: 'BTC', icon: '🟠' },
	{ value: 'ETH', label: 'ETH', icon: '🟣' },
	{ value: 'BNB', label: 'BNB', icon: '🟡' },
];

const fiatOptions = [
	{ value: 'USD', label: '🇺🇸 USD' },
	{ value: 'EUR', label: '🇪🇺 EUR' },
	{ value: 'NGN', label: '🇳🇬 NGN' },
	{ value: 'INR', label: '🇮🇳 INR' },
	{ value: 'GBP', label: '🇬🇧 GBP' },
];

const paymentMethods = [
	{ value: 'Visa', label: 'Visa' },
	{ value: 'Mastercard', label: 'Mastercard' },
	{ value: 'Bank Transfer', label: 'Bank Transfer' },
	{ value: 'ApplePay', label: 'Apple Pay' },
];

const providerOptions = [
	{ value: 'coinify', label: 'Coinify' },
	{ value: 'moonpay', label: 'MoonPay' },
];

const coinIdMap = {
	USDT: 'tether',
	BTC: 'bitcoin',
	ETH: 'ethereum',
	BNB: 'binancecoin',
};

export default function PurchaseCrypto() {
	const [amount, setAmount] = useState(100);
	const [selectedCoin, setSelectedCoin] = useState(coinOptions[0]);
	const [selectedCurrency, setSelectedCurrency] = useState(fiatOptions[0]);
	const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
	const [provider, setProvider] = useState(providerOptions[0]);
	const [rate, setRate] = useState(1);
	const [country, setCountry] = useState(null);

	const countries = countryList().getData();
	const received = (amount / rate).toFixed(8);

	// Fetch exchange rate from CoinGecko
	useEffect(() => {
		const fetchRate = async () => {
			try {
				const res = await axios.get(
					`https://api.coingecko.com/api/v3/simple/price`,
					{
						params: {
							ids: coinIdMap[selectedCoin.value],
							vs_currencies: selectedCurrency.value.toLowerCase(),
						},
					}
				);
				const price =
					res.data[coinIdMap[selectedCoin.value]][
						selectedCurrency.value.toLowerCase()
					];
				setRate(price);
			} catch (error) {
				console.error('Failed to fetch rate:', error);
			}
		};

		if (selectedCoin && selectedCurrency) fetchRate();
	}, [selectedCoin, selectedCurrency]);

	// Auto-detect country
	useEffect(() => {
		axios.get('https://ipapi.co/json/').then((res) => {
			const code = res.data.currency;
			const match = fiatOptions.find((opt) => opt.value === code);
			if (match) setSelectedCurrency(match);

			const countryMatch = countries.find(
				(c) => c.label === res.data.country_name
			);
			if (countryMatch) setCountry(countryMatch);
		});
	}, []);

	const customStyles = {
		control: (base) => ({
			...base,
			background: '#1b1b1b',
			border: 'none',
			color: 'white',
		}),
		menu: (base) => ({
			...base,
			background: '#1b1b1b',
			color: '#fff',
			zIndex: 50,
		}),
		option: (base, { isFocused }) => ({
			...base,
			background: isFocused ? '#2c2c2c' : '#1a1a1a',
			color: '#fff',
			cursor: 'pointer',
		}),
	};

	return (
		<div className='min-h-screen bg-black text-white px-4 py-8'>
			<section className='max-w-md mx-auto bg-[#121212] rounded-2xl p-6'>
				<h1 className='text-2xl font-bold text-center mb-2'>
					Purchase Crypto Via Third-Party
				</h1>
				<p className='text-sm text-center text-gray-400 mb-6'>
					Buy crypto like BTC or ETH safely with 30+ fiat currencies.
				</p>

				{/* Pay Amount */}
				<div className='mb-4'>
					<label className='text-sm mb-1 block'>Pay</label>
					<div className='flex items-center gap-2'>
						<input
							type='number'
							value={amount}
                            placeholder='10 - 54,178.66'
							onChange={(e) => setAmount(e.target.value)}
							className='w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-white outline-none'
						/>
						<Select
							options={fiatOptions}
							value={selectedCurrency}
							onChange={setSelectedCurrency}
							className='text-sm w-32'
							styles={customStyles}
						/>
					</div>
				</div>

				{/* Receive Coin */}
				<div className='mb-4'>
					<label className='text-sm mb-1 block'>Receive</label>
					<div className='flex items-center gap-2'>
						<div className='flex-1 px-3 py-2 rounded-xl bg-black border border-white/10'>
							{received}
						</div>
						<Select
							options={coinOptions}
							value={selectedCoin}
							onChange={setSelectedCoin}
							formatOptionLabel={(option) => (
								<div className='flex items-center gap-2'>
									<span>{option.icon}</span>
									{option.label}
								</div>
							)}
							className='text-sm w-32'
							styles={customStyles}
						/>
					</div>
				</div>

				{/* Country Selection */}
				<div className='mb-4'>
					<label className='text-sm mb-1 block'>Country</label>
					<Select
						options={countries}
						value={country}
						onChange={setCountry}
						className='text-sm'
						styles={customStyles}
					/>
				</div>

				{/* Payment Method */}
				<div className='mb-4'>
					<label className='text-sm mb-1 block'>Payment Method</label>
					<Select
						options={paymentMethods}
						value={paymentMethod}
						onChange={setPaymentMethod}
						styles={customStyles}
					/>
				</div>

				{/* Provider */}
				<div className='mb-6'>
					<label className='text-sm mb-1 block'>Provider</label>
					<Select
						options={providerOptions}
						value={provider}
						onChange={setProvider}
						styles={customStyles}
					/>
				</div>

				{/* Buy Button */}
				<button className='w-full bg-lime-400 hover:bg-lime-500 text-black py-3 rounded-xl font-semibold transition'>
					Buy
				</button>
			</section>

			{/* FAQ Section */}
			<div className='mt-16'>
				<FAQ />
			</div>
		</div>
	);
}
