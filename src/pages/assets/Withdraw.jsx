import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import FAQ from "../../components/FAQ";
import { showSuccess } from "../../utils/toast";

const POPULAR = ["BTC", "ETH", "USDT", "BNB"];

const MOCK_NETWORKS = {
  USDT: [
    { name: "Tron (TRC-20)", fee: "1 USDT" },
    { name: "Ethereum (ERC-20)", fee: "5 USDT" },
    { name: "Polygon", fee: "1 USDT" },
  ],
  BTC: [{ name: "Bitcoin", fee: "0.0005 BTC" }],
  ETH: [{ name: "Ethereum", fee: "0.005 ETH" }],
  WLD: [{ name: "Ethereum", fee: "0.01 WLD" }],
};

export default function Withdraw() {
  const [searchParams] = useSearchParams();
  const [coins, setCoins] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [availableNetworks, setAvailableNetworks] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const fetchCoins = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
      );
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      console.error("Failed to fetch coins", err);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    const symbol = searchParams.get("symbol");
    if (symbol && coins.length > 0) {
      const match = coins.find(
        (c) => c.symbol.toLowerCase() === symbol.toLowerCase()
      );
      if (match) {
        setSelectedCoin(match);
        setSearchInput(match.name);
        const networks = MOCK_NETWORKS[match.symbol.toUpperCase()] || [];
        setAvailableNetworks(networks);
        setSelectedNetwork(networks[0]?.name || null);
      }
    }
  }, [coins, searchParams]);

  useEffect(() => {
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredCoins(filtered.slice(0, 10));
  }, [searchInput, coins]);

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin);
    setSearchInput(coin.name);
    const networks = MOCK_NETWORKS[coin.symbol.toUpperCase()] || [];
    setAvailableNetworks(networks);
    setSelectedNetwork(networks[0]?.name || null);
    setFilteredCoins([]);
  };

  const currentNetworkDetails = availableNetworks.find(
    (n) => n.name === selectedNetwork
  );

  return (
    <>
      <div className='flex flex-col md:flex-row gap-24 max-w-7xl mx-auto text-[11px]'>
        <div className='basis-[70%] p-4 md:p-6 lg:p-8 text-white max-w-7xl mx-auto'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-6'>
            Withdrawal
          </h2>

          {/* Coin search input */}
          <div className='mb-4 relative'>
            <label className='text-sm mb-1 block'>Select coin</label>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder='Search for a coin'
              className='w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded'
            />
            {searchInput && filteredCoins.length > 0 && (
              <ul className='absolute z-10 bg-[#111] border border-gray-700 w-full mt-1 rounded max-h-60 overflow-auto'>
                {filteredCoins.map((coin) => (
                  <li
                    key={coin.id}
                    onClick={() => handleCoinSelect(coin)}
                    className='px-3 py-2 hover:bg-black cursor-pointer flex items-center gap-2'
                  >
                    <img src={coin.image} alt='' className='w-5 h-5' />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Popular */}
          <div className='flex gap-2 flex-wrap mb-4'>
            {POPULAR.map((symbol) => {
              const coin = coins.find((c) => c.symbol.toUpperCase() === symbol);
              if (!coin) return null;
              return (
                <button
                  key={symbol}
                  onClick={() => handleCoinSelect(coin)}
                  className={`px-3 py-1 rounded bg-[#111] border text-sm ${
                    selectedCoin?.symbol.toUpperCase() === symbol ?
                      "border-lime-400 text-lime-400"
                    : "border-gray-700"
                  } flex items-center gap-1`}
                >
                  <img src={coin.image} className='w-4 h-4' />
                  {symbol}
                </button>
              );
            })}
          </div>

          {/* Network */}
          {availableNetworks.length > 0 && (
            <div className='mb-4'>
              <label className='text-sm block mb-1'>Network</label>
              <select
                className='w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded'
                value={selectedNetwork || ""}
                onChange={(e) => setSelectedNetwork(e.target.value)}
              >
                {availableNetworks.map((net) => (
                  <option key={net.name} value={net.name}>
                    {net.name} - Fee: {net.fee}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Withdrawal address */}
          <div className='mb-4'>
            <label className='text-sm block mb-1'>Withdrawal address</label>
            <input
              className='w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded'
              type='text'
              value={withdrawalAddress}
              placeholder='Enter withdrawal address'
              onChange={(e) => setWithdrawalAddress(e.target.value)}
            />
          </div>

          {/* Amount */}
          <div className='mb-4'>
            <label className='text-sm block mb-1'>Withdrawal amount</label>
            <input
              className='w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded'
              type='number'
              placeholder='Enter amount'
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
          </div>

          {/* Info section */}
          <div className='text-sm text-gray-300 mb-6'>
            <p>
              Withdrawal available:{" "}
              <span className='text-white'>
                0.00000000 {selectedCoin?.symbol.toUpperCase() || ""}
              </span>
            </p>
            <p>
              24-hour withdrawal limit:{" "}
              <span className='text-lime-400'>
                10,000.00 / 10,000{" "}
                {selectedCoin?.symbol.toUpperCase() || "USDT"}
              </span>
            </p>
            <p>
              Received amount:{" "}
              <span className='text-white'>
                {withdrawAmount || 0} {selectedCoin?.symbol.toUpperCase() || ""}
              </span>
            </p>
            <p>
              Network fee:{" "}
              <span className='text-white'>
                {currentNetworkDetails?.fee || "--"}
              </span>
            </p>
          </div>

          <button
            onClick={() => showSuccess("Withdrawal submitted")}
            className='w-full duration-300 transition-colors border border-gray-700 px-4 py-2 rounded text-gray-300'
          >
            Withdraw
          </button>
        </div>
        <FAQ />
      </div>

      {/* Records */}
      <div className='mt-10'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-white text-lg font-semibold'>
            Withdrawal records
          </h3>
          <button className='text-xs text-gray-400 flex items-center gap-1 hover:text-white transition'>
            More <ChevronRight size={14} />
          </button>
        </div>

        <div className='w-full overflow-x-auto rounded-md'>
          <table className='w-full min-w-[700px] text-left'>
            <thead className='text-xs text-gray-500 border-b border-gray-800'>
              <tr>
                <th className='py-2 px-3'>Time</th>
                <th className='py-2 px-3'>Coin</th>
                <th className='py-2 px-3'>Received amount</th>
                <th className='py-2 px-3'>Type</th>
                <th className='py-2 px-3'>Status</th>
                <th className='py-2 px-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan='6' className='text-center py-10'>
                  <div className='flex flex-col items-center justify-center text-gray-500'>
                    <svg
                      className='w-10 h-10 mb-3 text-gray-600'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth={1.5}
                      viewBox='0 0 24 24'
                    >
                      <path d='M4 4h16v16H4z' />
                      <path d='M9 9h6M9 13h6M9 17h6' />
                    </svg>
                    <p className='text-sm'>No Data</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
