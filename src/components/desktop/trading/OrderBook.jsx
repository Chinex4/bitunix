import { Fragment } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OrderBook = ({ bids = [], asks = [], trades = [], lastPrice = 0 }) => {
  const maxBid = Math.max(...bids.map(([, qty]) => parseFloat(qty)), 1);
  const maxAsk = Math.max(...asks.map(([, qty]) => parseFloat(qty)), 1);

  const getDepthWidth = (qty, max) => `${(parseFloat(qty) / max) * 100}%`;

  return (
    <div className="w-full bg-[#1A1A1A] text-white text-[12px] rounded-lg">
      <Tab.Group>
        <Tab.List className="flex space-x-1 px-4 pt-3 border-b border-gray-800">
          {["Orderbook", "Trades"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "px-3 pb-2 outline-none",
                  selected
                    ? "border-b-2 border-white text-white"
                    : "text-gray-400"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* ORDERBOOK PANEL */}
          <Tab.Panel>
            <div className="px-4 py-2 overflow-visible">
              <div className="flex justify-between text-gray-400 mb-1">
                <span>Price (USDT)</span>
                <span>Qty (BTC)</span>
                <span>Sum (BTC)</span>
              </div>

              {/* ASKS */}
              <div className="space-y-[2px]">
                {[...asks].reverse().map(([price, qty], i) => {
                  const sum = asks
                    .slice(0, asks.length - i)
                    .reduce((a, [_, q]) => a + parseFloat(q), 0);

                  return (
                    <div
                      key={`ask-${i}`}
                      className="relative flex items-center justify-between h-5"
                    >
                      <div
                        className="absolute right-0 top-0 bottom-0 bg-red-800 opacity-30"
                        style={{ width: getDepthWidth(qty, maxAsk), zIndex: 1 }}
                      />
                      <div className="flex justify-between w-full px-1 z-10">
                        <span className="text-red-400">
                          {parseFloat(price).toLocaleString(undefined, {
                            minimumFractionDigits: 1,
                          })}
                        </span>
                        <span>{parseFloat(qty).toFixed(4)}</span>
                        <span>{sum.toFixed(4)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CURRENT PRICE */}
              <div className="text-center my-1 text-[16px] font-bold text-red-500">
                {parseFloat(lastPrice).toLocaleString(undefined, {
                  minimumFractionDigits: 1,
                })}{" "}
                ↓
              </div>

              {/* BIDS */}
              <div className="space-y-[2px]">
                {bids.map(([price, qty], i) => {
                  const sum = bids
                    .slice(0, i + 1)
                    .reduce((a, [_, q]) => a + parseFloat(q), 0);

                  return (
                    <div
                      key={`bid-${i}`}
                      className="relative flex items-center justify-between h-5"
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-green-800 opacity-30"
                        style={{ width: getDepthWidth(qty, maxBid), zIndex: 1 }}
                      />
                      <div className="flex justify-between w-full px-1 z-10">
                        <span className="text-green-400">
                          {parseFloat(price).toLocaleString(undefined, {
                            minimumFractionDigits: 1,
                          })}
                        </span>
                        <span>{parseFloat(qty).toFixed(4)}</span>
                        <span>{sum.toFixed(4)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RATIO */}
              <div className="flex justify-between items-center text-[10px] mt-2 text-white/80">
                <span className="text-green-400">B 51.25%</span>
                <span className="text-red-400">48.75% S</span>
              </div>
            </div>
          </Tab.Panel>

          {/* TRADES PANEL */}
          <Tab.Panel>
            <div className="px-4 py-2 text-[12px]">
              <div className="flex justify-between text-gray-400 mb-1 border-b border-gray-700 pb-1">
                <span>Time</span>
                <span>Price (USDT)</span>
                <span>Quantity (BTC)</span>
              </div>

              <div className="max-h-[400px] overflow-y-auto space-y-[2px]">
                {trades.length === 0 ? (
                  <p className="text-center text-gray-500 mt-4">
                    No recent trades
                  </p>
                ) : (
                  trades.map((trade, i) => {
                    const isBuy = trade.side === "buy";
                    return (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-gray-900 pb-[2px]"
                      >
                        <span>{trade.time}</span>
                        <span
                          className={`${
                            isBuy ? "text-green-400" : "text-red-400"
                          } font-semibold`}
                        >
                          {parseFloat(trade.price).toLocaleString(undefined, {
                            minimumFractionDigits: 1,
                          })}
                        </span>
                        <span className="text-white">{trade.amount}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default OrderBook;
