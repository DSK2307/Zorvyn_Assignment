import React from 'react';
import { SlidersHorizontal, Calendar, Download, ChevronDown, Plus, Search, MoreVertical } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function GreetingBar({ onAddTransaction }) {
  const { role, transactions } = useApp();

  const handleExport = () => {
    if (!transactions || transactions.length === 0) {
      alert("No data available to export.");
      return;
    }
    const headers = ['ID,Date,Description,Amount,Category,Type'];
    const rows = transactions.map(t => 
      `${t.id},${t.date},"${t.description || ''}",${t.amount},"${t.category}",${t.type}`
    );
    const csvContent = headers.concat(rows).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* Top Row: Greeting & Add Payment */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white tracking-tight">
          Good morning, James
        </h1>

        {role === 'admin' && (
          <button onClick={onAddTransaction}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full
              bg-[#0a2726] hover:bg-[#1a4240] dark:bg-brand-600 dark:hover:bg-brand-500
              text-white text-sm font-semibold transition-all">
            <Plus size={16} /> New Payments
          </button>
        )}
      </div>

      {/* Bottom Row: Filters & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-gray-600 dark:text-slate-300 hover:bg-white/30 transition-colors">
            Filter <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-gray-600 dark:text-slate-300 hover:bg-white/30 transition-colors">
            This Month <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-gray-600 dark:text-slate-300 hover:bg-white/30 transition-colors">
            Download <Download size={12} className="text-gray-400" />
          </button>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full glass-card border-none focus:ring-2 focus:ring-brand-500 placeholder-gray-400 text-gray-700 dark:text-slate-200" />
          </div>
          <button className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full glass-card hover:bg-white/30">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
