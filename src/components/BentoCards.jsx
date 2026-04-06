import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { ArrowUpRight, ChevronRight, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { monthlyTrend } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card rounded-xl px-3 py-2 text-xs">
        <p className="font-semibold text-gray-700 dark:text-slate-200">{label}</p>
        {payload.map((e, i) => (
          <p key={i} style={{ color: e.color }} className="font-medium">{e.name}: ${e.value.toLocaleString()}</p>
        ))}
      </div>
    );
  }
  return null;
};

export function IncomeCard() {
  const { totalIncome } = useApp();
  const incomeData = monthlyTrend.map(d => ({ month: d.month, value: d.income }));

  return (
    <div className="bg-[#fdfbf2] dark:bg-yellow-900/10 rounded-2xl p-5 shadow-card border border-[#f5efd5] dark:border-yellow-900/30">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Income</span>
        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 font-medium transition-colors">
          Past 30 days <ChevronRight size={12} />
        </button>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
          ${(totalIncome / 1000).toFixed(1)}k
        </p>
        <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[#1a4240] bg-transparent">
          <ArrowUpRight size={10} /> 8.25%
        </span>
      </div>
      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={incomeData} margin={{ top: 0, right: 0, left: -36, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a4240" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#1a4240" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-700" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" stroke="#1a4240" strokeWidth={2}
              fill="url(#incomeGrad)" dot={false} activeDot={{ r: 4 }} name="Income" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ExpenseStrategyCard() {
  const barData = monthlyTrend.slice(-3).map(d => ({ month: d.month, value: d.expenses }));
  const max = Math.max(...barData.map(d => d.value));

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Expense Strategy</span>
        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-600 font-medium transition-colors">
          View details <ChevronRight size={12} />
        </button>
      </div>
      <div className="mb-4">
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">$25k</p>
        <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">Monthly Expense Insight</p>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }} barSize={28}>
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} name="Expenses">
              {barData.map((entry, i) => (
                <Cell key={i} fill={entry.value === max ? '#1a4240' : '#e2e8f0'} className="dark:fill-slate-700" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function MoneyFlowCard() {
  const flowData = monthlyTrend.map(d => ({ month: d.month, income: d.income, expense: d.expenses }));
  const latestIncome = monthlyTrend[monthlyTrend.length - 1]?.income || 0;

  return (
    <div className="glass-card rounded-2xl p-5 relative overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Money Flow</span>
        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-600 font-medium transition-colors">
          Past 30 days <ChevronRight size={12} />
        </button>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
          ${(latestIncome / 1000).toFixed(1)}k
        </p>
        <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
          <TrendingUp size={10} /> 10.65%
        </span>
      </div>
      <div className="flex-1 w-full min-h-[96px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={flowData} margin={{ top: 0, right: 0, left: -36, bottom: 0 }}>
            <defs>
              <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a4240" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#1a4240" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="income" stroke="#1a4240" strokeWidth={2}
              fill="url(#flowGrad)" dot={false} activeDot={{ r: 4 }} name="Income" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
