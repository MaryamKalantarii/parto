'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Bg } from '@/components/ui/Bg';
import { Ico } from '@/components/icons/Ico';
import { IMG } from '@/lib/themeImages';
import { Ornament } from '@/components/ui/Ornament';

/* ستاره‌های کهکشانی (مقادیر ثابت تا SSR و کلاینت یکسان باشند)
   x/y: درصد موقعیت، s: اندازه، d: تأخیر، t: مدت چشمک، k: ستاره‌ی چهارپر درخشان */
const stars = [
  { x: 6, y: 8, s: 3, d: 0, t: 3.2 }, { x: 14, y: 22, s: 2, d: 1.1, t: 4 }, { x: 22, y: 6, s: 4, d: 0.4, t: 3.6, k: 1 },
  { x: 31, y: 16, s: 2, d: 2.2, t: 4.4 }, { x: 40, y: 4, s: 3, d: 0.8, t: 3 }, { x: 49, y: 20, s: 2, d: 1.7, t: 3.8 },
  { x: 58, y: 9, s: 5, d: 0.2, t: 4.2, k: 1 }, { x: 67, y: 24, s: 2, d: 2.6, t: 3.4 }, { x: 75, y: 7, s: 3, d: 1.3, t: 4.6 },
  { x: 84, y: 18, s: 2, d: 0.6, t: 3.1 }, { x: 92, y: 10, s: 4, d: 2, t: 3.9, k: 1 }, { x: 96, y: 30, s: 2, d: 1.5, t: 4.1 },
  { x: 4, y: 42, s: 2, d: 2.4, t: 3.5 }, { x: 11, y: 58, s: 4, d: 0.9, t: 4.3, k: 1 }, { x: 19, y: 72, s: 2, d: 1.9, t: 3.3 },
  { x: 8, y: 88, s: 3, d: 0.3, t: 4.5 }, { x: 27, y: 92, s: 2, d: 2.8, t: 3.7 }, { x: 36, y: 84, s: 4, d: 1.2, t: 3.2, k: 1 },
  { x: 45, y: 95, s: 2, d: 0.7, t: 4.4 }, { x: 54, y: 86, s: 3, d: 2.1, t: 3.6 }, { x: 63, y: 94, s: 2, d: 1.6, t: 4 },
  { x: 72, y: 82, s: 5, d: 0.5, t: 3.9, k: 1 }, { x: 81, y: 93, s: 2, d: 2.5, t: 3.3 }, { x: 89, y: 78, s: 3, d: 1, t: 4.2 },
  { x: 95, y: 62, s: 2, d: 1.8, t: 3.5 }, { x: 93, y: 46, s: 4, d: 0.1, t: 4.6, k: 1 },
];

/* ستاره‌های پس‌زمینه‌ی کل صفحه (کم‌تعداد و ملایم) */
const pageStars = [
  { x: 5, y: 14, s: 3, d: 0.2, t: 4 }, { x: 12, y: 60, s: 4, d: 1.4, t: 5, k: 1 }, { x: 20, y: 34, s: 2, d: 2.2, t: 3.6 },
  { x: 90, y: 20, s: 4, d: 0.8, t: 4.4, k: 1 }, { x: 95, y: 55, s: 3, d: 1.9, t: 3.8 }, { x: 85, y: 78, s: 2, d: 0.4, t: 4.8 },
  { x: 3, y: 86, s: 3, d: 2.6, t: 4.2 }, { x: 50, y: 4, s: 2, d: 1.1, t: 3.4 },
];

function Star({ s }: { s: { x: number; y: number; s: number; d: number; t: number; k?: number } }) {
  return (
    <span
      aria-hidden
      className={`au-anim au-twinkle absolute ${s.k ? 'au-spark' : 'rounded-full'}`}
      style={{
        left: `${s.x}%`, top: `${s.y}%`, width: s.k ? s.s * 3.2 : s.s, height: s.k ? s.s * 3.2 : s.s,
        background: s.k ? 'linear-gradient(135deg,#fff7e6,#f2c58d)' : 'radial-gradient(circle,#fffaf0 0%,#f7d9ae 55%,transparent 72%)',
        boxShadow: s.k ? '0 0 12px 2px rgba(255,214,160,.85)' : '0 0 8px 1px rgba(255,220,170,.8)',
        animation: `au-twinkle ${s.t}s ease-in-out ${s.d}s infinite`,
      }}
    />
  );
}

/* قالب مشترک ورود و ثبت‌نام: کارت دوبخشی (تصویر | فرم) روی ابریشم.
   هدر و فوتر همان هدر/فوتر اصلی سایت‌اند.
   image: عکس تمام‌قد پنل کناری (اگر ندهی، عکس پیش‌فرض هر حالت استفاده می‌شود) */
export function AuthLayout({
  mode, children, welcome = 'به پرتو خوش آمدید', tagline = 'زیبایی را با ما تجربه کنید...', image,
}: {
  mode: 'login' | 'signup';
  children: React.ReactNode;
  welcome?: string;
  tagline?: string;
  image?: string;
}) {
  const photo = image ?? (mode === 'login' ? IMG.ringLogin : IMG.ringFlowers);

  return (
    <main className="relative isolate min-h-screen w-full overflow-x-hidden font-sans text-[#2a170e]">
      <style>{`
        @keyframes au-twinkle { 0%,100% { opacity:.25; transform: scale(.7); } 50% { opacity:1; transform: scale(1.15); } }
        @keyframes au-sweep { 0% { transform: translateX(-140%) skewX(-18deg); } 55%,100% { transform: translateX(260%) skewX(-18deg); } }
        @keyframes au-neb-a { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(6%,8%,0) scale(1.2); } }
        @keyframes au-neb-b { 0%,100% { transform: translate3d(0,0,0) scale(1.1); } 50% { transform: translate3d(-8%,-6%,0) scale(.9); } }
        @keyframes au-border { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }
        @keyframes au-zoom { 0%,100% { transform: scale(1.04); } 50% { transform: scale(1.12); } }
        @keyframes au-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        /* فرم فشرده و واکنش‌گرا: اندازه‌ها با ارتفاع صفحه تنظیم می‌شوند */
        .au-form h1 { font-size: clamp(22px, 3.4vh, 28px) !important; line-height: 1.3; }
        .au-form form { margin-top: clamp(10px, 2vh, 24px) !important; }
        .au-form form > :not([hidden]) ~ :not([hidden]) { margin-top: clamp(8px, 1.5vh, 16px) !important; }
        .au-form input.parto-field { height: clamp(40px, 5.6vh, 52px) !important; }
        .au-form .parto-btn-dark { height: clamp(44px, 6vh, 56px) !important; font-size: clamp(14px, 1.9vh, 16px) !important; }
        .au-form button.parto-btn-soft { height: clamp(40px, 5.4vh, 48px) !important; }
        .au-form form ~ div { margin-top: clamp(8px, 1.6vh, 20px) !important; }
        .au-form form ~ div:last-child { padding-top: clamp(8px, 1.5vh, 18px) !important; }
        @media (max-width: 480px) {
          .au-form button.parto-btn-soft { font-size: 12.5px !important; gap: 6px !important; padding-inline: 6px; }
          .au-form form ~ div.grid { gap: 10px !important; }
        }
        .au-spark { clip-path: polygon(50% 0%,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0% 50%,38% 38%); }
        .au-neb { position:absolute; border-radius:9999px; filter: blur(55px); will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .au-anim, .au-neb, .au-photo, .au-sweep, .au-frame { animation: none !important; } }
      `}</style>

      <Bg src={IMG.silk} fallback="linear-gradient(160deg,#e2c2a2,#c9a07c 40%,#e0bf9f 65%,#b98d68)" className="absolute inset-0 -z-10" />
      {/* درخشش ملایم روی پس‌زمینه‌ی صفحه */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {pageStars.map((p, i) => <Star key={i} s={p} />)}
      </div>
      {/* سایه ملایم زیر هدر ثابت تا خوانا بماند */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[130px] bg-gradient-to-b from-[#1c110c]/80 to-transparent" />

      <Header />

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-3 pb-10 pt-[80px] sm:px-6 lg:pt-[100px]">
        {/* قاب درخشان دور کارت */}
        <div
          className="au-frame rounded-[36px] p-[1.5px] shadow-[0_28px_70px_rgba(70,40,24,0.4),0_0_50px_rgba(255,214,160,0.25)]"
          style={{
            background: 'linear-gradient(90deg,#f6dcb6,#fff8ea,#d9a877,#fff1d6,#b98458,#f6dcb6)',
            backgroundSize: '300% 100%',
            animation: 'au-border 9s linear infinite',
          }}
        >
          <div className="grid grid-cols-1 overflow-hidden rounded-[34.5px] lg:grid-cols-[1.02fr_1fr]">
            {/* ───── راست: فرم ───── */}
            <section className="relative isolate overflow-hidden lg:order-1">
              {/* پایه‌ی کرم + سحابی‌های رنگی ملایم */}
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#fdeee1] to-[#f8dfcc]" />
              <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
                <div className="au-neb au-anim" style={{ width: 340, height: 340, top: '-12%', right: '-14%', background: 'rgba(240,170,140,.42)', animation: 'au-neb-a 14s ease-in-out infinite' }} />
                <div className="au-neb au-anim" style={{ width: 380, height: 380, bottom: '-18%', left: '-16%', background: 'rgba(214,160,200,.30)', animation: 'au-neb-b 18s ease-in-out infinite' }} />
                <div className="au-neb au-anim" style={{ width: 260, height: 260, top: '38%', left: '30%', background: 'rgba(255,214,150,.38)', animation: 'au-neb-a 16s ease-in-out infinite reverse' }} />
                {/* غبار ستاره‌ای */}
                {stars.map((p, i) => <Star key={i} s={p} />)}
                {/* بافت خیلی ظریف نقطه‌ای */}
                <div
                  className="absolute inset-0 opacity-[0.10]"
                  style={{ backgroundImage: 'radial-gradient(#8d5a3a 0.8px, transparent 0.8px)', backgroundSize: '18px 18px' }}
                />
                {/* رگه‌ی نور عبوری */}
                <div className="au-sweep au-anim absolute inset-y-0 left-0 w-1/3" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent)', animation: 'au-sweep 7s ease-in-out infinite' }} />
              </div>

              <div role="tablist" aria-label="ورود یا ثبت‌نام" className="flex gap-0 px-3 pt-3 sm:px-4 sm:pt-4">
                {([
                  ['login', 'ورود به حساب کاربری', 'user', '/login', 'ورود'],
                  ['signup', 'ثبت نام', 'pencil', '/signup', 'ثبت نام'],
                ] as const).map(([id, label, icon, href, short]) => {
                  const on = mode === id;
                  return (
                    <Link
                      key={id}
                      href={href}
                      role="tab"
                      aria-selected={on}
                      className={`relative flex h-[clamp(42px,5.6vh,50px)] flex-1 items-center justify-center gap-2 rounded-t-[22px] text-[13px] font-bold backdrop-blur-sm transition sm:gap-2.5 sm:text-[14px] ${
                        on ? 'bg-white/55 text-[#2a170e] shadow-[0_-2px_14px_rgba(120,76,48,.14)]' : 'bg-[#f3d6c0]/55 text-[#3a2418] hover:bg-white/40'
                      }`}
                    >
                      <Ico name={icon} className="h-[17px] w-[17px] sm:h-[19px] sm:w-[19px]" sw={1.6} />
                      <span className="sm:hidden">{short}</span>
                      <span className="hidden sm:inline">{label}</span>
                      {on && <span aria-hidden className="absolute inset-x-6 bottom-0 h-[3px] rounded-t bg-gradient-to-r from-[#b98458] via-[#3a2418] to-[#b98458]" />}
                    </Link>
                  );
                })}
              </div>
              <div className="au-form px-4 sm:px-8" style={{ paddingTop: 'clamp(14px, 3vh, 32px)', paddingBottom: 'clamp(14px, 2.6vh, 30px)' }}>{children}</div>
            </section>

            {/* ───── چپ: عکس تمام‌قد ───── */}
            <aside className="relative order-first min-h-[150px] overflow-hidden sm:min-h-[200px] lg:order-2 lg:min-h-0" aria-label="خوش آمدید">
              {/* عکس پر شده تا هیچ فضای خالی نماند (با زوم بسیار آرام) */}
              <Bg
                src={photo}
                fallback="linear-gradient(160deg,#e8cdb2,#c9a07c 50%,#8d6243)"
                size="cover"
                pos="center"
                className="au-photo au-anim absolute inset-0"
                style={{ animation: 'au-zoom 22s ease-in-out infinite' }}
              />
              {/* لایه‌های رنگ برای خوانایی متن و حال‌وهوای گرم */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#2a170e]/70 via-[#2a170e]/10 to-[#2a170e]/65" />
              <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(70% 55% at 50% 58%, rgba(255,214,160,0.22), transparent 70%)' }} />
              {/* ستاره‌های روی عکس */}
              <div aria-hidden className="absolute inset-0">
                {stars.filter((_, i) => i % 2 === 0).map((p, i) => <Star key={i} s={p} />)}
              </div>
              {/* قاب نازک داخلی */}
              <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[26px] border border-white/35 shadow-[inset_0_0_30px_rgba(255,226,190,0.25)]" />

              <div className="relative flex h-full flex-col items-center justify-center px-6 py-8 text-center lg:justify-start lg:pt-[clamp(32px,7vh,64px)]">
                <h2 className="text-[24px] font-bold text-[#fff4e6] drop-shadow-[0_2px_10px_rgba(20,8,2,0.6)] sm:text-[28px] lg:text-[32px]">{welcome}</h2>
                <p className="mt-2 text-[14px] text-[#f8e3cd] sm:text-[16px] lg:mt-4 lg:text-[17px] drop-shadow-[0_1px_6px_rgba(20,8,2,0.55)]">{tagline}</p>
                <Ornament className="mt-4 hidden w-[170px] !text-[#f3d3ad] lg:flex" />
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer className="mt-4" />
    </main>
  );
}
