
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const Newsletter = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.newsletter-item', {
        opacity: 0,
        y: 18,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.to('.newsletter-bg', {
        scale: 1.035,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      lang="fa"
      className="
        relative aspect-[3/1] min-h-[300px] w-full
        overflow-hidden bg-[#050505] text-[#eee9e1]
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="newsletter-bg absolute -inset-[2%]">
          <Image
            src="/images/collection/newsletter-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* CENTER CONTENT */}
      <div
        className="
          relative z-10 flex h-full w-full
          items-center justify-center text-center
        "
      >
        <div
          className="
            flex w-full max-w-[430px]
            flex-col items-center px-6
          "
        >
          {/* EYEBROW */}
          <span
            className="
              newsletter-item mb-[10px]
              font-sans text-[8px] sm:text-[9px]
              font-light tracking-normal
              text-[#a9a29a]
            "
          >
            همراه پرتو باشید
          </span>

          {/* TITLE */}
          <h2
            className="
              newsletter-item m-0
              font-sans font-light
              text-[23px] sm:text-[27px] md:text-[31px]
              lg:text-[34px] xl:text-[37px]
              leading-[1.4] tracking-normal
              text-[#eeeae4]
            "
          >
            به دنیای ما بپیوندید
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              newsletter-item mt-[11px] mb-0
              max-w-[290px]
              font-sans text-[8px] sm:text-[9px] md:text-[10px]
              font-light leading-[1.9]
              text-[#aaa49d]
            "
          >
            از جدیدترین مجموعه‌ها، پیش‌نمایش‌های اختصاصی
            <br />
            و رویدادهای ویژه‌ی پرتو زودتر از همه باخبر شوید.
          </p>

          {/* EMAIL FORM */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="
              newsletter-item mt-[17px]
              flex w-[245px] items-center
              border-b border-[#77716b]/70 pb-[9px]
              sm:w-[270px] md:w-[290px]
            "
          >
            <input
              type="email"
              dir="ltr"
              required
              aria-label="نشانی ایمیل"
              placeholder="نشانی ایمیل شما"
              className="
                w-full border-none bg-transparent p-0
                text-right font-sans
                text-[9px] sm:text-[10px] md:text-[11px]
                font-light tracking-normal
                text-[#d9d3ca] outline-none
                placeholder:text-[#77716f]
                focus:ring-0
              "
            />

            <button
              type="submit"
              aria-label="عضویت در خبرنامه"
              className="
                group mr-3 flex shrink-0
                items-center justify-center
              "
            >
              <span
                className="
                  text-[17px] font-light leading-none
                  text-[#c7c1b9]
                  transition-all duration-500
                  group-hover:-translate-x-1
                  group-hover:text-white
                "
              >
                ←
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* SUBTLE BOTTOM LINE */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          z-20 h-px bg-white/10
        "
      />
    </section>
  );
};
