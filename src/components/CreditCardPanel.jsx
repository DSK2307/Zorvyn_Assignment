import React from 'react';
import { Wifi, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CreditCardPanel({ onAddCard }) {
  const { role } = useApp();
  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800 dark:text-white">My Finances</h3>
        {role === 'admin' && (
          <button onClick={onAddCard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 dark:bg-brand-600 text-white text-xs font-semibold hover:bg-gray-700 transition-all">
            + Add card
          </button>
        )}
      </div>

      {/* Credit Card */}
      <div className="relative w-full aspect-[1.7/1] min-h-[140px] rounded-2xl bg-gradient-to-br from-brand-900 to-brand-700 p-5 overflow-hidden shadow-card-lg">
        {/* Background shimmer bubbles */}
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -bottom-6 -left-4 w-24 h-24 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-4 w-16 h-16 rounded-full bg-white/5" />

        <div className="relative h-full flex flex-col justify-between">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-xs font-bold tracking-widest uppercase">VISA</span>
            <Wifi size={20} className="text-white/60 rotate-90" />
          </div>
          {/* Card number */}
          <div>
            <p className="text-white/50 text-xs font-medium tracking-widest mb-1">
              ★★★★ ★★★★ ★★★★ 5491
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wide">Expires</p>
                <p className="text-white text-xs font-semibold">12/23/2030</p>
              </div>
              <div className="text-right">
                <p className="text-white/50 text-[10px] uppercase tracking-wide">Cardholder</p>
                <p className="text-white text-xs font-semibold">James Smith</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wealth Overview */}
      <WealthBreakdown />
    </div>
  );
}

function WealthBreakdown() {
  const items = [
    { label: 'Wealth Overview',     value: '$16,531.54', bold: true, indent: false },
    { label: 'Banking',             value: '$9,681.49',  bold: false, indent: true, expand: true },
    { label: 'Checking Accounts',   value: '$7,583.00',  bold: false, indent: true, expand: true },
    { label: 'Visa',                value: '$5,299.52',  bold: false, indent: false, sub: true },
    { label: 'Save Target',         value: '$958.00',    bold: false, indent: false, sub: true },
    { label: 'Current balance',     value: '$7,602.15',  bold: false, indent: false, sub: true },
  ];

  return (
    <div className="divide-y divide-gray-50 dark:divide-slate-700/50">
      {items.map((item, i) => (
        <div key={i} className={`flex items-center justify-between py-2 
          ${item.sub ? 'pl-5' : ''}`}>
          <div className="flex items-center gap-2">
            {item.expand && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3 4l2 2 2-2" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
            {!item.expand && !item.bold && item.indent && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3 4l2 2 2-2" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
            <span className={`text-xs ${item.bold
              ? 'font-semibold text-gray-800 dark:text-white'
              : item.sub
                ? 'text-gray-400 dark:text-slate-500'
                : 'text-gray-600 dark:text-slate-400'}`}>
              {item.label}
            </span>
          </div>
          <span className={`text-xs font-semibold tabular-nums
            ${item.bold ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-slate-300'}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
