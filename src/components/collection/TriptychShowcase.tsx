'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    id: 'rings',
    eyebrow: 'کلاسیک‌های ماندگار',
    title: 'حلقه‌های نمادین',
    description: 'نمادی از عشق؛ ساخته‌شده برای ماندگاری تا همیشه.',
    action: 'مشاهده مجموعه',
    link: '/collection/rings',
    image: '/images/collection/triptych-ring.png',
    imageAlt: 'مجموعه‌ای از حلقه‌های جواهر',
  },
  {
    id: 'necklaces',
    eyebrow: 'گردنبندهای ظریف',
    title: 'زیبایی در هر جزئیات',
    description: 'طراحی‌شده برای همراهی با لحظه‌های روزمره و خاص زندگی.',
    action: 'کشف مجموعه',
    link: '/collection/necklaces',
    image: '/images/collection/necklace.png',
    imageAlt: 'گردنبندهای ظریف و لوکس',
  },
  {
    id: 'craft',
    eyebrow: 'هنر جواهرسازی',
    title: 'هنر دست‌ساز، ظرافت ماندگار',
    description: 'هر قطعه حاصل عشق، دقت و تجربه‌ای است که نسل‌به‌نسل منتقل شده است.',
    action: 'آشنایی با هنر ما',
    link: '/craft',
    image: '/images/collection/triptych-craft.png',
    imageAlt: 'جزئیات هنر و ساخت جواهر',
  },
];

export const TriptychShowcase = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.triptych-card');

      gsap.from(cards, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      return () => {
        cards.forEach((card) => gsap.killTweensOf(card));
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      dir="rtl"
      lang="fa"
      className="relative w-full overflow-hidden border-t border-white/10 bg-[#0a0a0a] px-4 py-16 text-[#F7F5F0] sm:px-6 md:px-8 md:py-20 lg:px-16"
    >
      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-7">
        {showcaseItems.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="triptych-card group relative block h-[460px] w-full overflow-hidden rounded-sm border border-white/10 bg-[#11100e] sm:h-[540px] lg:h-[580px]"
          >
            <div className="absolute inset-0">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 80vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between p-6 text-right sm:p-8 md:p-9">
              <div>
                <span className="mb-3 block font-sans text-xs font-light text-[#d8c2a8]/90 sm:text-sm">
                  {item.eyebrow}
                </span>
                <h3 className="max-w-[340px] font-sans text-2xl font-light leading-relaxed text-[#F7F5F0] sm:text-3xl">
                  {item.title}
                </h3>
              </div>

              <div className="space-y-5">
                <p className="max-w-[300px] font-sans text-sm font-light leading-8 text-[#e4e1da]/85">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 font-sans text-sm text-[#F7F5F0]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/35 transition-colors duration-300 group-hover:border-[#d8c2a8]">
                    <span aria-hidden="true" className="text-lg leading-none">
                      ←
                    </span>
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-[#d8c2a8]">
                    {item.action}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};


