'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon, type IconName } from './ui';

export type AccountTab = 'profile' | 'orders' | 'wishlist' | 'addresses' | 'wallet' | 'account';

interface AccountSidebarProps {
  activeTab: AccountTab;
  setActiveTab: (tab: AccountTab) => void;
  name: string;
  email: string;
  avatarUrl?: string;
  /** سطح باشگاه مشتریان (اختیاری) */
  level?: string;
  /** عدد کنار هر تب، مثلاً تعداد سفارش‌های فعال */
  counts?: Partial<Record<AccountTab, number>>;
  onEditProfile: () => void;
  onLogout?: () => void;
}

const items: { id: AccountTab; label: string; short: string; icon: IconName }[] = [
  { id: 'profile', label: 'داشبورد حساب کاربری', short: 'داشبورد', icon: 'user' },
  { id: 'orders', label: 'سفارش‌های من', short: 'سفارش‌ها', icon: 'bag' },
  { id: 'wishlist', label: 'علاقه‌مندی‌ها', short: 'علاقه‌مندی‌ها', icon: 'heart' },
  { id: 'addresses', label: 'آدرس‌های من', short: 'آدرس‌ها', icon: 'pin' },
  { id: 'wallet', label: 'کیف پول و کارت‌ها', short: 'کیف پول', icon: 'wallet' },
  { id: 'account', label: 'اطلاعات حساب و امنیت', short: 'امنیت', icon: 'shield' },
];

function Avatar({ name, url, size }: { name: string; url?: string; size: number }) {
  return (
    <span
      className="relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#c8a07c] to-[#8d6243] font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      <span aria-hidden>{name.trim()[0]}</span>
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={name} className="absolute inset-0 h-full w-full object-cover" />
      )}
    </span>
  );
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({
  activeTab,
  setActiveTab,
  name,
  email,
  avatarUrl,
  level = 'عضو باشگاه مشتریان',
  counts = {},
  onEditProfile,
  onLogout,
}) => {
  return (
    <>
      {/* ───── موبایل و تبلت: هدر جمع‌وجور + تب‌های افقی ───── */}
      <div className="lg:hidden" dir="rtl">
        <div className="glass-cream flex items-center gap-4 rounded-[22px] p-4">
          <span className="rounded-full bg-gradient-to-br from-[#f3dcc4] to-[#c8a07c] p-[2.5px]">
            <span className="block rounded-full border-2 border-[#fbf1e6]">
              <Avatar name={name} url={avatarUrl} size={56} />
            </span>
          </span>
          <div className="min-w-0 flex-1 text-right">
            <h2 className="truncate text-[17px] font-bold text-[#2a1a12]">{name}</h2>
            <p className="mt-0.5 text-[12.5px] text-[#84563a]">{level}</p>
          </div>
          <button type="button" onClick={onEditProfile} aria-label="ویرایش پروفایل" className="grid h-10 w-10 place-items-center rounded-full border border-[#c8a07c]/60 bg-white/50 text-[#5a3a28]">
            <Icon name="edit" className="h-[18px] w-[18px]" />
          </button>
        </div>
        <nav aria-label="منوی حساب کاربری" className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
          {items.map((it) => {
            const on = it.id === activeTab;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => setActiveTab(it.id)}
                aria-current={on ? 'page' : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition ${
                  on
                    ? 'border-transparent bg-gradient-to-br from-[#4a2c1c] to-[#2a170e] text-[#f3dcc4] shadow-[0_8px_18px_rgba(42,23,14,0.3)]'
                    : 'border-[#c8a07c]/45 bg-white/50 text-[#5a3a28]'
                }`}
              >
                <Icon name={it.icon} className="h-[18px] w-[18px]" />
                {it.short}
              </button>
            );
          })}
          {onLogout && (
            <button type="button" onClick={onLogout} className="flex shrink-0 items-center gap-2 rounded-full border border-[#e3b3a5] bg-white/50 px-4 py-2.5 text-[13.5px] font-medium text-[#9a3a26]">
              <Icon name="logout" className="h-[18px] w-[18px]" />
              خروج
            </button>
          )}
        </nav>
      </div>

      {/* ───── دسکتاپ: کارت کامل ───── */}
      <aside className="glass-cream hidden rounded-[28px] p-6 text-center lg:block" dir="rtl">
        <div className="relative mx-auto mt-1 w-fit">
          <span className="block rounded-full bg-gradient-to-br from-[#f3dcc4] via-[#c8a07c] to-[#a87a56] p-[3px] shadow-[0_10px_28px_rgba(120,78,48,0.3)]">
            <span className="block rounded-full border-[4px] border-[#fbf1e6]">
              <Avatar name={name} url={avatarUrl} size={120} />
            </span>
          </span>
          <button
            type="button"
            onClick={onEditProfile}
            aria-label="تغییر تصویر پروفایل"
            className="absolute bottom-1 left-1 grid h-9 w-9 place-items-center rounded-full border-2 border-[#fbf1e6] bg-gradient-to-br from-[#f0c8a8] to-[#d9a47e] text-[#2a1a12] shadow-md transition hover:scale-105"
          >
            <Icon name="camera" className="h-4 w-4" />
          </button>
        </div>

        <h2 className="mt-4 text-[20px] font-bold text-[#2a1a12]">{name}</h2>
        <p className="mt-1 text-[13px] text-[#7a6252]" dir="ltr">{email}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#c8a07c]/50 bg-[#e8c9aa]/30 px-3.5 py-1 text-[12.5px] font-medium text-[#7a4e2e]">
          <Icon name="award" className="h-4 w-4" />
          {level}
        </span>

        <button
          type="button"
          onClick={onEditProfile}
          className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-[#c8a07c]/60 bg-white/40 px-6 py-2 text-[13px] font-medium text-[#5a3a28] transition hover:bg-[#f3dcc4]"
        >
          <Icon name="edit" className="h-4 w-4" />
          ویرایش پروفایل
        </button>

        <div className="mx-2 mt-5 h-px bg-gradient-to-l from-transparent via-[#c8a07c]/50 to-transparent" />

        <nav aria-label="منوی حساب کاربری" className="mt-3 flex flex-col gap-1 text-right">
          {items.map((item) => {
            const active = item.id === activeTab;
            const n = counts[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                aria-current={active ? 'page' : undefined}
                className="group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[14px] transition"
              >
                {active && (
                  <motion.span
                    layoutId="account-nav-active"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-l from-[#f1cdb0] to-[#f6dfca] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_6px_16px_rgba(140,90,56,0.14)]"
                  />
                )}
                {active && <span aria-hidden className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-[#b3865f]" />}
                <span className={`relative ${active ? 'text-[#3a2418]' : 'text-[#6b4a36] group-hover:text-[#3a2418]'}`}>
                  <Icon name={item.icon} className="h-[22px] w-[22px]" />
                </span>
                <span className={`relative flex-1 ${active ? 'font-bold text-[#2a1a12]' : 'text-[#4a2f20]'}`}>{item.label}</span>
                {n ? (
                  <span className="relative grid h-6 min-w-6 place-items-center rounded-full bg-[#2a1a12] px-1.5 text-[12px] font-bold text-[#f3dcc4]">
                    {n.toLocaleString('fa-IR')}
                  </span>
                ) : (
                  <Icon name="chevron" className="relative h-4 w-4 text-[#8a6a54] transition group-hover:-translate-x-0.5" />
                )}
              </button>
            );
          })}

          {onLogout && (
            <>
              <div className="mx-2 my-2 h-px bg-gradient-to-l from-transparent via-[#c8a07c]/40 to-transparent" />
              <button
                type="button"
                onClick={onLogout}
                className="group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[14px] text-[#9a3a26] transition hover:bg-[#f6dcd4]/60"
              >
                <Icon name="logout" className="h-[22px] w-[22px]" />
                <span className="flex-1">خروج از حساب</span>
              </button>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default AccountSidebar;
