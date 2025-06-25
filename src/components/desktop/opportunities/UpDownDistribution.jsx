import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const CACHE_KEY = 'updown_distribution_data';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const RANGE_BUCKETS = [
	{ label: '≥10%', min: 10, color: 'green' },
	{ label: '7.5%-10%', min: 7.5, max: 10, color: 'green' },
	{ label: '5%-7.5%', min: 5, max: 7.5, color: 'green' },
	{ label: '2.5%-5%', min: 2.5, max: 5, color: 'green' },
	{ label: '0%-2.5%', min: 0, max: 2.5, color: 'green' },
	{ label: '0%', min: 0, max: 0, color: 'gray' },
	{ label: '0%-2.5%', min: -2.5, max: 0, color: 'red' },
	{ label: '2.5%-5%', min: -5, max: -2.5, color: 'red' },
	{ label: '5%-7.5%', min: -7.5, max: -5, color: 'red' },
	{ label: '7.5%-10%', min: -10, max: -7.5, color: 'red' },
	{ label: '≥10%', min: -100, max: -10, color: 'red' },
];

const UpDownDistribution = () => {
	const [buckets, setBuckets] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDistribution = async () => {
			try {
				setLoading(true);

				// Check cache
				const cached = localStorage.getItem(CACHE_KEY);
				if (cached) {
					const { data, timestamp } = JSON.parse(cached);
					if (Date.now() - timestamp < CACHE_DURATION) {
						setBuckets(data);
						setLoading(false);
						return;
					}
				}

				// Fetch from CoinGecko Pro
				const res = await axios.get(
					'https://pro-api.coingecko.com/api/v3/coins/markets',
					{
						headers: {
							'x-cg-pro-api-key': API_KEY,
						},
						params: {
							vs_currency: 'usd',
							order: 'volume_desc',
							per_page: 250,
							page: 1,
							price_change_percentage: '24h',
						},
					}
				);

				const coinChanges = res.data.map(
					(coin) => coin.price_change_percentage_24h_in_currency
				);

				const filledBuckets = RANGE_BUCKETS.map((bucket) => {
					const count = coinChanges.filter((val) => {
						if (bucket.max !== undefined) {
							return val >= bucket.min && val < bucket.max;
						}
						return val >= bucket.min;
					}).length;
					return { ...bucket, count };
				});

				setBuckets(filledBuckets);

				// Cache result
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ data: filledBuckets, timestamp: Date.now() })
				);
			} catch (err) {
				console.error('Failed to fetch distribution', err);
			} finally {
				setLoading(false);
			}
		};

		fetchDistribution();
	}, []);

	const totalUp = buckets
		.filter((b) => b.color === 'green')
		.reduce((sum, b) => sum + b.count, 0);

	const totalDown = buckets
		.filter((b) => b.color === 'red')
		.reduce((sum, b) => sum + b.count, 0);

	const chartData = {
		labels: buckets.map((b) => b.label),
		datasets: [
			{
				label: 'Coins',
				data: buckets.map((b) => b.count),
				backgroundColor: buckets.map((b) =>
					b.color === 'green'
						? 'rgba(34, 197, 94, 0.6)'
						: b.color === 'red'
						? 'rgba(239, 68, 68, 0.6)'
						: 'rgba(160, 160, 160, 0.6)'
				),
				borderColor: buckets.map((b) =>
					b.color === 'green'
						? 'rgba(34, 197, 94, 1)'
						: b.color === 'red'
						? 'rgba(239, 68, 68, 1)'
						: 'rgba(160, 160, 160, 1)'
				),
				borderWidth: 1,
				barPercentage: 0.8,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: { display: false },
		},
		scales: {
			x: {
				grid: { color: '#333' },
				ticks: { color: '#aaa' },
			},
			y: {
				grid: { color: '#333' },
				ticks: { color: '#aaa' },
				beginAtZero: true,
			},
		},
	};

	return (
		<div className='text-white px-4 py-10 max-w-7xl mx-auto'>
			<h2 className='text-2xl md:text-3xl font-bold mb-6'>
				Up / Down Distribution
			</h2>

			{loading ? (
				<div className='flex justify-center items-center py-10'>
					<div className='animate-spin w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full' />
				</div>
			) : buckets.length === 0 ? (
				<p className='text-center text-gray-400'>No data available.</p>
			) : (
				<div className='bg-zinc-900 p-6 rounded-lg border border-zinc-800'>
					<div className='flex justify-between mb-4 text-sm font-semibold'>
						<span className='text-green-400'>Up {totalUp}</span>
						<span className='text-red-400'>Down {totalDown}</span>
					</div>

					<Bar
						data={chartData}
						options={chartOptions}
						height={250}
					/>
				</div>
			)}
		</div>
	);
};

export default UpDownDistribution;
