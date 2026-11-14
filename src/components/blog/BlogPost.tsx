"use client";

/**
 * صفحه‌ی تک‌مقاله  →  components/blog/BlogPost.tsx
 * متن‌محور و خوانا: نوار پیشرفت مطالعه، فهرست مطالب چسبان با اسکرول‌اسپای،
 * جعبه‌ی نکته، کپی لینک، مقالات مرتبط و دعوت به مشاوره. عکس اختیاری است.
 */

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Photo, ArrowLeft, DiamondIcon, GoldButton } from "@/components/home/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { posts as allPosts, type BlogPost as Post } from "@/data/blog";

const GOLD_TEXT = "text-[#84563a]";

function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent">
      <div className="h-full origin-right bg-gradient-to-l from-[#e2bf9f] to-[#b3865f]" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

function CopyLink() {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        } catch {
          /* کلیپ‌بورد در دسترس نبود */
        }
      }}
      className="inline-flex items-center gap-2 rounded-full border border-[#c8a07c]/55 bg-white/55 px-4 py-2 text-[13px] font-medium text-[#3a2418] transition hover:border-[#b3865f] hover:bg-white"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
      </svg>
      {done ? "لینک کپی شد ✓" : "کپی لینک مقاله"}
    </button>
  );
}

export function BlogPost({ post }: { post: Post }) {
  const heads = post.content.map((b, i) => ({ b, i })).filter((x) => x.b.type === "h2") as { b: { type: "h2"; text: string }; i: number }[];
  const [active, setActive] = useState<string>(heads[0] ? `sec-${heads[0].i}` : "");
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  useEffect(() => {
    const els = heads.map((h) => document.getElementById(`sec-${h.i}`)).filter(Boolean) as HTMLElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.slug]);

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-[1100px] px-5 pb-16 pt-32 sm:px-10 sm:pb-24 sm:pt-40">
        {/* مسیر صفحه */}
        <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-2 text-[13px] text-[#7a5a46]">
          <Link href="/" className="transition hover:text-[#2a1a12]">خانه</Link>
          <span aria-hidden>/</span>
          <Link href="/blog" className="transition hover:text-[#2a1a12]">مجله</Link>
          <span aria-hidden>/</span>
          <span className="text-[#2a1a12]" aria-current="page">{post.category}</span>
        </nav>

        {/* سربرگ مقاله */}
        <header className="mx-auto mt-8 max-w-[820px] text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2a1a12]/[0.07] px-4 py-1.5 text-[13px] font-medium text-[#5a3a28]">{post.category}</span>
            <h1 className="mt-5 text-[28px] font-bold leading-[1.7] text-[#2a1a12] sm:text-[40px]">{post.title}</h1>
            <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-8 text-[#6b4a36] sm:text-[17px]">{post.excerpt}</p>
            <div className="mt-5 flex items-center justify-center gap-3 text-[13px] text-[#7a5a46]">
              <span>{post.date}</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-[#c8a07c]" />
              <span>زمان مطالعه: {post.read}</span>
            </div>
            <div aria-hidden className="mx-auto mt-6 flex w-full max-w-[260px] items-center gap-3 text-[#b3865f]">
              <span className="h-px flex-1 bg-gradient-to-l from-[#b3865f]/70 to-transparent" />
              <DiamondIcon className="h-[14px] w-[18px]" />
              <span className="h-px flex-1 bg-gradient-to-r from-[#b3865f]/70 to-transparent" />
            </div>
          </Reveal>
        </header>

        {/* عکس اختیاری: کم‌ارتفاع، تا تمرکز روی متن بماند */}
        {post.img && (
          <Reveal variant="scale" className="mt-10">
            <Photo
              src={post.img}
              gradient="linear-gradient(135deg,#d9b08c,#8d6243)"
              className="aspect-[21/9] w-full rounded-[28px] shadow-[0_18px_44px_rgba(60,36,24,0.25)] md:rounded-[36px]"
            />
          </Reveal>
        )}

        {/* متن + فهرست مطالب */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14">
          <div className="mx-auto w-full max-w-[720px]">
            {post.content.map((b, i) => {
              if (b.type === "h2")
                return (
                  <h2 key={i} id={`sec-${i}`} className="mb-4 mt-12 flex scroll-mt-28 items-center gap-3 text-[22px] font-bold leading-[1.8] text-[#2a1a12] sm:text-[26px]">
                    <DiamondIcon className="h-[15px] w-[19px] shrink-0 text-[#b3865f]" />
                    {b.text}
                  </h2>
                );
              if (b.type === "p")
                return (
                  <p key={i} className={`mt-4 text-[16.5px] leading-[2.25] text-[#3a2418] sm:text-[17.5px] ${i === 0 ? "text-[18px] text-[#5a3a28] sm:text-[19.5px]" : ""}`}>
                    {b.text}
                  </p>
                );
              if (b.type === "ul")
                return (
                  <ul key={i} className="mt-5 space-y-3">
                    {b.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[16px] leading-[2.1] text-[#3a2418] sm:text-[17px]">
                        <span aria-hidden className="mt-[0.95em] h-2 w-2 shrink-0 rotate-45 bg-gradient-to-br from-[#e2bf9f] to-[#b3865f]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              return (
                <aside key={i} className="glass-cream my-8 rounded-[22px] border-r-4 border-[#b3865f] px-6 py-5">
                  {b.title && <p className={`text-[14px] font-bold ${GOLD_TEXT}`}>{b.title}</p>}
                  <p className="mt-1 text-[15.5px] leading-8 text-[#3a2418]">{b.text}</p>
                </aside>
              );
            })}

            {/* پایان مقاله */}
            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#c8a07c]/40 pt-6">
              <CopyLink />
              <Link href="/blog" className="group inline-flex items-center gap-2 text-[13.5px] font-bold text-[#3a2418]">
                بازگشت به مجله
                <ArrowLeft className="h-4 w-4 transition duration-500 group-hover:-translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* فهرست مطالب (فقط دسکتاپ) */}
          {heads.length > 1 && (
            <aside className="hidden lg:block">
              <nav aria-label="فهرست مطالب" className="sticky top-28 text-right">
                <p className={`mb-4 text-[13px] font-bold ${GOLD_TEXT}`}>در این مقاله</p>
                <ul className="space-y-1 border-r border-[#c8a07c]/40">
                  {heads.map((h) => {
                    const id = `sec-${h.i}`;
                    const on = active === id;
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={`-mr-px block border-r-2 py-1.5 pr-4 text-[13.5px] leading-7 transition ${
                            on ? "border-[#b3865f] font-bold text-[#2a1a12]" : "border-transparent text-[#7a5a46] hover:text-[#2a1a12]"
                          }`}
                        >
                          {h.b.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          )}
        </div>

        {/* دعوت به مشاوره */}
        <Reveal variant="scale" className="mt-16">
          <div
            className="relative overflow-hidden rounded-[28px] px-7 py-10 text-center md:rounded-[40px] md:px-14"
            style={{ background: "radial-gradient(80% 140% at 85% 0%, rgba(150,98,66,0.45), transparent 60%), linear-gradient(160deg,#1c110c,#33201a)" }}
          >
            <span aria-hidden className="pointer-events-none absolute inset-3 rounded-[22px] border border-[#e8c9aa]/20 md:inset-4 md:rounded-[32px]" />
            <h2 className="relative text-[22px] font-bold text-[#f3dcc4] sm:text-[28px]">سوالی دارید؟ با زرگران پرتو مشورت کنید</h2>
            <p className="relative mx-auto mt-2 max-w-[520px] text-[14.5px] leading-8 text-[#e6d2bf]/90">مشاوره‌ی انتخاب جواهر و طراحی اختصاصی رایگان است.</p>
            <div className="relative mt-6">
              <GoldButton href="/contact" className="!px-8 !py-3.5 !text-[14px]">
                دریافت مشاوره رایگان
                <ArrowLeft className="h-4 w-4" />
              </GoldButton>
            </div>
          </div>
        </Reveal>

        {/* مقالات مرتبط */}
        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-title">
            <Reveal>
              <h2 id="related-title" className="text-[22px] font-bold text-[#2a1a12] sm:text-[26px]">بیشتر بخوانید</h2>
            </Reveal>
            <ul className="mt-5 grid gap-5 md:grid-cols-2">
              {related.map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={i * 110} className="h-full">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full flex-col rounded-[24px] border border-white/80 bg-gradient-to-b from-[#fffaf4] to-[#f6e5d4] p-6 text-right shadow-[0_14px_30px_rgba(90,56,34,0.12)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(90,56,34,0.2)]"
                    >
                      <span className="w-fit rounded-full bg-[#2a1a12]/[0.07] px-3 py-1 text-[12.5px] font-medium text-[#5a3a28]">{p.category}</span>
                      <h3 className="mt-3 text-[18px] font-bold leading-[1.8] text-[#2a1a12]">{p.title}</h3>
                      <p className="mt-1 flex-1 text-[14px] leading-7 text-[#6b4a36]">{p.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-[#3a2418]">
                        ادامه مطلب
                        <ArrowLeft className="h-4 w-4 transition duration-500 group-hover:-translate-x-1.5" />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}

export default BlogPost;
