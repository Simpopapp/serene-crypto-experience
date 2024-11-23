import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: any;
  }
}

export const CryptoChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      new window.TradingView.widget({
        container_id: "tradingview_widget",
        symbol: "BINANCE:BTCUSDT",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#141413",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        backgroundColor: "#141413",
        gridColor: "#ffffff14",
        width: "100%",
        height: "100%"
      });
    }
  }, []);

  return (
    <div className="crypto-chart">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">BTC/USDT</h2>
          <p className="text-sm text-muted-foreground">Real-time chart</p>
        </div>
        <button className="text-sm text-accent hover:text-accent/80 transition-colors">
          Full View →
        </button>
      </div>
      <div id="tradingview_widget" ref={containerRef} className="h-[300px]" />
    </div>
  );
};