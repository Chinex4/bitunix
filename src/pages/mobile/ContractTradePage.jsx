// ContractTradePage.jsx
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import TradingChart from '../../components/TradingChart';
import OrderBook from '../../components/OrderBook';
import TradePanel from '../../components/TradePanel';

const SOCKET_URL =
  'wss://stream.binance.com:9443/stream?streams=btcusdt@depth20@100ms/btcusdt@trade';

const ContractTradePage = () => {
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

    if (stream.includes('@trade')) {
      setPrice(parseFloat(data.p).toFixed(2));
    } else if (stream.includes('@depth20')) {
      setBids(data.bids.slice(0, 10));
      setAsks(data.asks.slice(0, 10));
    }
  }, [lastJsonMessage]);

  return (
    <div className="min-h-screen bg-black text-white grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
      <div className="lg:col-span-8">
        <TradingChart symbol="BTCUSDT" />
      </div>

      <div className="lg:col-span-4 space-y-4">
        <OrderBook bids={bids} asks={asks} />
        <TradePanel livePrice={price} />
      </div>
    </div>
  );
};

export default ContractTradePage;
