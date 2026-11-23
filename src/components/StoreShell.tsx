'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomFloatingCart from '@/components/BottomFloatingCart';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import RealtimeListener from '@/components/RealtimeListener';

export default function StoreShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="w-full min-h-screen bg-black text-white">{children}</div>;
  }

  return (
    <>
      <RealtimeListener />
      <Header />
      <main className="flex-1 w-full max-w-full overflow-x-hidden bg-black text-white pt-16 sm:pt-20">
        {children}
      </main>
      <BottomFloatingCart />
      <WhatsAppFloatingButton />
      <Footer />
    </>
  );
}

