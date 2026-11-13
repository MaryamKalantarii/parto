"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import type { HeroSlide } from "./Hero";

interface HeroBackgroundProps {
  slides: HeroSlide[];
  currentIndex: number;
}

export function HeroBackground({ slides, currentIndex }: HeroBackgroundProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const rayRef = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const inners = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndex = useRef<number | null>(null);

  // ورود تصویر هر اسلاید با موشن اختصاصی خودش
  useEffect(() => {
    const prev = prevIndex.current;
    if (prev === currentIndex) return;

    const el = layers.current[currentIndex];
    const inner = inners.current[currentIndex];
    if (!el || !inner) return;

    // بقیه لایه‌ها مخفی می‌شوند (به جز قبلی که زیر تصویر جدید می‌ماند)
    layers.current.forEach((l, i) => {
      if (l && i !== currentIndex && i !== prev) {
        gsap.killTweensOf(l);
        gsap.set(l, { autoAlpha: 0 });
      }
    });
    gsap.killTweensOf([el, inner]);

    if (prev === null) {
      gsap.set(el, { autoAlpha: 1, zIndex: 2, clipPath: "inset(0% 0% 0% 0%)" });
      gsap.fromTo(inner, { scale: 1.12 }, { scale: 1.04, duration: 3.2, ease: "power2.out" });
    } else {
      const prevEl = layers.current[prev];
      if (prevEl) gsap.set(prevEl, { zIndex: 1 });
      gsap.set(el, { autoAlpha: 1, zIndex: 2 });

      const motion = slides[currentIndex].motion;

      if (motion === "rise") {
        // پرده از پایین به بالا باز می‌شود
        gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" });
        gsap.fromTo(inner, { scale: 1.35, yPercent: 8 }, { scale: 1.04, yPercent: 0, duration: 2.4, ease: "power3.out" });
      } else if (motion === "wipe") {
        // پرده از راست به چپ کشیده می‌شود
        gsap.fromTo(el, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" });
        gsap.fromTo(inner, { scale: 1.25, xPercent: -6 }, { scale: 1.04, xPercent: 0, duration: 2.4, ease: "power3.out" });
      } else {
        // دایره‌ای که باز می‌شود + محو به واضح
        gsap.fromTo(el, { clipPath: "circle(0% at 30% 50%)" }, { clipPath: "circle(150% at 30% 50%)", duration: 1.5, ease: "power3.inOut" });
        gsap.fromTo(inner, { scale: 1.15, filter: "blur(14px)" }, { scale: 1.04, filter: "blur(0px)", duration: 1.8, ease: "power2.out", clearProps: "filter" });
      }

      if (prevEl) {
        gsap.to(prevEl, { autoAlpha: 0, delay: 1.6, duration: 0.01 });
      }
    }

    prevIndex.current = currentIndex;
  }, [currentIndex, slides]);

  // پارالکس ملایم با موس
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      if (parallaxRef.current) gsap.to(parallaxRef.current, { x, y, duration: 1.8, ease: "power2.out" });
      if (rayRef.current) gsap.to(rayRef.current, { x: -x * 0.8, y: -y * 0.8, duration: 2, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#111111]">
      {/* تصویرها روی هم چیده شده‌اند و با clip-path جابه‌جا می‌شوند */}
      <div ref={parallaxRef} className="absolute -inset-4">
        {slides.map((s, i) => (
          <div
            key={s.id}
            ref={(n) => {
              layers.current[i] = n;
            }}
            className="absolute inset-0"
            style={i === 0 ? { zIndex: 2 } : { opacity: 0, visibility: "hidden" }}
          >
            <div
              ref={(n) => {
                inners.current[i] = n;
              }}
              className="h-full w-full will-change-transform"
            >
              <picture>
                <source media="(max-width: 1023px)" srcSet={s.phoneImage} />
                <img
                  src={s.image}
                  alt={s.label}
                  draggable={false}
                  className="h-full w-full object-cover object-center"
                />
              </picture>
            </div>
          </div>
        ))}
      </div>

      {/* پرتو نوری */}
      <div
        ref={rayRef}
        className="absolute -top-10 left-10 h-[90vh] w-[70vw] rotate-[-18deg] bg-gradient-to-br from-[#F7F5F0]/10 via-[#E4E1DA]/5 to-transparent opacity-70 mix-blend-screen blur-3xl"
      />

      {/* تیره‌سازی برای خوانایی متن: موبایل از بالا و پایین، دسکتاپ از سمت راست */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/85 lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-l from-black/80 via-black/35 to-transparent lg:block" />
      <div className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-black/70 to-transparent lg:block" />

      {/* Film Grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(17,17,17,0.9) 100%)" }}
      />
    </div>
  );
}
