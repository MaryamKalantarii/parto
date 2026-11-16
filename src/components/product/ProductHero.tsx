'use client';

import React from 'react';
import Link from 'next/link';

export const ProductHero = () => {
  return (
    <section className="relative h-[340px] w-full overflow-hidden bg-[#2a1a12] isolate sm:h-[390px] lg:h-[440px]">
    
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url("/images/product-hero/product-hero.png"), radial-gradient(60% 90% at 25% 45%, #d9b595 0%, #946648 40%, #3b2419 78%, #1c110c 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/80 via-[#2a1a12]/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1c110c]/80 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-[1360px] items-center justify-start px-5 pt-10 sm:px-8 sm:pt-12 lg:px-10 lg:pt-14">
        <div className="w-full max-w-[420px] text-right">
          <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-[12px] text-[#eadccd]/90">
            <Link href="/" className="transition hover:text-white">خانه</Link>
            <span className="text-[#eadccd]/60">/</span>
            <span>محصولات</span>
          </nav>

          <h1 className="mt-4 text-[25px] font-bold leading-[1.5] text-[#fbf1e6] sm:text-[30px] lg:text-[34px]">
            مجموعه انگشترهای پرتو
          </h1>
          <p className="mt-2 text-[12px] text-[#eadccd] sm:text-[13px] lg:text-[14px]">
            زیبایی در جزئیات، اصالت در انتخاب
          </p>
          <span className="mt-5 block h-px w-2/3 max-w-[300px] bg-gradient-to-l from-[#e2bf9f] to-transparent sm:mt-6" />
        </div>
      </div>

      
      <div
        className="absolute inset-x-0 bottom-0 h-[30px] bg-[#f6e9de] sm:h-[38px] lg:h-[44px]"
        style={{
          WebkitMaskImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 44' preserveAspectRatio='none'><path d='M0 44V26C260 4 520 14 760 24C1040 36 1260 18 1440 0V44Z' fill='black'/></svg>\")",
          maskImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 44' preserveAspectRatio='none'><path d='M0 44V26C260 4 520 14 760 24C1040 36 1260 18 1440 0V44Z' fill='black'/></svg>\")",
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
        }}
      />
    </section>
  );
};

export default ProductHero;
