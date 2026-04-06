import React from 'react';
import { Bell, Shield, Eye, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const pageTitles = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
};

export default function Navbar({ onAddTransaction }) {
  const { activeNav, role, sidebarOpen } = useApp();

  return (
    <header className={`fixed top-0 right-0 z-20 h-16
      glass-card
      flex items-center justify-between px-6
      transition-all duration-300
      ${sidebarOpen ? 'left-64' : 'left-16'}`}
    >
      {/* Title */}
      <div>
        <h1 className="text-lg font-bold text-slate-800 dark:text-white">
          {pageTitles[activeNav]}
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500">April 2026</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Add Transaction – Admin only */}
        {role === 'admin' && activeNav === 'transactions' && (
          <button
            onClick={onAddTransaction}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 
              text-white rounded-xl text-sm font-semibold shadow-sm shadow-blue-200 dark:shadow-none
              transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}

        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800
          flex items-center justify-center text-slate-500 dark:text-slate-400
          hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>

        {/* User/Role badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center
            ${role === 'admin' ? 'bg-blue-500/10 text-blue-600' : 'bg-green-500/10 text-green-600'}`}>
            {role === 'admin' ? <Shield size={13} /> : <Eye size={13} />}
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {role === 'admin' ? 'Admin' : 'Viewer'}
          </span>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 
          flex items-center justify-center text-white font-bold text-sm shadow-sm">
          {role === 'admin' ? 'A' : 'V'}
        </div>
      </div>
    </header>
  );
}
