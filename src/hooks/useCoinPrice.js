import { useState, useEffect } from 'react';

const useCoinUsdValue = (coinSymbol, amount) => {
  const [usdValue, setUsdValue] = useState(null);
  const [price, setPrice] = useState(null); // price in USD
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coinSymbol || !amount) return;

    const fetchCoinValue = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinSymbol.toLowerCase()}`);
        const data = await res.json();
        const coinPrice = data.market_data.current_price.usd;

        setPrice(coinPrice);

        const value = parseFloat(amount) / coinPrice;
        setUsdValue(value.toFixed(6));
        setError(null);
      } catch (err) {
        console.error('Error fetching price:', err);
        setError('Failed to fetch price');
        setUsdValue(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinValue();
  }, [coinSymbol, amount]);

  return { usdValue, price, loading, error };
};

export default useCoinUsdValue;
