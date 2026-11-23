'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/types';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [isHovered, setIsHovered] = useState(false);
  const [quickSizeOpen, setQuickSizeOpen] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const defaultFallback = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop';
  const primaryImg = product.images?.[0] || defaultFallback;
  const secondaryImg = product.images?.[1] || primaryImg;

  const [imgError, setImgError] = useState(false);

  const handleQuickAdd = (size: string) => {
    addToCart(product, size, product.colors?.[0] || { name: 'Monochrome', hex: '#000000' }, 1);
    setQuickSizeOpen(false);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div
      className="group relative flex flex-col bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-white transition-all duration-300 shadow-sm hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setQuickSizeOpen(false);
      }}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg sm:rounded-xl bg-neutral-950 mb-2">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={imgError ? defaultFallback : (isHovered ? secondaryImg : primaryImg)}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105 filter contrast-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-wider text-black bg-white font-bold uppercase rounded-md shadow-sm">
              BESTSELLER
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-wider text-white bg-neutral-800 font-semibold uppercase rounded-md border border-neutral-700 shadow-sm">
              NEW
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-300 bg-neutral-800/90 font-semibold rounded-md border border-neutral-700">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
            isFavorited
              ? 'bg-white text-black scale-105 shadow-md'
              : 'bg-neutral-950/80 text-white hover:text-white hover:bg-neutral-800 border border-neutral-700 shadow-sm'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-black text-black' : 'text-white'}`} />
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-2 bottom-2 z-10 hidden sm:block">
          {quickSizeOpen ? (
            <div className="bg-neutral-950/95 backdrop-blur-md border border-neutral-700 rounded-xl p-2 shadow-xl animate-fade-in text-white">
              <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5 text-center">
                Select Size
              </div>
              <div className="grid grid-cols-4 gap-1">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleQuickAdd(size)}
                    className="py-1 text-[11px] font-mono font-medium rounded border border-neutral-700 hover:bg-white hover:text-black transition-colors text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setQuickSizeOpen(true)}
              className="w-full py-2 px-3 rounded-lg bg-white text-black hover:bg-neutral-200 font-semibold text-[11px] tracking-wider uppercase transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 shadow-md"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-black" />
              <span>{addedSuccess ? 'Added to Bag' : '+ Quick Add'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between pt-1">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
            <span className="truncate max-w-[120px] uppercase tracking-wider font-mono text-[10px]">
              {product.subcategoryTitle}
            </span>
            <div className="flex items-center gap-1 text-white">
              <Star className="w-3 h-3 fill-white text-white" />
              <span className="text-[11px] font-semibold">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link
            href={`/product/${product.slug}`}
            className="font-medium text-xs sm:text-sm text-white hover:text-neutral-300 transition-colors line-clamp-1 mb-1 block"
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Free Delivery */}
        <div className="pt-2 border-t border-neutral-800 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-mono text-sm sm:text-base font-bold text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="font-mono text-[11px] text-neutral-500 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <span className="text-[9px] font-mono text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">
            Free Delivery
          </span>
        </div>

        {/* Mobile Quick Add to Cart Button (Only on Mobile) */}
        <div className="mt-2 block sm:hidden">
          {quickSizeOpen ? (
            <div className="bg-neutral-950 border border-neutral-700 rounded-xl p-2 shadow-xl animate-fade-in text-white">
              <div className="text-[8px] font-mono uppercase tracking-wider text-neutral-400 mb-1 text-center">
                Select Size
              </div>
              <div className="grid grid-cols-4 gap-1">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuickAdd(size);
                    }}
                    className="py-1 text-[10px] font-mono font-bold rounded border border-neutral-700 hover:bg-white hover:text-black transition-colors text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                setQuickSizeOpen(true);
              }}
              className="w-full py-1.5 px-2 rounded-lg bg-white text-black active:bg-neutral-200 font-bold text-[10px] tracking-wider uppercase flex items-center justify-center gap-1 shadow-sm"
            >
              <ShoppingBag className="w-3 h-3 text-black" />
              <span>{addedSuccess ? 'Added' : 'Add to Bag'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
