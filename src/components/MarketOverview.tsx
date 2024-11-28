import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CryptoPrice {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const fetchCryptoData = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd&include_24hr_change=true",
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // Transform the data to match our expected format
    const cryptoList = [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', current_price: data.bitcoin.usd, price_change_percentage_24h: data.bitcoin.usd_24h_change },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', current_price: data.ethereum.usd, price_change_percentage_24h: data.ethereum.usd_24h_change },
      { id: 'tether', name: 'Tether', symbol: 'USDT', current_price: data.tether.usd, price_change_percentage_24h: data.tether.usd_24h_change },
      { id: 'binancecoin', name: 'BNB', symbol: 'BNB', current_price: data.binancecoin.usd, price_change_percentage_24h: data.binancecoin.usd_24h_change }
    ];
    
    return cryptoList;
  } catch (error) {
    toast.error("Failed to fetch market data. Please try again later.");
    throw error;
  }
};

export const MarketOverview = () => {
  const { data: cryptoList, isLoading, error } = useQuery({
    queryKey: ['cryptoMarkets'],
    queryFn: fetchCryptoData,
    refetchInterval: 30000,
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