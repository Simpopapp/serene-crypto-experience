import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface CryptoPrice {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const fetchCryptoData = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false",
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const MarketOverview = () => {
  const { data: cryptoList, isLoading, error } = useQuery({
    queryKey: ['cryptoMarkets'],
    queryFn: fetchCryptoData,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="market-overview">
        <h2 className="text-xl font-bold mb-6">Market Overview</h2>
        <div className="space-y-6">
          <p className="text-muted-foreground">Loading market data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="market-overview">
        <h2 className="text-xl font-bold mb-6">Market Overview</h2>
        <div className="space-y-6">
          <p className="text-negative">Error loading market data</p>
        </div>
      </div>
    );
  }

  const getCryptoIcon = (symbol: string) => {
    switch (symbol.toLowerCase()) {
      case 'btc':
        return '₿';
      case 'eth':
        return 'Ξ';
      case 'usdt':
        return '₮';
      default:
        return '◈';
    }
  };

  return (
    <div className="market-overview">
      <h2 className="text-xl font-bold mb-6">Market Overview</h2>
      <div className="space-y-6">
        {cryptoList?.map((crypto: CryptoPrice) => (
          <div key={crypto.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getCryptoIcon(crypto.symbol)}</span>
              <div>
                <div className="font-medium">{crypto.name}</div>
                <div className="text-sm text-muted-foreground">
                  {crypto.symbol.toUpperCase()}/USD
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">
                ${crypto.current_price.toLocaleString()}
              </div>
              <div
                className={cn(
                  "text-sm",
                  crypto.price_change_percentage_24h >= 0
                    ? "text-positive"
                    : "text-negative"
                )}
              >
                {crypto.price_change_percentage_24h > 0 ? "+" : ""}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};