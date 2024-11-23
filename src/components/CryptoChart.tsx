import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FullViewChart } from "./FullViewChart";

declare global {
  interface Window {
    TradingView: any;
  }
}

export const CryptoChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isFullView, setIsFullView] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

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
    if (isScriptLoaded && containerRef.current && window.TradingView && !isFullView) {
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
  }, [isScriptLoaded, isFullView]);

  useEffect(() => {
    const handleOrientationChange = () => {
      const isLandscapeMode = window.matchMedia("(orientation: landscape)").matches;
      setIsLandscape(isLandscapeMode);
      if (isLandscapeMode && window.innerWidth <= 768) {
        setIsFullView(true);
      }
    };

    handleOrientationChange(); // Initial check
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return (
    <>
      <div className="crypto-chart">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">BTC/USDT</h2>
            <p className="text-sm text-muted-foreground">Real-time chart</p>
          </div>
          <button 
            onClick={() => setIsFullView(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-accent hover:text-accent/80 transition-colors glass-card hover:bg-card/40"
          >
            Full View
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div id="tradingview_widget" ref={containerRef} className="h-[300px]" />
      </div>
      
      {isFullView && (
        <FullViewChart onClose={() => setIsFullView(false)} />
      )}
    </>
  );
};