import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PriceCard } from "@/components/PriceCard";
import { CryptoChart } from "@/components/CryptoChart";
import { MarketOverview } from "@/components/MarketOverview";
import { SplashScreen } from "@/components/SplashScreen";
import { toast } from "sonner";

const fetchTopCryptos = async () => {
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
    toast.error("Failed to fetch crypto data. Please try again later.");
    throw error;
  }
};

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

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { data: cryptoData, isLoading } = useQuery({
    queryKey: ['topCryptos'],
    queryFn: fetchTopCryptos,
    refetchInterval: 30000,
  });

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen p-6 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Crypto Dashboard
          </h1>
          <p className="text-muted-foreground">Real-time cryptocurrency market data</p>
        </div>
        <button className="glass-card px-4 py-2 hover:bg-card/40 transition-colors">
          Connect Wallet
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="price-card animate-pulse">
              <div className="h-6 bg-card/50 rounded w-24 mb-2"></div>
              <div className="h-8 bg-card/50 rounded w-32"></div>
            </div>
          ))
        ) : (
          cryptoData?.map((crypto: any) => (
            <PriceCard
              key={crypto.id}
              name={crypto.name}
              symbol={crypto.symbol.toUpperCase()}
              price={crypto.current_price}
              change={crypto.price_change_percentage_24h}
              icon={getCryptoIcon(crypto.symbol)}
            />
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
        <CryptoChart />
        <MarketOverview />
      </div>
    </div>
  );
};

export default Index;