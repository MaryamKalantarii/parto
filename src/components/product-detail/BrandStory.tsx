'use client';

import React from 'react';
import Image from 'next/image';

import type { Product } from '@/types/product';

interface BrandStoryProps {
  product: Product;
}

export const BrandStory = ({ product }: BrandStoryProps) => {
  if (!product.BrandStory) {
    return null;
  }

  return (
    <section className="border-t border-white/5 bg-[#09090b] py-32 text-[#f4f4f5] text-right" dir="rtl">
      <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-3">

          {/* LEFT IMAGE */}
          <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
            <Image
              src={product.BrandStory.leftImage}
              alt={`${product.name} — editorial`}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* CENTER CONTENT */}
          <div className="px-4 text-center">
            <span className="mb-4 block font-mono text-[10px] tracking-widest text-zinc-500">
              ساخته‌شده برای ارزشمندترین لحظات شما
            </span>

            <h2 className="mb-6 font-serif text-3xl leading-snug tracking-wider text-white sm:text-4xl">
              بیشتر از
              <br />
              یک اثر هنری.
            </h2>

            <p className="mx-auto mb-8 max-w-sm font-serif text-base italic text-zinc-400">
              «اثری جاودانه که هرگز از مد نمی‌افتد.»
            </p>
            <a
              href="/collections"
              className="inline-block border-b border-white/30 pb-1 font-mono text-xs tracking-wider text-white transition-colors hover:border-white"
            >
              مشاهده مجموعه آثار ←
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
            <Image
              src={product.BrandStory.rightImage}
              alt={`${product.name} — packaging`}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;