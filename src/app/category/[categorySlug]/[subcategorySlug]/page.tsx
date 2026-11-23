'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, ArrowLeft, Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, INITIAL_PRODUCTS } from '@/lib/initialData';
import { Product } from '@/lib/types';

export default function SubcategoryPage({
  params: routeParams,
}: {
  params?: { categorySlug?: string; subcategorySlug?: string };
}) {
  const urlParams = useParams();

  const categorySlug = (routeParams?.categorySlug || (urlParams?.categorySlug as string) || '').toLowerCase();
  const subcategorySlug = (routeParams?.subcategorySlug || (urlParams?.subcategorySlug as string) || '').toLowerCase();

  // Find category and subcategory from CATEGORIES
  const category = useMemo(() => {
    return CATEGORIES.find((c) => c.slug.toLowerCase() === categorySlug || c.id.toLowerCase() === categorySlug);
  }, [categorySlug]);

  const subcategory = useMemo(() => {
    if (!category) {
      for (const cat of CATEGORIES) {
        const found = cat.subcategories.find((s) => s.slug.toLowerCase() === subcategorySlug);
        if (found) return found;
      }
      return null;
    }
    return category.subcategories.find((s) => s.slug.toLowerCase() === subcategorySlug);
  }, [category, subcategorySlug]);

  // Synchronous initial product list from initialData for instantaneous rendering without flicker
  const [products, setProducts] = useState<Product[]>(() => {
    return INITIAL_PRODUCTS.filter((p) => {
      const matchCat = !categorySlug || p.category.toLowerCase() === categorySlug;
      const matchSub = !subcategorySlug || p.subcategory.toLowerCase() === subcategorySlug;
      return matchCat && matchSub;
    });
  });

  const [sortBy, setSortBy] = useState<string>('newest');

  // Live real-time sync with API endpoint for new admin creations
  useEffect(() => {
    if (!categorySlug && !subcategorySlug) return;
    const url = `/api/products?${categorySlug ? `category=${categorySlug}&` : ''}${subcategorySlug ? `subcategory=${subcategorySlug}` : ''}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {
        // Safe catch, initialData is already displayed
      });
  }, [categorySlug, subcategorySlug]);

  // Sorted list
  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'popular') list.sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [products, sortBy]);

  // Graceful fallback UI if neither category nor subcategory found
  if (!category && !subcategory) {
    return (
      <div className="bg-black text-white min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12">
          <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mx-auto text-neutral-400">
            <Filter className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">Collection Not Found</h1>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">
            The requested category or silhouette could not be located in our current atelier archive.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/category/footwear"
              className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors"
            >
              Explore Footwear
            </Link>
            <Link
              href="/category/ready-made-clothes"
              className="px-5 py-2.5 rounded-full bg-neutral-800 border border-neutral-700 text-white text-xs font-bold hover:bg-neutral-700 transition-colors"
            >
              Explore Ready-made Clothes
            </Link>
            <Link
              href="/shop"
              className="px-5 py-2.5 rounded-full bg-transparent border border-neutral-700 text-neutral-300 text-xs font-bold hover:text-white transition-colors"
            >
              View Full Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const effectiveCategoryName = category?.name || (categorySlug === 'footwear' ? 'Footwear' : 'Ready-made Clothes');
  const effectiveCategorySlug = category?.slug || categorySlug || 'footwear';
  const effectiveSubcategoryName =
    subcategory?.name || subcategorySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const effectiveDescription =
    subcategory?.description || `Exclusive handcrafted luxury creations from the ${effectiveCategoryName} collection.`;
  const effectiveImage =
    subcategory?.image || category?.image || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800';

  return (
    <div className="bg-black text-white min-h-screen pb-24 w-full max-w-full overflow-x-hidden">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          <Link href={`/category/${effectiveCategorySlug}`} className="hover:text-white transition-colors">
            {effectiveCategoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-white font-semibold">{effectiveSubcategoryName}</span>
        </nav>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 w-full">
        {/* Subcategory Banner Card */}
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-5 sm:gap-6 z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-neutral-700 bg-neutral-950 shadow-md">
              <img
                src={effectiveImage}
                alt={effectiveSubcategoryName}
                className="w-full h-full object-cover filter contrast-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600';
                }}
              />
            </div>
            <div className="space-y-1 sm:space-y-2 max-w-xl">
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-bold block">
                {effectiveCategoryName.toUpperCase()} // CURATED SILHOUETTE
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-white">
                {effectiveSubcategoryName}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {effectiveDescription}
              </p>
            </div>
          </div>

          <Link
            href={`/category/${effectiveCategorySlug}`}
            className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shrink-0 shadow-sm transition-colors z-10 self-start md:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All {effectiveCategoryName}</span>
          </Link>
        </div>

        {/* Sibling Subcategories Navigation Pills */}
        {category?.subcategories && category.subcategories.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-neutral-800">
            <span className="text-xs font-mono text-neutral-400 mr-2 hidden sm:inline">Lines:</span>
            {category.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/category/${category.slug}/${sub.slug}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  sub.slug === subcategorySlug
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-600'
                }`}
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}

        {/* Filter and Sort Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SHOWING {sortedProducts.length} CREATIONS</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded-full px-3 py-1.5 focus:outline-none focus:border-white transition-colors"
            >
              <option value="newest">Featured & Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div>
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16 rounded-3xl bg-neutral-900 p-8 border border-neutral-800">
              <p className="text-neutral-400 text-sm mb-4">
                New bespoke releases in this line will arrive shortly.
              </p>
              <Link
                href="/shop"
                className="bg-white hover:bg-neutral-200 text-black px-6 py-2.5 rounded-full text-xs font-bold inline-block shadow-md transition-all"
              >
                Explore All Categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
