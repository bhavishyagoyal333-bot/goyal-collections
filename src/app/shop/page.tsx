'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, X, Check, ChevronDown, Sparkles, RotateCcw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

// Helper to determine gender group
function matchTargetGroup(product: Product, selectedGenders: string[]): boolean {
  if (selectedGenders.length === 0) return true;

  const sub = (product.subcategory || '').toLowerCase();
  const name = (product.name || '').toLowerCase();

  const isKids =
    sub.includes('kids') ||
    sub.includes('boy') ||
    sub.includes('girl') ||
    name.includes('junior') ||
    name.includes('kids') ||
    name.includes("boy") ||
    name.includes("girl");

  const isWomen =
    !isKids &&
    (sub === 'womens-footwear' ||
      sub === 'womens-wear' ||
      name.includes('stiletto') ||
      name.includes('mule') ||
      name.includes('dress') ||
      name.includes('kurti') ||
      name.includes('anarkali') ||
      name.includes('palazzo') ||
      name.includes('heel') ||
      name.includes('flat') ||
      name.includes('women'));

  const isMen =
    !isKids &&
    (sub === 'mens-footwear' ||
      sub === 'mens-wear' ||
      sub === 'shoes' ||
      sub === 'sandals-slippers' ||
      name.includes('chelsea') ||
      name.includes('monk') ||
      name.includes('oxford') ||
      name.includes('brogue') ||
      name.includes('loafer') ||
      name.includes('derby') ||
      name.includes('blazer') ||
      name.includes('kurta') ||
      name.includes('chino') ||
      name.includes('tee') ||
      name.includes('men'));

  return selectedGenders.some((g) => {
    if (g === 'kids') return isKids;
    if (g === 'women') return isWomen;
    if (g === 'men') return isMen;
    return true;
  });
}

function ShopContent() {
  const searchParams = useSearchParams();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedSort, setSelectedSort] = useState<string>(searchParams.get('sort') || 'newest');
  const [priceRange, setPriceRange] = useState<string>('all'); // 'all' | 'under-3000' | '3000-6000' | 'above-6000'

  // Dropdown / Popover toggle
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch all active products
  const fetchProducts = React.useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      let url = `/api/products?sort=${selectedSort}`;
      if (selectedCategory !== 'all') url += `&category=${selectedCategory}`;
      if (searchParams.get('specialOffer') === 'true') url += `&specialOffer=true`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setAllProducts(data.products || []);
      }
    } catch (e) {
      console.error('Failed to load shop products:', e);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [selectedCategory, selectedSort, searchParams]);

  useEffect(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  // Real-time synchronization: update products without page reload
  useEffect(() => {
    const handleRealtimeUpdate = () => {
      fetchProducts(false);
    };
    window.addEventListener('goyal:product-update', handleRealtimeUpdate);
    return () => window.removeEventListener('goyal:product-update', handleRealtimeUpdate);
  }, [fetchProducts]);

  // Handle department toggles (Men, Women, Kids, All)
  const toggleGender = (gender: string) => {
    if (gender === 'all') {
      setSelectedGenders([]);
      return;
    }

    setSelectedGenders((prev) => {
      if (prev.includes(gender)) {
        return prev.filter((g) => g !== gender);
      } else {
        return [...prev, gender];
      }
    });
  };

  // Clear all active filters
  const clearAllFilters = () => {
    setSelectedGenders([]);
    setSelectedCategory('all');
    setPriceRange('all');
    setSelectedSort('newest');
  };

  // Filter products by selected department and price range
  const filteredProducts = allProducts.filter((product) => {
    // 1. Gender filter
    if (selectedGenders.length > 0 && !matchTargetGroup(product, selectedGenders)) {
      return false;
    }

    // 2. Price filter
    if (priceRange === 'under-1000' && product.price >= 1000) return false;
    if (priceRange === '1000-1500' && (product.price < 1000 || product.price > 1500)) return false;
    if (priceRange === 'above-1500' && product.price <= 1500) return false;
    // Legacy ranges compatibility
    if (priceRange === 'under-3000' && product.price >= 3000) return false;
    if (priceRange === '3000-6000' && (product.price < 3000 || product.price > 6000)) return false;
    if (priceRange === 'above-6000' && product.price <= 6000) return false;

    return true;
  });

  const activeFiltersCount =
    selectedGenders.length +
    (selectedCategory !== 'all' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0);

  return (
    <div className="bg-black text-white min-h-screen pb-24 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* ========================================================================= */}
        {/* 1. COMPACT PAGE HEADER                                                    */}
        {/* ========================================================================= */}
        <div className="mb-6 pb-4 border-b border-neutral-800/80 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-1">
              <Sparkles className="w-3 h-3 text-white" />
              <span>GOYAL COLLECTIONS ARCHIVE</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              SHOP ALL PRODUCTS
            </h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-xl">
              Curated monochrome luxury across Footwear and Ready-made Clothes.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400">
            SHOWING <span className="font-bold text-white">{filteredProducts.length}</span> CURATED PIECES
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. COMPACT TOOLBAR: FILTER BUTTON + QUICK PILLS + SORT                   */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative">
          
          {/* Left: Filter Trigger Button + Quick Pills */}
          <div className="flex items-center gap-2 flex-wrap" ref={dropdownRef}>
            
            {/* Professional Compact Filter Button with Icon */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all border ${
                  activeFiltersCount > 0 || isFilterDropdownOpen
                    ? 'bg-white text-black border-white shadow-md'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
                }`}
                aria-expanded={isFilterDropdownOpen}
                aria-label="Toggle Filter Options"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] font-mono flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isFilterDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Compact Filter Popup / Dropdown */}
              {isFilterDropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 max-w-[90vw] rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl p-4 z-50 text-white animate-fade-in space-y-4">
                  
                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800">
                    <span className="text-xs font-serif font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-white" />
                      <span>Filter Products</span>
                    </span>
                    {activeFiltersCount > 0 && (
                      <button
                        type="button"
                        onClick={clearAllFilters}
                        className="text-[11px] text-neutral-400 hover:text-white underline font-mono"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>

                  {/* 1. Target Department: Men, Women, Kids, All Products */}
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 block mb-2">
                      Department
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {/* All Products */}
                      <button
                        type="button"
                        onClick={() => toggleGender('all')}
                        className={`px-2.5 py-1.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          selectedGenders.length === 0
                            ? 'bg-white text-black font-bold border-white'
                            : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <span>All Products</span>
                        {selectedGenders.length === 0 && <Check className="w-3 h-3 text-black" />}
                      </button>

                      {/* Men */}
                      <button
                        type="button"
                        onClick={() => toggleGender('men')}
                        className={`px-2.5 py-1.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          selectedGenders.includes('men')
                            ? 'bg-white text-black font-bold border-white'
                            : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <span>Men</span>
                        {selectedGenders.includes('men') && <Check className="w-3 h-3 text-black" />}
                      </button>

                      {/* Women */}
                      <button
                        type="button"
                        onClick={() => toggleGender('women')}
                        className={`px-2.5 py-1.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          selectedGenders.includes('women')
                            ? 'bg-white text-black font-bold border-white'
                            : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <span>Women</span>
                        {selectedGenders.includes('women') && <Check className="w-3 h-3 text-black" />}
                      </button>

                      {/* Kids */}
                      <button
                        type="button"
                        onClick={() => toggleGender('kids')}
                        className={`px-2.5 py-1.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          selectedGenders.includes('kids')
                            ? 'bg-white text-black font-bold border-white'
                            : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <span>Kids</span>
                        {selectedGenders.includes('kids') && <Check className="w-3 h-3 text-black" />}
                      </button>
                    </div>
                  </div>

                  {/* 2. Main Category */}
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 block mb-2">
                      Category
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 text-xs">
                      {[
                        { id: 'all', label: 'All' },
                        { id: 'footwear', label: 'Footwear' },
                        { id: 'ready-made-clothes', label: 'Apparel' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-2 py-1.5 rounded-xl border text-center transition-all ${
                            selectedCategory === cat.id
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Price Filter */}
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 block mb-2">
                      Price Range
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {[
                        { id: 'all', label: 'Any Price' },
                        { id: 'under-1000', label: 'Under ₹1,000' },
                        { id: '1000-1500', label: '₹1,000 – ₹1,500' },
                        { id: 'above-1500', label: 'Above ₹1,500' },
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPriceRange(p.id)}
                          className={`px-2 py-1.5 rounded-xl border text-center transition-all ${
                            priceRange === p.id
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dropdown Action Buttons */}
                  <div className="pt-2 border-t border-neutral-800 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="flex-1 py-2 rounded-full border border-neutral-700 text-neutral-300 hover:bg-neutral-900 text-xs font-semibold transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFilterDropdownOpen(false)}
                      className="flex-1 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                    >
                      Apply ({filteredProducts.length})
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* Quick Filter Department Pills (Instant Live Filters) */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
              <button
                type="button"
                onClick={() => toggleGender('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedGenders.length === 0
                    ? 'bg-neutral-800 text-white font-bold border border-white'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                All Products
              </button>

              <button
                type="button"
                onClick={() => toggleGender('men')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedGenders.includes('men')
                    ? 'bg-neutral-800 text-white font-bold border border-white'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                Men
              </button>

              <button
                type="button"
                onClick={() => toggleGender('women')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedGenders.includes('women')
                    ? 'bg-neutral-800 text-white font-bold border border-white'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                Women
              </button>

              <button
                type="button"
                onClick={() => toggleGender('kids')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedGenders.includes('kids')
                    ? 'bg-neutral-800 text-white font-bold border border-white'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                Kids
              </button>
            </div>

          </div>

          {/* Right: Sort By Selection */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">SORT BY:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 text-white rounded-full px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-white shadow-sm cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. ACTIVE FILTERS PILLS (With Clean Removal)                              */}
        {/* ========================================================================= */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-6 text-xs animate-fade-in">
            <span className="text-neutral-400 font-mono text-[11px]">Filtered By:</span>

            {selectedGenders.map((g) => (
              <span
                key={g}
                className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white border border-neutral-700 flex items-center gap-1.5 font-medium text-xs capitalize"
              >
                <span>{g}</span>
                <X
                  className="w-3 h-3 cursor-pointer text-neutral-400 hover:text-white"
                  onClick={() => toggleGender(g)}
                />
              </span>
            ))}

            {selectedCategory !== 'all' && (
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white border border-neutral-700 flex items-center gap-1.5 font-medium text-xs">
                <span>Category: {selectedCategory === 'footwear' ? 'Footwear' : 'Ready-made'}</span>
                <X
                  className="w-3 h-3 cursor-pointer text-neutral-400 hover:text-white"
                  onClick={() => setSelectedCategory('all')}
                />
              </span>
            )}

            {priceRange !== 'all' && (
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white border border-neutral-700 flex items-center gap-1.5 font-medium text-xs">
                <span>
                  {priceRange === 'under-1000' && 'Under ₹1,000'}
                  {priceRange === '1000-1500' && '₹1,000 – ₹1,500'}
                  {priceRange === 'above-1500' && 'Above ₹1,500'}
                  {priceRange === 'under-3000' && 'Under ₹3,000'}
                  {priceRange === '3000-6000' && '₹3,000 – ₹6,000'}
                  {priceRange === 'above-6000' && 'Above ₹6,000'}
                </span>
                <X
                  className="w-3 h-3 cursor-pointer text-neutral-400 hover:text-white"
                  onClick={() => setPriceRange('all')}
                />
              </span>
            )}

            <button
              type="button"
              onClick={clearAllFilters}
              className="text-neutral-400 hover:text-white underline text-xs ml-2 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Filters</span>
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. COMPACT BALANCED PRODUCT GRID                                         */}
        {/* ========================================================================= */}
        <main>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-2xl p-3 h-72 bg-neutral-900 border border-neutral-800" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 sm:py-20 rounded-3xl bg-neutral-900/60 p-8 border border-neutral-800 max-w-lg mx-auto">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2">
                No Matching Products Found
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                We couldn&apos;t find pieces matching all selected filters. Try loosening your department or price criteria.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="bg-white hover:bg-neutral-200 text-black px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            /* Responsive, compact 4-column desktop / 2-column mobile grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-neutral-400 text-xs bg-black">
          Loading archive...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
