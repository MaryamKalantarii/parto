"use client";

import React, { useState, useEffect } from "react";
import { HeroBackground } from "./HeroBackground";
import { HeroTypography } from "./HeroTypography";
import { HeroUI } from "./HeroUI";

/** نوع موشن هر اسلاید: هر اسلاید یک انیمیشن ورود متفاوت برای تصویر و متن دارد */
export type HeroMotion = "rise" | "wipe" | "blur";

export interface HeroSlide {
  id: string;
  label: string; // عنوان کوتاه برای منوی پایین
  tag: string;
  title: string;
  highlight: string; // کلمه‌ای که طلایی می‌شود (باید دقیقاً یک کلمه از title باشد)
  description: string;
  image: string;
  phoneImage: string;
  motion: HeroMotion;
}

export const SLIDE_DURATION = 3000; // میلی‌ثانیه

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "01",
    label: "کلکسیون طلا",
    tag: "کلکسیون طلای ۱۸ عیار",
    title: "طلایی که\nقصه می‌گوید",
    highlight: "قصه",
    description:
      "هر قطعه با دست استادان زرگر ساخته می‌شود،\nتا یادگاری ماندگار از لحظه‌های شما بماند.",
    image: "/images/hero/hero-1.jpg",
    phoneImage: "/images/hero/phonehero.jpg",
    motion: "rise",
  },
  {
    id: "02",
    label: "الماس‌های گواهی‌دار",
    tag: "الماس‌های گواهی‌دار",
    title: "الماسی که\nنور را می‌شناسد",
    highlight: "نور",
    description:
      "تراش‌های دقیق و خلوص بی‌نقص،\nهمراه با گواهی اصالت بین‌المللی.",
    image: "/images/hero/hero-2.jpg",
    phoneImage: "/images/hero/phonehero-2.jpg",
    motion: "wipe",
  },
  {
    id: "03",
    label: "طراحی اختصاصی",
    tag: "طراحی اختصاصی",
    title: "ساخته شده\nبرای شما",
    highlight: "شما",
    description:
      "از طرح اولیه تا قطعه نهایی، حلقه و گردنبند دلخواه‌تان\nرا با مشاوره زرگران ما بسازید.",
    image: "/images/hero/hero-3.jpg",
    phoneImage: "/images/hero/phonehero-3.jpg",
    motion: "blur",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // تغییر خودکار هر ۳ ثانیه؛ با کلیک روی منو، تایمر از اول شروع می‌شود
  useEffect(() => {
    const t = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [currentSlide]);

  return (
    <section
      dir="rtl"
      className="relative flex h-[100svh] min-h-[680px] w-full select-none items-center justify-center overflow-hidden bg-[#111111]"
    >
      <HeroBackground slides={HERO_SLIDES} currentIndex={currentSlide} />
      <HeroTypography slide={HERO_SLIDES[currentSlide]} slideIndex={currentSlide} />
      <HeroUI
        slides={HERO_SLIDES}
        currentSlide={currentSlide}
        duration={SLIDE_DURATION / 1000}
        onSelect={setCurrentSlide}
      />
    </section>
  );
}

export default Hero;
