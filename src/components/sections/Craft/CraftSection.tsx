"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ColumnData {
  id: string;
  tagline: string;
  imageSrc: string;
  imageAlt: string;
}

const COLUMNS_DATA: ColumnData[] = [
  {
    id: "01",
    tagline: "انگشتر",
    imageSrc: "/images/craft/ring.jpg",
    imageAlt: "انگشتر سولیتر الماس پرتو",
  },
  {
    id: "02",
    tagline: "گردنبند",
    imageSrc: "/images/craft/necklace.jpg",
    imageAlt: "گردنبند طلا و جواهر پرتو",
  },
  {
    id: "03",
    tagline: "دستبند",
    imageSrc: "/images/craft/bracelet.jpg",
    imageAlt: "دستبند دست‌ساز پرتو",
  },
  {
    id: "04",
    tagline: "گوشواره",
    imageSrc: "/images/craft/earrings.jpg",
    imageAlt: "مجموعه جواهرات لوکس پرتو",
  },
];

export function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<(HTMLElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const validColumns = columnsRef.current.filter(
        (column): column is HTMLElement => column !== null
      );

      if (reducedMotion) {
        gsap.set(validColumns, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        validColumns,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden select-none bg-[#100F0E] text-[#F3EFE6] py-16 px-4 sm:px-8 lg:px-10"
    >
      {/* Main background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/back.jpg"
          alt="AUREL Atmosphere Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.38] contrast-[1.15]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#100F0E]/75 via-[#100F0E]/40 to-[#100F0E]/90" />
      </div>

      {/* Collection Grid */}
      <div className="relative z-10 grid w-full max-w-[1500px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5">
        {COLUMNS_DATA.map((col, idx) => (
          <article
            key={col.id}
            ref={(el) => {
              columnsRef.current[idx] = el;
            }}
            className="
              group relative isolate
              flex w-full flex-col justify-end
              aspect-[0.92/1]
              overflow-hidden rounded-2xl
              bg-[#1a1918]/40
              border border-white/10
              backdrop-blur-sm
            "
          >
            {/* Full-bleed image */}
            <div className="absolute inset-0 z-[-1] overflow-hidden">
              <Image
                src={col.imageSrc}
                alt={col.imageAlt}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                className="
                  object-cover object-center
                  brightness-[0.76] contrast-[1.08]
                  transition-transform duration-700 ease-out
                  motion-safe:group-hover:scale-[1.04]
                  motion-safe:group-hover:brightness-[0.9]
                "
              />

              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-[#100F0E]/95
                  via-[#100F0E]/25
                  to-transparent
                  transition-opacity duration-500
                  motion-safe:group-hover:opacity-80
                "
              />
            </div>

            {/* Minimal Content */}
            <div className="relative z-10 flex items-end justify-between w-full p-5 sm:p-6 lg:p-7">
              <span
                className="
                  font-sans
                  text-sm
                  tracking-wide
                  text-[#F3EFE6]
                  transition-transform duration-500
                  motion-safe:group-hover:-translate-x-1
                "
              >
                {col.tagline}
              </span>

              {/* Arrow */}
              <div
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-full
                  border border-[#A89379]/70
                  transition-all duration-500
                  motion-safe:group-hover:border-[#F3EFE6]
                  motion-safe:group-hover:bg-[#F3EFE6]/10
                  motion-safe:group-hover:-translate-x-1
                "
              >
                <span
                  className="
                    text-sm
                    text-[#F3EFE6]
                    transition-transform duration-300
                    motion-safe:group-hover:-translate-x-0.5
                  "
                  aria-hidden="true"
                >
                  ←
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CraftSection;