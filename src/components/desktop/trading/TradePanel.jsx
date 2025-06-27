import { useState, useEffect, Fragment } from "react";
import { Tab } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TradePanel = ({ livePrice, loading }) => {
  const [price, setPrice] = useState(livePrice);
  const [quantity, setQuantity] = useState("");
  const [orderType, setOrderType] = useState("Limit");
  const [isManualPrice, setIsManualPrice] = useState(false);

  useEffect(() => {
    if (!isManualPrice && livePrice) {
      setPrice(livePrice);
    }
  }, [livePrice, isManualPrice]);

  const handlePriceChange = (type) => {
    const val = parseFloat(price);
    if (!val || isNaN(val)) return;
    const newPrice = type === "plus" ? val + 0.1 : val - 0.1;
    setPrice(newPrice.toFixed(1));
    setIsManualPrice(true);
  };

  return (
    <div className="text-white text-[12px] space-y-3">
      {/* Leverage and Position Tabs */}
      <div className="flex gap-2">
        <div className="flex-1 bg-black border border-gray-700 px-2 py-1.5 text-center rounded cursor-pointer">
          Cross
        </div>
        <div className="flex-1 flex justify-between items-center bg-black border border-gray-700 px-2 py-1.5 rounded">
          <span className="text-green-500">20X</span>
          <span className="text-red-500">20X</span>
        </div>
      </div>

      {/* Open/Close Tab */}
      <Tab.Group>
        <Tab.List className="flex">
          {["Open", "Close"].map((label) => (
            <Tab key={label} as={Fragment}>
              {({ selected }) => (
                <button
                  className={classNames(
                    "w-1/2 py-1.5 border text-xs",
                    selected
                      ? "bg-green-500 text-black font-bold"
                      : "bg-transparent text-white border-gray-600"
                  )}
                >
                  {label}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="space-y-3 pt-2">
            {/* Order Type */}
            <div className="flex justify-between text-xs">
              {["Limit", "Market", "Trigger"].map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={classNames(
                    "pb-1",
                    orderType === type
                      ? "border-b-2 border-white font-semibold"
                      : "text-gray-400"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Available */}
            <div className="text-xs text-gray-400">
              Available{" "}
              <span className="float-right text-white">0.0000 USDT</span>
            </div>

            {/* Price */}
            <div className="flex items-center bg-[#0f0f0f] px-3 py-2 rounded">
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setIsManualPrice(true);
                  setPrice(e.target.value);
                }}
                className="bg-transparent flex-1 text-[16px] font-semibold outline-none"
              />
              <div className="flex flex-col gap-[2px] ml-2">
                <button
                  onClick={() => handlePriceChange("plus")}
                  className="text-sm"
                >
                  +
                </button>
                <button
                  onClick={() => handlePriceChange("minus")}
                  className="text-sm"
                >
                  −
                </button>
              </div>
              <span className="text-[10px] text-yellow-300 ml-2">Last</span>
              <span className="text-[10px] text-gray-400 ml-1">USDT</span>
            </div>

            {/* Quantity */}
            <div className="space-y-1">
              <label className="text-[11px] text-gray-400">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-[#0f0f0f] px-3 py-1.5 rounded outline-none text-sm"
                placeholder="0"
              />
            </div>

            {/* Slider */}
            <div>
              <input
                type="range"
                className="w-full accent-accent"
                min="0"
                max="100"
                step="1"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                {["0%", "25%", "50%", "75%", "100%"].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            </div>

            {/* TP/SL */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="tp" />
              <label htmlFor="tp" className="text-[11px] text-gray-300">
                TP / SL
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-green-500 hover:bg-green-600 py-2 rounded text-sm font-semibold">
                Open long
              </button>
              <button className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded text-sm font-semibold">
                Open short
              </button>
            </div>

            {/* Cost/Max Info */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400">
              <div>
                <div className="flex justify-between">
                  <span>Cost</span>
                  <span className="text-white">0.0 USDT</span>
                </div>
                <div className="flex justify-between">
                  <span>Max</span>
                  <span className="text-white">0.0 BTC</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span>Cost</span>
                  <span className="text-white">0.0 USDT</span>
                </div>
                <div className="flex justify-between">
                  <span>Max</span>
                  <span className="text-white">0.0 BTC</span>
                </div>
              </div>
            </div>

            {/* Effective Time */}
            <div className="text-xs">
              <label className="block mb-1 text-gray-400">Effective Time</label>
              <div className="relative">
                <select className="w-full bg-[#0f0f0f] py-2 px-3 rounded appearance-none text-white">
                  <option>GTC</option>
                  <option>IOC</option>
                  <option>FOK</option>
                </select>
                <ChevronDown className="absolute top-2.5 right-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* VIP Info */}
            <div className="bg-[#0f0f0f] p-3 rounded text-[11px] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-[10px]">
                  VIP
                </div>
                <span className="text-gray-400">VIP 0</span>
              </div>
              <div className="text-right text-[11px]">
                <div>
                  Maker <span className="text-white">0.0000%</span>
                </div>
                <div>
                  Taker <span className="text-white">0.0000%</span>
                </div>
              </div>
            </div>

            {/* Margin Block */}
            <div className="text-[11px] space-y-1">
              <div className="text-white font-semibold">Margin</div>
              <div className="text-gray-300">USDT · Cross</div>
              <div className="flex justify-between">
                <span className="text-gray-400">Margin Rate</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-white">0.0%</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Maintenance Margin</span>
                <span className="text-white">0.0</span>
              </div>
            </div>

            {/* Mode Button */}
            <button className="w-full mt-3 py-2 border border-gray-700 rounded text-white text-sm">
              Single-Asset Mode
            </button>
          </Tab.Panel>

          {/* Close Tab Content */}
          <Tab.Panel className="pt-2 text-gray-400 text-xs text-center">
            <p>
              This is the Close tab. You can build logic for closing positions
              here.
            </p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TradePanel;
