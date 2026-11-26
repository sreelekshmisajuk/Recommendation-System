import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Download, Zap, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface BillingProps {
  user: UserProfile;
}

export const Billing: React.FC<BillingProps> = ({ user }) => {
  const [currentPlan, setCurrentPlan] = useState<'Developer' | 'Pro' | 'Enterprise'>('Pro');
  const [updatedSuccess, setUpdatedSuccess] = useState(false);

  const invoices = [
    { id: 'INV-2026-003', date: 'Nov 01, 2026', amount: '$79.00', status: 'Paid', pdf: 'inv_nov.pdf' },
    { id: 'INV-2026-002', date: 'Oct 01, 2026', amount: '$79.00', status: 'Paid', pdf: 'inv_oct.pdf' },
    { id: 'INV-2026-001', date: 'Sep 01, 2026', amount: '$79.00', status: 'Paid', pdf: 'inv_sep.pdf' }
  ];

  const handleUpgrade = (plan: 'Developer' | 'Pro' | 'Enterprise') => {
    setCurrentPlan(plan);
    setUpdatedSuccess(true);
    setTimeout(() => setUpdatedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Plan: {currentPlan} Active
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Subscription & Billing Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your recommendation API tier, billing cycle, credit card, and invoice receipts.
          </p>
        </div>
      </div>

      {updatedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Subscription updated successfully.
        </div>
      )}

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl bg-white border transition-all ${currentPlan === 'Developer' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'}`}>
          <h4 className="font-bold text-sm text-slate-900">Developer</h4>
          <div className="text-2xl font-black text-slate-900 my-2">$0 <span className="text-xs font-normal text-slate-400">/mo</span></div>
          <p className="text-xs text-slate-500 mb-4">10,000 monthly queries</p>
          <button
            onClick={() => handleUpgrade('Developer')}
            disabled={currentPlan === 'Developer'}
            className="w-full py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 disabled:opacity-50"
          >
            {currentPlan === 'Developer' ? 'Current Plan' : 'Downgrade'}
          </button>
        </div>

        <div className={`p-6 rounded-2xl bg-white border transition-all ${currentPlan === 'Pro' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'}`}>
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm text-slate-900">Pro</h4>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">Active</span>
          </div>
          <div className="text-2xl font-black text-slate-900 my-2">$79 <span className="text-xs font-normal text-slate-400">/mo</span></div>
          <p className="text-xs text-slate-500 mb-4">500,000 queries + RecExplainer</p>
          <button
            onClick={() => handleUpgrade('Pro')}
            disabled={currentPlan === 'Pro'}
            className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {currentPlan === 'Pro' ? 'Current Plan' : 'Upgrade'}
          </button>
        </div>

        <div className={`p-6 rounded-2xl bg-white border transition-all ${currentPlan === 'Enterprise' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'}`}>
          <h4 className="font-bold text-sm text-slate-900">Enterprise</h4>
          <div className="text-2xl font-black text-slate-900 my-2">$399 <span className="text-xs font-normal text-slate-400">/mo</span></div>
          <p className="text-xs text-slate-500 mb-4">Unlimited queries + Dedicated VPC</p>
          <button
            onClick={() => handleUpgrade('Enterprise')}
            disabled={currentPlan === 'Enterprise'}
            className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-black disabled:opacity-50"
          >
            {currentPlan === 'Enterprise' ? 'Current Plan' : 'Upgrade'}
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Payment Method</h3>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <CreditCard className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Visa ending in •••• 4242</div>
              <div className="text-[11px] text-slate-400">Expires 12/28 • Default Payment</div>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100">
            Edit
          </button>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Invoice History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                <th className="pb-3 font-semibold">Invoice ID</th>
                <th className="pb-3 font-semibold">Billing Date</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="py-3 font-bold text-slate-900">{inv.id}</td>
                  <td className="py-3">{inv.date}</td>
                  <td className="py-3 font-medium text-slate-900">{inv.amount}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
