import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PriceCard } from "@/components/PriceCard";
import { CryptoChart } from "@/components/CryptoChart";
import { MarketOverview } from "@/components/MarketOverview";
import { SplashScreen } from "@/components/SplashScreen";

const fetchTopCryptos = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false"
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
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