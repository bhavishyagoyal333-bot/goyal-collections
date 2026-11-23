'use client';

import React, { useEffect } from 'react';
import { RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Storefront error boundary caught exception:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-black text-white flex items-center justify-center p-6 selection:bg-white selection:text-black font-sans">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center mx-auto font-serif text-xl font-bold">
          GC
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">
            GOYAL COLLECTIONS
          </span>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-white">
            Something went wrong
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            We encountered a temporary hiccup loading this page. Please try refreshing.
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
          <Link
            href="/"
            className="flex-1 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Store Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
