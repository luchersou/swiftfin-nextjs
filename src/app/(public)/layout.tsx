import React from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-zinc-50">
      <main className="min-h-0">
        {children}
      </main>
    </div>
  );
}
