import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import TradingViewWidget from '../../components/desktop/trading/TradingViewWidget';
import OrderBook from '../../components/OrderBook';
import TradePanel from '../../components/TradePanel';

const SOCKET_URL =
	'wss://stream.binance.com:9443/stream?streams=btcusdt@depth20@100ms/btcusdt@trade';

const ContractTradePage = () => {
	const [activeTab, setActiveTab] = useState('chart');
	const [price, setPrice] = useState(null);
	const [bids, setBids] = useState([]);
	const [asks, setAsks] = useState([]);

	const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
		shouldReconnect: () => true,
		share: true,
	});

	useEffect(() => {
		if (!lastJsonMessage) return;
		const { stream, data } = lastJsonMessage;
		if (stream.includes('@trade')) setPrice(parseFloat(data.p).toFixed(2));
		else if (stream.includes('@depth20')) {
			setBids(data.bids.slice(0, 10));
			setAsks(data.asks.slice(0, 10));
		}
	}, [lastJsonMessage]);

	return (
		<div className='min-h-screen bg-black text-white'>
			{/* Tabs */}
			<div className='flex justify-center md:hidden border-b border-gray-700'>
				<button
					onClick={() => setActiveTab('chart')}
					className={`w-1/2 py-3 text-center text-sm font-medium ${
						activeTab === 'chart'
							? 'text-lime-400 border-b-2 border-lime-400'
							: 'text-gray-400'
					}`}>
					Chart
				</button>
				<button
					onClick={() => setActiveTab('trade')}
					className={`w-1/2 py-3 text-center text-sm font-medium ${
						activeTab === 'trade'
							? 'text-lime-400 border-b-2 border-lime-400'
							: 'text-gray-400'
					}`}>
					Trade
				</button>
			</div>

			{/* Main Content */}
			<div className='lg:grid lg:grid-cols-12 gap-4 p-4'>
				<div className='col-span-12 lg:col-span-8'>
					{activeTab === 'chart' && (
						<>
							<div className='h-[500px] lg:h-[650px]'>
								<TradingViewWidget symbol={'BINANCE:BTCUSDT'} />
							</div>
							<div className='lg:hidden mt-8 space-y-4'>
								<OrderBook
									bids={bids}
									asks={asks}
								/>
								<TradePanel livePrice={price} />
							</div>
						</>
					)}
					{activeTab === 'trade' && (
						<div className='lg:hidden space-y-4'>
							<OrderBook
								bids={bids}
								asks={asks}
							/>
							<TradePanel livePrice={price} />
						</div>
					)}
				</div>

				<div className='hidden lg:block col-span-4 space-y-4'>
					<OrderBook
						bids={bids}
						asks={asks}
					/>
					<TradePanel livePrice={price} />
				</div>
			</div>
		</div>
	);
};

export default ContractTradePage;
