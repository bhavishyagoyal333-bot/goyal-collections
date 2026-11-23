'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Package,
  Heart,
  LogOut,
  X,
  ShoppingBag,
  MapPin,
  AlertCircle,
  ChevronDown,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import MirliLogo from '@/components/MirliLogo';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const { totalItems } = useCart();

  // Navigation Drawer & Profile Dropdown states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (cat: string) => {
    setOpenAccordion((prev) => (prev === cat ? null : cat));
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Handle explicit confirmed logout
  const handleConfirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    setIsProfileOpen(false);
    router.push('/');
  };

  return (
    <>
      {/* Fixed Floating Capsule Glassic Header (Always Visible on Scroll) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-2 sm:px-4 pt-2 sm:pt-3 pointer-events-none transition-all">
        <div className="max-w-7xl mx-auto rounded-full glassic-header pointer-events-auto px-2.5 sm:px-5 py-1.5 sm:py-2 flex items-center justify-between border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_1.5px_rgba(255,255,255,0.25)] relative">
          
          {/* ======================================================= */}
          {/* LEFT: Three-Line Hamburger Menu + Brand Logo (LEFT SIDE) */}
          {/* ======================================================= */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0 z-10">
            {/* Three-Line Hamburger Menu Button with Glassic Look */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="glassic-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full text-white flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-white/40 active:scale-95 shadow-sm shrink-0"
              aria-label="Open Navigation Menu"
            >
              <div className="w-4 h-3 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-white rounded-full transition-transform group-hover:scale-x-110" />
                <span className="w-3 h-0.5 bg-white rounded-full transition-all group-hover:w-full" />
                <span className="w-full h-0.5 bg-white rounded-full transition-transform group-hover:scale-x-110" />
              </div>
            </button>

            {/* Brand Logo with Name on LEFT SIDE (Always visible, perfectly unobstructed) */}
            <Link href="/" className="flex items-center group py-1" aria-label="GOYAL COLLECTIONS Homepage">
              <MirliLogo showTextOnMobile={true} />
            </Link>
          </div>

          {/* ======================================================= */}
          {/* CENTER ON DESKTOP: Nav Links (CodeOrbit Pill Style)     */}
          {/* ======================================================= */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-mono uppercase tracking-wider text-neutral-300">
            <Link href="/shop" className="hover:text-white transition-colors">
              Shop All
            </Link>
            <Link href="/category/footwear" className="hover:text-white transition-colors">
              Footwear
            </Link>
            <Link href="/category/ready-made-clothes" className="hover:text-white transition-colors">
              Ready-Made
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Atelier
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* ======================================================= */}
          {/* RIGHT: Wishlist + Cart + Profile Action Buttons         */}
          {/* ======================================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 justify-end z-10">

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="hidden sm:flex glassic-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center text-white relative group"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[9px] font-mono flex items-center justify-center font-bold shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart Icon with Glassic Styling */}
            <Link
              href="/cart"
              className="glassic-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white relative group"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[9px] font-mono flex items-center justify-center font-bold shadow-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Profile / User Icon with Interactive Menu */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen((prev) => !prev);
                }}
                className={`glassic-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white relative group ${
                  user ? 'ring-1 ring-white/60 bg-white/20' : ''
                }`}
                aria-expanded={isProfileOpen}
                aria-label="User Profile"
              >
                <User className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                {user && (
                  <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                )}
              </button>

              {/* Profile Dropdown Menu with 100% Solid Dark Background for Perfect Visibility */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-72 max-w-[calc(100vw-24px)] rounded-2xl bg-neutral-950 border border-neutral-800 p-3 z-50 animate-fade-in text-xs font-sans text-white shadow-[0_24px_70px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.06)]">
                  {user ? (
                    /* Logged In State */
                    <div>
                      {/* Customer Name Header */}
                      <div className="p-3.5 border border-neutral-800 mb-2 bg-neutral-900 rounded-xl shadow-inner">
                        <span className="text-[10px] font-mono uppercase text-neutral-400 block tracking-widest font-bold">
                          SIGNED IN AS
                        </span>
                        <span className="font-bold text-white block truncate text-sm sm:text-base mt-1">
                          {user.name}
                        </span>
                        <span className="text-neutral-400 font-mono text-[11px] block truncate mt-0.5">
                          {user.email}
                        </span>
                      </div>

                      {/* Logged-In Options */}
                      <div className="space-y-1">
                        <Link
                          href="/account"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-900 active:bg-neutral-800 transition-colors font-medium text-xs sm:text-sm"
                        >
                          <User className="w-4 h-4 text-neutral-400 shrink-0" />
                          <span>My Account</span>
                        </Link>
                        <Link
                          href="/account/orders"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-900 active:bg-neutral-800 transition-colors font-medium text-xs sm:text-sm"
                        >
                          <Package className="w-4 h-4 text-neutral-400 shrink-0" />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          href="/account"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-900 active:bg-neutral-800 transition-colors font-medium text-xs sm:text-sm"
                        >
                          <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                          <span>Saved Addresses</span>
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-200 hover:text-white hover:bg-neutral-900 active:bg-neutral-800 transition-colors font-medium text-xs sm:text-sm"
                        >
                          <Heart className="w-4 h-4 text-neutral-400 shrink-0" />
                          <span>Wishlist ({wishlistCount})</span>
                        </Link>
                      </div>

                      {/* Single Confirmed Logout Trigger */}
                      <div className="border-t border-neutral-800 pt-2 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileOpen(false);
                            setShowLogoutConfirm(true);
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-red-400 hover:bg-red-950/40 hover:text-red-300 active:bg-red-950/60 transition-colors text-left font-medium text-xs sm:text-sm"
                        >
                          <LogOut className="w-4 h-4 shrink-0" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Logged Out State: Only Sign In & Register */
                    <div className="p-3.5">
                      <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 mb-3">
                        <span className="font-serif font-bold text-white block text-sm mb-1">
                          Welcome to GOYAL COLLECTIONS
                        </span>
                        <p className="text-neutral-300 text-[11px] leading-relaxed">
                          Sign in to access your orders, saved addresses and exclusive drops.
                        </p>
                      </div>
                      <div className="flex gap-2.5">
                        <Link
                          href="/login"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex-1 text-center bg-white hover:bg-neutral-200 text-black py-2.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/signup"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex-1 text-center bg-neutral-900 hover:bg-neutral-800 text-white py-2.5 rounded-full text-xs font-semibold transition-all border border-neutral-700 active:scale-95"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* ============================================================= */}
      {/* EXPLICIT LOGOUT CONFIRMATION MODAL                            */}
      {/* ============================================================= */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl sm:rounded-3xl p-6 sm:p-7 max-w-sm w-full text-center shadow-2xl text-white">
            <div className="w-12 h-12 rounded-full bg-neutral-800 text-white flex items-center justify-center mx-auto mb-4 border border-neutral-700">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">
              Log Out of GOYAL COLLECTIONS?
            </h3>
            <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
              Are you sure you want to end your current shopping session? You can sign back in anytime.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-full border border-neutral-700 text-neutral-300 hover:bg-neutral-800 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* SLIDE-OUT NAVIGATION DRAWER (OPENED BY THREE-LINE HAMBURGER)  */}
      {/* ============================================================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Drawer Panel with Frosted Glassic Look */}
          <div className="fixed top-0 left-0 bottom-0 w-full max-w-sm sm:max-w-md bg-neutral-950/95 backdrop-blur-2xl border-r border-white/10 shadow-2xl flex flex-col z-50 animate-slide-right overflow-y-auto text-white">
            
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.03] backdrop-blur-md">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center"
              >
                <MirliLogo showTextOnMobile={true} />
              </Link>

              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="glassic-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full text-white flex items-center justify-center transition-all"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-5 sm:p-6 space-y-4 flex-1">
              
              {/* Category 1: Footwear Accordion Dropdown */}
              <div className="rounded-2xl glassic-card overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => toggleAccordion('footwear')}
                  className="w-full flex items-center justify-between p-3.5 text-left hover:bg-neutral-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <div>
                      <span className="text-[9px] uppercase font-mono text-neutral-400 font-bold block">CATEGORY 01</span>
                      <span className="font-serif text-base font-bold text-white tracking-wide">1. FOOTWEAR</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded-full bg-neutral-800">5 Lines</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                        openAccordion === 'footwear' ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </div>
                </button>

                {openAccordion === 'footwear' && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-neutral-800/60 animate-fade-in space-y-1">
                    {[
                      { name: "Men's Footwear", href: '/category/footwear/mens-footwear' },
                      { name: "Women's Footwear", href: '/category/footwear/womens-footwear' },
                      { name: "Kids' Footwear", href: '/category/footwear/kids-footwear' },
                      { name: 'Shoes', href: '/category/footwear/shoes' },
                      { name: 'Sandals & Slippers', href: '/category/footwear/sandals-slippers' },
                    ].map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-neutral-800/70 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
                      >
                        <span>{sub.name}</span>
                        <span className="text-neutral-500">→</span>
                      </Link>
                    ))}
                    <Link
                      href="/category/footwear"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center py-2 mt-1 rounded-xl bg-neutral-800/60 hover:bg-white hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
                    >
                      All Footwear &rarr;
                    </Link>
                  </div>
                )}
              </div>

              {/* Category 2: Ready-made Clothes Accordion Dropdown */}
              <div className="rounded-2xl glassic-card overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => toggleAccordion('ready-made')}
                  className="w-full flex items-center justify-between p-3.5 text-left hover:bg-neutral-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <div>
                      <span className="text-[9px] uppercase font-mono text-neutral-400 font-bold block">CATEGORY 02</span>
                      <span className="font-serif text-base font-bold text-white tracking-wide">2. READY-MADE CLOTHES</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded-full bg-neutral-800">5 Lines</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                        openAccordion === 'ready-made' ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </div>
                </button>

                {openAccordion === 'ready-made' && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-neutral-800/60 animate-fade-in space-y-1">
                    {[
                      { name: "Men's Wear", href: '/category/ready-made-clothes/mens-wear' },
                      { name: "Women's Wear", href: '/category/ready-made-clothes/womens-wear' },
                      { name: "Kids' Wear", href: '/category/ready-made-clothes/kids-wear' },
                      { name: "Boys' Wear", href: '/category/ready-made-clothes/boys-wear' },
                      { name: "Girls' Wear", href: '/category/ready-made-clothes/girls-wear' },
                    ].map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-neutral-800/70 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
                      >
                        <span>{sub.name}</span>
                        <span className="text-neutral-500">→</span>
                      </Link>
                    ))}
                    <Link
                      href="/category/ready-made-clothes"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center py-2 mt-1 rounded-xl bg-neutral-800/60 hover:bg-white hover:text-black text-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
                    >
                      All Ready-Made &rarr;
                    </Link>
                  </div>
                )}
              </div>

              {/* Category 3: Concierge & Legal Accordion Dropdown */}
              <div className="rounded-2xl glassic-card overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => toggleAccordion('concierge')}
                  className="w-full flex items-center justify-between p-3.5 text-left hover:bg-neutral-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <div>
                      <span className="text-[9px] uppercase font-mono text-neutral-400 font-bold block">ASSISTANCE</span>
                      <span className="font-serif text-base font-bold text-white tracking-wide">3. CONCIERGE &amp; LEGAL</span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                      openAccordion === 'concierge' ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {openAccordion === 'concierge' && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-neutral-800/60 animate-fade-in space-y-1">
                    {[
                      { name: 'Order Tracking', href: '/order-tracking' },
                      { name: 'My Account & Orders', href: '/account' },
                      { name: 'About GOYAL COLLECTIONS', href: '/about' },
                      { name: 'Contact & Support', href: '/contact' },
                      { name: 'Frequently Asked Questions', href: '/faq' },
                      { name: 'Shipping Policy', href: '/shipping-policy' },
                      { name: 'Return & Refund Policy', href: '/return-policy' },
                      { name: 'Privacy Policy', href: '/privacy-policy' },
                      { name: 'Terms & Conditions', href: '/terms' },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-neutral-800/70 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
                      >
                        <span>{item.name}</span>
                        <span className="text-neutral-500">→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons in Drawer */}
              <div className="pt-2 border-t border-neutral-800/80 space-y-2.5">
                <Link
                  href="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-white hover:bg-neutral-200 text-black py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shop Full Catalog</span>
                </Link>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-center pt-2">
                  <Link
                    href="/order-tracking"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
                  >
                    Order Tracking
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
                  >
                    My Account
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
