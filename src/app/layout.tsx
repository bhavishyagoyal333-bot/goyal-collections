import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import StoreShell from '@/components/StoreShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.goyalcollections.shop'),
  title: 'GOYAL COLLECTIONS — Haute Couture Fashion & Mastercrafted Footwear',
  description: 'GOYAL COLLECTIONS is India’s premier luxury fashion and footwear atelier. Discover architectural footwear and bespoke ready-made clothing.',
  keywords: 'GOYAL COLLECTIONS, luxury fashion, Indian designer shoes, men footwear, women footwear, ready-made clothes, minimal luxury',
  verification: {
    google: 'googlea2e23dd0ac54739f',
  },
  openGraph: {
    title: 'GOYAL COLLECTIONS — Haute Couture Fashion & Mastercrafted Footwear',
    description: 'Explore minimalist monochrome luxury footwear and ready-made clothes crafted in India with international distinction.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col antialiased selection:bg-white selection:text-black overflow-x-hidden w-full max-w-[100vw]">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <StoreShell>{children}</StoreShell>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
