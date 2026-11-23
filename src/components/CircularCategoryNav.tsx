'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { CATEGORIES } from '@/lib/initialData';

const SUBCATEGORIES_DATA = [
  // Footwear (5 items)
  {
    name: "Men's Footwear",
    parent: 'footwear',
    parentTitle: 'Footwear Atelier',
    slug: 'mens-footwear',
    index: '01',
    img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: "Women's Footwear",
    parent: 'footwear',
    parentTitle: 'Footwear Atelier',
    slug: 'womens-footwear',
    index: '02',
    img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: "Kids' Footwear",
    parent: 'footwear',
    parentTitle: 'Footwear Atelier',
    slug: 'kids-footwear',
    index: '03',
    img: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Shoes',
    parent: 'footwear',
    parentTitle: 'Footwear Atelier',
    slug: 'shoes',
    index: '04',
    img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Sandals & Slippers',
    parent: 'footwear',
    parentTitle: 'Footwear Atelier',
    slug: 'sandals-slippers',
    index: '05',
    img: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=400&auto=format&fit=crop',
  },
  // Ready-made clothes (5 items)
  {
    name: "Men's Wear",
    parent: 'ready-made-clothes',
    parentTitle: 'Apparel Atelier',
    slug: 'mens-wear',
    index: '06',
    img: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: "Women's Wear",
    parent: 'ready-made-clothes',
    parentTitle: 'Apparel Atelier',
    slug: 'womens-wear',
    index: '07',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: "Kids' Wear",
    parent: 'ready-made-clothes',
    parentTitle: 'Apparel Atelier',
    slug: 'kids-wear',
    index: '08',
    img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: "Boys' Wear",
    parent: 'ready-made-clothes',
    parentTitle: 'Apparel Atelier',
    slug: 'boys-wear',
    index: '09',
    img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: "Girls' Wear",
    parent: 'ready-made-clothes',
    parentTitle: 'Apparel Atelier',
    slug: 'girls-wear',
    index: '10',
    img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=400&auto=format&fit=crop',
  },
];

export default function CircularCategoryNav() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-white">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10 pb-4 border-b border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-neutral-300 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest mb-2 border border-neutral-800">
            <Sparkles className="w-3 h-3 text-white" />
            <span>Curated Disciplines</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            SIGNATURE ATELIERS &amp; SILHOUETTES
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl">
            Explore our mastercrafted footwear and bespoke ready-made apparel, conceived with timeless monochrome restraint.
          </p>
        </div>

        <Link
          href="/shop"
          className="bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 group self-start sm:self-auto shrink-0"
        >
          <span>Explore All</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* The 2 Main Category Hero Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-12">
        {CATEGORIES.map((cat, idx) => (
          <div
            key={cat.id}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 shadow-xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400">
                  0{idx + 1} // MAIN ATELIER
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {cat.subcategories.length} Curated Lines
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {cat.name}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-md mb-5">
                {cat.description}
              </p>

              {/* Subcategories Pill Badges */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                {cat.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/category/${cat.slug}/${sub.slug}`}
                    className="px-3 py-1 text-xs rounded-full bg-neutral-800 hover:bg-white hover:text-black text-neutral-300 transition-all border border-neutral-700 font-medium"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Row: Circular Preview + Signature Three-Arrow Navigation Button */}
            <div className="relative mt-2 flex items-center justify-between pt-4 border-t border-neutral-800/80">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden p-0.5 border border-neutral-700 shadow-sm shrink-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">Explore Atelier</span>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-xs sm:text-sm font-bold text-white hover:text-neutral-300"
                  >
                    View All {cat.name} &rarr;
                  </Link>
                </div>
              </div>

              {/* Three-Arrow Circular Navigation Button */}
              <Link
                href={`/category/${cat.slug}`}
                className="w-11 h-11 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-all group-hover:scale-105 shadow-md shrink-0"
                aria-label={`View ${cat.name}`}
              >
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/* 10 SUBCATEGORIES HORIZONTAL SCROLLING & CURATED SILHOUETTES */}
      {/* ============================================================ */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7">
        
        {/* Header with Navigation Controls */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow-xs">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                SILHOUETTES ARCHIVE (10)
              </h3>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                Explore by Specific Silhouette
              </h4>
            </div>
          </div>

          {/* Scroll Buttons for Horizontal Carousel */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center transition-all active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center transition-all active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Smooth Horizontal Scrolling Ribbon */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {SUBCATEGORIES_DATA.map((item) => (
            <Link
              key={item.slug}
              href={`/category/${item.parent}/${item.slug}`}
              className="group flex flex-col items-center text-center p-3 sm:p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 hover:border-neutral-500 transition-all duration-300 shadow-sm shrink-0 w-32 sm:w-36 snap-start"
            >
              {/* Circular Pod with Concentric Hairline Ring */}
              <div className="relative mb-2.5">
                <div className="p-1 rounded-full ring-1 ring-neutral-700 group-hover:ring-2 group-hover:ring-white transition-all duration-300 bg-neutral-950">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden shadow-inner">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
                {/* Micro Index Tag */}
                <span className="absolute -top-1 -right-1 font-mono text-[8px] font-bold bg-white text-black px-1.5 py-0.2 rounded-full shadow-xs">
                  {item.index}
                </span>
              </div>

              {/* Clean Typography */}
              <span className="text-[11px] sm:text-xs font-bold text-white group-hover:text-neutral-300 line-clamp-1 mb-0.5">
                {item.name}
              </span>
              <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                {item.parent === 'footwear' ? 'Footwear' : 'Apparel'}
              </span>
            </Link>
          ))}
        </div>

      </div>

    </section>
  );
}
