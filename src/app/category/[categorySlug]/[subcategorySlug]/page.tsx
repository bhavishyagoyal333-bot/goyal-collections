import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/db';
import { CATEGORIES } from '@/lib/initialData';

export const revalidate = 0;

export default function SubcategoryPage({
  params,
}: {
  params: { categorySlug: string; subcategorySlug: string };
}) {
  const { categorySlug, subcategorySlug } = params;

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return notFound();

  const subcategory = category.subcategories.find((s) => s.slug === subcategorySlug);
  if (!subcategory) return notFound();

  const { products } = getProducts({
    category: categorySlug,
    subcategory: subcategorySlug,
  });

  return (
    <div className="bg-black text-white min-h-screen pb-24 w-full max-w-full overflow-x-hidden">
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          <Link href={`/category/${category.slug}`} className="hover:text-white transition-colors">
            {category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-white font-semibold">{subcategory.name}</span>
        </nav>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 w-full">
        
        {/* Subcategory Banner Card */}
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-5 sm:gap-6 z-10">
            {subcategory.image && (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-neutral-700 bg-neutral-950 shadow-md">
                <img
                  src={subcategory.image}
                  alt={subcategory.name}
                  className="w-full h-full object-cover filter contrast-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600';
                  }}
                />
              </div>
            )}
            <div className="space-y-1 sm:space-y-2 max-w-xl">
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-bold block">
                {category.name.toUpperCase()} // CURATED SILHOUETTE
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-white">
                {subcategory.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {subcategory.description}
              </p>
            </div>
          </div>

          <Link
            href={`/category/${category.slug}`}
            className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shrink-0 shadow-sm transition-colors z-10 self-start md:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All {category.name}</span>
          </Link>
        </div>

        {/* Sibling Subcategories Navigation Pills */}
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

        {/* Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <span>SHOWING {products.length} CREATIONS</span>
            <span>{category.name.toUpperCase()}</span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16 rounded-3xl bg-neutral-900 p-8 border border-neutral-800">
              <p className="text-neutral-400 text-sm mb-4">
                New bespoke releases in this line will arrive shortly.
              </p>
              <Link href="/shop" className="bg-white hover:bg-neutral-200 text-black px-6 py-2.5 rounded-full text-xs font-bold inline-block shadow-md transition-all">
                Explore All Categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
