// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ symbol = 'BINANCE:BTCUSDT' }) {
	const container = useRef(null);

	useEffect(() => {
		if (!container.current) return;

		// Clear any previous script/widgets
		container.current.innerHTML = '';

		const script = document.createElement('script');
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
		script.type = 'text/javascript';
		script.async = true;
		script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "support_host": "https://www.tradingview.com"
      }`;
		container.current.appendChild(script);
	}, [symbol]); // ← include symbol

	return (
		<div
			className='tradingview-widget-container'
			ref={container}
			style={{ height: '100%', width: '100%' }}
		/>
	);
}

export default memo(TradingViewWidget);
