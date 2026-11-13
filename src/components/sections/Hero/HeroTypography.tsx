"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import type { HeroSlide } from "./Hero";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface HeroTypographyProps {
  slide: HeroSlide;
  slideIndex: number;
}

export function HeroTypography({ slide, slideIndex }: HeroTypographyProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: "power4.out" } });

      // زیرعنوان
      tl.fromTo(q(".h-rule"), { scaleX: 0, transformOrigin: "100% 50%" }, { scaleX: 1, duration: 0.8 }, 0)
        .fromTo(q(".h-tag"), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.8 }, 0.1);

      // عنوان اصلی: موشن مخصوص هر اسلاید
      if (slide.motion === "rise") {
        tl.fromTo(
          q(".h-line"),
          { yPercent: 115, skewY: 6, opacity: 0, transformOrigin: "100% 100%" },
          { yPercent: 0, skewY: 0, opacity: 1, duration: 1.1, stagger: 0.12 },
          0.15
        );
      } else if (slide.motion === "wipe") {
        tl.fromTo(
          q(".h-line"),
          { clipPath: "inset(-10% 0% -10% 100%)", x: 70, opacity: 0 },
          { clipPath: "inset(-10% -5% -10% -5%)", x: 0, opacity: 1, duration: 1.1, stagger: 0.16 },
          0.15
        );
      } else {
        gsap.set(q(".h-mask"), { overflow: "visible" });
        tl.fromTo(
          q(".h-word"),
          { opacity: 0, filter: "blur(16px)", scale: 1.25, y: 20, transformOrigin: "100% 50%" },
          { opacity: 1, filter: "blur(0px)", scale: 1, y: 0, duration: 1.2, stagger: 0.1, clearProps: "filter" },
          0.15
        );
      }

      tl.fromTo(q(".h-desc"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, 0.6)
        .fromTo(q(".h-cta"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, 0.75);
    }, root);

    return () => ctx.revert();
  }, [slideIndex, slide.motion]);

  const lines = slide.title.split("\n");

  return (
    <div
      ref={rootRef}
      dir="rtl"
      className="pointer-events-none absolute inset-0 z-10 flex items-end px-6 pb-32 pt-24 text-right sm:items-center sm:px-12 sm:pb-28 lg:px-20 xl:px-28"
    >
      <div className="flex max-w-[640px] flex-col items-start">
        {/* ۱. زیرعنوان */}
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <span className="h-rule block h-px w-8 bg-[#D8C2A8] sm:w-12" />
          <span className="h-tag text-[13px] font-normal text-[#D8C2A8] sm:text-[15px]">{slide.tag}</span>
        </div>

        {/* ۲. عنوان اصلی: بزرگ، راست‌چین، بدون letter-spacing (برای حفظ اتصال حروف فارسی) */}
        <h1 className="font-light leading-[1.15] text-[#F7F5F0] drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)] text-[clamp(2.4rem,6.6vw,6.5rem)]">
          {lines.map((line, li) => (
            <span key={li} className="h-mask block overflow-hidden py-[0.1em]">
              <span className="h-line block">
                {line.split(" ").map((w, wi, arr) => (
                  <React.Fragment key={wi}>
                    <span className={`h-word inline-block ${w === slide.highlight ? "font-normal text-[#D8C2A8]" : ""}`}>
                      {w}
                    </span>
                    {wi < arr.length - 1 ? " " : null}
                  </React.Fragment>
                ))}
              </span>
            </span>
          ))}
        </h1>

        {/* ۳. توضیحات */}
        <p className="h-desc mt-6 max-w-[460px] whitespace-pre-line text-[15px] font-light leading-[2.1] text-[#E8E5DF]/85 sm:mt-8 sm:text-[17px]">
          {slide.description}
        </p>

        {/* ۴. دکمه */}
        <div className="h-cta mt-8 sm:mt-10">
          <Link
            href="/shop"
            className="group pointer-events-auto inline-flex items-center gap-4 bg-[#D8C2A8] px-8 py-4 text-[15px] font-medium text-[#111111] transition-colors duration-300 hover:bg-[#F7F5F0]"
          >
            <span>مشاهده کلکسیون</span>
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              className="transition-transform duration-300 group-hover:-translate-x-1.5"
            >
              <path d="M17 6H1M6 1L1 6l5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroTypography;
