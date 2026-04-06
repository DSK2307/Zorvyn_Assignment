import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, Pencil, Trash2, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';

function Badge({ type }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
      ${type === 'income'
        ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
        : 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400'
      }`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}

export default function TransactionTable({ onEdit }) {
  const { transactions, deleteTransaction, role } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (field) => {
    if (sortBy === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortDir('desc'); }
  };

  const filtered = useMemo(() => {
    let data = [...transactions];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(t =>
        t.description?.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        String(t.amount).includes(q)
      );
    }
    if (categoryFilter !== 'All') data = data.filter(t => t.category === categoryFilter);
    if (typeFilter !== 'All') data = data.filter(t => t.type === typeFilter);
    data.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'date') cmp = new Date(a.date) - new Date(b.date);
      else if (sortBy === 'amount') cmp = a.amount - b.amount;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return data;
  }, [transactions, search, categoryFilter, typeFilter, sortBy, sortDir]);

  const SortIcon = ({ field }) => (
    <span className="ml-1 inline-flex flex-col opacity-50">
      {sortBy === field ? (
        sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
      ) : (
        <ChevronDown size={12} />
      )}
    </span>
  );

  return (
    <div className="glass-card rounded-2xl">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl
                bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600
                text-slate-700 dark:text-slate-200 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                transition-all"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 text-sm rounded-xl
              bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600
              text-slate-700 dark:text-slate-200
              focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-3 py-2.5 text-sm rounded-xl
              bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600
              text-slate-700 dark:text-slate-200
              focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          >
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700">
              {[
                { label: 'Date', field: 'date' },
                { label: 'Description', field: null },
                { label: 'Category', field: null },
                { label: 'Type', field: null },
                { label: 'Amount', field: 'amount' },
              ].map(({ label, field }) => (
                <th key={label}
                  onClick={() => field && handleSort(field)}
                  className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider
                    text-slate-400 dark:text-slate-500
                    ${field ? 'cursor-pointer hover:text-blue-500 transition-colors' : ''}`}>
                  {label}
                  {field && <SortIcon field={field} />}
                </th>
              ))}
              {role === 'admin' && (
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={role === 'admin' ? 6 : 5} className="px-5 py-16 text-center text-slate-400 dark:text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <Filter size={28} className="opacity-30" />
                    <p className="font-medium">No transactions found</p>
                    <p className="text-xs">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map(tx => (
                <tr key={tx.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors group">
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300 font-medium max-w-[200px] truncate">
                    {tx.description || '—'}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5"><Badge type={tx.type} /></td>
                  <td className={`px-5 py-3.5 font-bold tabular-nums
                    ${tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                  {role === 'admin' && (
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(tx)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-400 hover:text-blue-600 transition-all"
                          title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 transition-all"
                          title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Showing {filtered.length} of {transactions.length} transactions
        </p>
      </div>
    </div>
  );
}
