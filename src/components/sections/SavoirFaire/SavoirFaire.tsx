"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SavoirFaire() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      ).fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[#080807] text-[#F7F5F0] py-12 px-4 sm:px-6 lg:px-12 select-none"
    >
      <div className="mx-auto w-full max-w-[1700px]">
        
        {/* کادر اصلی افقی با ارتفاع بیشتر */}
        <div
          ref={imageContainerRef}
          className="relative w-full h-[440px] sm:h-[520px] lg:h-[580px] rounded-2xl overflow-hidden border border-[#F7F5F0]/10 bg-[#0D0C0B] shadow-2xl flex items-center"
        >
          {/* عکس پس‌زمینه سراسری افقی */}
          <div ref={imageRef} className="absolute inset-0 w-full h-full">
            <Image
              src="/images/craft-macro.jpg" // مسیر عکس خود را اینجا بگذارید
              alt="پرتو — فراتر از یک جواهر، یک داستان"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.78] contrast-[1.08]"
            />
            {/* گرادینت تیره برای خوانایی کامل متن‌ها روی عکس */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#080807]/95 via-[#080807]/65 to-transparent" />
          </div>

          {/* محتوا و متن‌ها در سمت راست عکس */}
          <div
            ref={contentRef}
            className="relative z-10 mr-auto max-w-xl pl-6 pr-8 sm:pr-16 lg:pr-24 text-right space-y-5 w-full"
          >
            <div>
              <span className="inline-block font-serif text-sm tracking-[0.25em] text-[#B6A58C] uppercase">
                پرتو
              </span>
            </div>

            <h2 className="font-serif font-extralight text-3xl sm:text-4xl lg:text-5xl tracking-wide text-[#F7F5F0]">
              فراتر از یک جواهر، یک داستان
            </h2>

            <p className="font-serif font-light text-sm sm:text-base leading-relaxed text-[#F7F5F0]/90">
              با الهام از هنر و فرهنگ ایرانی، هر قطعه از مجموعه پرتو بازتابی از اصالت، ظرافت و درخشش است.
            </p>

            <div className="pt-3">
              <a
                href="#about"
                className="group relative inline-flex items-center gap-3 px-7 py-3 border border-[#F7F5F0]/30 rounded-full font-serif text-xs text-[#F7F5F0] hover:bg-[#F7F5F0] hover:text-[#080807] transition-all duration-500"
              >
                <span className="transition-transform duration-500 group-hover:-translate-x-1">←</span>
                <span>درباره ما</span>
              </a>
            </div>
          </div>
        </div>

        {/* بخش خدمات چهارگانه در پایین */}
        <div className="mt-16 pt-10 border-t border-[#F7F5F0]/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div className="flex flex-col items-center space-y-3">
            <div className="text-[#B6A58C]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <h4 className="font-serif text-sm font-light text-[#F7F5F0]">پشتیبانی ۲۴ ساعته</h4>
            <p className="font-sans text-[11px] text-[#E4E1DA]/60">در تمام مراحل خرید</p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="text-[#B6A58C]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <h4 className="font-serif text-sm font-light text-[#F7F5F0]">پرداخت امن</h4>
            <p className="font-sans text-[11px] text-[#E4E1DA]/60">با درگاه‌های بانکی معتبر</p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="text-[#B6A58C]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4 className="font-serif text-sm font-light text-[#F7F5F0]">ضمانت اصالت کالا</h4>
            <p className="font-sans text-[11px] text-[#E4E1DA]/60">همراه با شناسنامه معتبر</p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="text-[#B6A58C]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <h4 className="font-serif text-sm font-light text-[#F7F5F0]">ارسال سریع</h4>
            <p className="font-sans text-[11px] text-[#E4E1DA]/60">به سراسر کشور</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default SavoirFaire;