'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, RefreshCw, Truck, Award, CheckCircle, ChevronDown } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (sec: string) => {
    setOpenSection((prev) => (prev === sec ? null : sec));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800 pt-14 pb-12 w-full">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-neutral-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-semibold text-white">All-India Express</h5>
              <p className="text-[11px] text-neutral-400">Complimentary delivery above ₹1,999</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-semibold text-white">7-Day Effortless Returns</h5>
              <p className="text-[11px] text-neutral-400">Doorstep pickup &amp; quick refunds</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-semibold text-white">100% Genuine Luxury</h5>
              <p className="text-[11px] text-neutral-400">Handcrafted leather &amp; Supima cotton</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-semibold text-white">Secure Payments</h5>
              <p className="text-[11px] text-neutral-400">UPI, Cards, NetBanking &amp; COD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs tracking-wider">
                GC
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-white">GOYAL COLLECTIONS</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              GOYAL COLLECTIONS is an elite Indian luxury shopping brand embodying timeless monochrome aesthetics. Handcrafted footwear and ready-made clothes engineered for refined modern connoisseurs.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-neutral-300 font-semibold block mb-2">
                Join the Haute Concierge
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                  <CheckCircle className="w-4 h-4" /> You are subscribed to exclusive private drops.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                  />
                  <button type="submit" className="bg-white hover:bg-neutral-200 text-black px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors">
                    Join
                  </button>
                </form>
              )}
            </div>

            {/* Direct WhatsApp Concierge Link */}
            <div className="pt-2">
              <a
                href="https://wa.me/919001725016?text=Hello%20Goyal%20Collections%2C%20I%20have%20an%20inquiry%20regarding%20products%20and%20orders."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-xs font-mono font-medium hover:bg-emerald-600 hover:text-white transition-all shadow-sm group"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] group-hover:bg-white animate-pulse" />
                <span>WhatsApp: +91 90017 25016</span>
              </a>
            </div>
          </div>

          {/* 1. Footwear Column */}
          <div className="border-b border-neutral-800/80 md:border-b-0 pb-4 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('footwear')}
              className="w-full flex items-center justify-between md:cursor-default text-left py-2 md:py-0"
            >
              <h6 className="text-xs font-bold uppercase tracking-widest text-white">
                1. Footwear
              </h6>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 md:hidden transition-transform duration-300 ${
                  openSection === 'footwear' ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>
            <ul className={`mt-3 space-y-2 text-xs text-neutral-400 ${openSection === 'footwear' ? 'block' : 'hidden md:block'}`}>
              <li>
                <Link href="/category/footwear/mens-footwear" className="hover:text-white transition-colors">
                  Men&apos;s Footwear
                </Link>
              </li>
              <li>
                <Link href="/category/footwear/womens-footwear" className="hover:text-white transition-colors">
                  Women&apos;s Footwear
                </Link>
              </li>
              <li>
                <Link href="/category/footwear/kids-footwear" className="hover:text-white transition-colors">
                  Kids&apos; Footwear
                </Link>
              </li>
              <li>
                <Link href="/category/footwear/shoes" className="hover:text-white transition-colors">
                  Shoes
                </Link>
              </li>
              <li>
                <Link href="/category/footwear/sandals-slippers" className="hover:text-white transition-colors">
                  Sandals &amp; Slippers
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/category/footwear" className="text-white font-semibold hover:underline flex items-center gap-1">
                  All Footwear <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Ready-made Clothes Column */}
          <div className="border-b border-neutral-800/80 md:border-b-0 pb-4 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('ready-made')}
              className="w-full flex items-center justify-between md:cursor-default text-left py-2 md:py-0"
            >
              <h6 className="text-xs font-bold uppercase tracking-widest text-white">
                2. Ready-made Clothes
              </h6>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 md:hidden transition-transform duration-300 ${
                  openSection === 'ready-made' ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>
            <ul className={`mt-3 space-y-2 text-xs text-neutral-400 ${openSection === 'ready-made' ? 'block' : 'hidden md:block'}`}>
              <li>
                <Link href="/category/ready-made-clothes/mens-wear" className="hover:text-white transition-colors">
                  Men&apos;s Wear
                </Link>
              </li>
              <li>
                <Link href="/category/ready-made-clothes/womens-wear" className="hover:text-white transition-colors">
                  Women&apos;s Wear
                </Link>
              </li>
              <li>
                <Link href="/category/ready-made-clothes/kids-wear" className="hover:text-white transition-colors">
                  Kids&apos; Wear
                </Link>
              </li>
              <li>
                <Link href="/category/ready-made-clothes/boys-wear" className="hover:text-white transition-colors">
                  Boys&apos; Wear
                </Link>
              </li>
              <li>
                <Link href="/category/ready-made-clothes/girls-wear" className="hover:text-white transition-colors">
                  Girls&apos; Wear
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/category/ready-made-clothes" className="text-white font-semibold hover:underline flex items-center gap-1">
                  All Ready-Made <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Concierge & Legal Column */}
          <div className="border-b border-neutral-800/80 md:border-b-0 pb-4 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('concierge')}
              className="w-full flex items-center justify-between md:cursor-default text-left py-2 md:py-0"
            >
              <h6 className="text-xs font-bold uppercase tracking-widest text-white">
                3. Concierge &amp; Legal
              </h6>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 md:hidden transition-transform duration-300 ${
                  openSection === 'concierge' ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>
            <ul className={`mt-3 space-y-2 text-xs text-neutral-400 ${openSection === 'concierge' ? 'block' : 'hidden md:block'}`}>
              <li>
                <Link href="/order-tracking" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Account &amp; Orders
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About GOYAL COLLECTIONS
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-white transition-colors">
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
        <div>
          © {new Date().getFullYear()} GOYAL COLLECTIONS. All rights reserved.
        </div>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <span>Created by</span>
          <a
            href="https://www.codeorbit.cloud/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline font-medium transition-colors"
          >
            codeorbit.cloud
          </a>
        </div>
      </div>
    </footer>
  );
}
