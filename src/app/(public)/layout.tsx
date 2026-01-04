import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-zinc-50">
      <Header />
      <main className="min-h-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
