import React, { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, Tag, ArrowUpDown, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';

const defaultForm = {
  date: new Date().toISOString().split('T')[0],
  amount: '',
  category: 'Food',
  type: 'expense',
  description: '',
};

export default function TransactionModal({ transaction, onClose }) {
  const { addTransaction, editTransaction } = useApp();
  const isEdit = Boolean(transaction);
  const [form, setForm] = useState(isEdit ? { ...transaction } : defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const validate = () => {
    const errs = {};
    if (!form.date) errs.date = 'Date is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) errs.amount = 'Enter a valid positive amount';
    if (!form.category) errs.category = 'Category is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const payload = { ...form, amount: Number(form.amount) };
    if (isEdit) editTransaction(transaction.id, payload);
    else addTransaction(payload);
    onClose();
  };

  const field = (label, icon, children, error) => (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
        {icon} {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );

  const inputCls = `w-full px-3 py-2.5 text-sm rounded-xl
    bg-slate-50 dark:bg-slate-700 border
    text-slate-700 dark:text-slate-200
    focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card rounded-2xl shadow-2xl
        border border-slate-100 dark:border-slate-700 overflow-hidden animate-[fadeInUp_0.2s_ease]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-white">
              {isEdit ? 'Edit Transaction' : 'New Transaction'}
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {isEdit ? 'Update the transaction details below' : 'Fill in the details to add a transaction'}
            </p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center
              bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-red-500
              hover:bg-red-50 dark:hover:bg-red-900/30 transition-all">
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Type Switcher */}
          <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
            {['income', 'expense'].map(t => (
              <button type="button" key={t}
                onClick={() => setForm(f => ({ ...f, type: t }))}
                className={`flex-1 py-2.5 text-sm font-semibold transition-all capitalize
                  ${form.type === t
                    ? t === 'income'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}>
                {t}
              </button>
            ))}
          </div>

          {/* Amount */}
          {field('Amount', <DollarSign size={12} />,
            <input type="number" min="0" step="0.01" placeholder="0.00"
              value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              className={`${inputCls} ${errors.amount ? 'border-red-300 dark:border-red-700' : 'border-slate-200 dark:border-slate-600'}`}
            />, errors.amount
          )}

          {/* Date */}
          {field('Date', <Calendar size={12} />,
            <input type="date"
              value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className={`${inputCls} ${errors.date ? 'border-red-300 dark:border-red-700' : 'border-slate-200 dark:border-slate-600'}`}
            />, errors.date
          )}

          {/* Category */}
          {field('Category', <Tag size={12} />,
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className={`${inputCls} border-slate-200 dark:border-slate-600`}>
              {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>, errors.category
          )}

          {/* Description */}
          {field('Description (optional)', <FileText size={12} />,
            <input type="text" placeholder="Add a note..."
              value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className={`${inputCls} border-slate-200 dark:border-slate-600`}
            />
          )}

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl
                border border-slate-200 dark:border-slate-700
                text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700
                transition-all">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl
                bg-blue-500 hover:bg-blue-600 text-white shadow-sm shadow-blue-200 dark:shadow-none
                transition-all hover:scale-[1.02] active:scale-[0.98]">
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
