import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const OpportunitiesSection = () => {
	const sentiment = {
		value: 53,
		status: 'Neutral',
		description:
			'When market sentiment is "neutral", there is less trading activity, market liquidity is stable, and currency prices fluctuate less.',
		history: [
			{ label: 'Yesterday', status: 'Neutral', value: 56 },
			{ label: '7 days ago', status: 'Greed', value: 72 },
			{ label: '30 days ago', status: 'Fear', value: 34 },
		],
		updateTime: '2025-05-01 09:05 UTC',
	};

	const marketCap = {
		change: '+0.55%',
		value: '$2,820.53B',
		chartData: [2800, 2810, 2795, 2825, 2820],
	};

	const volume = {
		change: '+14.07%',
		value: '$115.48B',
		chartData: [100, 115, 105, 120, 115],
	};

	const chartOptions = {
		responsive: true,
		elements: { point: { radius: 0 } },
		plugins: { legend: { display: false } },
		scales: {
			x: { display: false },
			y: { display: false },
		},
	};

	const generateChart = (data, color) => ({
		labels: data.map((_, i) => i),
		datasets: [
			{
				data,
				borderColor: color,
				borderWidth: 2,
				fill: false,
				tension: 0.3,
			},
		],
	});

	return (
		<section className='text-white px-4 py-10 md:max-w-7xl md:mx-auto'>
			<h2 className='text-3xl md:text-4xl font-bold mb-6'>Opportunities</h2>
			<div className='grid gap-6 grid-cols-1 md:grid-cols-3'>
				{/* Market Sentiment */}
				<div className='bg-zinc-900 rounded-xl p-6 border border-zinc-700'>
					<p className='text-sm text-gray-400'>Market Sentiment</p>
					<p className='text-yellow-400 text-xl font-bold flex items-center gap-1 mb-2'>
						😐 {sentiment.status} {sentiment.value}
					</p>
					<p className='text-xs text-right text-gray-500 mb-4'>
						{sentiment.updateTime}
					</p>
					<p className='text-gray-300 text-sm mb-6'>{sentiment.description}</p>
					<div className='grid grid-cols-3 gap-2 text-center text-xs'>
						{sentiment.history.map((h, i) => (
							<div
								key={i}
								className='bg-zinc-800 rounded p-2'>
								<p className='text-gray-400'>{h.label}</p>
								<p
									className={`${
										h.status === 'Fear'
											? 'text-red-500'
											: h.status === 'Greed'
											? 'text-green-400'
											: 'text-yellow-400'
									} font-semibold`}>
									{h.status} {h.value}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Market Cap */}
				<div className='bg-zinc-900 rounded-xl p-6 border border-zinc-700'>
					<p className='text-sm text-gray-400'>Market Cap ⓘ</p>
					<p className='text-lime-400 text-2xl font-bold'>{marketCap.change}</p>
					<p className='text-gray-300 mb-4'>{marketCap.value}</p>
					<Line
						data={generateChart(marketCap.chartData, '#A3E635')}
						options={chartOptions}
						height={90}
					/>
				</div>

				{/* Volume */}
				<div className='bg-zinc-900 rounded-xl p-6 border border-zinc-700'>
					<p className='text-sm text-gray-400'>Volume ⓘ</p>
					<p className='text-sky-400 text-2xl font-bold'>{volume.change}</p>
					<p className='text-gray-300 mb-4'>{volume.value}</p>
					<Line
						data={generateChart(volume.chartData, '#38BDF8')}
						options={chartOptions}
						height={90}
					/>
				</div>
			</div>
		</section>
	);
};

export default OpportunitiesSection;
