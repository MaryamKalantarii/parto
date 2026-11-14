"use client";

/**
 * صفحه‌ی لیست وبلاگ  →  components/blog/BlogList.tsx
 * طراحی متن‌محور: مقاله‌ی ویژه‌ی تیره + فهرست ردیفی با شماره‌ی بزرگ (عکس فقط اختیاری و کوچک)
 */

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Photo, ArrowLeft, DiamondIcon, GoldButton } from "@/components/home/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { posts as allPosts, type BlogPost } from "@/data/blog";

const toFa = (n: number) => String(n).padStart(2, "0").replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
const GOLD_TEXT = "text-[#84563a]";
const PAGE = 8;

function Meta({ p, light = false }: { p: BlogPost; light?: boolean }) {
  return (
    <span className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] ${light ? "text-[#ecd9c6]" : "text-[#7a5a46]"}`}>
      <span>{p.date}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-[#c8a07c]" />
      <span>زمان مطالعه: {p.read}</span>
    </span>
  );
}

export function BlogList({ posts = allPosts }: { posts?: BlogPost[] }) {
  const [cat, setCat] = useState("همه");
  const [q, setQ] = useState("");
  const [count, setCount] = useState(PAGE);

  const categories = useMemo(() => ["همه", ...Array.from(new Set(posts.map((p) => p.category)))], [posts]);
  const featured = posts.find((p) => p.featured) ?? posts[0];

  const filtered = useMemo(() => {
    const term = q.trim();
    return posts.filter(
      (p) => (cat === "همه" || p.category === cat) && (!term || p.title.includes(term) || p.excerpt.includes(term)),
    );
  }, [posts, cat, q]);

  const showFeatured = cat === "همه" && !q.trim() && !!featured;
  const rows = (showFeatured ? filtered.filter((p) => p.slug !== featured.slug) : filtered).slice(0, count);
  const total = showFeatured ? filtered.length - 1 : filtered.length;

  return (
    <section className="mx-auto max-w-[1100px] px-5 pb-16 pt-32 sm:px-10 sm:pb-24 sm:pt-40" aria-labelledby="blog-title">
      {/* عنوان */}
      <Reveal className="mx-auto flex max-w-[680px] flex-col items-center text-center">
        <span className="font-serif text-[13px] italic tracking-[0.28em] text-[#84563a]">JOURNAL</span>
        <h1 id="blog-title" className="mt-1 text-[30px] font-bold text-[#2a1a12] sm:text-[40px]">مجله جواهرات پرتو</h1>
        <p className="mt-2 text-[14px] leading-7 text-[#6b4a36] sm:text-[15px]">راهنمای خرید، نگهداری و دانستنی‌هایی که هر دوست‌دار جواهر باید بداند.</p>
        <div aria-hidden className="mt-5 flex w-full max-w-[320px] items-center gap-3 text-[#b3865f]">
          <span className="h-px flex-1 bg-gradient-to-l from-[#b3865f]/70 to-transparent" />
          <DiamondIcon className="h-[16px] w-[20px]" />
          <span className="h-px flex-1 bg-gradient-to-r from-[#b3865f]/70 to-transparent" />
        </div>
      </Reveal>

      {/* فیلتر و جستجو */}
      <Reveal delay={100}>
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" aria-label="دسته‌بندی مقالات" className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {categories.map((c) => {
              const on = c === cat;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setCat(c);
                    setCount(PAGE);
                  }}
                  className={`shrink-0 rounded-full border px-5 py-2 text-[13.5px] font-medium transition duration-300 ${
                    on
                      ? "border-transparent bg-gradient-to-br from-[#4a2c1c] to-[#2a170e] text-[#f3dcc4] shadow-[0_8px_18px_rgba(42,23,14,0.3)]"
                      : "border-[#c8a07c]/45 bg-white/50 text-[#5a3a28] hover:border-[#b3865f] hover:bg-white"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <label className="flex h-11 w-full items-center gap-2.5 rounded-full border border-[#c8a07c]/45 bg-white/60 px-4 transition focus-within:border-[#b3865f] focus-within:bg-white lg:w-[280px]">
            <svg aria-hidden viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 ${GOLD_TEXT}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m20 20-4-4" />
            </svg>
            <span className="sr-only">جستجو در مقالات</span>
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setCount(PAGE);
              }}
              placeholder="جستجو در مقالات…"
              className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2a1a12] outline-none placeholder:text-[#7a5a46]/80"
            />
          </label>
        </div>
      </Reveal>

      {/* مقاله‌ی ویژه (متن‌محور) */}
      {showFeatured && (
        <Reveal variant="scale" delay={150} className="mt-10">
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative block overflow-hidden rounded-[28px] shadow-[0_18px_44px_rgba(60,36,24,0.3)] transition duration-500 hover:shadow-[0_28px_58px_rgba(60,36,24,0.42)] md:rounded-[40px]"
            style={{ background: "radial-gradient(80% 120% at 88% 0%, rgba(150,98,66,0.45), transparent 60%), linear-gradient(160deg,#1c110c,#33201a)" }}
          >
            {featured.img && (
              <Photo
                src={featured.img}
                gradient="linear-gradient(transparent,transparent)"
                className="absolute inset-y-0 left-0 w-full opacity-30 transition duration-[1400ms] group-hover:scale-105 md:w-[48%] md:opacity-55"
                style={{
                  WebkitMaskImage: "linear-gradient(to right,#000 30%,transparent)",
                  maskImage: "linear-gradient(to right,#000 30%,transparent)",
                }}
              />
            )}
            <span aria-hidden className="pointer-events-none absolute inset-3 rounded-[22px] border border-[#e8c9aa]/20 transition duration-700 group-hover:border-[#e8c9aa]/45 md:inset-4 md:rounded-[32px]" />
            <div className="relative px-7 py-10 text-right sm:px-12 md:max-w-[720px] md:px-16 md:py-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e2bf9f]/15 px-3.5 py-1 text-[12.5px] font-medium text-[#f0d8c0] ring-1 ring-[#e2bf9f]/40">
                مقاله‌ی ویژه · {featured.category}
              </span>
              <h2 className="mt-5 text-[25px] font-bold leading-[1.7] text-[#fbf1e6] sm:text-[32px] md:text-[38px]">{featured.title}</h2>
              <p className="mt-3 max-w-[520px] text-[14.5px] leading-8 text-[#ecd9c6] sm:text-[16px]">{featured.excerpt}</p>
              <div className="mt-5">
                <Meta p={featured} light />
              </div>
              <span className="btn-gold mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-bold transition-all duration-500 group-hover:gap-3.5">
                خواندن مقاله
                <ArrowLeft className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>
      )}

      {/* فهرست ردیفی */}
      {rows.length > 0 ? (
        <ol className="mt-10 border-t border-[#c8a07c]/40" aria-live="polite">
          {rows.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={Math.min(i, 4) * 80}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group grid grid-cols-[auto_1fr] items-center gap-x-5 border-b border-[#c8a07c]/40 px-1 py-7 transition-all duration-500 hover:bg-white/45 hover:px-4 sm:grid-cols-[72px_1fr_auto] sm:gap-x-9 sm:py-9"
                >
                  <span aria-hidden className="select-none text-[34px] font-light leading-none text-[#c8a07c]/75 transition duration-500 group-hover:text-[#84563a] sm:text-[46px]">
                    {toFa(i + 1 + (showFeatured ? 1 : 0))}
                  </span>
                  <div className="text-right">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="rounded-full bg-[#2a1a12]/[0.07] px-3 py-1 text-[12.5px] font-medium text-[#5a3a28]">{p.category}</span>
                      <Meta p={p} />
                    </div>
                    <h3 className="mt-3 text-[19px] font-bold leading-[1.8] text-[#2a1a12] sm:text-[23px]">{p.title}</h3>
                    <p className="mt-1 max-w-[620px] text-[14.5px] leading-8 text-[#6b4a36]">{p.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-[13px] font-bold text-[#3a2418]">
                      ادامه مطلب
                      <ArrowLeft className="h-4 w-4 transition duration-500 group-hover:-translate-x-1.5" />
                    </span>
                  </div>
                  {p.img && (
                    <Photo
                      src={p.img}
                      gradient="linear-gradient(135deg,#d9b08c,#8d6243)"
                      className="hidden h-[88px] w-[132px] rounded-2xl shadow-[0_10px_22px_rgba(90,56,34,0.22)] ring-1 ring-white/70 transition duration-700 group-hover:scale-105 sm:block"
                    />
                  )}
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      ) : (
        !showFeatured && (
          <div className="mt-14 flex flex-col items-center text-center">
            <DiamondIcon className="h-12 w-14 text-[#c8a07c]/60" />
            <p className="mt-4 text-[16px] font-bold text-[#2a1a12]">مقاله‌ای پیدا نشد</p>
            <p className="mt-1 text-[14px] text-[#7a5a46]">عبارت دیگری را جستجو کنید یا دسته‌بندی را عوض کنید.</p>
            <GoldButton
              onClick={() => {
                setCat("همه");
                setQ("");
              }}
              className="mt-5 !px-7 !py-3 !text-[14px]"
            >
              نمایش همه‌ی مقالات
            </GoldButton>
          </div>
        )
      )}

      {total > count && (
        <div className="mt-12 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setCount((c) => c + PAGE)}
            className="rounded-full border border-[#b3865f] px-9 py-3 text-[14px] font-bold text-[#3a2418] transition duration-300 hover:bg-[#3a2418] hover:text-[#f3dcc4]"
          >
            مقالات بیشتر
          </button>
        </div>
      )}
    </section>
  );
}

export default BlogList;
