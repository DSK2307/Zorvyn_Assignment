import React, { useState } from 'react';
import { Bell, Moon, Sun, Shield, Eye, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = ['Dashboard', 'Transactions', 'Insights'];

export default function TopNav() {
  const { activeNav, setActiveNav, role, setRole, darkMode, setDarkMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navMap = { Dashboard: 'dashboard', Transactions: 'transactions', Insights: 'insights' };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f0f2f7] dark:bg-[#080f1c] pt-4 pb-2 transition-colors">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 flex items-center justify-between relative">
        
        {/* Left side: Logo + Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex flex-col gap-0.5 items-center justify-center w-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white">
              <path d="M10 21c-4.4-1.2-7-5.5-7-10s2.6-8.8 7-10M14 3c4.4 1.2 7 5.5 7 10s-2.6 8.8-7 10M12 7v10" />
            </svg>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center bg-white dark:bg-slate-800 rounded-full shadow-sm p-1">
            {navItems.map(item => {
              const isActive = activeNav === navMap[item];
              return (
                <button key={item}
                  onClick={() => setActiveNav(navMap[item] || 'dashboard')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                    ${isActive
                      ? 'bg-gray-900 text-white dark:bg-brand-600 dark:text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}>
                  {item}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right side: Action Icons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center glass-card rounded-full p-1.5 gap-1.5 relative">
            
            {/* Theme Toggle */}
            <button onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/30 dark:hover:bg-slate-700/50 text-gray-500 dark:text-gray-400 transition-colors">
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Role Switcher */}
            <button onClick={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
              title={`Switch role (Current: ${role})`}
              className="px-3 h-8 rounded-full flex items-center gap-2 hover:bg-white/30 dark:hover:bg-slate-700/50 text-xs font-semibold text-gray-600 dark:text-slate-300 transition-colors">
              {role === 'admin' ? <Shield size={14} /> : <Eye size={14} />}
              <span className="capitalize hidden sm:inline">{role}</span>
            </button>

            {/* Notification Bell */}
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/30 dark:hover:bg-slate-700/50 text-gray-500 dark:text-gray-400 transition-colors relative">
              <Bell size={14} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 border border-transparent" />
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-emerald-500 overflow-hidden ml-1">
              <img src="https://ui-avatars.com/api/?name=James+Smith&background=22c55e&color=fff&font-size=0.35&bold=true" alt="User" />
            </div>

          </div>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden glass-card rounded-full p-1.5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-slate-800 shadow-lg animate-fadeDown">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map(item => {
              const isActive = activeNav === navMap[item];
              return (
                <button key={item}
                  onClick={() => { setActiveNav(navMap[item] || 'dashboard'); setMobileMenuOpen(false); }}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                    ${isActive
                      ? 'bg-gray-900 text-white dark:bg-brand-600 dark:text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}>
                  {item}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
