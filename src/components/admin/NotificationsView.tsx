'use client';

import React, { useState } from 'react';
import { AdminNotification } from '@/lib/types';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  Boxes,
  RotateCcw,
  Star,
  Info,
  Volume2,
  VolumeX,
  Trash2,
  Check,
  RefreshCw,
} from 'lucide-react';

interface NotificationsViewProps {
  notifications: AdminNotification[];
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPlayTestChime: () => void;
  onRefresh: () => void;
  showToast: (msg: string) => void;
}

export default function NotificationsView({
  notifications = [],
  soundEnabled,
  onToggleSound,
  onPlayTestChime,
  onRefresh,
  showToast,
}: NotificationsViewProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'order' | 'stock' | 'system'>('all');
  const [actionLoading, setActionLoading] = useState(false);

  const safeNotifications = notifications || [];
  const unreadCount = safeNotifications.filter((n) => !n.read).length;

  const filtered = safeNotifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'order') return n.type === 'order';
    if (filter === 'stock') return n.type === 'stock';
    if (filter === 'system') return n.type === 'system' || n.type === 'return' || n.type === 'review';
    return true;
  });

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch('/api/admin/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to clear all admin notifications?')) return;
    try {
      setActionLoading(true);
      await fetch('/api/admin/notifications', { method: 'DELETE' });
      showToast('All notifications cleared');
      onRefresh();
    } catch (err) {
      alert('Error clearing notifications');
    } finally {
      setActionLoading(false);
    }
  };

  const getTypeIcon = (type: AdminNotification['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case 'stock':
        return <Boxes className="w-4 h-4 text-amber-400" />;
      case 'return':
        return <RotateCcw className="w-4 h-4 text-red-400" />;
      case 'review':
        return <Star className="w-4 h-4 text-yellow-400" />;
      default:
        return <Info className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-serif text-xl font-bold tracking-wide">NOTIFICATIONS & REAL-TIME ALERTS</h3>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-black font-mono font-bold text-xs">
                {unreadCount} NEW
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Live order chimes, critical inventory thresholds, customer actions, and security alerts.
          </p>
        </div>

        {/* Audio Chime Controller */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors border ${
              soundEnabled
                ? 'bg-neutral-900 border-neutral-700 text-emerald-400'
                : 'bg-neutral-950 border-neutral-800 text-neutral-500'
            }`}
            title="Toggle Order Alert Chime"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundEnabled ? 'Chime Sound: ON' : 'Chime Sound: MUTED'}</span>
          </button>

          {soundEnabled && (
            <button
              onClick={onPlayTestChime}
              className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 transition-colors"
            >
              Test Chime 🔔
            </button>
          )}

          <button
            onClick={handleClearAll}
            disabled={notifications.length === 0 || actionLoading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-950/80 border border-red-900/60 text-red-300 text-xs font-mono transition-colors disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        {[
          { id: 'all', label: `All Alerts (${notifications.length})` },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'order', label: 'Orders' },
          { id: 'stock', label: 'Inventory' },
          { id: 'system', label: 'System & Reviews' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl border transition-all ${
              filter === tab.id
                ? 'bg-white text-black font-bold border-white'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3 font-mono">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-neutral-900 border border-neutral-800 text-neutral-500 text-xs">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
            No notifications found in this view.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMarkAsRead(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                !item.read
                  ? 'bg-neutral-900 border-neutral-700/80 shadow-md ring-1 ring-emerald-500/20'
                  : 'bg-neutral-950 border-neutral-800/80 hover:bg-neutral-900/40'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 shrink-0">
                  {getTypeIcon(item.type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white font-sans">{item.title}</span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">{item.message}</p>
                  <span className="text-[10px] text-neutral-500 block font-mono">
                    {new Date(item.createdAt).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {!item.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAsRead(item.id);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] shrink-0"
                >
                  Mark Read
                </button>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
