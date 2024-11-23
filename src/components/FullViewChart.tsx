import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface FullViewChartProps {
  onClose: () => void;
}

export const FullViewChart = ({ onClose }: FullViewChartProps) => {
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
        container_id: "fullview_tradingview_widget",
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

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-background animate-fade-in">
      <div className="absolute right-4 top-4 z-50">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-card/50 hover:bg-card/70 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div id="fullview_tradingview_widget" ref={containerRef} className="w-full h-full" />
    </div>
  );
};