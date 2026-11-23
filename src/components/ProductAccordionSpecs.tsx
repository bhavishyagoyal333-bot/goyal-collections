'use client';

import React, { useState } from 'react';
import {
  Truck,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Box,
  Scissors,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductAccordionSpecsProps {
  product: Product;
}

export default function ProductAccordionSpecs({ product }: ProductAccordionSpecsProps) {
  // Collapsible accordion state: by default collapsed as requested ("ta ki click krga tho sab dekh sake, nahe tho hide hi rahe")
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    details: false,
    design: false,
    care: false,
    shipping: false,
    authenticity: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Helper to extract product-specific specification
  const getSpec = (labelKey: string): string | undefined => {
    return product.specifications?.find((s) =>
      s.label.toLowerCase().includes(labelKey.toLowerCase())
    )?.value;
  };

  const isFootwear = product.category === 'footwear';

  // 1. Product Details specifications
  const material =
    getSpec('upper') ||
    getSpec('fabric') ||
    (isFootwear
      ? 'Genuine Full-Grain Calfskin Leather'
      : 'Heavyweight 320 GSM Supima Cotton');
  const interior =
    getSpec('lining') ||
    getSpec('sole') ||
    (isFootwear
      ? 'Memory Foam Ergonomic Leather Footbed'
      : '100% Breathable Cupro Silk');
  const closure =
    getSpec('closure') ||
    (isFootwear ? 'Slip-On Elastic Gusset' : 'Concealed Horn Button Fastening');
  const origin =
    getSpec('origin') || 'Handcrafted in Agra & Delhi Ateliers, India';
  const sizeFit = isFootwear
    ? `True to standard UK/India sizing. Available: ${product.sizes.join(', ')}`
    : `Tailored structured fit. Available sizes: ${product.sizes.join(', ')}`;
  const heelHeight = getSpec('heel');

  // 2. Design specifications
  const colorNames = product.colors.map((c) => c.name).join(' / ');
  const silhouette = `${product.subcategoryTitle} Silhouette`;
  const patternWeave = isFootwear
    ? 'Full-Grain Smooth Polish with Matte Elastic Trim'
    : 'High-Density Architectural Weave with Fluid Drape';
  const styleCode = `MRL-${product.category.slice(0, 2).toUpperCase()}-${product.slug
    .split('-')
    .slice(-2)
    .join('')
    .toUpperCase()}`;

  // 3. Packaging & Care specifications
  const primaryCare =
    getSpec('care') ||
    (isFootwear
      ? 'Buff with neutral beeswax cream'
      : 'Dry clean only or delicate cold wash');
  const cleaning = isFootwear
    ? 'Wipe clean with a soft, slightly damp cloth. Avoid harsh solvents and water immersion.'
    : 'Professional dry cleaning recommended. Warm iron with pressing cloth if required.';
  const storage = isFootwear
    ? 'Store in provided cotton dust bag with cedar shoe trees to retain shape.'
    : 'Store hanging on contoured wide wooden hangers inside the protective dust cover.';

  return (
    <section
      aria-label="Product Specifications & Details Accordions"
      className="rounded-3xl glassic-card p-4 sm:p-8 space-y-4 shadow-2xl"
    >
      {/* ================================================================= */}
      {/* TOP ASSURANCE CARDS (Glassic Frosted Highlights)                  */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
            <Truck className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block">
              Armored Courier &amp; Insured Delivery
            </span>
            <span className="text-[11px] font-mono text-neutral-400 block">
              Complimentary dispatch across India
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block">
              GOYAL COLLECTIONS Certified Atelier Seal
            </span>
            <span className="text-[11px] font-mono text-neutral-400 block">
              100% Genuine luxury craftsmanship guarantee
            </span>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* COLLAPSIBLE ARROW ACCORDIONS LIST                                 */}
      {/* ================================================================= */}
      <div className="space-y-3 pt-2">
        
        {/* 1. PRODUCT DETAILS & SPECIFICATIONS ACCORDION */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden transition-all shadow-md">
          <button
            type="button"
            onClick={() => toggleSection('details')}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/[0.06] transition-colors"
            aria-expanded={openSections.details}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                <Scissors className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono text-neutral-400 block font-bold">
                  SPECIFICATIONS
                </span>
                <span className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  1. Product Details &amp; Material
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-400">
                {openSections.details ? 'Hide' : 'View'}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-300 transition-transform duration-300 ${
                  openSections.details ? 'rotate-180 text-white' : ''
                }`}
              />
            </div>
          </button>

          {openSections.details && (
            <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-white/10 animate-fade-in space-y-5">
              <div>
                <h4 className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-bold mb-1.5">
                  ARCHITECTURAL DESCRIPTION
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* 2-Column Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-8 pt-1">
                <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Primary Material:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block">
                    {material}
                  </span>
                </div>

                <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Internal Structure &amp; Lining:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block">
                    {interior}
                  </span>
                </div>

                <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Closure &amp; Fastening:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block">
                    {closure}
                  </span>
                </div>

                <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Size &amp; Fit Profile:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block">
                    {sizeFit}
                  </span>
                </div>

                {heelHeight && (
                  <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Heel Elevation:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {heelHeight}
                    </span>
                  </div>
                )}

                <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Place of Craft:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block">
                    {origin}
                  </span>
                </div>

                <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Identification Code:
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-semibold text-neutral-300 block">
                    {styleCode}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              {product.details && product.details.length > 0 && (
                <div className="pt-2">
                  <h5 className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-bold mb-2.5">
                    DISTINGUISHING SPECIFICATIONS
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {product.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. DESIGN PHILOSOPHY ACCORDION */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden transition-all shadow-md">
          <button
            type="button"
            onClick={() => toggleSection('design')}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/[0.06] transition-colors"
            aria-expanded={openSections.design}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono text-neutral-400 block font-bold">
                  AESTHETICS
                </span>
                <span className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  2. Design Philosophy &amp; Silhouette
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-400">
                {openSections.design ? 'Hide' : 'View'}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-300 transition-transform duration-300 ${
                  openSections.design ? 'rotate-180 text-white' : ''
                }`}
              />
            </div>
          </button>

          {openSections.design && (
            <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-white/10 animate-fade-in space-y-4">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {isFootwear
                  ? 'Engineered around anatomical contours with a sharp, elongated silhouette. Emphasizes clean planes, zero extraneous branding, and seamless tonal transitions.'
                  : 'An avant-garde balance of proportion and drape. Characterized by relaxed drop-shoulder tailoring, concealed seam closures, and pure architectural presence.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-8 pt-1">
                <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Design Silhouette:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block">
                    {silhouette}
                  </span>
                </div>

                <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Curated Tonal Palette:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block">
                    {colorNames}
                  </span>
                </div>

                <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Texture &amp; Surface Treatment:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block">
                    {patternWeave}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. PACKAGING & CARE INSTRUCTIONS ACCORDION */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden transition-all shadow-md">
          <button
            type="button"
            onClick={() => toggleSection('care')}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/[0.06] transition-colors"
            aria-expanded={openSections.care}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                <Box className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono text-neutral-400 block font-bold">
                  MAINTENANCE
                </span>
                <span className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  3. Packaging &amp; Garment Care
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-400">
                {openSections.care ? 'Hide' : 'View'}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-300 transition-transform duration-300 ${
                  openSections.care ? 'rotate-180 text-white' : ''
                }`}
              />
            </div>
          </button>

          {openSections.care && (
            <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-white/10 animate-fade-in space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-8">
                <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Primary Care Protocol:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block">
                    {primaryCare}
                  </span>
                </div>

                <div className="space-y-0.5 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Cleaning Instructions:
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-300 block">
                    {cleaning}
                  </span>
                </div>

                <div className="space-y-0.5 border-b border-white/5 pb-2.5 sm:col-span-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Archival Storage &amp; Protection:
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-300 block">
                    {storage}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. COMPLIMENTARY SHIPPING & 7-DAY RETURNS ACCORDION */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden transition-all shadow-md">
          <button
            type="button"
            onClick={() => toggleSection('shipping')}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/[0.06] transition-colors"
            aria-expanded={openSections.shipping}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono text-neutral-400 block font-bold">
                  LOGISTICS &amp; ASSURANCE
                </span>
                <span className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  4. Shipping, Express Dispatch &amp; 7-Day Returns
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-400">
                {openSections.shipping ? 'Hide' : 'View'}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-300 transition-transform duration-300 ${
                  openSections.shipping ? 'rotate-180 text-white' : ''
                }`}
              />
            </div>
          </button>

          {openSections.shipping && (
            <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-white/10 animate-fade-in space-y-3 text-xs text-neutral-300 leading-relaxed font-light">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <p>
                  <strong>Insured Express Delivery:</strong> Complimentary dispatch across 27,000+ PIN codes in India. Metro orders delivered in 2–4 business days.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <RefreshCw className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <p>
                  <strong>7-Day Seamless Return &amp; Exchange:</strong> Enjoy hassle-free reverse pickup from your doorstep if sizing or styling requires adjustment.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <p>
                  <strong>Tamper-Proof Luxury Packaging:</strong> Delivered in GOYAL COLLECTIONS custom rigid hardbox with ribbon seal and authenticity credentials.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 5. CERTIFIED ATELIER AUTHENTICITY SEAL ACCORDION */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden transition-all shadow-md">
          <button
            type="button"
            onClick={() => toggleSection('authenticity')}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/[0.06] transition-colors"
            aria-expanded={openSections.authenticity}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono text-neutral-400 block font-bold">
                  GUARANTEE
                </span>
                <span className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  5. Certified Atelier Authenticity Seal
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-400">
                {openSections.authenticity ? 'Hide' : 'View'}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-300 transition-transform duration-300 ${
                  openSections.authenticity ? 'rotate-180 text-white' : ''
                }`}
              />
            </div>
          </button>

          {openSections.authenticity && (
            <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-white/10 animate-fade-in space-y-3 text-xs text-neutral-300 leading-relaxed font-light">
              <p>
                Every GOYAL COLLECTIONS creation undergoes a multi-point artisanal inspection. Handcrafted in India utilizing certified full-grain leathers and long-staple Supima cottons sourced from ethical mills.
              </p>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <span className="font-mono text-[11px] text-neutral-400 uppercase">
                  Atelier Verification Serial:
                </span>
                <span className="font-mono text-xs font-bold text-white">
                  GC-{product.id.slice(0, 8).toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
