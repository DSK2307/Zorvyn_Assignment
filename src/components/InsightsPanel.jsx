import React from 'react';
import { AlertTriangle, TrendingUp, ArrowDownRight, Lightbulb, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

function InsightCard({ icon: Icon, color, title, detail, accent }) {
  return (
    <div className={`flex gap-3 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
      glass-card`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5 font-medium uppercase tracking-wide">{title}</p>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{detail}</p>
      </div>
    </div>
  );
}

export default function InsightsPanel() {
  const { totalIncome, totalExpenses, totalBalance, categoryBreakdown, topCategory } = useApp();

  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0;
  const expenseRatio = totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(1) : 0;

  const insights = [
    {
      icon: AlertTriangle,
      color: 'bg-gradient-to-br from-amber-400 to-orange-500',
      title: 'Top Spending Category',
      detail: topCategory
        ? `${topCategory[0]} is your biggest expense at $${topCategory[1].toLocaleString()} this month`
        : 'No expense data yet',
    },
    {
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      title: 'Savings Rate',
      detail: `You saved ${savingsRate}% of your income — ${Number(savingsRate) >= 20 ? 'great job! 🎉' : 'aim for 20%+'}`,
    },
    {
      icon: ArrowDownRight,
      color: 'bg-gradient-to-br from-red-500 to-rose-600',
      title: 'Expense Ratio',
      detail: `${expenseRatio}% of income spent — ${Number(expenseRatio) < 75 ? 'within healthy limits' : 'you may want to cut back'}`,
    },
    {
      icon: ShieldCheck,
      color: 'bg-gradient-to-br from-emerald-500 to-green-600',
      title: 'Balance Health',
      detail: totalBalance >= 0
        ? `Positive balance of $${totalBalance.toLocaleString()} — you're on track 💚`
        : `Negative balance — review your expenses immediately`,
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <Lightbulb size={18} className="text-amber-500" />
        <h2 className="text-base font-bold text-slate-800 dark:text-white">Smart Insights</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {insights.map(ins => <InsightCard key={ins.title} {...ins} />)}
      </div>
    </div>
  );
}
