'use client';

import React, { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES, INITIAL_PRODUCTS } from '@/lib/initialData';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, Filter } from 'lucide-react';

export default function DynamicCategoryPage({
  params: routeParams,
}: {
  params?: { categorySlug?: string };
}) {
  const router = useRouter();
  const urlParams = useParams();
  const categorySlug = (routeParams?.categorySlug || (urlParams?.categorySlug as string) || '').toLowerCase();

  // Redirect if it matches a primary category or a direct subcategory slug
  useEffect(() => {
    if (categorySlug === 'footwear') {
      router.replace('/category/footwear');
    } else if (categorySlug === 'ready-made-clothes') {
      router.replace('/category/ready-made-clothes');
    } else {
      // Check if this slug is actually a subcategory
      for (const cat of CATEGORIES) {
        const sub = cat.subcategories.find((s) => s.slug === categorySlug);
        if (sub) {
          router.replace(`/category/${cat.slug}/${sub.slug}`);
          return;
        }
      }
    }
  }, [categorySlug, router]);

  const category = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === categorySlug || c.id === categorySlug);
  }, [categorySlug]);

  const products = useMemo(() => {
    return INITIAL_PRODUCTS.filter((p) => p.category === categorySlug);
  }, [categorySlug]);

  const categoryName = category?.name || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="bg-black text-white min-h-screen pb-24 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-white font-semibold">{categoryName}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-10 shadow-xl">
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-2">
            {categoryName}
          </h1>
          <p className="text-sm text-neutral-300 max-w-2xl">
            {category?.description || 'Explore our bespoke luxury silhouettes.'}
          </p>
        </div>

        {category?.subcategories && category.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/category/${category.slug}/${sub.slug}`}
                className="px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-white hover:bg-white hover:text-black transition-all"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
