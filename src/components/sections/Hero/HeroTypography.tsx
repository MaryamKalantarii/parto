"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export function HeroTypography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [tagRef.current, titleRef.current, copyRef.current, ctaRef.current],
          { opacity: 1, x: 0, y: 0, scale: 1 }
        );
        return;
      }

      gsap.fromTo(
        tagRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: 25, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, delay: 0.35, ease: "power3.out" }
      );

      gsap.fromTo(
        copyRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1, delay: 0.55, ease: "power3.out" }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.75, ease: "power3.out" }
      );
    }, container);

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const handleMouseMove = (event: MouseEvent) => {
      if (
        !finePointer.matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      gsap.to(container, {
        x: (event.clientX / window.innerWidth - 0.5) * 8,
        y: (event.clientY / window.innerHeight - 0.5) * 8,
        duration: 1.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    if (finePointer.matches && !reduceMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-full flex-col justify-center px-6 text-right select-none sm:w-auto sm:px-12 md:px-16 lg:px-20"
    >
      {/* 1. زیرعنوان ظریف */}
      <div ref={tagRef} className="mb-2 flex items-center gap-2.5 sm:mb-3">
        <span className="h-[1px] w-5 bg-[#D8C2A8]/60 sm:w-8" />
        <span className="font-sans text-[10px] font-light tracking-wider text-[#E8E5DF]/80 sm:text-[11px]">
          زیبایی در جزئیات است
        </span>
      </div>

      {/* 2. عنوان اصلی - جمع‌وجور و محدود به سمت راست */}
      <h1
        ref={titleRef}
        className="max-w-[280px] sm:max-w-[340px] font-sans text-[clamp(2.5rem,5.2vw,6.5rem)] font-extralight leading-[1.3] text-[#F7F5F0] drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
      >
        مجموعه جواهرات
        <br />
        <span className="bg-gradient-to-l from-[#F7F5F0] via-[#D8C2A8] to-[#B8B6B0] bg-clip-text text-transparent font-normal">
          پرتو
        </span>
      </h1>

      {/* 3. متن توضیحات بزرگ‌تر شده و فاصله گرفته از بالا */}
      <p
        ref={copyRef}
        className="mt-6 sm:mt-8 max-w-[400px] sm:max-w-[800px] font-sans text-sm sm:text-base font-light leading-[2.2] text-[#E8E5DF]/90"
      >
        ترکیبی از اصالت، هنر و درخشش.
        <br />
        برای لحظه‌های خاص زندگی شما.
      </p>

      {/* 4. دکمه مشاهده محصولات با کادر مربعی لوکس */}
      <div className="mt-8 sm:mt-10">
        <Link
          ref={ctaRef}
          href="/shop"
          className="group pointer-events-auto inline-flex items-center gap-3 px-6 py-3.5 border border-white/30 bg-black/20 backdrop-blur-sm text-sm sm:text-base tracking-widest text-[#F7F5F0] transition-all duration-300 hover:border-[#D8C2A8] hover:bg-[#D8C2A8]/10 hover:text-[#D8C2A8]"
        >
          <span className="font-sans font-normal">
            مشاهده محصولات
          </span>
          <span className="text-lg transition-transform duration-300 group-hover:-translate-x-2">
            ←
          </span>
        </Link>
      </div>
    </div>
  );
}

export default HeroTypography;