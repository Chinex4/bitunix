import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const AssetsDropdown = ({
  showBalance,
  setShowBalance,
  selectedCurrency,
  setSelectedCurrency,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = (callback) => () => {
    setIsOpen(false);
    callback?.();
  };

  return (
    <div ref={dropdownRef} className='relative hidden md:block'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='btn btn-ghost btn-sm'
      >
        <img src='/wallet.png' alt='Assets' className='size-4 rounded-full' />
      </button>

      {isOpen && (
        <ul className='absolute right-0 p-4 space-y-4 shadow border rounded-md border-stone-800 bg-[#121212] text-white rounded-box w-64 lg:w-[20rem] z-50'>
          <li className='hover:bg-[#121212]/80 px-4 py-3'>
            <Link to='/assets/overview' onClick={handleClose()}>
              <div className='flex justify-between items-center'>
                <p className='font-semibold flex gap-2 items-center'>
                  <img src='/assetss.svg' alt='' />
                  <span>Total Assets</span>
                </p>
                <button
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    setShowBalance((prev) => !prev);
                  }}
                >
                  {showBalance ?
                    <Eye size={16} className='text-gray-400' />
                  : <EyeOff size={16} className='text-gray-400' />}
                </button>
              </div>
              <p className='text-2xl mb-2 flex items-center gap-2'>
                {showBalance ? "0" : "****"}
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className='text-sm bg-[#121212] text-white border-none rounded outline-none'
                >
                  <option value='USDT'>USDT</option>
                  <option value='BTC'>BTC</option>
                </select>
              </p>
              <p className='text-xs text-white/30'>=A$0.00</p>
            </Link>
          </li>

          <li className='flex items-center gap-4 w-full'>
            <Link
              to='/activity/act-center'
              onClick={handleClose()}
              className='btn btn-sm border flex-1 border-neutral/20 mb-2'
            >
              Campaign Center
            </Link>
            <Link
              to='/activity/task-center'
              onClick={handleClose()}
              className='btn btn-sm border flex-1 border-neutral/20 mb-2'
            >
              Task Center
            </Link>
          </li>

          <li>
            <Link
              to='/assets/spot-account'
              onClick={handleClose()}
              className='flex justify-between items-center'
            >
              <span>Spot Account</span>
              <span>--%</span>
            </Link>
          </li>
          <li>
            <Link
              to='/assets/futures-account'
              onClick={handleClose()}
              className='flex justify-between items-center'
            >
              <span>Futures Account</span>
              <span>--%</span>
            </Link>
          </li>
          <li>
            <Link
              to='/assets/earn-account'
              onClick={handleClose()}
              className='flex justify-between items-center'
            >
              <span>Earn Account</span>
              <span>--%</span>
            </Link>
          </li>
          <li>
            <Link
              to='/assets/copy-account'
              onClick={handleClose()}
              className='flex justify-between items-center'
            >
              <span>Copy Account</span>
              <span>--%</span>
            </Link>
          </li>

          <div className='size-[1px] w-full bg-white/10 my-3' />

          <li>
            <Popover className='relative'>
              <div className='flex justify-between items-center'>
                <PopoverButton className='text-left'>
                  Orders Center
                </PopoverButton>
                <ChevronRight />
              </div>
              <PopoverPanel
                anchor='left'
                className='mt-2 flex flex-col space-y-6 bg-[#121212] border border-white/20 px-5 pr-24 py-5 z-50'
              >
                {[
                  ["/orders/future-orders", "Future Orders"],
                  ["/orders/spot-orders", "Spot Orders"],
                  ["/orders/third-party-orders", "Third-Party Orders"],
                  ["/orders/conversion-records", "Conversion Records"],
                  ["/orders/p2p-orders", "P2P Orders"],
                  ["/orders/earn-history", "Earn History"],
                ].map(([href, label]) => (
                  <Link key={href} to={href} onClick={handleClose()}>
                    {label}
                  </Link>
                ))}
              </PopoverPanel>
            </Popover>
          </li>

          <li>
            <Link to='/assets/spot-transactions' onClick={handleClose()}>
              <span>Transaction History</span>
            </Link>
          </li>
          <li>
            <Link to='/assets/rewards' onClick={handleClose()}>
              <span>My Rewards</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AssetsDropdown;
