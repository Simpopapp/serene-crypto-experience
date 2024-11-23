import { PriceCard } from "@/components/PriceCard";
import { CryptoChart } from "@/components/CryptoChart";
import { MarketOverview } from "@/components/MarketOverview";

const cryptoData = [
  { name: "Bitcoin", symbol: "BTC", price: 98649, change: -0.34, icon: "₿" },
  { name: "Cardano", symbol: "ADA", price: 1079, change: 22.93, icon: "◈" },
  { name: "Ethereum", symbol: "ETH", price: 3330.87, change: -0.29, icon: "Ξ" },
  { name: "Ripple", symbol: "XRP", price: 1.56, change: 13.08, icon: "✕" },
];

const Index = () => {
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
        {cryptoData.map((crypto) => (
          <PriceCard key={crypto.symbol} {...crypto} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
        <CryptoChart />
        <MarketOverview />
      </div>
    </div>
  );
};

export default Index;