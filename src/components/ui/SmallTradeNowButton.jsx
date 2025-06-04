import { Link } from "react-router-dom";

const SmallTradeNowButton = () => {
  return (
    <div>
      <Link
        to='/contract-trade/BTC-USDT'
        className='group relative w-[180px] h-12 flex items-center justify-center bg-lime-400 rounded-xl border-2 border-lime-400 overflow-hidden transition-all duration-300'
      >
        {/* Expanding Overlay */}
        <div className='absolute left-0 top-0 h-full w-12 group-hover:w-full bg-black transition-all duration-500 z-10 rounded-xl overflow-hidden flex items-center justify-center'>
          <div className='relative w-full h-full flex items-center justify-center'>
            {/* Single Arrow */}
            <img
              src='/svgIcons/arrow-dot.svg'
              alt='arrow'
              className='size-4 group-hover:hidden z-20'
            />

            {/* Animated Arrows (Run once and stop) */}
            <div className='absolute inset-0 flex items-center gap-1 pl-3 opacity-0 group-hover:opacity-100 animate-arrow-slide-once'>
              {[...Array(7)].map((_, i) => (
                <img
                  key={i}
                  src='/svgIcons/arrow-dot.svg'
                  alt='arrow'
                  className='size-4'
                />
              ))}
            </div>
          </div>
        </div>

        {/* Text */}
        <span className='text-base font-medium z-20 group-hover:opacity-0 text-black transition-opacity duration- ml-6'>
          Trade Now
        </span>
      </Link>

      {/* Keyframes & Animation */}
      <style jsx='true'>{`
        @keyframes arrow-slide-once {
          0% {
            transform: translateX(-10%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .group:hover .animate-arrow-slide-once {
          animation: arrow-slide-once 2.5s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default SmallTradeNowButton;
