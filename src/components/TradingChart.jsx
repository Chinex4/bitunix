import React, { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';

const TradingChart = ({ symbol }) => {
	const chartContainerRef = useRef();

	useEffect(() => {
		const chart = createChart(chartContainerRef.current, {
			width: chartContainerRef.current.clientWidth,
			height: 400,
			layout: {
				background: { color: '#000' },
				textColor: '#fff',
			},
			grid: {
				vertLines: { color: '#333' },
				horzLines: { color: '#333' },
			},
			timeScale: {
				timeVisible: true,
				secondsVisible: false,
			},
		});

		const candlestickSeries = chart.addSeries(CandlestickSeries);

		fetch(
			`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=15m&limit=100`
		)
			.then((res) => res.json())
			.then((data) => {
				const formattedData = data.map((k) => ({
					time: k[0] / 1000,
					open: parseFloat(k[1]),
					high: parseFloat(k[2]),
					low: parseFloat(k[3]),
					close: parseFloat(k[4]),
				}));
				candlestickSeries.setData(formattedData);
			});

		const handleResize = () => {
			chart.applyOptions({
				width: chartContainerRef.current.clientWidth,
			});
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			chart.remove();
		};
	}, [symbol]);

	return (
		<div
			ref={chartContainerRef}
			className='w-full rounded overflow-hidden'
		/>
	);
};

export default TradingChart;
