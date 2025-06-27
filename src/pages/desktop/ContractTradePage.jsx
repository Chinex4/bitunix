// import { useEffect, useState } from 'react';
// import useWebSocket from 'react-use-websocket';
// import TradingViewWidget from '../../components/desktop/trading/TradingViewWidget';
// import OrderBook from '../../components/OrderBook';
// import TradePanel from '../../components/TradePanel';
// import TradeTabs from '../../components/desktop/trading/TradeTabs';

// const SOCKET_URL =
// 	'wss://stream.binance.com:9443/stream?streams=btcusdt@depth20@100ms/btcusdt@trade';

// const ContractTradePage = () => {
// 	const [activeTab, setActiveTab] = useState('chart');
// 	const [price, setPrice] = useState(null);
// 	const [bids, setBids] = useState([]);
// 	const [asks, setAsks] = useState([]);

// 	const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
// 		shouldReconnect: () => true,
// 		share: true,
// 	});

// 	useEffect(() => {
// 		if (!lastJsonMessage) return;
// 		const { stream, data } = lastJsonMessage;
// 		if (stream.includes('@trade')) setPrice(parseFloat(data.p).toFixed(2));
// 		else if (stream.includes('@depth20')) {
// 			setBids(data.bids.slice(0, 10));
// 			setAsks(data.asks.slice(0, 10));
// 		}
// 	}, [lastJsonMessage]);

// 	return (
// 		<div className='min-h-screen bg-black text-white'>
// 			{/* Tabs */}
// 			<div className='flex justify-center md:hidden border-b border-gray-700'>
// 				<button
// 					onClick={() => setActiveTab('chart')}
// 					className={`w-1/2 py-3 text-center text-sm font-medium ${
// 						activeTab === 'chart'
// 							? 'text-lime-400 border-b-2 border-lime-400'
// 							: 'text-gray-400'
// 					}`}>
// 					Chart
// 				</button>
// 				<button
// 					onClick={() => setActiveTab('trade')}
// 					className={`w-1/2 py-3 text-center text-sm font-medium ${
// 						activeTab === 'trade'
// 							? 'text-lime-400 border-b-2 border-lime-400'
// 							: 'text-gray-400'
// 					}`}>
// 					Trade
// 				</button>
// 			</div>

// 			{/* Main Content */}
// 			<div className='lg:grid lg:grid-cols-12 gap-4 p-4'>
// 				<div className='col-span-12 lg:col-span-8'>
// 					{activeTab === 'chart' && (
// 						<>
// 							<div className='h-[500px] lg:h-[650px]'>
// 								<TradingViewWidget symbol={'BINANCE:BTCUSDT'} />
// 							</div>
// 							<div className='lg:hidden mt-8 space-y-4'>
// 								<OrderBook
// 									bids={bids}
// 									asks={asks}
// 								/>
// 								<TradePanel livePrice={price} />
// 							</div>
// 						</>
// 					)}
// 					{activeTab === 'trade' && (
// 						<div className='lg:hidden space-y-4'>
// 							<OrderBook
// 								bids={bids}
// 								asks={asks}
// 							/>
// 							<TradePanel livePrice={price} />
// 						</div>
// 					)}
// 				</div>

// 				<div className='hidden lg:block col-span-4 space-y-4'>
// 					<OrderBook
// 						bids={bids}
// 						asks={asks}
// 					/>
// 					<TradePanel livePrice={price} />
// 				</div>
// 			</div>
// 			<TradeTabs />
// 		</div>
// 	);
// };

// export default ContractTradePage;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import Tabs from '../../components/desktop/trading/Tabs';
import TradingViewWidget from '../../components/desktop/trading/TradingViewWidget';
import OrderBook from '../../components/desktop/trading/OrderBook';
import TradePanel from '../../components/desktop/trading/TradePanel';
import PairHeader from '../../components/desktop/trading/PairHeader';
import TradeTabs from '../../components/desktop/trading/TradeTabs';



const ContractTradePage = () => {
	const { symbol = 'BTC-USDT' } = useParams();
	const normalizedSymbol = symbol.replace('-', '').toLowerCase(); // btcusdt
	const [activeTab, setActiveTab] = useState('Chart');
	const [price, setPrice] = useState(null);
	const [bids, setBids] = useState([]);
	const [asks, setAsks] = useState([]);
	const [loading, setLoading] = useState(true);
	
	const SOCKET_URL = `wss://stream.binance.com:9443/stream?streams=${normalizedSymbol}@depth20@100ms/${normalizedSymbol}@trade`;
	const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
		shouldReconnect: () => true,
		share: true,
	});

	useEffect(() => {
		if (!lastJsonMessage) return;

		const { stream, data } = lastJsonMessage;

		if (stream.includes('@trade')) {
			setPrice(parseFloat(data.p).toFixed(2));
			setLoading(false);
		} else if (stream.includes('@depth20')) {
			setBids(data.bids.slice(0, 12));
			setAsks(data.asks.slice(0, 12));
			setLoading(false);
		}
	}, [lastJsonMessage]);

	return (
		<div className='min-h-screen bg-black text-white flex flex-col'>
			<Tabs
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<div>
				<PairHeader symbol={normalizedSymbol}/>
			</div>

			<div className='flex flex-col lg:flex-row gap-4 p-2 lg:p-4'>
				{/* Left - Chart */}
				<div className='flex-1 min-h-[600px] bg-[#0e0e0e] rounded-lg overflow-hidden'>
					{activeTab === 'Chart' ? (
						<div className='h-[500px] lg:h-[650px]'>
							<TradingViewWidget symbol={`BINANCE:${symbol.replace('-', '')}`} />
						</div>
					) : (
						<TradePanel
							livePrice={price}
							loading={loading}
						/>
					)}
				</div>

				{/* Right - OrderBook */}
				<div className='w-full lg:w-[340px] space-y-4'>
					<div className='bg-[#111] rounded-lg p-3'>
						<OrderBook
							bids={bids}
							asks={asks}
							loading={loading}
						/>
					</div>
					<div className='bg-[#111] rounded-lg p-3'>
						<h2 className='text-sm font-semibold mb-2'></h2>
						<TradePanel
							livePrice={price}
							loading={loading}
						/>
					</div>
				</div>
			</div>
			<TradeTabs />
		</div>
	);
};

export default ContractTradePage;


