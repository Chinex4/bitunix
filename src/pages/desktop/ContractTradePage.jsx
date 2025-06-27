import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import Tabs from "../../components/desktop/trading/Tabs";
import TradingViewWidget from "../../components/desktop/trading/TradingViewWidget";
import OrderBook from "../../components/desktop/trading/OrderBook";
import TradePanel from "../../components/desktop/trading/TradePanel";
import PairHeader from "../../components/desktop/trading/PairHeader";
import TradeTabs from "../../components/desktop/trading/TradeTabs";

const ContractTradePage = () => {
  const { symbol = "BTC-USDT" } = useParams();
  const normalizedSymbol = symbol.replace("-", "").toLowerCase();

  const [activeTab, setActiveTab] = useState("Chart");
  const [price, setPrice] = useState(null);
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const SOCKET_URL = `wss://stream.binance.com:9443/stream?streams=${normalizedSymbol}@depth20@100ms/${normalizedSymbol}@trade`;

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    share: true,
  });

  useEffect(() => {
    if (!lastJsonMessage) return;

    const { stream, data } = lastJsonMessage;

    if (stream.includes("@trade")) {
      const isBuy = data.m === false;
      const trade = {
        time: new Date(data.T).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        price: parseFloat(data.p).toFixed(1),
        amount: parseFloat(data.q).toFixed(4),
        side: isBuy ? "buy" : "sell",
      };

      setPrice(parseFloat(data.p).toFixed(2));
      setTrades((prev) => [trade, ...prev.slice(0, 30)]);
      setLoading(false);
    }

    if (stream.includes("@depth20")) {
      setBids(data.bids.slice(0, 12));
      setAsks(data.asks.slice(0, 12));
      setLoading(false);
    }
  }, [lastJsonMessage]);

  return (
    <div className='min-h-screen bg-black text-white flex flex-col'>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <PairHeader symbol={normalizedSymbol} />

      {/* 3-column grid on large screens */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 p-2 lg:p-4'>
        {/* Chart - 7 out of 12 columns */}
        <div className='lg:col-span-7 bg-[#0e0e0e] rounded-lg overflow-hidden'>
          {activeTab === "Chart" ?
            <div className='h-[500px] lg:h-[650px]'>
              <TradingViewWidget
                symbol={`BINANCE:${symbol.replace("-", "")}`}
              />
            </div>
          : <TradePanel livePrice={price} loading={loading} />}
        </div>

        {/* Orderbook - 3 out of 12 columns */}
        <div className='lg:col-span-3 bg-[#111] rounded-lg p-3 h-[650px]'>
          <OrderBook
            bids={bids}
            asks={asks}
            trades={trades}
            lastPrice={price}
            loading={loading}
          />
        </div>

        {/* TradePanel - 2 out of 12 columns */}
        <div className='lg:col-span-2 bg-[#111] rounded-lg p-3 h-[650px]'>
          <TradePanel livePrice={price} loading={loading} />
        </div>
      </div>


      {/* Trade Tabs component */}
      <div className='mt-12 px-2 lg:px-4'>
        <TradeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default ContractTradePage;
