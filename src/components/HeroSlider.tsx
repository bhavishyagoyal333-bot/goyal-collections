'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface Slide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image: string;
}

const SLIDES: Slide[] = [
  {
    id: 'slide-1',
    badge: 'COLLECTION 2026 // DROP 01',
    title: 'THE MONOCHROME COUTURE ARCHIVE',
    subtitle: 'High contrast minimalism in deep obsidian and optic white. Mastercrafted footwear and tailored garments for the modern icon.',
    ctaText: 'EXPLORE DESIGNS',
    ctaLink: '/shop',
    secondaryCtaText: 'VIEW LOOKBOOK',
    secondaryCtaLink: '/about',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'slide-2',
    badge: 'FOOTWEAR ATELIER // LUXURY LEATHER',
    title: 'ARCHITECTURAL LEATHER FOOTWEAR',
    subtitle: 'Goodyear-welted Chelsea boots, double monk straps, sculptural heels, and contoured full-grain leather slides.',
    ctaText: 'SHOP FOOTWEAR',
    ctaLink: '/category/footwear',
    secondaryCtaText: 'SNEAKERS',
    secondaryCtaLink: '/category/footwear/shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'slide-3',
    badge: 'READY-MADE ATELIER // TIMELESS APPAREL',
    title: 'PURE SUPIMA & VIRGIN WOOL TAILORING',
    subtitle: 'Oversized blazers, bonded trench coats, 320 GSM heavyweight Supima cotton t-shirts, and pure silk slip dresses.',
    ctaText: 'SHOP READY-MADE',
    ctaLink: '/category/ready-made-clothes',
    secondaryCtaText: "MEN'S WEAR",
    secondaryCtaLink: '/category/ready-made-clothes/mens-wear',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'slide-4',
    badge: 'JUNIOR ATELIER // BOYS & GIRLS',
    title: 'THE JUNIOR ATELIER',
    subtitle: 'Hypoallergenic organic waffle knit coordinates, bespoke occasion dresses, and shock-absorbing lightweight footwear.',
    ctaText: 'EXPLORE KIDS',
    ctaLink: '/category/ready-made-clothes/kids-wear',
    secondaryCtaText: "KIDS' FOOTWEAR",
    secondaryCtaLink: '/category/footwear/kids-footwear',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'slide-5',
    badge: 'SEASONAL PRIVILEGE // PRIVÉ DROP',
    title: 'ICONIC SILHOUETTES AT PREFERENTIAL RATES',
    
    subtitle: 'Limited edition runway archives and timeless essentials. Enjoy up to 40% privilege savings with complimentary doorstep delivery.',
    ctaText: 'CLAIM PRIVILEGE',
    ctaLink: '/shop?specialOffer=true',
    secondaryCtaText: 'BEST SELLERS',
    secondaryCtaLink: '/shop?sort=popular',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>(SLIDES);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/banners')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.slides) && data.slides.length > 0) {
          setSlides(data.slides);
        }
      })
      .catch(() => {});
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-5">
      {/* Centered and Properly Contained Banner Slider Container with Touch Swipe */}
      <div
        className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl h-[370px] sm:h-[480px] lg:h-[540px] select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Perfectly contained background image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-85"
                />
                {/* Refined gradient overlay for 100% text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
              </div>

              {/* Slide Content Box */}
              <div className="relative z-20 max-w-7xl mx-auto h-full px-5 sm:px-10 lg:px-14 flex flex-col justify-center">
                <div className="max-w-xl sm:max-w-2xl space-y-3 sm:space-y-4">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/15 backdrop-blur-md text-[9px] sm:text-[11px] font-mono tracking-widest text-white uppercase border border-white/20">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Main Headline */}
                  <div>
                    <h1 className="font-serif text-xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                      {slide.title}
                    </h1>
                  </div>

                  {/* Subtitle */}
                  <p className="text-[11px] sm:text-sm text-neutral-300 leading-relaxed font-light max-w-lg line-clamp-2 sm:line-clamp-none">
                    {slide.subtitle}
                  </p>

                  {/* Action Buttons: Solid White Primary with Black Text */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                    <Link
                      href={slide.ctaLink}
                      className="bg-white text-black hover:bg-neutral-200 px-4 sm:px-7 py-2 sm:py-3.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 shadow-lg group transition-all"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    {slide.secondaryCtaText && (
                      <Link
                        href={slide.secondaryCtaLink || '/shop'}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-3.5 sm:px-6 py-2 sm:py-3.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all shadow-sm"
                      >
                        {slide.secondaryCtaText}
                      </Link>
                    )}
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Manual Navigation Arrows (Bottom Right) */}
        <div className="absolute bottom-4 sm:bottom-6 right-3 sm:right-8 z-30 flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={prevSlide}
            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all shadow-md border border-white/20 backdrop-blur-md"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all shadow-md border border-white/20 backdrop-blur-md"
            aria-label="Next slide"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Pagination Indicators (Bottom Left) */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-10 z-30 flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1 sm:h-1.5 transition-all duration-300 rounded-full ${
                idx === current ? 'w-5 sm:w-8 bg-white' : 'w-1.5 sm:w-2.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
