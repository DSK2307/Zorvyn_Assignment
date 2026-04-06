import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer, Sector
} from 'recharts';
import { useApp } from '../context/AppContext';
import { monthlyTrend } from '../data/mockData';

const PIE_COLORS = {
  Food: '#3b82f6',
  Transport: '#22c55e',
  Utilities: '#f59e0b',
  Shopping: '#ef4444',
  Health: '#8b5cf6',
  Other: '#ec4899',
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length && payload[0].name !== 'Gap') {
    return (
      <div className="glass-card
        rounded-2xl p-6 shadow-sm flex flex-col justify-between animate-scaleIn z-50 relative pointer-events-none">
        <p className="font-semibold text-slate-800 dark:text-white mb-0.5">{payload[0].name}</p>
        <p style={{ color: payload[0].fill }} className="font-bold text-lg">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="font-bold text-[11px] pointer-events-none drop-shadow-sm">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8}
        startAngle={startAngle} endAngle={endAngle} fill={fill}
        className="drop-shadow-md transition-all duration-300"
      />
      {renderCustomLabel(props)}
    </g>
  );
};

export default function ChartsSection() {
  const { categoryBreakdown } = useApp();
  const [activeIndex, setActiveIndex] = useState(-1);

  const total = Object.values(categoryBreakdown).reduce((acc, val) => acc + val, 0);
  const donutData = Object.entries(categoryBreakdown).map(([name, value]) => ({ 
    name, value, color: PIE_COLORS[name] || '#94a3b8' 
  }));
  donutData.push({ name: 'Gap', value: total * 0.15, color: 'transparent' });
  const bgData = Array(40).fill({ name: 'bg', value: 1 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Line Chart */}
      <div className="lg:col-span-2 glass-card rounded-2xl p-5 shadow-sm border-0">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-white">Financial Trend</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">Income vs Expenses (last 6 months)</p>
          </div>
          <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-lg font-medium">Monthly</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyTrend} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-700" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
            <Line type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} name="Income" />
            <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4, fill: '#f43f5e', strokeWidth: 0 }} activeDot={{ r: 6 }} name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Donut Chart */}
      <div className="glass-card rounded-2xl p-6 flex flex-col h-full animate-fadeUp" style={{ animationDelay: '0.2s' }}>
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Spending Breakdown</h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">By category</p>
        </div>
        
        {/* Chart */}
        <div className="relative flex-1 min-h-[220px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              {/* Dotted background track */}
              <Pie
                data={bgData}
                cx="50%"
                cy="60%"
                startAngle={200}
                endAngle={-20}
                innerRadius={90}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                isAnimationActive={false}
              >
                {bgData.map((entry, i) => (
                  <Cell key={`bg-${i}`} fill="#f1f5f9" className="dark:fill-slate-700/50" />
                ))}
              </Pie>

              <Pie 
                data={donutData} 
                cx="50%" cy="60%"
                startAngle={200} endAngle={-20}
                innerRadius={90} outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                cornerRadius={12}
                onMouseEnter={(_, index) => { if (donutData[index].name !== 'Gap') setActiveIndex(index) }}
                onMouseLeave={() => setActiveIndex(-1)}
              >
                {donutData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} 
                    style={{ outline: 'none', cursor: entry.name === 'Gap' ? 'default' : 'pointer', transition: 'all 0.3s ease' }}
                    opacity={entry.color === 'transparent' ? 0 : 1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-6 pointer-events-none">
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              ${total.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">Total Spent</p>
          </div>
        </div>

        {/* Legend block */}
        <div className="mt-8 space-y-3">
          {donutData.filter(d => d.name !== 'Gap').map((entry, i) => (
            <div key={entry.name} 
              className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-xl transition-all hover:bg-white/30 dark:hover:bg-slate-700/50"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-sm transition-transform group-hover:scale-110" 
                  style={{ backgroundColor: entry.color }} />
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                  {entry.name}
                </span>
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
