"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import type { HeroSlide } from "./Hero";

interface HeroUIProps {
  slides: HeroSlide[];
  currentSlide: number;
  duration: number; // ثانیه
  onSelect: (index: number) => void;
}

const toFa = (n: number) => String(n).padStart(2, "0").replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export function HeroUI({ slides, currentSlide, duration, onSelect }: HeroUIProps) {
  const fills = useRef<(HTMLSpanElement | null)[]>([]);

  // نوار پیشرفت هر آیتم منو دقیقاً هم‌زمان با تایمر اسلاید پر می‌شود
  useEffect(() => {
    fills.current.forEach((f, i) => {
      if (!f) return;
      gsap.killTweensOf(f);
      if (i < currentSlide) gsap.set(f, { scaleX: 1 });
      else if (i > currentSlide) gsap.set(f, { scaleX: 0 });
      else gsap.fromTo(f, { scaleX: 0 }, { scaleX: 1, duration, ease: "none" });
    });
  }, [currentSlide, duration]);

  return (
    <div
      dir="rtl"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-10 px-6 pb-6 sm:px-12 sm:pb-9 lg:px-20 xl:px-28"
    >
      {/* منوی اسلایدها */}
      <nav aria-label="اسلایدها" className="pointer-events-auto grid w-full max-w-[720px] grid-cols-3 gap-3 sm:gap-6">
        {slides.map((s, i) => {
          const active = i === currentSlide;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(i)}
              aria-current={active}
              className="group text-right"
            >
              <span className="relative block h-[2px] w-full overflow-hidden bg-[#F7F5F0]/20">
                <span
                  ref={(n) => {
                    fills.current[i] = n;
                  }}
                  className="absolute inset-0 bg-[#D8C2A8]"
                  style={{ transform: "scaleX(0)", transformOrigin: "100% 50%" }}
                />
              </span>
              <span
                className={`mt-3 flex items-baseline gap-2.5 transition-opacity duration-300 ${
                  active ? "opacity-100" : "opacity-50 group-hover:opacity-80"
                }`}
              >
                <span className={`font-mono text-[12px] ${active ? "text-[#D8C2A8]" : "text-[#F7F5F0]"}`}>
                  {toFa(i + 1)}
                </span>
                <span className="hidden text-[13px] font-normal text-[#F7F5F0] sm:block">{s.label}</span>
              </span>
            </button>
          );
        })}
      </nav>

      {/* شمارنده + راهنمای اسکرول (فقط دسکتاپ) */}
      <div className="hidden shrink-0 items-center gap-8 sm:flex">
        <div className="flex items-baseline gap-2 text-[#F7F5F0]">
          <span className="text-[28px] font-light leading-none">{toFa(currentSlide + 1)}</span>
          <span className="text-[13px] text-[#F7F5F0]/45">/ {toFa(slides.length)}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-light text-[#E4E1DA]/70">اسکرول کنید</span>
          <span className="h-9 w-px animate-pulse bg-gradient-to-b from-[#F7F5F0] via-[#D8C2A8]/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}
