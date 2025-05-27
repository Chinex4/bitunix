import { useEffect, useState } from "react";
import axios from "axios";

export const useCoinHoldings = (
  coinHoldings = [],
  symbolToIdMap = {},
  currency = "usd" // 👈 default to USD
) => {
  const [coinsData, setCoinsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const ids = coinHoldings
          .map((coin) => symbolToIdMap[coin.symbol.toLowerCase()])
          .filter(Boolean)
          .join(",");

        if (!ids) {
          setCoinsData([]);
          return;
        }

        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: currency.toLowerCase(),  
            ids,
          },
        });

        const enrichedData = res.data.map((coin) => {
          const match = coinHoldings.find(
            (item) => symbolToIdMap[item.symbol.toLowerCase()] === coin.id
          );
          const amount = match?.amount ?? 0;
          const value = amount * coin.current_price;

          return {
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            image: coin.image,
            current_price: coin.current_price,
            amount,
            value,
            currency: currency.toUpperCase(), // 👈 include currency info
          };
        });

        setCoinsData(enrichedData);
      } catch (err) {
        console.error("Error fetching coin data", err);
      } finally {
        setLoading(false);
      }
    };

    if (coinHoldings.length && Object.keys(symbolToIdMap).length && currency) {
      fetchCoins();
    }
  }, [coinHoldings, symbolToIdMap, currency]); // 👈 track currency change

  return { coinsData, loading };
};
