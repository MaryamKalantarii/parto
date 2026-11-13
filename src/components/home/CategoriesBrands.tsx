"use client";

import React from "react";
import Link from "next/link";
import { Photo, DiamondIcon, Chevron } from "./primitives";
import { Reveal } from "@/components/ui/Reveal";

const categories = [
  { label: "ساعت‌ها", en: "Watches", img: "/images/categories/watch.jpg", href: "/product" },
  { label: "دستبندها", en: "Bracelets", img: "/images/categories/brec.jpg", href: "/product" },
  { label: "گوشواره‌ها", en: "Earrings", img: "/images/categories/earing.jpg", href: "/product" },
  { label: "گردنبندها", en: "Necklaces", img: "/images/categories/nekk.jpg", href: "/product" },
  { label: "انگشترها", en: "Rings", img: "/images/categories/ring.jpg", href: "/product" },
];

export function Categories() {
  return (
    <section className="relative z-10 mx-auto mt-14 max-w-[1360px] px-6 pb-6" aria-labelledby="cat-title">
      <Reveal className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <span className="font-serif text-[13px] italic tracking-[0.28em] text-[#b3865f]">COLLECTIONS</span>
        <h2 id="cat-title" className="mt-1 text-[24px] font-bold text-[#2a1a12] sm:text-[30px]">دسته‌بندی محصولات</h2>
        <p className="mt-1.5 text-[13px] text-[#7a5a46]">انتخابی خاص برای سلیقه‌های خاص</p>
        <div aria-hidden className="mt-4 flex w-full max-w-[320px] items-center gap-3 text-[#b3865f]">
          <span className="h-px flex-1 bg-gradient-to-l from-[#b3865f]/70 to-transparent" />
          <DiamondIcon className="h-[16px] w-[20px]" />
          <span className="h-px flex-1 bg-gradient-to-r from-[#b3865f]/70 to-transparent" />
        </div>
      </Reveal>

      <ul className="no-scrollbar -mx-6 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-8 pb-12 pt-3 scroll-px-8 sm:mt-12 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-8 lg:overflow-visible lg:px-0">
        {categories.map((c, idx) => (
          <li
            key={c.label}
            className="w-[168px] shrink-0 snap-center sm:w-[190px] lg:w-auto"
          >
            <Reveal delay={idx * 100} variant="up">
              <Link
                href={c.href}
                className="group relative block transition-transform duration-500 ease-out hover:-translate-y-2"
                aria-label={`مشاهده ${c.label}`}
              >
                {/* قاب قوسی بیرونی که با هاور باز می‌شود */}
                <span
                  aria-hidden
                  className="absolute -inset-2 rounded-t-[999px] rounded-b-[34px] border border-[#c8a07c]/55 transition-all duration-500 group-hover:-inset-3 group-hover:border-[#b3865f]"
                />

                <span className="relative block aspect-[3/4.1] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-[#e9d3be] shadow-[0_22px_40px_-10px_rgba(90,56,34,0.45)] ring-1 ring-white/70 transition-shadow duration-500 group-hover:shadow-[0_30px_50px_-10px_rgba(90,56,34,0.55)]">
                  <Photo
                    src={c.img}
                    gradient="radial-gradient(circle at 35% 30%, #fff, #e7cdb4 60%, #c9a07c)"
                    className="absolute inset-0 transition duration-700 ease-out group-hover:scale-110"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#24130b]/55 via-transparent to-white/15" />
                  {/* بازتاب نور */}
                  <span aria-hidden className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition duration-700 group-hover:left-[130%] group-hover:opacity-100" />
                </span>

                {/* برچسب شناور روی لبه‌ی پایین */}
                <span className="absolute inset-x-3 -bottom-6 flex items-center justify-between gap-2 rounded-full border border-white/90 bg-gradient-to-b from-[#fffaf4] to-[#f6e5d4] py-2 pr-5 pl-2 shadow-[0_12px_24px_rgba(90,56,34,0.22)] transition duration-500 group-hover:-translate-y-1">
                  <span className="flex flex-col leading-tight">
                    <span className="text-[15px] font-bold text-[#2a1a12]">{c.label}</span>
                    <span dir="ltr" className="font-serif text-[11px] italic tracking-[0.12em] text-[#b3865f]">{c.en}</span>
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#4a2c1c] to-[#2a170e] text-[#f3dcc4] transition group-hover:from-[#c8a07c] group-hover:to-[#a87a56] group-hover:text-[#2a1a12]">
                    <Chevron dir="left" className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

const brands = [
  { name: "Van Cleef & Arpels", cls: "font-serif text-[13px] tracking-[0.08em]" },
  { name: "Cartier", cls: "font-serif text-[28px] italic" },
  { name: "BVLGARI", cls: "font-serif text-[22px] tracking-[0.18em]" },
  { name: "TIFFANY & CO.", cls: "font-serif text-[18px] tracking-[0.1em]" },
  { name: "Chopard", cls: "font-serif text-[27px] italic" },
  { name: "ROLEX", cls: "font-serif text-[24px] tracking-[0.12em] font-semibold" },
];

export function Brands() {
  /* دو بار تکرار برای حلقه بی‌پایان مارکی */
  const loop = [...brands, ...brands];
  return (
    <section className="relative mx-auto mt-4 max-w-[1360px] px-5 py-14 sm:px-12 sm:py-20">
      <style>{BRANDS_CSS}</style>

      <Reveal className="text-right">
        <p className="flex items-center gap-3 text-[12px] font-medium text-[#b3865f] sm:text-[13px]">
          <span className="h-px w-8 bg-[#c8a07c] sm:w-12" />
          همکاری با بهترین‌ها
        </p>
        <h2 className="mt-3 text-[24px] font-bold text-[#2a1a12] sm:text-[30px]">برندهای معتبر</h2>
        <p className="mt-1.5 text-[13px] text-[#8a6a52] sm:text-[14px]">برترین برندهای جهانی در پارتو</p>
      </Reveal>

      <Reveal variant="fade" delay={150} className="mt-8 sm:mt-10">
        <div
          dir="ltr"
          className="brands-viewport relative overflow-hidden py-6"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
            maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          }}
        >
          <div className="brands-track flex w-max items-center">
            {loop.map((b, n) => (
              <div
                key={`${b.name}-${n}`}
                aria-hidden={n >= brands.length}
                className="brand-box mx-2.5 flex h-[76px] w-[160px] shrink-0 items-center justify-center rounded-2xl text-center sm:mx-3 sm:h-[88px] sm:w-[200px]"
              >
                <span className={`brand-name ${b.cls}`}>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const BRANDS_CSS = `
/* مارکی: بدون gap تا حلقه دقیقاً روی -۵۰٪ بدون پرش بسته شود؛ با هاور متوقف می‌شود */
@keyframes brands-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.brands-track { animation: brands-scroll 38s linear infinite; will-change: transform; }
.brands-viewport:hover .brands-track { animation-play-state: paused; }

/* باکس هر برند: شیشه‌ای روشن؛ هاور = بلند شدن + برق + خط طلایی پایین + تیره شدن نام */
.brand-box {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255,255,255,.75), rgba(255,250,244,.45));
  border: 1px solid rgba(200,160,124,.35);
  box-shadow: 0 6px 18px rgba(90,56,34,.06);
  transition: transform .55s cubic-bezier(.22,1,.36,1), box-shadow .55s, border-color .55s, background .55s;
}
.brand-box::before {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 35%, rgba(255,255,255,.9) 50%, transparent 65%);
  transform: translateX(-120%);
  transition: transform .9s cubic-bezier(.22,1,.36,1);
}
.brand-box::after {
  content: "";
  position: absolute; left: 22%; right: 22%; bottom: 0; height: 2px;
  background: linear-gradient(90deg, transparent, #c8a07c, transparent);
  transform: scaleX(0);
  transition: transform .55s cubic-bezier(.22,1,.36,1);
}
.brand-box:hover {
  transform: translateY(-8px);
  border-color: rgba(200,160,124,.8);
  background: #fffaf4;
  box-shadow: 0 18px 34px rgba(90,56,34,.16);
}
.brand-box:hover::before { transform: translateX(120%); }
.brand-box:hover::after { transform: scaleX(1); }
.brand-name { position: relative; color: #6b4a36; transition: color .5s, transform .55s cubic-bezier(.22,1,.36,1); }
.brand-box:hover .brand-name { color: #2a1a12; transform: scale(1.06); }

@media (prefers-reduced-motion: reduce) {
  .brands-track { animation: none; }
}
`;
