'use client';

import React, { useState } from 'react';
import { AdminActivityLog } from '@/lib/types';
import { History, Search, Filter, ShieldCheck } from 'lucide-react';

interface ActivityLogsViewProps {
  logs: AdminActivityLog[];
  onRefresh: () => void;
}

export default function ActivityLogsView({ logs = [], onRefresh }: ActivityLogsViewProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const safeLogs = logs || [];
  const filtered = safeLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.adminEmail.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h3 className="font-serif text-xl font-bold tracking-wide">ADMIN ACTIVITY AUDIT LOGS</h3>
          <p className="text-xs text-neutral-400 font-mono">
            Immutable system security log tracking administrative mutations, logins, and status transitions.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs by action, details, or staff email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white"
        >
          <option value="all">All Audit Categories</option>
          <option value="auth">Authentication & Sessions</option>
          <option value="orders">Orders & Fulfillment</option>
          <option value="catalog">Catalog & Products</option>
          <option value="inventory">Inventory & Stock</option>
          <option value="settings">Store Settings</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
              <th className="pb-3">Timestamp</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Action</th>
              <th className="pb-3">Mutation Details</th>
              <th className="pb-3">Staff Identity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-neutral-500">
                  No activity logs matching criteria.
                </td>
              </tr>
            ) : (
              filtered.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3 text-neutral-400 text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-neutral-950 border border-neutral-800 text-neutral-300">
                      {log.category}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-white whitespace-nowrap">{log.action}</td>
                  <td className="py-3 text-neutral-300 text-[11px] max-w-md truncate font-sans">
                    {log.details}
                  </td>
                  <td className="py-3 text-neutral-400 text-[11px] whitespace-nowrap">
                    {log.adminEmail}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
