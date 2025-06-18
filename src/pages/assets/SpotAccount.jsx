import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import MyLoader from "../../components/ui/Loader";

const PER_PAGE_OPTIONS = [20, 50, 100];

const SpotAccount = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      let allCoins = [];
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const baseUrl =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=";

      try {
        const pages = Math.ceil(986 / 50);
        for (let i = 1; i <= pages; i++) {
          const res = await fetch(proxy + baseUrl + 1);
          const data = await res.json();
          allCoins = allCoins.concat(data);
        }
        setCoins(allCoins.slice(0, 986));
      } catch (err) {
        console.error("Failed to fetch coins:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const filtered = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const totalPages = Math.ceil(filtered.length / perPage);

  const handleDeposit = (symbol) => {
    navigate(`/assets/deposit?symbol=${symbol.toUpperCase()}`);
  };
  const handleWithdraw = (symbol) => {
    navigate(`/assets/withdraw?symbol=${symbol.toUpperCase()}`);
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>Spot Account</h2>
          <div className='mt-2'>
            <p className='text-sm text-gray-400'>Total Assets</p>
            <div className='text-xl font-bold'>0.00 USDT</div>
            <p className='text-xs text-gray-500'>≈ A$0.00</p>
          </div>
        </div>
        <div>
          <p className='text-sm text-gray-400'>
            Today's PnL{" "}
            <span className='bg-green-800 text-xs text-green-300 ml-1 px-2 py-0.5 rounded'>
              PnL Analysis
            </span>
          </p>
          <div className='text-xl font-bold mt-1'>A$0.00</div>
          <p className='text-xs text-gray-500'>0.00%</p>
        </div>
        <div className='flex gap-3 mt-2 lg:mt-0'>
          <button className='bg-lime-400 text-black px-4 py-2 rounded text-sm'>
            Deposit
          </button>
          <button className='bg-[#1A1A1A] text-white px-4 py-2 rounded text-sm'>
            Withdraw
          </button>
          <button className='bg-[#1A1A1A] text-white px-4 py-2 rounded text-sm'>
            Transfer
          </button>
        </div>
      </div>

      {/* Search */}
      <div className='flex items-center border border-[#333] bg-[#1A1A1A] rounded px-3 py-2 w-full md:w-1/3'>
        <Search className='w-4 h-4 text-gray-400' />
        <input
          type='text'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='bg-transparent outline-none text-sm ml-2 w-full'
        />
      </div>

      {loading ?
        <MyLoader />
      : <>
          {/* Table */}
          <div className='hidden lg:block overflow-x-auto'>
            <table className='w-full text-[11px] text-left mt-4 border-collapse'>
              <thead>
                <tr className='text-gray-400 border-b border-[#333]'>
                  <th className='py-3'>Coin</th>
                  <th className='py-3'>Total</th>
                  <th className='py-3'>Available</th>
                  <th className='py-3'>In Order</th>
                  <th className='py-3'>Withdrawing</th>
                  <th className='py-3'>P2P Frozen</th>
                  <th className='py-3'>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((coin) => (
                  <tr
                    key={coin.id}
                    className='border-b border-[#222] hover:bg-[#111]'
                  >
                    <td className='py-3 px-3'>
                      <div className='font-semibold flex items-center gap-2'>
                        <img
                          src={coin.image}
                          alt=''
                          className='size-6 rounded-full'
                        />
                        <div className='text-sm text-white'>{coin.name}</div>
                      </div>
                    </td>
                    <td className='py-3'>
                      0.00000000{" "}
                      <div className='text-xs text-gray-400'>≈ A$0.00</div>
                    </td>
                    <td className='py-3'>0.00000000</td>
                    <td className='py-3'>0.00000000</td>
                    <td className='py-3'>0.00000000</td>
                    <td className='py-3'>0.00000000</td>
                    <td className='py-3 text-lime-400'>
                      <div className='flex gap-2'>
                        <button
                          className='hover:text-lime-400/40'
                          onClick={() => handleDeposit(coin.symbol)}
                        >
                          Deposit
                        </button>
                        <button
                          className='hover:text-lime-400/40'
                          onClick={() => handleWithdraw(coin.symbol)}
                        >
                          Withdraw
                        </button>
                        <button>Trade</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className='flex justify-between items-center text-[11px] text-white mt-6'>
            <div className='flex items-center gap-4'>
              <span>Display per page</span>
              {PER_PAGE_OPTIONS.map((opt) => (
                <label key={opt} className='flex items-center gap-1'>
                  <input
                    type='radio'
                    name='perPage'
                    checked={perPage === opt}
                    onChange={() => {
                      setPerPage(opt);
                      setCurrentPage(1);
                    }}
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div className='flex items-center gap-2'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  className={`px-3 py-1 rounded ${
                    n === currentPage ? "bg-white text-black" : "text-gray-400"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default SpotAccount;
