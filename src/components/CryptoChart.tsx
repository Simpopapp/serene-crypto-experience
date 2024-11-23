import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const dummyData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  price: 45000 + Math.random() * 5000
}));

export const CryptoChart = () => {
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
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dummyData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C7FB76" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#C7FB76" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#C4C3BB" 
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#C4C3BB"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            contentStyle={{ 
              background: '#141413',
              border: '1px solid #ffffff33',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#C7FB76"
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};