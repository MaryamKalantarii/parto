"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 📌 در این بخش می‌توانید عکس‌ها، متن‌ها، تخفیف‌ها و لینک‌ها را به راحتی تغییر دهید
const CAMPAIGN_DATA = {
  // بخش اول (بنر بزرگ سمت چپ با عکس صخره و حلقه)
  mainBanner: {
    imageSrc: "/images/editornial/share.jpg", // مسیر عکس اول خود را اینجا بگذارید
    alt: "تخفیف ویژه محصولات",
    eyebrow: "تخفیف ویژه",
    discountText: "تا ۵۰٪ تخفیف",
    description: "بر روی منتخبی از محصولات",
    buttonText: "مشاهده همه",
    buttonLink: "#collection",
  },
  // بخش دوم (بنر کوچک سمت راست با عکس پارچه/پس‌زمینه)
  sideBanner: {
    imageSrc: "/images/editornial/off.jpg", // مسیر عکس دوم خود را اینجا بگذارید
    alt: "ارسال رایگان",
    title: "ارسال رایگان",
    subtitle: "برای سفارش‌های بالای\n۲ میلیون تومان",
  },
  // بخش پایین صفحه (Transition)
transitionSection: {
    bgImage: "/images/back.jpg",
    title: "مشاهده",
    subtitle: "مجموعه محصولات",
    link: "#collection",
  },
};

export function EditorialCampaign() {
  const containerRef = useRef<HTMLElement>(null);
  const campaignImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftMetaRef = useRef<HTMLDivElement>(null);
  const rightInfoRef = useRef<HTMLDivElement>(null);
  const exploreBtnRef = useRef<HTMLAnchorElement>(null);
  
  const transitionRef = useRef<HTMLDivElement>(null);
  const transitionTextRef = useRef<HTMLHeadingElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      const campaignTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      campaignTl.fromTo(
        campaignImageRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" }
      );

      if (leftMetaRef.current) {
        campaignTl.fromTo(
          leftMetaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=1.0"
        );
      }

      if (headlineRef.current?.children) {
        campaignTl.fromTo(
          Array.from(headlineRef.current.children),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.7"
        );
      }

      if (exploreBtnRef.current) {
        campaignTl.fromTo(
          exploreBtnRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
      }

      if (rightInfoRef.current) {
        campaignTl.fromTo(
          rightInfoRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.8"
        );
      }

      gsap.to(campaignImageRef.current, {
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      if (transitionRef.current && transitionTextRef.current) {
        gsap.fromTo(
          transitionTextRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: transitionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0B0A09] text-[#F7F5F0] overflow-hidden select-none py-10 px-4 md:px-10 lg:px-16"
    >
      {/* =================================================== */}
      {/* PART 1 — GRID BANNER (دو بخش کنار هم مشابه تصویر شما) */}
      {/* =================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
        
        {/* بنر بزرگ سمت چپ (تصویر صخره و تخفیف) */}
        <div className="relative lg:col-span-2 h-[450px] md:h-[520px] rounded-2xl overflow-hidden flex items-center px-8 md:px-16">
          <div
            ref={campaignImageRef}
            className="absolute inset-0 z-0 w-full h-full will-change-transform"
          >
            <Image
              src={CAMPAIGN_DATA.mainBanner.imageSrc}
              alt={CAMPAIGN_DATA.mainBanner.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center filter grayscale-[25%] contrast-[1.08] brightness-[0.85]"
            />
            {/* گرادینت تاریک روی عکس برای خوانایی متن */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#0B0A09]/90 via-[#0B0A09]/40 to-transparent" />
          </div>

          {/* محتوای بنر بزرگ */}
          <div className="relative z-10 max-w-lg ml-auto text-left lg:text-right space-y-4 w-full">
            <div ref={leftMetaRef}>
              <span className="inline-block text-xs md:text-sm font-light tracking-wider text-[#C4B2A2] uppercase">
                {CAMPAIGN_DATA.mainBanner.eyebrow}
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="font-serif font-light text-3xl sm:text-4xl md:text-5xl tracking-wide text-[#F7F5F0]"
            >
              <span className="block">{CAMPAIGN_DATA.mainBanner.discountText}</span>
            </h1>

            <p className="text-sm md:text-base font-light text-[#E4E1DA]/80">
              {CAMPAIGN_DATA.mainBanner.description}
            </p>

            <div className="pt-2">
              <a
                ref={exploreBtnRef}
                href={CAMPAIGN_DATA.mainBanner.buttonLink}
                className="inline-block border border-[#F7F5F0]/40 px-6 py-2.5 text-xs md:text-sm tracking-widest text-[#F7F5F0] hover:bg-[#F7F5F0] hover:text-[#0B0A09] transition-all duration-300 rounded-full"
              >
                {CAMPAIGN_DATA.mainBanner.buttonText} ←
              </a>
            </div>
          </div>
        </div>

        {/* بنر کوچک سمت راست (ارسال رایگان) */}
        <div
          ref={rightInfoRef}
          className="relative lg:col-span-1 h-[450px] md:h-[520px] rounded-2xl overflow-hidden flex flex-col justify-center items-center text-center p-8 border border-[#272727]"
        >
          <div className="absolute inset-0 z-0 w-full h-full">
            <Image
              src={CAMPAIGN_DATA.sideBanner.imageSrc}
              alt={CAMPAIGN_DATA.sideBanner.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center filter grayscale-[30%] brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-[#0B0A09]/60 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 space-y-4">
            <h3 className="text-xl md:text-2xl font-light text-[#F7F5F0]">
              {CAMPAIGN_DATA.sideBanner.title}
            </h3>
            <p className="text-xs md:text-sm font-light leading-relaxed text-[#E4E1DA]/70 whitespace-pre-line">
              {CAMPAIGN_DATA.sideBanner.subtitle}
            </p>
            <div className="pt-4 flex justify-center text-[#B6A58C]">
              {/* آیکون ماشین حمل */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 3h15v13H1z" />
                <path d="M16 8h4l3 3v5h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* =================================================== */}
      {/* PART 2 — COLLECTION TRANSITION                      */}
      {/* =================================================== */}
      <div
        ref={transitionRef}
        className="relative w-full h-[25vh] min-h-[200px] max-h-[280px] flex items-center justify-center px-6 mt-12 overflow-hidden bg-[#0B0A09] border-t border-[#272727]/60 rounded-2xl"
      >
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen">
          <Image
            src={CAMPAIGN_DATA.transitionSection.bgImage}
            alt="Abstract Light Texture"
            fill
            className="object-cover object-center filter grayscale brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A09] via-transparent to-[#0B0A09]" />
        </div>

        <a
          href={CAMPAIGN_DATA.transitionSection.link}
          className="group relative z-10 text-center focus:outline-none"
        >
          <h2
            ref={transitionTextRef}
            className="font-serif font-extralight text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.05em] text-[#F7F5F0] uppercase transition-colors duration-500 group-hover:text-[#B6A58C]"
          >
            {CAMPAIGN_DATA.transitionSection.title} <br />
            <span className="inline-flex items-center gap-3 md:gap-5 pt-1">
              {CAMPAIGN_DATA.transitionSection.subtitle}
              <span className="inline-block font-sans font-extralight transform group-hover:translate-x-3 transition-transform duration-500 text-xl sm:text-2xl md:text-3xl text-[#B6A58C] group-hover:text-[#F7F5F0]">
                →
              </span>
            </span>
          </h2>
        </a>
      </div>
    </section>
  );
}

export default EditorialCampaign;