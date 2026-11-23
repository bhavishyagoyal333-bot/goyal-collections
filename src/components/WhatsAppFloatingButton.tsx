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
      className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-40 flex items-center select-none pointer-events-auto"
    >
      {/* Luxury Glassic WhatsApp Concierge Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Atelier Concierge on WhatsApp +91 90017 25016"
        className="group relative flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-neutral-950/90 hover:bg-neutral-900 border border-white/20 hover:border-emerald-400/50 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.7),inset_0_1px_1.5px_rgba(255,255,255,0.25)] text-white transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Subtle Luxury Emerald Glow Icon Frame */}
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0 shadow-[0_0_8px_rgba(37,211,102,0.25)] group-hover:scale-105 transition-transform">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 filter drop-shadow-sm"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.438 5.178L2.052 21.948l4.898-1.353C8.423 21.498 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.637 0-3.155-.494-4.42-1.34l-.317-.21-2.937.812.827-2.883-.23-.332C4.013 14.939 3.5 13.518 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
          </svg>
        </div>

        {/* Professional Haute Couture Typography */}
        <div className="flex flex-col text-left pr-0.5">
          <span className="text-[7.5px] sm:text-[8.5px] font-mono tracking-widest uppercase text-neutral-400 block font-semibold leading-tight">
            Concierge Desk
          </span>
          <span className="text-[11px] sm:text-xs font-serif font-bold text-white tracking-wide block leading-tight">
            WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
}
