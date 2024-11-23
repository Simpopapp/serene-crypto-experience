import { cn } from "@/lib/utils";

interface PriceCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  icon?: string;
}

export const PriceCard = ({ symbol, name, price, change, icon }: PriceCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="price-card">
      <div className="flex items-center gap-2">
        {icon && <span className="text-2xl">{icon}</span>}
        <span className="text-lg font-medium">{name}</span>
        <span className={cn(
          "ml-auto px-2 py-0.5 rounded text-sm",
          isPositive ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
        )}>
          {change > 0 ? "+" : ""}{change.toFixed(2)}%
        </span>
      </div>
      <div className="text-2xl font-bold">
        ${typeof price === 'number' ? price.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) : price}
      </div>
      <div className="text-sm text-muted-foreground">
        Last 24h
      </div>
    </div>
  );
};