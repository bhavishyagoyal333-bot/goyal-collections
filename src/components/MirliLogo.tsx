'use client';

import React from 'react';

interface MirliLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTextOnMobile?: boolean;
}

export default function MirliLogo({ className = '', size = 'md', showTextOnMobile = true }: MirliLogoProps) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* Precision Vector Monogram Crest: GC Interlocking Luxury Monogram */}
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 transition-transform group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Outer Circular Ring */}
        <circle cx="22" cy="22" r="21" stroke="currentColor" strokeWidth="1.5" className="text-white" opacity="0.95" />
        {/* Subtle Inner Accent Ring */}
        <circle cx="22" cy="22" r="18.5" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" className="text-white/60" />
        
        {/* Interlocking G & C Haute Couture Monogram */}
        {/* Letter G */}
        <path
          d="M23 15.5C18.5 15.5 15 18.5 15 22C15 25.5 18.5 28.5 23 28.5C26.5 28.5 28.5 26.5 28.5 23.5H22.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        />
        {/* Letter C (Slightly Nested Accent) */}
        <path
          d="M26.5 18.2C25.5 17.5 24 17 22.5 17C19.5 17 17 19.2 17 22C17 24.8 19.5 27 22.5 27C24 27 25.5 26.5 26.5 25.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="text-white/80"
        />
      </svg>

      {/* Typography: GOYAL COLLECTIONS Wordmark & Subtitle */}
      <div className={`${showTextOnMobile ? 'flex' : 'hidden sm:flex'} flex-col justify-center`}>
        <span className="font-serif text-xs sm:text-lg lg:text-xl font-extrabold tracking-[0.16em] sm:tracking-[0.24em] text-white leading-none group-hover:tracking-[0.26em] transition-all whitespace-nowrap">
          GOYAL COLLECTIONS
        </span>
        <span className="text-[6.5px] sm:text-[8px] tracking-[0.28em] sm:tracking-[0.38em] text-neutral-400 uppercase font-mono mt-0.5 font-semibold whitespace-nowrap">
          HAUTE COUTURE // ATELIER
        </span>
      </div>
    </div>
  );
}
