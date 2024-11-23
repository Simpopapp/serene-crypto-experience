import { cn } from "@/lib/utils";

interface CryptoPrice {
  name: string;
  symbol: string;
  price: number;
  change: number;
  icon?: string;
}

const cryptoList: CryptoPrice[] = [
  { name: "Bitcoin", symbol: "BTC/USD", price: 98649, change: -0.34, icon: "₿" },
  { name: "Cardano", symbol: "ADA/USD", price: 1079, change: 22.93, icon: "◈" },
  { name: "Ethereum", symbol: "ETH/USD", price: 3330.87, change: -0.29, icon: "Ξ" },
  { name: "Ripple", symbol: "XRP/USD", price: 1.56, change: 13.08, icon: "✕" },
];

export const MarketOverview = () => {
  return (
    <div className="market-overview">
      <h2 className="text-xl font-bold mb-6">Market Overview</h2>
      <div className="space-y-6">
        {cryptoList.map((crypto) => (
          <div key={crypto.symbol} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{crypto.icon}</span>
              <div>
                <div className="font-medium">{crypto.name}</div>
                <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">${crypto.price.toLocaleString()}</div>
              <div className={cn(
                "text-sm",
                crypto.change >= 0 ? "text-positive" : "text-negative"
              )}>
                {crypto.change > 0 ? "+" : ""}{crypto.change}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};