import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Flame, Tag, Trophy, HeartHandshake, Baby } from 'lucide-react';
import HeroSlider from '@/components/HeroSlider';
import CircularCategoryNav from '@/components/CircularCategoryNav';
import ProductCard from '@/components/ProductCard';
import RecentlyViewedSection from '@/components/RecentlyViewedSection';
import MobileCategoryVideoCarousel from '@/components/MobileCategoryVideoCarousel';
import MobilePromoBanner from '@/components/MobilePromoBanner';
import { getProducts } from '@/lib/db';

export const revalidate = 0;

export default function HomePage() {
  const trendingResult = getProducts({ trending: true, limit: 4 });
  const newArrivalsResult = getProducts({ newArrival: true, limit: 4 });
  const bestSellersResult = getProducts({ bestSeller: true, limit: 4 });
  const specialOffersResult = getProducts({ specialOffer: true, limit: 4 });
  const recommendedResult = getProducts({ limit: 4 });

  // Curated Junior collection for mobile section
  const allProductsResult = getProducts({ limit: 50 });
  const kidsProducts = allProductsResult.products
    .filter(
      (p) =>
        p.subcategory === 'kids-wear' ||
        p.subcategory === 'kids-footwear' ||
        p.subcategory === 'boys-wear' ||
        p.subcategory === 'girls-wear'
    )
    .slice(0, 4);

  return (
    <div className="bg-black text-white w-full max-w-full overflow-x-hidden">
      
      {/* ================================================================= */}
      {/* 1. MOBILE HOMEPAGE (EXCLUSIVE TO MOBILE SCREENS: block md:hidden) */}
      {/* ================================================================= */}
      <div className="block md:hidden px-4 space-y-7 pt-2 pb-20">

        {/* 1.0 Mobile Top Hero Slider Banner */}
        <section aria-label="Hero Banner" className="-mx-4 sm:mx-0">
          <HeroSlider />
        </section>

        {/* 1.1 SINGLE Continuous Horizontal Looping Video Carousel */}
        <section aria-label="Fashion Category Video Carousel" className="-mx-4 px-4 overflow-hidden">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
              FEATURED CATEGORIES
            </span>
            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
              TAP TO SHOP
            </span>
          </div>
          <MobileCategoryVideoCarousel />
        </section>

        {/* 1.2 Trending Products Section (2-Column Mobile Grid) */}
        <section aria-label="Trending Products" className="pt-1">
          <div className="flex items-center justify-between pb-2 mb-3.5 border-b border-neutral-800">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                <Flame className="w-3 h-3 text-black fill-black" />
              </div>
              <h3 className="font-serif text-base font-bold text-white tracking-tight">
                TRENDING NOW
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-[11px] font-mono text-neutral-400 hover:text-white uppercase tracking-wider flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {trendingResult.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 1.3 New Arrivals Section (2-Column Mobile Grid) */}
        <section aria-label="New Arrivals">
          <div className="flex items-center justify-between pb-2 mb-3.5 border-b border-neutral-800">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-black" />
              </div>
              <h3 className="font-serif text-base font-bold text-white tracking-tight">
                NEW ARRIVALS
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-[11px] font-mono text-neutral-400 hover:text-white uppercase tracking-wider flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {newArrivalsResult.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 1.5 Men's Collection Promotional Banner */}
        <section aria-label="Men's Collection Banner">
          <MobilePromoBanner
            badge="MEN'S ATELIER"
            tagline="SARTORIAL RESTRAINT"
            title="THE MEN'S EDIT"
            subtitle="Sculpted blazers, heavy Supima cottons & handcrafted oxfords designed for understated power."
            ctaText="EXPLORE MEN'S COLLECTION"
            href="/category/ready-made-clothes/mens-wear"
            imageUrl="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
          />
        </section>

        {/* 1.6 Women's Collection Promotional Banner */}
        <section aria-label="Women's Collection Banner">
          <MobilePromoBanner
            badge="WOMEN'S ATELIER"
            tagline="ARCHITECTURAL FORM"
            title="THE WOMEN'S ATELIER"
            subtitle="Minimalist trench coats, silk slip silhouettes & sculptural stiletto mules crafted for poise."
            ctaText="EXPLORE WOMEN'S COLLECTION"
            href="/category/ready-made-clothes/womens-wear"
            imageUrl="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
          />
        </section>

        {/* 1.7 Best Sellers Section (2-Column Mobile Grid) */}
        <section aria-label="Best Sellers">
          <div className="flex items-center justify-between pb-2 mb-3.5 border-b border-neutral-800">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                <Trophy className="w-3 h-3 text-black" />
              </div>
              <h3 className="font-serif text-base font-bold text-white tracking-tight">
                BEST SELLERS
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-[11px] font-mono text-neutral-400 hover:text-white uppercase tracking-wider flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {bestSellersResult.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 1.8 Kids' Collection Banner & Curated Grid */}
        <section aria-label="Kids' Collection">
          <MobilePromoBanner
            badge="THE JUNIOR ATELIER"
            tagline="HYPOALLERGENIC & ERGONOMIC"
            title="JUNIOR ESSENTIALS"
            subtitle="Organic cotton coordinates, varsity jackets & lightweight ergonomic footwear for boys and girls."
            ctaText="EXPLORE JUNIOR COLLECTION"
            href="/category/ready-made-clothes/kids-wear"
            imageUrl="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop"
          />

          <div className="mt-4">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-800">
              <div className="flex items-center gap-1.5">
                <Baby className="w-3.5 h-3.5 text-neutral-400" />
                <h4 className="font-serif text-sm font-bold text-neutral-300">
                  Curated For Young Explorers
                </h4>
              </div>
              <Link
                href="/category/ready-made-clothes/kids-wear"
                className="text-[10px] font-mono text-neutral-400 hover:text-white uppercase"
              >
                All Junior &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {kidsProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* 1.9 Recommended Products Section (2-Column Mobile Grid) */}
        <section aria-label="Recommended Products">
          <div className="flex items-center justify-between pb-2 mb-3.5 border-b border-neutral-800">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                <HeartHandshake className="w-3 h-3 text-black" />
              </div>
              <h3 className="font-serif text-base font-bold text-white tracking-tight">
                RECOMMENDED FOR YOU
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-[11px] font-mono text-neutral-400 hover:text-white uppercase tracking-wider flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {recommendedResult.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 1.10 Recently Viewed Products on Mobile */}
        <RecentlyViewedSection />

      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP HOMEPAGE (100% UNCHANGED AND PRESERVED: hidden md:block)       */}
      {/* ========================================================================= */}
      <div className="hidden md:block space-y-12 sm:space-y-16 pb-24">
        
        {/* 2.1 Hero Slider (Contained, Perfectly Aligned) */}
        <HeroSlider />

        {/* 2.2 Category Navigation (Ateliers + 10 Silhouettes Ribbon) */}
        <CircularCategoryNav />

        {/* 2.3 Trending Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8 pb-3 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-1">
                <Flame className="w-3.5 h-3.5 text-white" />
                <span>In High Demand</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                TRENDING COUTURE
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-wider text-white hover:text-neutral-300 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>View All Trending</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {trendingResult.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 2.4 Luxury Brand Statement Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 p-8 sm:p-14 text-center shadow-2xl">
            <div className="max-w-2xl mx-auto relative z-10 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-400 font-bold block">
                CRAFTED FOR DISTINCTION
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                &ldquo;LUXURY IS NOT AN EXCESS, BUT THE PURSUIT OF ABSOLUTE FORM.&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-xl mx-auto">
                Every GOYAL COLLECTIONS creation represents an unyielding devotion to structural elegance. Handcrafted calfskin footwear and pure Supima ready-made apparel.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Link
                  href="/about"
                  className="bg-white text-black hover:bg-neutral-200 px-6 sm:px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                >
                  The Brand Manifesto
                </Link>
                <Link
                  href="/category/footwear"
                  className="bg-neutral-800 text-white border border-neutral-700 hover:border-white px-6 sm:px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Footwear Collection
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2.5 New Arrivals Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8 pb-3 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Just Dispatched From Atelier</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-wider text-white hover:text-neutral-300 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {newArrivalsResult.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 2.6 Special Offers and Discount Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 text-white border border-neutral-700 text-xs font-mono font-semibold">
                <Tag className="w-3.5 h-3.5 text-white" />
                <span>SEASONAL PRIVILEGE PRIVÉ</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                UP TO 40% OFF SIGNATURE STYLES
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-lg">
                Explore limited edition releases at preferential rates. Apply coupon code <strong className="text-white underline">GOYAL10</strong> for additional 10% privilege savings at checkout.
              </p>
            </div>
            <Link
              href="/shop?specialOffer=true"
              className="bg-white text-black hover:bg-neutral-200 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 shadow-md transition-all"
            >
              SHOP PRIVILEGE OFFERS
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {specialOffersResult.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 2.7 Best Sellers Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8 pb-3 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-1">
                <Trophy className="w-3.5 h-3.5 text-white" />
                <span>Iconic Milestones</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                BEST SELLERS
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-wider text-white hover:text-neutral-300 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>View All Bestsellers</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {bestSellersResult.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 2.8 Recommended For You */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8 pb-3 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-1">
                <HeartHandshake className="w-3.5 h-3.5 text-white" />
                <span>Tailored To Your Aesthetic</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                RECOMMENDED FOR YOU
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-wider text-white hover:text-neutral-300 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {recommendedResult.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 2.9 Recently Viewed Section */}
        <RecentlyViewedSection />

      </div>

    </div>
  );
}
