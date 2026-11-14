"use client";

import React, { useRef } from "react";
import { RoundArrow, SectionHeading } from "./primitives";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { allProducts } from "@/data/products";

/* جدیدترین محصولات: محصولات isNew، و در صورت کمبود، بقیه محصولات */
const newest = [
  ...allProducts.filter((p) => p.isNew),
  ...allProducts.filter((p) => !p.isNew),
].slice(0, 4);

/* پرفروش‌ترین‌ها */
const bestSellers = [
  ...allProducts.filter((p) => p.isBestSeller),
  ...allProducts.filter((p) => !p.isBestSeller),
].slice(0, 6);

export function NewestProducts() {
  return (
    <section className="mx-auto mt-12 max-w-[1360px] px-5 sm:mt-14 sm:px-10">
      <Reveal>
        <SectionHeading title="جدیدترین محصولات" subtitle="جدیدترین انتخاب‌ها برای شما" href="/product" />
      </Reveal>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {newest.map((p, i) => (
          <Reveal key={p.id} delay={i * 110} className="h-full">
            <ProductCard product={p} badge={p.isNew ? "جدید" : null} className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ذرات نورانی شناور (مقادیر ثابت تا SSR و کلاینت یکسان باشند) */
const sparkles = [
  { l: "6%", s: 3, d: 0, t: 14 }, { l: "14%", s: 2, d: 4, t: 18 }, { l: "23%", s: 4, d: 2, t: 16 },
  { l: "33%", s: 2, d: 7, t: 20 }, { l: "42%", s: 3, d: 1, t: 15 }, { l: "51%", s: 2, d: 9, t: 19 },
  { l: "60%", s: 4, d: 3, t: 17 }, { l: "68%", s: 2, d: 6, t: 21 }, { l: "76%", s: 3, d: 10, t: 14 },
  { l: "84%", s: 2, d: 5, t: 18 }, { l: "91%", s: 4, d: 8, t: 16 }, { l: "97%", s: 2, d: 11, t: 20 },
];

export function BestSellers() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 340, behavior: "smooth" });
  return (
    <section className="relative mx-3 mt-12 py-16 sm:mx-6 sm:mt-14 sm:py-24 lg:mx-10">
      <style>{`
        @keyframes bs-orb-a { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(8%,10%,0) scale(1.18); } }
        @keyframes bs-orb-b { 0%,100% { transform: translate3d(0,0,0) scale(1.1); } 50% { transform: translate3d(-10%,-8%,0) scale(0.9); } }
        @keyframes bs-orb-c { 0%,100% { transform: translate3d(0,0,0); opacity:.55; } 50% { transform: translate3d(-6%,8%,0); opacity:.9; } }
        @keyframes bs-rise { 0% { transform: translateY(0) scale(.6); opacity: 0; } 15% { opacity: .9; } 85% { opacity: .5; } 100% { transform: translateY(-420px) scale(1.1); opacity: 0; } }
        @keyframes bs-sheen { 0% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
        @keyframes bs-glow { 0%,100% { opacity:.55; } 50% { opacity:1; } }
        .bs-orb { position:absolute; border-radius:9999px; filter: blur(70px); will-change: transform; }
        .bs-card { transition: transform .5s cubic-bezier(.2,.8,.2,1), filter .5s ease; }
        .bs-card:hover { transform: translateY(-10px); filter: drop-shadow(0 24px 30px rgba(0,0,0,.45)); }
        @media (prefers-reduced-motion: reduce) {
          .bs-anim, .bs-orb { animation: none !important; }
          .bs-card, .bs-card:hover { transition: none; transform: none; }
        }
      `}</style>

      {/* پس‌زمینه */}
      <div className="absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:rounded-[40px]">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg,#150b07 0%,#2b1b14 50%,#120a06 100%)" }}
        />
        {/* نورهای متحرک (aurora) */}
        <div className="bs-orb bs-anim" style={{ width: 520, height: 520, top: "-25%", left: "-8%", background: "rgba(214,165,120,0.32)", animation: "bs-orb-a 16s ease-in-out infinite" }} />
        <div className="bs-orb bs-anim" style={{ width: 600, height: 600, bottom: "-35%", right: "-10%", background: "rgba(160,100,62,0.42)", animation: "bs-orb-b 20s ease-in-out infinite" }} />
        <div className="bs-orb bs-anim" style={{ width: 360, height: 360, top: "25%", left: "42%", background: "rgba(255,214,170,0.14)", animation: "bs-orb-c 14s ease-in-out infinite" }} />

        {/* شیارهای عمودی (fluted) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,230,200,0.00) 0px, rgba(255,230,200,0.07) 6px, rgba(255,230,200,0.00) 14px, rgba(0,0,0,0.28) 15px, rgba(0,0,0,0.00) 18px)",
            maskImage: "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.55) 50%, #000 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.55) 50%, #000 100%)",
          }}
        />

        {/* بافت نقطه‌ای ظریف */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,235,215,0.9) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
          }}
        />

        {/* ذرات نورانی در حال صعود */}
        {sparkles.map((sp, i) => (
          <span
            key={i}
            className="bs-anim absolute rounded-full"
            style={{
              left: sp.l,
              bottom: "-10px",
              width: sp.s,
              height: sp.s,
              background: "rgba(255,225,190,0.95)",
              boxShadow: "0 0 10px 2px rgba(255,200,150,0.55)",
              opacity: 0,
              animation: `bs-rise ${sp.t}s linear ${sp.d}s infinite`,
            }}
          />
        ))}

        {/* خط درخشان بالا و پایین با حرکت نور */}
        {["top-0", "bottom-0"].map((pos, i) => (
          <div key={pos} className={`absolute inset-x-0 ${pos} h-px overflow-hidden bg-[rgba(230,190,150,0.18)]`}>
            <div
              className="bs-anim h-full w-1/2"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,225,190,0.95), transparent)",
                animation: `bs-sheen ${7 + i * 2}s ease-in-out infinite`,
              }}
            />
          </div>
        ))}

        {/* قاب دور سکشن: خط بیرونی + شیار داخلی */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-[rgba(230,190,150,0.35)] sm:rounded-[40px]" />
        <div className="pointer-events-none absolute inset-2 rounded-[22px] border border-[rgba(230,190,150,0.14)] shadow-[inset_0_0_30px_rgba(0,0,0,0.35)] sm:inset-3 sm:rounded-[32px]" />

        {/* وینیت ملایم برای عمق */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-10">
        <Reveal>
          <SectionHeading title="پرفروش‌ترین‌ها" subtitle="انتخاب محبوب مشتریان ما" href="/product" dark />
        </Reveal>
        <Reveal variant="fade" delay={120}>
          <div className="flex items-center gap-4">
            <div className="hidden md:block"><RoundArrow dir="right" label="قبلی" onClick={() => scroll(1)} /></div>
            <div
              ref={ref}
              className="no-scrollbar -mx-5 flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 pt-8 sm:mx-0 sm:gap-6 sm:px-0"
            >
              {bestSellers.map((p) => (
                <div key={p.id} className="bs-card shrink-0 snap-center">
                  <ProductCard product={p} badge="پرفروش‌ترین" className="w-[270px] sm:w-[310px]" />
                </div>
              ))}
            </div>
            <div className="hidden md:block"><RoundArrow dir="left" label="بعدی" onClick={() => scroll(-1)} /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
