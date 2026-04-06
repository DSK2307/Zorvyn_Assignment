import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import TopNav from './components/TopNav';
import GreetingBar from './components/GreetingBar';
import RadialOverview from './components/RadialOverview';
import CreditCardPanel from './components/CreditCardPanel';
import { IncomeCard, ExpenseStrategyCard, MoneyFlowCard } from './components/BentoCards';
import TransactionTable from './components/TransactionTable';
import InsightsPanel from './components/InsightsPanel';
import ChartsSection from './components/ChartsSection';
import TransactionModal from './components/TransactionModal';
import './App.css';

function Dashboard() {
  const { activeNav, transactions } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);

  const openAdd = () => { setEditTx(null); setModalOpen(true); };
  const openEdit = (tx) => { setEditTx(tx); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTx(null); };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-slate-50 to-brand-50 dark:from-[#080f1e] dark:via-[#050a14] dark:to-[#0b162c] font-sans transition-colors relative overflow-x-hidden">
      {/* Background Orbs for Glassmorphism Contrast */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-400/20 dark:bg-brand-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-400/20 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      <div className="relative z-10 w-full flex flex-col flex-1">
        <TopNav />
      
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 md:py-8 animate-fadeUp">
        {/* Universal Top Greeting/Filter Bar */}
        <GreetingBar onAddTransaction={openAdd} />

        {/* ── DASHBOARD VIEW ── */}
        {activeNav === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.2fr] gap-6 mt-4">
            {/* Left col */}
            <div className="flex flex-col gap-6 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
              <div className="flex-1 min-h-[160px]"><IncomeCard /></div>
              <div className="flex-1 min-h-[220px]"><ExpenseStrategyCard /></div>
            </div>

            {/* Center col */}
            <div className="flex flex-col gap-6 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex-1 min-h-[220px]">
                <RadialOverview available={4682} planned={1400} other={800} />
              </div>
              <div className="flex-[0.8] min-h-[160px]"><MoneyFlowCard /></div>
            </div>

            {/* Right col */}
            <div className="flex flex-col h-full animate-fadeUp" style={{ animationDelay: '0.3s' }}>
              <CreditCardPanel onAddCard={openAdd} />
            </div>
          </div>
        )}

        {/* ── TRANSACTIONS VIEW ── */}
        {activeNav === 'transactions' && (
          <div className="mt-4 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Transaction History</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Over {transactions.length} transactions stored.</p>
              </div>
              <TransactionTable onEdit={openEdit} />
            </div>
          </div>
        )}

        {/* ── INSIGHTS VIEW ── */}
        {activeNav === 'insights' && (
          <div className="mt-4 space-y-6 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex-1 min-h-[160px]"><IncomeCard /></div>
                <div className="flex-1 min-h-[220px]"><ExpenseStrategyCard /></div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex-1 min-h-[220px]">
                  <RadialOverview available={4682} planned={1400} other={800} />
                </div>
                <div className="flex-1 min-h-[160px]">
                  <MoneyFlowCard />
                </div>
              </div>
            </div>
            
            <InsightsPanel />
            
            <div className="glass-card rounded-2xl p-6">
               <ChartsSection />
            </div>
          </div>
        )}
      </main>

        {modalOpen && <TransactionModal transaction={editTx} onClose={closeModal} />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}
