import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    TradingView: any;
  }
}

export const CryptoChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
    
    if (!script) {
      const newScript = document.createElement('script');
      newScript.type = 'text/javascript';
      newScript.src = 'https://s3.tradingview.com/tv.js';
      newScript.async = true;
      newScript.onload = () => setIsScriptLoaded(true);
      document.head.appendChild(newScript);
    } else {
      setIsScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isScriptLoaded && containerRef.current && window.TradingView) {
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
  }, [isScriptLoaded]);

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