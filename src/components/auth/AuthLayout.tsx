'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Bg } from '@/components/ui/Bg';
import { Ico } from '@/components/icons/Ico';
import { IMG } from '@/lib/themeImages';
import { Ornament } from '@/components/ui/Ornament';

/* قالب مشترک ورود و ثبت‌نام: کارت دوبخشی (تصویر | فرم) روی ابریشم.
   هدر و فوتر همان هدر/فوتر اصلی سایت‌اند. */
export function AuthLayout({
  mode, children, welcome = 'به پرتو خوش آمدید', tagline = 'زیبایی را با ما تجربه کنید...',
}: {
  mode: 'login' | 'signup';
  children: React.ReactNode;
  welcome?: string;
  tagline?: string;
}) {
  return (
    <main className="relative isolate min-h-screen w-full overflow-x-hidden font-sans text-[#2a170e]">
      <Bg src={IMG.silk} fallback="linear-gradient(160deg,#e2c2a2,#c9a07c 40%,#e0bf9f 65%,#b98d68)" className="absolute inset-0 -z-10" />
      {/* سایه ملایم زیر هدر ثابت تا خوانا بماند */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[130px] bg-gradient-to-b from-[#1c110c]/80 to-transparent" />

      <Header />

      <div className="relative z-10 mx-auto w-full max-w-[1000px] px-4 pb-14 pt-[96px] sm:px-6 lg:pt-[128px]">
        <div className="grid grid-cols-1 overflow-hidden rounded-[34px] shadow-[0_24px_60px_rgba(70,40,24,0.35)] lg:grid-cols-[1.02fr_1fr]">
          {/* ───── راست: فرم ───── */}
          <section className="relative bg-gradient-to-b from-[#fcebdd] to-[#f9e1cf] lg:order-1">
            <div role="tablist" aria-label="ورود یا ثبت‌نام" className="flex gap-0 px-3 pt-3 sm:px-4 sm:pt-4">
              {([
                ['login', 'ورود به حساب کاربری', 'user', '/login'],
                ['signup', 'ثبت نام', 'pencil', '/signup'],
              ] as const).map(([id, label, icon, href]) => {
                const on = mode === id;
                return (
                  <Link
                    key={id}
                    href={href}
                    role="tab"
                    aria-selected={on}
                    className={`relative flex h-[50px] flex-1 items-center justify-center gap-2.5 rounded-t-[22px] text-[14px] font-bold transition ${
                      on ? 'bg-[#fcebdd] text-[#2a170e] shadow-[0_-2px_10px_rgba(120,76,48,.12)]' : 'bg-[#f3d6c0]/80 text-[#3a2418] hover:bg-[#f3d6c0]'
                    }`}
                  >
                    <Ico name={icon} className="h-[19px] w-[19px]" sw={1.6} /> {label}
                    {on && <span aria-hidden className="absolute inset-x-6 bottom-0 h-[3px] rounded-t bg-[#3a2418]" />}
                  </Link>
                );
              })}
            </div>
            <div className="px-5 pb-8 pt-8 sm:px-9">{children}</div>
          </section>

          {/* ───── چپ: تصویر ───── */}
          <aside className="relative order-first min-h-[300px] overflow-hidden lg:order-2 lg:min-h-[705px]" aria-label="خوش آمدید">
            <Bg src={IMG.silk} fallback="linear-gradient(160deg,#e8cdb2,#c9a07c 50%,#e0bf9f)" pos="center" className="absolute inset-0" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#f5dcc5]/50 via-transparent to-[#8d6243]/20" />
            <div className="relative flex h-full flex-col items-center px-6 pt-12 text-center">
              <h2 className="text-[30px] font-bold text-[#3a2013] lg:text-[32px]">{welcome}</h2>
              <p className="mt-4 text-[17px] text-[#4a2c1a]">{tagline}</p>
              <Ornament className="mt-5 w-[170px]" />
              <Bg
                src={mode === 'login' ? IMG.ringLogin : IMG.ringFlowers}
                fallback="transparent"
                size="contain"
                pos="center bottom"
                className="pointer-events-none mt-4 h-[260px] w-full flex-1 lg:h-auto"
              />
            </div>
          </aside>
        </div>
      </div>

      <Footer className="mt-4" />
    </main>
  );
}
