'use client';

/**
 * در app/account/page.tsx:   <main …><Header /><AccountPage /><Footer /></main>
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AccountSidebar, type AccountTab } from './AccountSidebar';
import { DashboardStats } from './DashboardStats';
import { ProfileInfo } from './ProfileInfo';
import { RecentOrders } from './RecentOrders';
import { WishlistCarousel } from './WishlistCarousel';
import { ExclusiveAccessBanner } from './ExclusiveAccessBanner';
import { OrdersList } from './OrdersList';
import { WishlistList } from './WishlistList';
import { AddressesList } from './AddressesList';
import { PaymentMethodsList } from './PaymentMethodsList';
import { AccountSettings } from './AccountSettings';
import type { UserProfileData } from './EditProfileModal';
import { initialUser } from './accountData';

export function AccountPage() {
  const [tab, setTab] = useState<AccountTab>('profile');
  const [user, setUser] = useState<UserProfileData>(initialUser);
  const [modalOpen, setModalOpen] = useState(false);

  const go = (t: AccountTab) => {
    setTab(t);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div dir="rtl" className="mx-auto max-w-[1360px] px-5 pb-20 pt-32 sm:px-10 sm:pt-40">
      {/* RTL: ستون اول = سمت راست؛ سایدبار راست، محتوا چپ */}
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <AccountSidebar
            activeTab={tab}
            setActiveTab={go}
            name={`${user.firstName} ${user.lastName}`}
            email={user.email}
            avatarUrl={user.avatarUrl}
            counts={{ orders: 1 }}
            onEditProfile={() => {
              go('profile');
              setModalOpen(true);
            }}
            onLogout={() => {
            }}
          />
        </div>

        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {tab === 'profile' && (
                <>
                  <DashboardStats onNavigate={go} />
                  <ProfileInfo user={user} onSave={setUser} modalOpen={modalOpen} setModalOpen={setModalOpen} />
                  <RecentOrders onViewAll={() => go('orders')} />
                  <WishlistCarousel onViewAll={() => go('wishlist')} />
                  <ExclusiveAccessBanner />
                </>
              )}
              {tab === 'orders' && <OrdersList />}
              {tab === 'wishlist' && <WishlistList />}
              {tab === 'addresses' && <AddressesList defaultName={`${user.firstName} ${user.lastName}`} />}
              {tab === 'wallet' && <PaymentMethodsList />}
              {tab === 'account' && <AccountSettings nationalCode={user.nationalCode} onSaveNationalCode={(c) => setUser((u) => ({ ...u, nationalCode: c }))} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
