'use client';

import React, { useState } from 'react';
import { PaymentTransaction } from '@/lib/types';
import { CreditCard, Search, ArrowUpRight, DollarSign, RefreshCw, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

interface PaymentsViewProps {
  payments: PaymentTransaction[];
  onRefresh: () => void;
  showToast: (msg: string) => void;
}

export default function PaymentsView({ payments = [], onRefresh, showToast }: PaymentsViewProps) {
  const [search, setSearch] = useState('');
  const [gatewayFilter, setGatewayFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTx, setSelectedTx] = useState<PaymentTransaction | null>(null);
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [refundReason, setRefundReason] = useState('Customer return / order cancelled');
  const [isRefunding, setIsRefunding] = useState(false);

  const safePayments = payments || [];
  // Compute metrics
  const totalVolume = safePayments.reduce((sum, p) => (p.status === 'Paid' ? sum + p.amount : sum), 0);
  const totalRefunded = safePayments.reduce((sum, p) => (p.refundAmount ? sum + p.refundAmount : 0), 0);
  const successfulCount = safePayments.filter((p) => p.status === 'Paid').length;
  const pendingCodCount = safePayments.filter((p) => p.status === 'Pending' || p.paymentMethod === 'Cash on Delivery').length;

  const filtered = safePayments.filter((p) => {
    const matchesSearch =
      p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      p.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.customerName.toLowerCase().includes(search.toLowerCase()) ||
      p.customerEmail.toLowerCase().includes(search.toLowerCase());

    const matchesGateway = gatewayFilter === 'all' || p.paymentGateway === gatewayFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

    return matchesSearch && matchesGateway && matchesStatus;
  });

  const handleIssueRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTx) return;

    try {
      setIsRefunding(true);
      const res = await fetch('/api/admin/payments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedTx.id,
          status: refundAmount >= selectedTx.amount ? 'Refunded' : 'Partially Refunded',
          refundAmount: refundAmount,
          notes: refundReason,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Refund of ₹${refundAmount.toLocaleString('en-IN')} initiated successfully for ${selectedTx.orderNumber}`);
        setSelectedTx(null);
        onRefresh();
      } else {
        alert(data.message || 'Refund failed');
      }
    } catch (err) {
      alert('Network error while processing refund');
    } finally {
      setIsRefunding(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h3 className="font-serif text-xl font-bold tracking-wide">PAYMENTS & FINANCIAL TRANSACTIONS</h3>
          <p className="text-xs text-neutral-400 font-mono">
            Real-time multi-gateway reconciliation, settlement logs, and instant refund processing.
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync Gateway Logs</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase font-mono text-neutral-400 block">TOTAL VOLUME (NET)</span>
          <div className="font-mono text-xl sm:text-2xl font-black text-white">
            ₹{totalVolume.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Confirmed Settled
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase font-mono text-neutral-400 block">SETTLED TRANSACTIONS</span>
          <div className="font-mono text-xl sm:text-2xl font-black text-white">
            {successfulCount}
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">All payment gateways</span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase font-mono text-amber-400 block">COD PENDING SETTLEMENT</span>
          <div className="font-mono text-xl sm:text-2xl font-black text-white">
            {pendingCodCount}
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">Collect on Delivery</span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase font-mono text-red-400 block">TOTAL REFUNDED</span>
          <div className="font-mono text-xl sm:text-2xl font-black text-white">
            ₹{totalRefunded.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">Customer reconciliations</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Txn ID, Order #, Customer..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
          />
        </div>

        <select
          value={gatewayFilter}
          onChange={(e) => setGatewayFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white"
        >
          <option value="all">All Gateways (Razorpay, COD, UPI, Stripe)</option>
          <option value="Razorpay">Razorpay</option>
          <option value="COD">Cash on Delivery (COD)</option>
          <option value="UPI">Direct UPI</option>
          <option value="Stripe">Stripe International</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white"
        >
          <option value="all">All Payment Statuses</option>
          <option value="Paid">Paid / Captured</option>
          <option value="Pending">Pending</option>
          <option value="Refunded">Refunded</option>
          <option value="Partially Refunded">Partially Refunded</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
              <th className="pb-3">Transaction ID</th>
              <th className="pb-3">Order #</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Gateway & Method</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-neutral-500">
                  No payment transactions found matching the selected filters.
                </td>
              </tr>
            ) : (
              filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3.5 font-bold text-white">
                    <span className="font-mono">{tx.transactionId}</span>
                  </td>
                  <td className="py-3.5 text-neutral-300 font-bold">{tx.orderNumber}</td>
                  <td className="py-3.5 font-sans">
                    <div className="font-semibold text-white">{tx.customerName}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{tx.customerEmail}</div>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 text-[10px] font-bold">
                      {tx.paymentGateway}
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">{tx.paymentMethod}</span>
                  </td>
                  <td className="py-3.5 font-bold text-white text-sm">
                    ₹{tx.amount.toLocaleString('en-IN')}
                    {tx.refundAmount ? (
                      <span className="text-[10px] text-red-400 block font-normal">
                        -₹{tx.refundAmount.toLocaleString('en-IN')} refunded
                      </span>
                    ) : null}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                        tx.status === 'Paid'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : tx.status === 'Refunded'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : tx.status === 'Partially Refunded'
                          ? 'bg-purple-950 text-purple-400 border border-purple-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-neutral-400 text-[11px]">
                    {new Date(tx.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3.5 text-right">
                    {tx.status === 'Paid' ? (
                      <button
                        onClick={() => {
                          setSelectedTx(tx);
                          setRefundAmount(tx.amount);
                        }}
                        className="px-3 py-1 rounded-full bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-[11px] font-bold transition-colors"
                      >
                        Refund
                      </button>
                    ) : (
                      <span className="text-[10px] text-neutral-500 font-mono">Settled</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Refund Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl font-mono text-xs">
            <h4 className="font-serif text-lg font-bold text-white">Process Refund: {selectedTx.orderNumber}</h4>
            <p className="text-neutral-400">
              Gateway: <span className="text-white font-bold">{selectedTx.paymentGateway}</span> | Transaction ID: {selectedTx.transactionId}
            </p>

            <form onSubmit={handleIssueRefund} className="space-y-4">
              <div>
                <label className="block text-neutral-400 mb-1">REFUND AMOUNT (₹) *</label>
                <input
                  type="number"
                  max={selectedTx.amount}
                  min={1}
                  required
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold text-sm"
                />
                <span className="text-[10px] text-neutral-500 block mt-1">
                  Original transaction total: ₹{selectedTx.amount.toLocaleString('en-IN')}
                </span>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">REASON / INTERNAL NOTES *</label>
                <textarea
                  required
                  rows={2}
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-sans text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTx(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRefunding}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-colors disabled:opacity-50"
                >
                  {isRefunding ? 'Processing...' : 'Confirm Refund'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
