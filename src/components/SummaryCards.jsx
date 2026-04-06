import React from 'react';
import {
  AreaChart, Area, ResponsiveContainer, Tooltip
} from 'recharts';
import { Users, UserCheck, Bell, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

function formatCurrency(val) {
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
  return `$${val.toLocaleString()}`;
}

// Sparkline mini-chart data
const sparkData = [
  [{ v: 40 }, { v: 55 }, { v: 45 }, { v: 60 }, { v: 52 }, { v: 68 }, { v: 72 }],
  [{ v: 60 }, { v: 48 }, { v: 65 }, { v: 55 }, { v: 70 }, { v: 62 }, { v: 80 }],
  [{ v: 30 }, { v: 42 }, { v: 35 }, { v: 50 }, { v: 45 }, { v: 55 }, { v: 48 }],
  [{ v: 50 }, { v: 62 }, { v: 58 }, { v: 70 }, { v: 65 }, { v: 75 }, { v: 85 }],
];

function Sparkline({ data, color, areaColor }) {
  return (
    <ResponsiveContainer width="100%" height={52}>
      <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v"
          stroke={color} strokeWidth={2}
          fill={`url(#sg-${color.replace('#','')})`}
          dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Card variants: 'white' (default), 'dark', 'color-green', 'color-warm'
function MetricCard({ title, value, trend, trendLabel, icon: Icon, sparkIndex, variant = 'white', delay = 0 }) {
  const isDark = variant === 'dark';
  const isGreen = variant === 'green';
  const isWarm = variant === 'warm';
  const isColored = isDark || isGreen || isWarm;

  const textPrimary = isColored ? 'text-white' : 'text-gray-900 dark:text-white';
  const iconBg = isColored ? 'bg-white/15' : 'bg-gray-100/50 dark:bg-slate-700/50';
  const iconColor = isColored ? 'text-white' : 'text-brand-600';
  const dotsBg = isColored ? 'text-white/40' : 'text-gray-300 dark:text-slate-600';
  const sparkColor = isDark ? '#a3e4e0' : isGreen ? '#ffffff' : isWarm ? '#ffffff' : '#059669';
  const positive = trend >= 0;
  const bgClass = 'glass-card';
  const trendBg = isColored
    ? (positive ? 'bg-white/20 text-white' : 'bg-white/20 text-white')
    : (positive ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400');

  return (
    <div
      className={`relative rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300
        hover:-translate-y-1 cursor-default border border-transparent
        ${bgClass} ${isColored ? '' : 'border-gray-100 dark:border-slate-700'}
        animate-fadeUp`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon size={17} className={iconColor} />
        </div>
        <button className={dotsBg}><MoreHorizontal size={16} /></button>
      </div>

      <div className="mb-3">
        <p className={`text-2xl font-extrabold ${textPrimary} tracking-tight`}>{value}</p>
        <p className={`text-xs font-medium mt-0.5 ${textSecondary}`}>{title}</p>
      </div>

      <div className="flex items-end justify-between">
        <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${trendBg}`}>
          {positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
          {positive ? '+' : ''}{trend} {trendLabel}
        </span>
        <div className="w-24">
          <Sparkline data={sparkData[sparkIndex]} color={sparkColor} />
        </div>
      </div>
    </div>
  );
}

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses, transactions } = useApp();
  const activeCount = transactions.filter(t => t.type === 'income').length;

  const cards = [
    { title: 'Total Balance',   value: formatCurrency(totalBalance),  trend: 12,  trendLabel: 'New', icon: Users,     sparkIndex: 0, variant: 'white' },
    { title: 'Total Income',    value: formatCurrency(totalIncome),   trend: 8,   trendLabel: 'New', icon: UserCheck, sparkIndex: 1, variant: 'white' },
    { title: 'Total Expenses',  value: formatCurrency(totalExpenses), trend: -5,  trendLabel: 'New', icon: Bell,      sparkIndex: 2, variant: 'white' },
    { title: 'Transactions',    value: String(transactions.length),   trend: 32,  trendLabel: 'New', icon: Users,     sparkIndex: 3, variant: 'white' },
    { title: 'Total Balance',   value: formatCurrency(totalBalance),  trend: 12,  trendLabel: 'New', icon: Users,     sparkIndex: 0, variant: 'dark'  },
    { title: 'Total Income',    value: formatCurrency(totalIncome),   trend: 8,   trendLabel: 'New', icon: UserCheck, sparkIndex: 1, variant: 'green' },
    { title: 'Total Expenses',  value: formatCurrency(totalExpenses), trend: -5,  trendLabel: 'New', icon: Bell,      sparkIndex: 2, variant: 'warm'  },
  ];

  // Top row: 4 light cards, bottom row: 3 colored (styled like Image 1)
  const topCards = cards.slice(0, 4);
  const bottomCards = cards.slice(4, 7);

  return (
    <div className="space-y-3">
      {/* Label: Activities */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest">Activities</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
      </div>

      {/* Top row: light cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {topCards.map((c, i) => <MetricCard key={`top-${i}`} {...c} delay={i * 50} />)}
      </div>

      {/* Bottom row: dark/colored cards (Image 1 lower section) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {bottomCards.map((c, i) => <MetricCard key={`btm-${i}`} {...c} delay={200 + i * 60} />)}
      </div>
    </div>
  );
}
