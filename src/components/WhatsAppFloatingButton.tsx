'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function WhatsAppFloatingButton() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // Hide on admin panel
  if (isAdmin) return null;

  const phone = '919001725016';
  const defaultMessage = encodeURIComponent(
    'Hello Goyal Collections, I am visiting your store and would like assistance with an inquiry / order.'
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Direct WhatsApp Concierge"
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 flex items-center group select-none pointer-events-auto"
    >
      {/* Floating Tooltip Label */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-neutral-900/90 text-white text-xs font-mono font-medium border border-neutral-700/80 shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none">
        Chat on WhatsApp
      </span>

      {/* Floating WhatsApp Action Pill */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp +91 90017 25016"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        {/* Subtle Pulse Animation Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* Official WhatsApp SVG Vector Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 relative z-10 filter drop-shadow-sm"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.438 5.178L2.052 21.948l4.898-1.353C8.423 21.498 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.637 0-3.155-.494-4.42-1.34l-.317-.21-2.937.812.827-2.883-.23-.332C4.013 14.939 3.5 13.518 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
        </svg>
      </a>
    </aside>
  );
}
