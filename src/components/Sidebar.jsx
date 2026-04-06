import React, { useState } from 'react';
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  ChevronLeft, ChevronRight, Shield, Eye, Moon, Sun, TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'transactions',  label: 'Transactions',   icon: ArrowLeftRight },
  { id: 'insights',      label: 'Insights',       icon: Lightbulb },
];

export default function Sidebar() {
  const { activeNav, setActiveNav, role, setRole, darkMode, setDarkMode, sidebarOpen, setSidebarOpen } = useApp();

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-30 glass-card border-r-0
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-64' : 'w-16'}`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-100 dark:border-slate-800 ${!sidebarOpen && 'justify-center'}`}>
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
          <TrendingUp size={18} className="text-white" />
        </div>
        {sidebarOpen && (
          <div>
            <p className="font-bold text-slate-800 dark:text-white text-sm leading-tight">FinDash</p>
            <p className="text-xs text-slate-400">Finance Suite</p>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activeNav === id;
          return (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              title={!sidebarOpen ? label : ''}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200
                ${active
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200'
                }
                ${!sidebarOpen && 'justify-center'}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
              {sidebarOpen && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        {/* Role Switcher */}
        {sidebarOpen ? (
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 px-1 uppercase tracking-wide font-medium">Role</p>
            <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              {['admin', 'viewer'].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-all
                    ${role === r
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                  {r === 'admin' ? <Shield size={12} /> : <Eye size={12} />}
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setRole(r => r === 'admin' ? 'viewer' : 'admin')}
            title={`Role: ${role}`}
            className="w-full flex justify-center py-2 text-slate-500 dark:text-slate-400 hover:text-blue-600"
          >
            {role === 'admin' ? <Shield size={18} /> : <Eye size={18} />}
          </button>
        )}

        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800
            transition-all ${!sidebarOpen && 'justify-center'}`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {sidebarOpen && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3.5 top-1/2 -translate-y-1/2
          w-7 h-7 rounded-full bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          flex items-center justify-center shadow-md
          text-slate-500 dark:text-slate-400 hover:text-blue-600
          transition-all duration-200 hover:scale-110"
      >
        {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </aside>
  );
}
