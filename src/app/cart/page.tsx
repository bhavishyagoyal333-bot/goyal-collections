'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    appliedCoupon,
    couponDiscount,
    deliveryCharge,
    freeShippingThreshold,
    finalTotal,
    applyCouponCode,
    removeCouponCode,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const freeShippingDiff = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setLoadingCoupon(true);
    setCouponError('');
    setCouponSuccess('');

    const res = await applyCouponCode(couponInput.trim());
    setLoadingCoupon(false);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-black text-white min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border border-neutral-800 flex items-center justify-center mx-auto mb-5 text-neutral-400 bg-neutral-900">
          <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-2">
          YOUR BAG IS EMPTY
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto mb-8">
          Explore our signature footwear and ready-made collections crafted for the modern luxury connoisseur.
        </p>
        <Link
          href="/shop"
          className="bg-white text-black hover:bg-neutral-200 px-8 py-3.5 rounded-full text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2 shadow-lg transition-all"
        >
          <span>Explore The Drop</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pb-24 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-bold block mb-1">
              REVIEW SELECTION
            </span>
            <h1 className="font-serif text-3xl font-extrabold text-white">
              SHOPPING BAG ({totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'})
            </h1>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left: Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping Meter */}
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-neutral-300 font-medium">
                  {freeShippingDiff > 0 ? (
                    <>Add <strong className="text-white">₹{freeShippingDiff.toLocaleString('en-IN')}</strong> more for FREE Express Delivery!</>
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-white" /> Unlocked Complimentary All-India Express Shipping
                    </span>
                  )}
                </span>
                <span className="font-mono text-neutral-400 font-semibold">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* List of items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color.name}`}
                  className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400'}
                      alt={item.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400';
                      }}
                      className="w-20 h-24 sm:w-22 sm:h-26 object-cover rounded-xl bg-neutral-950 border border-neutral-800 shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] uppercase font-mono text-neutral-400 block font-bold">
                        {item.subcategory}
                      </span>
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-bold text-sm sm:text-base text-white hover:text-neutral-300 line-clamp-1 block"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-2.5 text-xs text-neutral-400 pt-0.5">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 border border-neutral-700 font-semibold text-white">
                          Size: {item.size}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-neutral-600"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <span>{item.color.name}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-neutral-700 rounded-full bg-neutral-950 px-2.5 py-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color.name, item.quantity - 1)}
                        className="p-1 text-neutral-400 hover:text-white font-bold"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color.name, item.quantity + 1)}
                        className="p-1 text-neutral-400 hover:text-white font-bold"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-mono font-bold text-base text-white">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                      {item.mrp > item.price && (
                        <div className="font-mono text-xs text-neutral-500 line-through">
                          ₹{(item.mrp * item.quantity).toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.productId, item.size, item.color.name)}
                      className="p-2 text-neutral-400 hover:text-red-400 transition-colors rounded-full hover:bg-neutral-800"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={clearCart}
                className="text-xs text-neutral-500 hover:text-red-400 underline font-medium"
              >
                Empty Bag
              </button>
            </div>
          </div>

          {/* Right: Order Summary & Coupon (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-white pb-3 border-b border-neutral-800">
                BAG SUMMARY
              </h3>

              {/* Coupon Box */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold block">
                  Privilege Code
                </span>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-neutral-950 border border-neutral-700 rounded-2xl p-3 text-xs shadow-sm">
                    <div className="flex items-center gap-2 text-white">
                      <Tag className="w-4 h-4 shrink-0 text-white" />
                      <div>
                        <strong className="block text-white">{appliedCoupon.code}</strong>
                        <span className="text-neutral-400">{appliedCoupon.description} (-₹{couponDiscount})</span>
                      </div>
                    </div>
                    <button onClick={removeCouponCode} className="text-neutral-400 hover:text-white underline text-xs font-semibold">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code (e.g. GOYAL10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs uppercase font-mono placeholder-neutral-500 text-white focus:outline-none focus:border-white"
                    />
                    <button
                      type="submit"
                      disabled={loadingCoupon}
                      className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      {loadingCoupon ? 'Applying...' : 'Apply'}
                    </button>
                  </form>
                )}

                {couponError && <p className="text-xs text-red-400">{couponError}</p>}
                {couponSuccess && <p className="text-xs text-emerald-400 font-semibold">{couponSuccess}</p>}
              </div>

              {/* Calculations */}
              <div className="space-y-3 pt-3 border-t border-neutral-800 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Items Subtotal</span>
                  <span className="font-mono text-white font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Privilege Discount</span>
                    <span className="font-mono">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-300">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-white">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE (Over ₹1,999)</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-between text-base font-extrabold text-white">
                  <span>Total Payable</span>
                  <span className="font-mono text-xl">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-white hover:bg-neutral-200 text-black py-4 rounded-full text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>100% Encrypted &amp; Verified Checkout</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
