
'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { RoundArrow } from '@/components/home/primitives';
import { allProducts } from '@/data/products';
import { getPricing, faNum } from '@/lib/pricing';
import type { Product } from '@/types/product';

function MiniCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [active, setActive] = useState(0);

  const { price, oldPrice, discount } = getPricing(product);
  const images = (product.materials[0]?.images ?? []).slice(0, 3);

  return (
    <article
      className="group relative flex w-[250px] shrink-0 flex-col overflow-hidden rounded-[34px] border border-white/60 shadow-[0_24px_60px_rgba(110,72,46,0.22)] transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_34px_70px_rgba(110,72,46,0.3)]"
      style={{
        background:
          'linear-gradient(165deg,#e8cdb2 0%,#f3e1cd 45%,#d6b394 100%)',
      }}
    >
      {/* تصویر محصول */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Link
          href={`/product/${product.slug}`}
          aria-label={product.name}
          className="absolute inset-0 block"
        >
          {images[active] && (
            <Image
              key={images[active]}
              src={images[active]}
              alt={product.name}
              fill
              sizes="250px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          )}
        </Link>

        {/* برچسب پرفروش */}
        {product.isBestSeller && (
          <span className="absolute left-3 top-3 z-10 inline-flex h-9 items-center rounded-full bg-gradient-to-l from-[#4a2e20] to-[#24140d] px-3 text-[11px] font-medium text-[#f6e6d3] shadow-md ring-1 ring-[#e2bf9f]/30">
            ✦ پرفروش‌ترین
          </span>
        )}

        {/* علاقه‌مندی */}
        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          aria-pressed={wished}
          onClick={() => setWished((v) => !v)}
          className={`absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-[15px] bg-[#f8ece0]/85 shadow-[0_6px_16px_rgba(110,72,46,0.2)] ring-1 ring-white/70 backdrop-blur-md transition hover:bg-white ${
            wished ? 'text-[#b3433a]' : 'text-[#24140d]'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill={wished ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          >
            <path d="M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20Z" />
          </svg>
        </button>

        {/* نشانگر تصاویر */}
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-[52px] z-10 flex justify-center">
            <div
              className="flex items-center gap-2 rounded-full bg-black/15 px-3 py-1.5 backdrop-blur-sm"
              dir="ltr"
            >
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  aria-label={`تصویر ${faNum(i + 1)}`}
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all ${
                    i === active
                      ? 'h-3 w-3 bg-white'
                      : 'h-2.5 w-2.5 bg-[#d9b99a] hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* باکس اطلاعات محصول */}
      <div className="relative z-10 -mt-10 mx-3 mb-3 rounded-[28px] bg-gradient-to-b from-[#fbf1e6] to-[#f4e3d2] p-4 shadow-[0_-8px_24px_rgba(110,72,46,0.12)] ring-1 ring-white/70">

        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-[15px] font-bold leading-snug text-[#24140d] line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {product.subTitle && (
          <p className="mt-1 line-clamp-1 text-[12px] text-[#8a6e5c]">
            {product.subTitle}
          </p>
        )}

        {/* امتیاز و تخفیف */}
        <div className="mt-2 flex min-h-[20px] items-center justify-between gap-2">
          {product.rating !== undefined ? (
            <div className="flex items-center gap-1.5 text-[12px] text-[#5a3a28]">
              <span className="text-[17px] text-[#d9a45e]">★</span>
              <span className="font-medium">{faNum(product.rating)}</span>
              {product.reviewsCount !== undefined && (
                <span className="text-[#8a6e5c]">
                  ({faNum(product.reviewsCount)} نظر)
                </span>
              )}
            </div>
          ) : (
            <span />
          )}

          {oldPrice && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#8a6e5c] line-through">
                {oldPrice}
              </span>
              {discount && (
                <span className="rounded-full bg-[#f1cfa8] px-2 py-0.5 text-[10px] font-medium text-[#5a3a28]">
                  -{discount}
                </span>
              )}
            </div>
          )}
        </div>

        {/* قیمت */}
        <div className="mt-2 flex items-baseline gap-1.5 text-[#24140d]">
          <span className="text-[21px] font-bold leading-none tracking-tight">
            {price}
          </span>
          <span className="text-[12px] text-[#6a4a38]">تومان</span>
        </div>
      </div>
    </article>
  );
}

export const RelatedProducts = ({ product }: { product: Product }) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (d: number) => {
    ref.current?.scrollBy({
      left: d * 280,
      behavior: 'smooth',
    });
  };

  const related = [
    ...allProducts.filter(
      (p) => p.slug !== product.slug && p.category === product.category
    ),
    ...allProducts.filter(
      (p) => p.slug !== product.slug && p.category !== product.category
    ),
  ].slice(0, 8);

  if (!related.length) return null;

  return (
    <section className="mx-auto mt-14 max-w-[1360px] px-5 pb-20 sm:px-10">
      {/* عنوان */}
      <div className="mb-8 flex items-center gap-5">
        <span className="h-px flex-1 bg-gradient-to-l from-[#c8a07c]/70 to-transparent" />

        <h2 className="text-[26px] font-bold text-[#24140d]">
          محصولات مرتبط
        </h2>

        <span className="h-px flex-1 bg-gradient-to-r from-[#c8a07c]/70 to-transparent" />
      </div>

      {/* اسلایدر */}
      <div className="flex items-center gap-3">
        <RoundArrow
          dir="right"
          dark={false}
          label="قبلی"
          onClick={() => scroll(1)}
        />

        <div
          ref={ref}
          className="no-scrollbar flex flex-1 items-stretch gap-5 overflow-x-auto py-3"
        >
          {related.map((p) => (
            <MiniCard key={p.id} product={p} />
          ))}
        </div>

        <RoundArrow
          dir="left"
          dark={false}
          label="بعدی"
          onClick={() => scroll(-1)}
        />
      </div>
    </section>
  );
};

export default RelatedProducts;
