'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const ProductHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      });

      // Entry sequence
      tl.fromTo(
        '.hero-image',
        {
          opacity: 0,
          scale: 1.05,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: 'power2.out',
        }
      )
        .fromTo(
          '.hero-eyebrow',
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          '-=1.2'
        )
        .fromTo(
          '.hero-title-line',
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
          },
          '-=0.7'
        )
        .fromTo(
          '.hero-description',
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .fromTo(
          '.hero-cta',
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.5'
        )
        .fromTo(
          '.hero-pagination',
          {
            opacity: 0,
            x: 15,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
          },
          '-=0.6'
        );
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[680px] h-[100svh] w-full overflow-hidden bg-[#09090b] text-[#f4f4f5] isolate"
    >
      {/* Background Hero Image */}
      <div className="hero-image absolute inset-0 overflow-hidden bg-[#09090b]">
        <Image
          src="/images/product-hero/product-hero-model.jpg"
          alt="زیبایی جاودانه"
          fill
          priority
          sizes="100vw"
          // در اینجا کلاس‌های brightness, contrast و saturate برای روشن‌تر شدن عکس حذف شده‌اند
          className="object-cover object-[62%_center] transform-gpu"
        />
      </div>

      {/* Dark Silver Gradients & Vignette - کاهش شدت گرادینت‌ها برای روشن‌تر شدن کل هیرو */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#09090b]/60 via-[#09090b]/30 via-40% to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090b]/70 via-transparent to-black/20 opacity-80" />

      {/* Subtle Ice-Silver Ambient Glow */}
      <div className="pointer-events-none absolute right-[15%] top-[35%] h-[450px] w-[450px] translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400/[0.04] blur-[140px]" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1700px] items-center justify-end px-6 pb-12 pt-20 sm:px-10 lg:px-14 xl:px-16 text-right">
        <div className="hero-content w-full max-w-[580px] -translate-y-2 lg:-translate-y-4">
          
          {/* Eyebrow */}
          <div className="hero-eyebrow mb-6 flex items-center justify-end gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-400 sm:text-[10px]">
              اشیایی از نور
            </span>
            <span className="h-px w-8 bg-zinc-500/50" />
          </div>

          {/* Title */}
          <h1 className="hero-title flex flex-col font-serif text-[38px] font-extralight uppercase leading-[1.1] tracking-[0.04em] text-white drop-shadow-md sm:text-[48px] md:text-[56px] lg:text-[62px]">
            <span className="hero-title-line block">زیبایی جاودانه</span>
            <span className="hero-title-line block text-zinc-300">در تمامی جزئیات.</span>
          </h1>

          {/* Description */}
          <p className="hero-description mt-7 ml-auto max-w-[380px] font-serif text-[13px] font-light leading-[1.8] tracking-[0.02em] text-zinc-400 sm:text-[14px]">
            هنر اصیل ساخت، مخصوص کسانی که به ظرافتِ پنهان و اصالت مدرن اهمیت می‌دهند.
          </p>

          {/* CTA Button */}
          <div className="hero-cta mt-9 sm:mt-11 flex justify-end">
            <a
              href="#collection-grid"
              className="group inline-flex items-center gap-4 font-mono text-[9px] font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:text-zinc-300 sm:text-[10px]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                <span className="text-[12px] transition-transform duration-300 group-hover:-translate-x-0.5">
                  ←
                </span>
              </span>

              <span className="border-b border-zinc-700 pb-1 transition-colors duration-300 group-hover:border-white">
                مشاهده مجموعه
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Left Pagination Indicator (جابجا شده به سمت چپ صفحه متناسب با ساختار فارسی) */}
      <div className="hero-pagination absolute left-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex xl:left-12">
        <span className="font-mono text-[9px] font-medium tracking-[0.15em] text-white">
          ۰۱
        </span>

        <div className="relative h-20 w-px bg-zinc-800">
          <span className="absolute left-0 top-0 h-[40%] w-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </div>

        <span className="font-mono text-[9px] tracking-[0.15em] text-zinc-600">
          ۰۴
        </span>
      </div>
    </section>
  );
};

export default ProductHero;