
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const EditorialStory = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(imageRef.current, {
        yPercent: 4,
        scale: 1.03,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.from('.story-reveal', {
        opacity: 0,
        y: 18,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      dir="rtl"
      lang="fa"
      className="
        relative aspect-[3/1] w-full overflow-hidden
        bg-[#100e0c] text-[#f4f0e9]
      "
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={imageRef}
          className="absolute -inset-[3%] h-[106%] w-[106%]"
        >
          <Image
            src="/images/collection/editorial-story.png"
            alt="داستان جواهرات اورل"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Overlay for text readability */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-l
            from-[#100d0b]/95
            via-[#17120f]/25
            to-transparent
          "
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-[#090807]/40
            via-transparent
            to-transparent
          "
        />

        <div className="absolute inset-0 bg-[#4a382b]/10 mix-blend-color" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex h-full w-full items-center">
        <div
          className="
            mr-[8.5%] flex w-[35%] max-w-[340px]
            flex-col justify-center
          "
        >
          

          <h2
            className="
              story-reveal m-0 p-0
              font-sans font-light
              text-[22px] sm:text-[27px] md:text-[32px]
              lg:text-[36px] xl:text-[40px]
              leading-[1.45] tracking-normal
              text-[#f2eee8]
            "
          >
            فراتر از
            <br />
            <span className="font-sans font-normal">
              جواهرات
            </span>
          </h2>

          <p
            className="
              story-reveal mt-4 mb-0 max-w-[240px]
              font-sans font-light
              text-[8px] sm:text-[9px] md:text-[10px]
              leading-[1.9] tracking-normal
              text-[#c5beb6]
            "
          >
            حسی فراتر از زیبایی؛ لحظه‌ای برای ماندن در خاطر.
            <br />
            یادآوری آنچه در زندگی واقعاً ارزشمند است.
          </p>
        </div>
      </div>

      {/* Story button */}
      <div
        className="
          story-reveal absolute left-[7.5%] top-1/2 z-20
          -translate-y-1/2
        "
      >
        <button
          type="button"
          aria-label="تماشای داستان اورل"
          className="
            group flex items-center gap-2.5
            font-sans text-[#e9e4dc]
          "
        >
          <span
            className="
              flex h-7 w-7 items-center justify-center
              rounded-full border border-[#aaa39a]/70
              transition-all duration-500
              group-hover:scale-110
              group-hover:border-[#f5f1eb]
              group-hover:bg-white/5
            "
          >
            <span className="text-[8px]">▶</span>
          </span>

          <span
            className="
              relative whitespace-nowrap pb-1
              font-sans text-[8px] sm:text-[9px]
              font-light tracking-normal
            "
          >
            تماشای داستان
            <span
              className="
                absolute bottom-0 right-0 h-px w-0
                bg-[#eee9e1] transition-all duration-500
                group-hover:w-full
              "
            />
          </span>
        </button>
      </div>

      {/* Subtle vignette */}
      <div
        className="
          pointer-events-none absolute inset-0 z-30
          bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.28)_100%)]
        "
      />
    </section>
  );
};
