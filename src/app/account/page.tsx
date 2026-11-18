'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AccountPage } from '@/components/account/AccountPage';

export default function AccountRoute() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f6e9de] font-sans text-[#2a1a12]">
      <Header />
      <AccountPage />
      <Footer />
    </main>
  );
}
