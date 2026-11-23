'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

interface CategoryVideo {
  id: string;
  name: string;
  subtitle: string;
  href: string;
  videoSrc: string;
  posterSrc: string;
}

const CATEGORY_VIDEOS: CategoryVideo[] = [
  {
    id: 'mens-fashion',
    name: "Men's Fashion",
    subtitle: 'Atelier Tailoring',
    href: '/category/ready-made-clothes/mens-wear',
    videoSrc: '/videos/cat-mens-fashion.mp4',
    posterSrc: '/videos/poster-mens-fashion.jpg',
  },
  {
    id: 'womens-fashion',
    name: "Women's Fashion",
    subtitle: 'Haute Couture',
    href: '/category/ready-made-clothes/womens-wear',
    videoSrc: '/videos/cat-womens-fashion.mp4',
    posterSrc: '/videos/poster-womens-fashion.jpg',
  },
  {
    id: 'footwear-collection',
    name: 'Footwear Atelier',
    subtitle: 'Luxury Leather',
    href: '/category/footwear',
    videoSrc: '/videos/footwear-collection.mp4',
    posterSrc: '/videos/poster-footwear.jpg',
  },
  {
    id: 'mens-footwear',
    name: "Men's Footwear",
    subtitle: 'Bespoke Shoes',
    href: '/category/footwear/mens-footwear',
    videoSrc: '/videos/cat-mens-footwear.mp4',
    posterSrc: '/videos/poster-mens-footwear.jpg',
  },
  {
    id: 'womens-footwear',
    name: "Women's Footwear",
    subtitle: 'Architectural Mules',
    href: '/category/footwear/womens-footwear',
    videoSrc: '/videos/cat-womens-footwear.mp4',
    posterSrc: '/videos/poster-womens-footwear.jpg',
  },
  {
    id: 'kids-fashion',
    name: "Kids' Fashion",
    subtitle: 'Junior Atelier',
    href: '/category/ready-made-clothes/kids-wear',
    videoSrc: '/videos/cat-kids-fashion.mp4',
    posterSrc: '/videos/poster-kids-fashion.jpg',
  },
  {
    id: 'clothing-collection',
    name: 'Ready-Made Edit',
    subtitle: 'Supima Tailoring',
    href: '/category/ready-made-clothes',
    videoSrc: '/videos/clothing-collection.mp4',
    posterSrc: '/videos/poster-clothing.jpg',
  },
];

export default function MobileCategoryVideoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Seamless duplication for infinite marquee flow
  const duplicatedItems = [...CATEGORY_VIDEOS, ...CATEGORY_VIDEOS];

  useEffect(() => {
    if (containerRef.current) {
      const videos = containerRef.current.querySelectorAll('video');
      videos.forEach((video) => {
        video.muted = true;
        video.playsInline = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      });
    }
  }, []);

  return (
    <div className="w-full relative py-2 overflow-hidden select-none" ref={containerRef}>
      {/* Track that smoothly glides infinitely from right to left */}
      <div className="animate-infinite-video-scroll flex gap-3 sm:gap-4 -ml-2">
        {duplicatedItems.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            href={item.href}
            className="group relative flex flex-col shrink-0 w-[148px] sm:w-[165px] transition-transform active:scale-95"
          >
            {/* Video Container with Glassic Border */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/80 group-hover:border-white shadow-xl transition-all">
              <video
                src={item.videoSrc}
                poster={item.posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onLoadedData={(e) => {
                  const target = e.target as HTMLVideoElement;
                  target.muted = true;
                  target.play().catch(() => {});
                }}
              />

              {/* Luxury Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />

              {/* Top Live Badge */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[8px] font-mono tracking-widest uppercase text-white/90">LOOK</span>
              </div>

              {/* Clean Category Label at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-3 text-center z-10">
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 block uppercase mb-0.5">
                  {item.subtitle}
                </span>
                <span className="font-serif text-xs font-bold text-white tracking-wide block uppercase drop-shadow-md">
                  {item.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

