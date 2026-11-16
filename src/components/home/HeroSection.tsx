"use client";

import React, { useCallback, useEffect, useState, type CSSProperties } from "react";

import { GoldButton, ArrowLeft, Chevron } from "./primitives";

import { Parallax } from "@/components/ui/Parallax";

type Motion = "rise" | "wipe" | "iris";

interface Slide {
  label: string;
  eyebrow: string;
  title: [string, string];
  highlight: string;
  desc: string;
  href: string;
  image: string;
  phoneImage: string;
  fallback: string;
  motion: Motion;
}

const SLIDES: Slide[] = [
  {
    label: "کلکسیون طلا",
    eyebrow: "کلکسیون طلای ۱۸ عیار",
    title: ["هر روز، کمی", "درخشان‌تر"],
    highlight: "درخشان‌تر",
    desc: "طلای ۱۸ عیار با طرح‌های ماندگار، ساخته‌شده با دقت و وسواس زرگران ما.",
    href: "/collection",
    image: "/images/hero/hero-1.jpg",
    phoneImage: "/images/hero/phonehero1.png",
    fallback:
      "radial-gradient(60% 80% at 22% 40%, #d7b79c 0%, #8d6249 38%, #3b2419 75%, #1c110c 100%)",
    motion: "rise",
  },

  {
    label: "الماس‌های گواهی‌دار",
    eyebrow: "الماس‌های گواهی‌دار",
    title: ["الماس واقعی،", "با گواهی اصالت"],
    highlight: "اصالت",
    desc: "تراش‌های دقیق و خلوص بی‌نقص، همراه با گواهی اصالت بین‌المللی.",
    href: "/product",
    image: "/images/hero/hero-2.jpg",
    phoneImage: "/images/hero/phonehero2.jpg",
    fallback:
      "radial-gradient(60% 80% at 30% 45%, #e6cfb8 0%, #a47552 40%, #4a2d1e 75%, #1c110c 100%)",
    motion: "wipe",
  },

  {
    label: "طراحی اختصاصی",
    eyebrow: "طراحی اختصاصی",
    title: ["حلقه‌ای که فقط", "مالِ شماست"],
    highlight: "شماست",
    desc: "از طرح اولیه تا قطعه نهایی، حلقه یا گردنبند دلخواه‌تان را با مشاوره زرگران ما بسازید.",
    href: "/collection",
    image: "/images/hero/hero-3.jpg",
    phoneImage: "/images/hero/phonehero-3.jpg",
    fallback:
      "radial-gradient(60% 80% at 25% 40%, #cfa98a 0%, #7d553d 38%, #35201a 75%, #170e0a 100%)",
    motion: "iris",
  },
];

const DURATION = 3000;

const toFa = (n: number) =>
  String(n)
    .padStart(2, "0")
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

const sparkles = [
  { top: "22%", left: "12%", s: 10, d: "0s" },
  { top: "62%", left: "26%", s: 7, d: "1.2s" },
  { top: "30%", left: "40%", s: 12, d: "2.1s" },
  { top: "74%", left: "48%", s: 8, d: "0.6s" },
  { top: "18%", left: "58%", s: 6, d: "1.7s" },
];

export function HeroSection() {
  const [st, setSt] = useState<{
    cur: number;
    prev: number | null;
  }>({
    cur: 0,
    prev: null,
  });

  const { cur, prev } = st;
  const s = SLIDES[cur];
  const next = (cur + 1) % SLIDES.length;

  const go = useCallback((to: number) => {
    setSt((v) => {
      const n = (to + SLIDES.length) % SLIDES.length;
      return n === v.cur ? v : { cur: n, prev: v.cur };
    });
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => go(cur + 1), DURATION);

    return () => window.clearTimeout(t);
  }, [cur, go]);

  let wordIdx = 0;

  return (
    <section
      dir="rtl"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#1c110c]"
    >
      <style>{CSS}</style>

      <Parallax
        speed={0.05}
        className="absolute inset-x-0 -bottom-[4%] -top-[4%]"
      >
        <div className="absolute inset-0">
          {SLIDES.map((sl, i) => {
            const isCur = i === cur;
            const visible = isCur || i === prev;
            const anim = isCur
              ? prev === null
                ? "hero-in-first"
                : `hero-in-${sl.motion}`
              : "";

            return (
              <div
                key={sl.label}
                className={`absolute inset-0 overflow-hidden ${anim}`}
                style={{
                  zIndex: isCur ? 2 : i === prev ? 1 : 0,
                  opacity: visible ? 1 : 0,
                }}
              >
                <div className="hero-zoom absolute inset-0">
                  <div
                    className="absolute inset-0 lg:hidden"
                    style={{
                      backgroundImage: `url("${sl.phoneImage}"), url("${sl.image}"), ${sl.fallback}`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />

                  <div
                    className="absolute inset-0 hidden lg:block"
                    style={{
                      backgroundImage: `url("${sl.image}"), ${sl.fallback}`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Parallax>

      <div className="absolute inset-0 bg-gradient-to-t from-[#1c110c]/90 via-[#2a1a12]/45 to-[#1c110c]/25 lg:bg-gradient-to-l lg:from-[#1c110c]/92 lg:via-[#2a1a12]/45 lg:to-transparent" />

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1c110c]/70 to-transparent" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden sm:block"
      >
        {sparkles.map((sp, k) => (
          <span
            key={k}
            className="anim-twinkle absolute rotate-45 bg-gradient-to-br from-[#fff4e4] to-[#e2bf9f]"
            style={{
              top: sp.top,
              left: sp.left,
              width: sp.s,
              height: sp.s,
              animationDelay: sp.d,
            }}
          />
        ))}
      </div>

      {/* فقط در موبایل از items-end به items-center تغییر کرده */}
      <div className="relative mx-auto flex h-full max-w-[1360px] items-center px-6 pb-[150px] pt-24 sm:px-10 lg:items-center lg:pb-[110px] lg:pt-[88px]">
        <div
          key={cur}
          className="flex w-full max-w-[660px] flex-col items-start text-right"
        >
          <p
            className="hero-fade flex items-center gap-3 text-[13px] font-medium text-[#f0d8c0] sm:text-[15px]"
            style={{ animationDelay: "100ms" }}
          >
            <span className="hero-rule h-px w-8 bg-[#e2bf9f] sm:w-12" />
            {s.eyebrow}
          </p>

          <h1
            className={`hm-${s.motion} mt-5 text-[38px] font-bold leading-[1.3] text-[#fbf1e6] sm:mt-6 sm:text-[54px] lg:text-[62px] xl:text-[72px]`}
          >
            {s.title.map((line, li) => (
              <span
                key={li}
                className="hero-mask block overflow-hidden py-[0.1em]"
              >
                <span
                  className="hero-line block"
                  style={{ "--i": li } as CSSProperties}
                >
                  {line.split(" ").map((word, wi, arr) => {
                    const idx = wordIdx++;

                    return (
                      <React.Fragment key={wi}>
                        <span
                          className="hero-word inline-block"
                          style={{ "--w": idx } as CSSProperties}
                        >
                          {word === s.highlight ? (
                            <span className="hero-gold">{word}</span>
                          ) : (
                            word
                          )}
                        </span>

                        {wi < arr.length - 1 ? " " : null}
                      </React.Fragment>
                    );
                  })}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-fade mt-5 max-w-[470px] text-[14px] font-light leading-[2.1] text-[#ecd9c6] sm:mt-6 sm:text-[17px]"
            style={{ animationDelay: "650ms" }}
          >
            {s.desc}
          </p>

          <div
            className="hero-fade w-fit"
            style={{ animationDelay: "800ms" }}
          >
            <GoldButton
              href={s.href}
              className="mt-7 !px-9 !py-3.5 !text-[14px] sm:mt-9 sm:!text-[15px]"
            >
              مشاهده مجموعه
              <ArrowLeft className="h-4 w-4" />
            </GoldButton>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[70px] sm:bottom-[98px]">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-8 px-6 sm:px-10">
          <div className="flex items-center gap-3.5 text-[14px] leading-none tabular-nums sm:gap-4">
            <span
              key={`a${cur}`}
              className="hero-num font-medium text-[#e2bf9f]"
              aria-live="polite"
            >
              {toFa(cur + 1)}
            </span>

            <span
              aria-hidden
              className="relative block h-px w-16 overflow-hidden bg-[#f0d8c0]/25 sm:w-24"
            >
              <span
                key={`p${cur}`}
                className="hero-progress absolute inset-0 bg-[#e2bf9f]"
                style={{ animationDuration: `${DURATION}ms` }}
              />
            </span>

            <button
              key={`b${cur}`}
              type="button"
              onClick={() => go(next)}
              aria-label={`رفتن به ${SLIDES[next].label}`}
              className="hero-num -m-2 p-2 text-[#fbf1e6]/50 transition-colors duration-300 hover:text-[#fbf1e6]"
            >
              {toFa(next + 1)}
            </button>
          </div>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <button
              onClick={() => go(cur - 1)}
              aria-label="اسلاید قبلی"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#f0d8c0]/60 text-[#f0d8c0] transition duration-300 hover:scale-110 hover:bg-[#f0d8c0] hover:text-[#2a1a12]"
            >
              <Chevron dir="right" className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => go(cur + 1)}
              aria-label="اسلاید بعدی"
              className="grid h-10 w-10 place-items-center rounded-full bg-[#e2bf9f] text-[#2a1a12] transition duration-300 hover:scale-110 hover:brightness-110"
            >
              <Chevron dir="left" className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* لبه موجی کرمی */}
      <div className="hero-wave absolute inset-x-0 bottom-0 h-[44px] bg-[#f2e5d8] sm:h-[70px]" />
    </section>
  );
}

const CSS = `

/* تصویر: سه ورود متفاوت؛ فقط برش (clip) و حرکت ملایم، بدون زوم زیاد و بدون بلور */

@keyframes hero-clip-rise {
  from {
    clip-path: inset(100% 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes hero-clip-wipe {
  from {
    clip-path: inset(0 0 0 100%);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes hero-clip-iris {
  from {
    clip-path: circle(0% at 30% 50%);
  }
  to {
    clip-path: circle(150% at 30% 50%);
  }
}

@keyframes hero-zoom-rise {
  from {
    transform: scale(1.05) translateY(3%);
  }
  to {
    transform: none;
  }
}

@keyframes hero-zoom-wipe {
  from {
    transform: scale(1.04) translateX(-2%);
  }
  to {
    transform: none;
  }
}

@keyframes hero-zoom-iris {
  from {
    transform: scale(1.04);
  }
  to {
    transform: none;
  }
}

@keyframes hero-zoom-first {
  from {
    transform: scale(1.03);
  }
  to {
    transform: none;
  }
}

.hero-in-rise {
  animation: hero-clip-rise 1.3s cubic-bezier(.76,0,.24,1) both;
}

.hero-in-rise .hero-zoom {
  animation: hero-zoom-rise 2s cubic-bezier(.22,1,.36,1) both;
}

.hero-in-wipe {
  animation: hero-clip-wipe 1.3s cubic-bezier(.76,0,.24,1) both;
}

.hero-in-wipe .hero-zoom {
  animation: hero-zoom-wipe 2s cubic-bezier(.22,1,.36,1) both;
}

.hero-in-iris {
  animation: hero-clip-iris 1.5s cubic-bezier(.65,0,.35,1) both;
}

.hero-in-iris .hero-zoom {
  animation: hero-zoom-iris 1.8s cubic-bezier(.22,1,.36,1) both;
}

.hero-in-first .hero-zoom {
  animation: hero-zoom-first 2.4s cubic-bezier(.22,1,.36,1) both;
}

/* عنوان: سه ورود متفاوت
   rise: کلمه به کلمه از زیر ماسک بالا می‌آید
   wipe: هر خط از راست باز می‌شود
   iris: کلمه‌ها از حالت محو و بزرگ جمع می‌شوند */

@keyframes hero-t-rise {
  from {
    transform: translateY(120%) skewY(7deg);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

@keyframes hero-t-wipe {
  from {
    clip-path: inset(-10% 0 -10% 100%);
    transform: translateX(60px);
    opacity: 0;
  }
  to {
    clip-path: inset(-10% -5% -10% -5%);
    transform: none;
    opacity: 1;
  }
}

@keyframes hero-t-blur {
  from {
    opacity: 0;
    filter: blur(16px);
    transform: scale(1.25) translateY(18px);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: none;
  }
}

@keyframes hero-fade {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes hero-rule {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.hm-rise .hero-word {
  transform-origin: 100% 100%;
  animation: hero-t-rise 1.05s cubic-bezier(.16,1,.3,1) both;
  animation-delay: calc(250ms + var(--w) * 120ms);
}

.hm-wipe .hero-line {
  animation: hero-t-wipe 1.1s cubic-bezier(.16,1,.3,1) both;
  animation-delay: calc(250ms + var(--i) * 160ms);
}

.hm-iris .hero-mask {
  overflow: visible;
}

.hm-iris .hero-word {
  transform-origin: 100% 50%;
  animation: hero-t-blur 1.2s cubic-bezier(.16,1,.3,1) both;
  animation-delay: calc(250ms + var(--w) * 110ms);
}

.hero-fade {
  animation: hero-fade .9s cubic-bezier(.22,1,.36,1) both;
}

.hero-rule {
  transform-origin: 100% 50%;
  animation: hero-rule .8s cubic-bezier(.22,1,.36,1) both;
}

/* کلمه‌ی طلایی */

.hero-gold {
  display: inline-block;
  padding: .12em .04em;
  margin: -.12em -.04em;
  background: linear-gradient(90deg, #f6e0c8, #e2bf9f 55%, #c8a07c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

/* اینڈیکیتور: خط از راست به چپ (سمت عدد بعدی) پر می‌شود و عدد با یک لغزش ملایم عوض می‌شود */

@keyframes hero-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes hero-num {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.hero-progress {
  transform-origin: 100% 50%;
  animation-name: hero-progress;
  animation-timing-function: linear;
  animation-fill-mode: both;
}

.hero-num {
  display: inline-block;
  animation: hero-num .5s cubic-bezier(.22,1,.36,1) both;
}

`;

export default HeroSection;