import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

// Gauge-style radial chart like Image 2 "Overview" section
// We fake a gauge using a Pie chart with a transparent segment
export default function RadialOverview({ available = 4682, planned = 1200, other = 800 }) {
  const total = available + planned + other;

  // Donut data for the gauge
  const data = [
    { name: 'Available', value: available, color: '#1a4240' }, // dark teal
    { name: 'Planned',   value: planned,   color: '#22c55e' }, // green
    { name: 'Other',     value: other,     color: '#f59e0b' }, // amber
    { name: 'Gap',       value: total * 0.15, color: 'transparent' }, // transparent gap
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length && payload[0].name !== 'Gap') {
      return (
        <div className="glass-card rounded-xl px-3 py-2 text-sm">
          <p className="font-semibold text-gray-800 dark:text-white">{payload[0].name}</p>
          <p className="text-gray-500 dark:text-slate-400">${payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const bgData = Array(40).fill({ name: 'bg', value: 1 });

  return (
    <div className="glass-card rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-white">Overview</h3>
          <p className="text-xs text-gray-400 dark:text-slate-500">Balance distribution</p>
        </div>
        <button className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline">
          View details <ChevronRight size={12} />
        </button>
      </div>

      {/* Radial chart */}
      <div className="relative flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            {/* Dotted background track */}
            <Pie
              data={bgData}
              cx="50%"
              cy="60%"
              startAngle={200}
              endAngle={-20}
              innerRadius={80}
              outerRadius={95}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              isAnimationActive={false}
            >
              {bgData.map((entry, i) => (
                <Cell key={`bg-${i}`} fill="#f1f5f9" className="dark:fill-slate-700/50" />
              ))}
            </Pie>
            
            {/* Main Data Arc */}
            <Pie
              data={data}
              cx="50%"
              cy="60%"
              startAngle={200}
              endAngle={-20}
              innerRadius={80}
              outerRadius={95}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              cornerRadius={12}
            >
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.color}
                  stroke="none"
                  opacity={entry.color === 'transparent' ? 0 : 1}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-6">
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            ${available.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">Available balance</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-2">
        {[
          { label: 'Available', color: '#1a4240' },
          { label: 'Planned',   color: '#22c55e' },
          { label: 'Other',     color: '#f59e0b' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
