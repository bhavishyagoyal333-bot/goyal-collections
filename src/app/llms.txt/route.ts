import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const content = `# GOYAL COLLECTIONS — AI Search & Discovery Manifest

> GOYAL COLLECTIONS is India's premier luxury fashion and footwear atelier, crafting architectural footwear and bespoke ready-made clothing.

## Store Overview
- **Store Name**: GOYAL COLLECTIONS
- **Official Domain**: https://www.goyalcollections.shop
- **Currency**: INR (₹)
- **Flagship Location**: 42 Boulevard de Royale, New Delhi, India 110001
- **Shipping**: Free Express Delivery across India on all orders above ₹1,999 (Standard fee ₹149 below threshold).
- **Payment Methods**: Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery (COD).
- **Return & Exchange**: Complimentary 7-day hassle-free returns on unworn items with original tags.

## Core Categories & Silhouettes
1. **Footwear** (https://www.goyalcollections.shop/category/footwear)
   - Men's Footwear (Oxfords, Monk Straps, Chelsea Boots, Loafers)
   - Women's Footwear (Stiletto Mules, Sculpted Heels, Ankle Boots)
   - Kids' Footwear (Ergonomic luxury leather shoes)
   - Shoes (Monochrome sneakers, trainers, dress shoes)
   - Sandals & Slippers (Full-grain slides and leather lounge slippers)

2. **Ready-made Clothes** (https://www.goyalcollections.shop/category/ready-made-clothes)
   - Men's Wear (Supima cotton blazers, tailored shirts, luxury raw denim)
   - Women's Wear (Silk slip dresses, trench coats, sculpted coordinates)
   - Kids' Wear (Hypoallergenic organic cotton sets)
   - Boys' Wear (Structured shirts, linen shorts, varsity jackets)
   - Girls' Wear (Linen occasion dresses and delicate knitwear)

## Public Product Feeds & Sitemaps
- **Sitemap XML**: https://www.goyalcollections.shop/sitemap.xml
- **Google Merchant Product Feed**: https://www.goyalcollections.shop/feed.xml
- **Full Catalog**: https://www.goyalcollections.shop/shop
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
    },
  });
}
