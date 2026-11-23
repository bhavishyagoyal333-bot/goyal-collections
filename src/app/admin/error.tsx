'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin Panel caught exception:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 selection:bg-white selection:text-black font-sans">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-800/80 text-red-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">
            GOYAL COLLECTIONS // SYSTEM NOTICE
          </span>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-white">
            Admin Workspace Recovered
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed font-mono">
            {error?.message || 'A temporary interface update occurred. Session data remains secure.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/admin';
              }
            }}
            className="flex-1 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Reload Admin</span>
          </button>
        </div>

        <div className="pt-4 border-t border-neutral-900">
          <Link
            href="/"
            className="text-[11px] text-neutral-500 hover:text-white transition-colors font-mono"
          >
            ← Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
