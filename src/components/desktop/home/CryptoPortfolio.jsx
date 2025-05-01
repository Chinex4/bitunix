import React, { useState, useEffect } from 'react';

const coinRows = [
  [
    { name: 'REN', icon: 'https://assets.coingecko.com/coins/images/3139/large/REN.png' },
    { name: 'INJ', icon: 'https://assets.coingecko.com/coins/images/12882/large/injective_protocol_logo.png' },
    { name: 'LOOM', icon: 'https://assets.coingecko.com/coins/images/3387/large/1_K76VZULtD6Zc4nOqwSg4cw.png' },
    { name: 'WOO', icon: 'https://assets.coingecko.com/coins/images/12996/large/WOO.png' },
    { name: 'AMP', icon: 'https://assets.coingecko.com/coins/images/12409/large/amp-200x200.png' },
    { name: 'MBOX', icon: 'https://assets.coingecko.com/coins/images/15799/large/mbox.png' },
  ],
  [
    { name: 'DENT', icon: 'https://assets.coingecko.com/coins/images/1152/large/gLCEA2G.png' },
    { name: 'VGX', icon: 'https://assets.coingecko.com/coins/images/4519/large/Voyager.jpg' },
    { name: 'JASMY', icon: 'https://assets.coingecko.com/coins/images/13868/large/JASMY200x200.jpg' },
    { name: 'RSR', icon: 'https://assets.coingecko.com/coins/images/8365/large/rsr.png' },
    { name: 'RLC', icon: 'https://assets.coingecko.com/coins/images/646/large/pL1Jg3D5_400x400.jpg' },
    { name: 'CELR', icon: 'https://assets.coingecko.com/coins/images/5523/large/Celr.png' },
  ],
  [
    { name: 'LPT', icon: 'https://assets.coingecko.com/coins/images/7137/large/logo-circle-green.png' },
    { name: 'FET', icon: 'https://assets.coingecko.com/coins/images/5681/large/Fetch.jpg' },
    { name: 'LOOKS', icon: 'https://assets.coingecko.com/coins/images/22173/large/logo.png' },
    { name: 'GAL', icon: 'https://assets.coingecko.com/coins/images/25171/large/gal-token-icon.png' },
    { name: 'API3', icon: 'https://assets.coingecko.com/coins/images/13256/large/api3.jpg' },
    { name: 'GFT', icon: 'https://assets.coingecko.com/coins/images/23527/large/gft_logo.png' },
  ],
  [
    { name: 'STORJ', icon: 'https://assets.coingecko.com/coins/images/949/large/storj.png' },
    { name: 'CVX', icon: 'https://assets.coingecko.com/coins/images/15585/large/convex.png' },
    { name: 'HOOK', icon: 'https://assets.coingecko.com/coins/images/28222/large/hook.png' },
    { name: 'HEX', icon: 'https://assets.coingecko.com/coins/images/10188/large/HEX.png' },
    { name: 'YGG', icon: 'https://assets.coingecko.com/coins/images/17415/large/YGG_Logo_1.png' },
    { name: 'PHA', icon: 'https://assets.coingecko.com/coins/images/12451/large/phala.png' },
  ],
];

const CryptoPortfolio = () => {
  const [pausedRow, setPausedRow] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative bg-stone-900 min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <h2 className="text-white text-3xl md:text-4xl font-bold mb-10 text-center">
        Build Your Cryptocurrency Portfolio
      </h2>

      {/* Fade shadows left and right */}
      <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-stone-900 via-stone-900/70 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-stone-900 via-stone-900/70 to-transparent pointer-events-none z-10" />

      <div className="flex flex-col gap-10 w-full z-20">
        {coinRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="overflow-hidden w-full max-w-6xl mx-auto relative"
          >
            <div
              className={`flex items-center gap-8 ${
                pausedRow === rowIndex ? 'paused' : rowIndex % 2 === 0 ? 'animate-marquee-left' : 'animate-marquee-right'
              }`}
              onMouseEnter={() => setPausedRow(rowIndex)}
              onMouseLeave={() => setPausedRow(null)}
            >
              {row.concat(row).concat(row).map((coin, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 hover:scale-110 hover:drop-shadow-lg transition duration-300 cursor-pointer bg-[#121212] px-4 py-3 rounded-xl"
                >
                  <img
                    src={coin.icon}
                    alt={coin.name}
                    loading="lazy"
                    className="h-8 w-8 object-contain rounded-xl"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/32?text=?';
                    }}
                  />
                  <span className="text-white text-xs">{coin.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-14 bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 px-6 rounded-md text-sm z-20">
        Trade Now with $10
      </button>

      {/* Animations and Pauses */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(0%); }
          100% { transform: translateX(33.333%); }
        }
        .animate-marquee-left {
          animation: marquee-left ${isMobile ? 40 : 20}s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right ${isMobile ? 40 : 20}s linear infinite;
        }
        .paused {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CryptoPortfolio;
