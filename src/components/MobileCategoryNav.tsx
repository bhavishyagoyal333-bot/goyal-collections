'use client';

import React from 'react';
import Link from 'next/link';

const MOBILE_CATEGORIES = [
  {
    name: "Men's Footwear",
    shortName: "Men's Shoes",
    href: '/category/footwear/mens-footwear',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=300&auto=format&fit=crop',
    tag: '01',
  },
  {
    name: "Women's Footwear",
    shortName: "Women's Shoes",
    href: '/category/footwear/womens-footwear',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&auto=format&fit=crop',
    tag: '02',
  },
  {
    name: "Kids' Footwear",
    shortName: "Kids' Shoes",
    href: '/category/footwear/kids-footwear',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=300&auto=format&fit=crop',
    tag: '03',
  },
  {
    name: 'Shoes',
    shortName: 'Sneakers',
    href: '/category/footwear/shoes',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=300&auto=format&fit=crop',
    tag: '04',
  },
  {
    name: 'Sandals & Slippers',
    shortName: 'Sandals',
    href: '/category/footwear/sandals-slippers',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=300&auto=format&fit=crop',
    tag: '05',
  },
  {
    name: "Men's Wear",
    shortName: "Men's Wear",
    href: '/category/ready-made-clothes/mens-wear',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=300&auto=format&fit=crop',
    tag: '06',
  },
  {
    name: "Women's Wear",
    shortName: "Women's Wear",
    href: '/category/ready-made-clothes/womens-wear',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=300&auto=format&fit=crop',
    tag: '07',
  },
  {
    name: "Kids' Wear",
    shortName: "Kids' Wear",
    href: '/category/ready-made-clothes/kids-wear',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=300&auto=format&fit=crop',
    tag: '08',
  },
  {
    name: "Boys' Wear",
    shortName: "Boys' Wear",
    href: '/category/ready-made-clothes/boys-wear',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=300&auto=format&fit=crop',
    tag: '09',
  },
  {
    name: "Girls' Wear",
    shortName: "Girls' Wear",
    href: '/category/ready-made-clothes/girls-wear',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=300&auto=format&fit=crop',
    tag: '10',
  },
];

export default function MobileCategoryNav() {
  return (
    <div className="w-full">
      {/* Category Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h4 className="font-serif text-sm font-bold text-white tracking-wide uppercase">
          Categories
        </h4>
        <Link
          href="/shop"
          className="text-[10px] font-mono text-neutral-400 hover:text-white uppercase tracking-wider underline underline-offset-4"
        >
          View All &rarr;
        </Link>
      </div>

      {/* 2 Main Category Direct Cards */}
      <div className="grid grid-cols-2 gap-2 mb-3.5">
        <Link
          href="/category/footwear"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-left transition-all active:scale-[0.98]"
        >
          <div>
            <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">CAT 01</span>
            <span className="text-xs font-bold text-white block">Footwear</span>
          </div>
          <span className="text-neutral-500 text-xs">→</span>
        </Link>

        <Link
          href="/category/ready-made-clothes"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-left transition-all active:scale-[0.98]"
        >
          <div>
            <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">CAT 02</span>
            <span className="text-xs font-bold text-white block">Ready-made</span>
          </div>
          <span className="text-neutral-500 text-xs">→</span>
        </Link>
      </div>

      {/* Smooth Horizontal Carousel with Equal Spacing */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4">
        {MOBILE_CATEGORIES.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col items-center text-center shrink-0 w-[74px] snap-start transition-all active:scale-95"
          >
            {/* Compact Circular Thumbnail */}
            <div className="w-14 h-14 rounded-full p-0.5 ring-1 ring-neutral-800 group-hover:ring-white transition-all duration-300 bg-neutral-900 shadow-sm mb-1.5">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Category Name */}
            <span className="text-[10px] font-medium text-neutral-200 group-hover:text-white leading-tight line-clamp-1 w-full">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
