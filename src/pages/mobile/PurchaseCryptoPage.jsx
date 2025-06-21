import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import countryList from 'react-select-country-list';
import { CreditCard } from 'lucide-react';

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
	const [rate, setRate] = useState(1);
	const [country, setCountry] = useState(null);

	const countries = countryList().getData();
	const received = (amount / rate).toFixed(8);

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
			background: '#111',
			border: '1px solid #333',
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
		singleValue: (base) => ({
			...base,
			color: 'white',
		}),
	};

	return (
		<div className='min-h-screen bg-black text-white flex items-center justify-center px-6 py-10'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full'>
				{/* Left Content */}
				<div className='flex flex-col justify-center'>
					<h1 className='text-3xl font-bold mb-4'>
						Purchase Crypto Via <br /> Third-Party
					</h1>
					<p className='text-gray-400 text-sm mb-8 max-w-sm'>
						You can buy cryptocurrencies such as BTC, ETH and other
						cryptocurrencies through safe and reliable payment methods with 30+
						fiat currencies supported.
					</p>
					<img
						src='/third-party/third-party.webp'
						alt='Crypto illustration'
						className='w-72 object-contain'
					/>
				</div>

				{/* Right Form */}
				<div className='bg-[#111] border border-[#2c2c2c] p-6 rounded-xl w-full max-w-md'>
					{/* Pay Section */}
					<div className='mb-5'>
						<label className='text-xs text-gray-400 mb-1 block'>Pay</label>
						<div className='flex items-center gap-2'>
							<input
								type='number'
								value={amount}
								placeholder='10 - 54,178.66'
								onChange={(e) => setAmount(e.target.value)}
								className='w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white outline-none'
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

					{/* Receive Section */}
					<div className='mb-5'>
						<label className='text-xs text-gray-400 mb-1 block'>Receive</label>
						<div className='flex items-center gap-2'>
							<div className='flex-1 px-3 py-2 rounded-lg bg-black border border-white/10 text-white text-sm'>
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

					{/* Payment Method */}
					<div className='mb-6'>
						<label className='text-xs text-gray-400 mb-1 block'>
							Payment method
						</label>
						<Select
							options={paymentMethods}
							value={paymentMethod}
							onChange={setPaymentMethod}
							className='text-sm'
							styles={customStyles}
						/>
					</div>

					{/* Buy Button */}
					<button className='w-full bg-[#2c2c2c] text-gray-400 py-3 rounded-lg font-semibold cursor-not-allowed'>
						Buy
					</button>
				</div>
			</div>
		</div>
	);
}
