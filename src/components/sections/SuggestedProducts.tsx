"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { allProducts } from "@/data/products";

export interface ProductMaterial {
  id: string;
  label: string;
  gradient: string;
  images: string[];
}

export interface Product {
  id: string;
  number: string;
  slug: string;
  name: string;
  subTitle: string;
  category: string;
  price: string;
  rawPrice: number;
  rating: number;
  reviewsCount: number;
  description: string;
  isBestSeller: boolean;
  isDiscount: boolean;
  isNew: boolean;
  materials: ProductMaterial[];
}

export function SuggestedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full bg-[#080706] text-[#F7F5F0] py-20 px-6 md:px-14 lg:px-20 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* هدر بخش: عنوان در سمت راست و فلش‌های ناوبری در سمت چپ */}
        <div className="flex justify-between items-center border-b border-[#272727] pb-6">
          {/* عنوان بخش (سمت راست در زبان فارسی) */}
          <h2 className="font-serif font-light text-xl md:text-2xl lg:text-3xl tracking-wide text-[#F7F5F0]">
            محصولات پیشنهادی
          </h2>

          {/* فلش‌های اسکرول (سمت چپ) */}
          <div className="flex items-center gap-4 text-[#F7F5F0]/75">
            <button
              onClick={() => handleScroll("right")}
              className="hover:text-[#B6A58C] transition-colors focus:outline-none text-xl"
              aria-label="Previous"
            >
              ←
            </button>
            <span className="w-8 h-[1px] bg-[#F7F5F0]/30" />
            <button
              onClick={() => handleScroll("left")}
              className="hover:text-[#B6A58C] transition-colors focus:outline-none text-xl"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        {/* لیست محصولات به صورت اسکرول افقی با سایز بهینه */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allProducts.map((product: Product) => (
            <div
              key={product.id}
              className="min-w-[260px] sm:min-w-[290px] md:min-w-[320px] lg:min-w-[30%] flex-shrink-0 snap-start group relative bg-[#0B0A09] border border-[#272727]/60 rounded-xl overflow-hidden flex flex-col justify-between"
            >
              {/* کادر تصویر محصول */}
              <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden bg-[#121110]">
                <Image
                  src={product.materials[0]?.images[0] || "/images/product-hero-model1111.jpg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-center filter grayscale-[20%] brightness-[0.9] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                />
                
                {/* دکمه علاقه‌مندی */}
                <button
                  aria-label="Wishlist"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0B0A09]/50 backdrop-blur-md border border-[#F7F5F0]/10 flex items-center justify-center text-[#F7F5F0] hover:text-[#B6A58C] transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              {/* جزئیات و قیمت محصول پایین کارت */}
              <div className="p-5 flex items-end justify-between bg-gradient-to-t from-[#0B0A09] to-transparent">
                <div className="space-y-1 text-right">
                  <h3 className="font-serif text-sm md:text-base font-light text-[#F7F5F0] tracking-wide no-underline">
                    {product.name}
                  </h3>
                  <p className="text-xs md:text-sm font-light text-[#C4B2A2] no-underline">
                    {product.price}
                  </p>
                </div>

                {/* دکمه سبد خرید کوچک */}
                <button
                  aria-label="Add to Bag"
                  className="w-9 h-9 rounded-lg border border-[#F7F5F0]/20 flex items-center justify-center text-[#F7F5F0] hover:bg-[#F7F5F0] hover:text-[#0B0A09] transition-all duration-300 flex-shrink-0"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SuggestedProducts;