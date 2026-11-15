'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
  animate,
} from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/* ─────────────────────────── DATA ─────────────────────────── */

interface EditorialItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: string;
  description: string;
}

const magazineItems: EditorialItem[] = [
  {
    id: '1',
    title: 'تراش تک‌نگین',
    category: 'جواهرسازی فاخر',
    image: '/images/about/archive1.jpg',
    aspect: 'col-span-12 lg:col-span-8 h-[420px] lg:h-[550px]',
    description: 'منشورهای کریستالی با تراش دقیق که گرمای ملایم نور را در فضا بازتاب می‌دهند.',
  },
  {
    id: '2',
    title: 'چراغ برنجی ساتن',
    category: 'مجموعه معماری',
    image: '/images/about/archive2.jpg',
    aspect: 'col-span-12 lg:col-span-4 h-[420px] lg:h-[550px]',
    description: 'پوشش نانویی طلای ۲۴ عیار با پرداخت دستی روی آلیاژهای مقاوم.',
  },
  {
    id: '3',
    title: 'بازتاب یکپارچه',
    category: 'طراحی و اجرای سفارشی',
    image: '/images/about/archive3.jpg',
    aspect: 'col-span-12 lg:col-span-5 h-[380px] lg:h-[480px]',
    description: 'اتصالات یکپارچه و پنهان برای خلق فرمی مجسمه‌وار و خالص.',
  },
  {
    id: '4',
    title: 'شکست نور',
    category: 'ویژگی‌های کریستال',
    image: '/images/about/archive4.jpg',
    aspect: 'col-span-12 lg:col-span-7 h-[380px] lg:h-[480px]',
    description: 'هندسه نوری دقیق که مسیرهایی ظریف از سایه را در فضاهای مینیمال ایجاد می‌کند.',
  },
];

interface CraftDetail {
  id: string;
  number: string;
  title: string;
  materialName: string;
  materialCode: string;
  materialDesc: string;
  image: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  accentGlow: string;
}

const craftData: CraftDetail[] = [
  {
    id: 'brass',
    number: '۰۱',
    title: 'معماریِ لمس‌پذیر',
    materialName: 'برنج یکپارچه با پرداخت دستی',
    materialCode: 'BR-2200K',
    materialDesc:
      'قطعات برنجی یکپارچه با پرداخت دست‌ساز و پوشش نانویی برای مقاومت بیشتر در برابر اکسیدشدن.',
    image: '/images/about/tactile1.png',
    quote:
      'وزن و بافت برنج پرداخت‌شده با دست، در کنار نور گرم و ملایم، فضای ما را کاملاً دگرگون کرد.',
    author: 'النا روستووا',
    role: 'معمار ارشد داخلی',
    location: 'میلان',
    accentGlow: 'from-[#D8C2A8]/20 via-[#D8C2A8]/5 to-transparent',
  },
  {
    id: 'glass',
    number: '۰۲',
    title: 'شکست نور',
    materialName: 'شیشه دقیق شیاردار',
    materialCode: 'GL-OPTIC-X',
    materialDesc:
      'کریستال اپتیکی با شکست نور کالیبره‌شده که الگوهایی لطیف از نور و سایه می‌سازد.',
    image: '/images/about/tactile2.png',
    quote:
      'اورل تعادلی کم‌نظیر میان دقت اپتیکی و ظرافت مجسمه‌وار ایجاد می‌کند؛ پخش نور نیز بسیار طبیعی است.',
    author: 'مارکوس ونس',
    role: 'مدیر طراحی، استودیو آتلیه',
    location: 'زوریخ',
    accentGlow: 'from-[#E2D5C3]/20 via-[#E2D5C3]/5 to-transparent',
  },
  {
    id: 'frame',
    number: '۰۳',
    title: 'ساختار یکپارچه',
    materialName: 'قاب تیره آنودایزشده',
    materialCode: 'AL-BLK-90',
    materialDesc:
      'قاب آلومینیومی مات و آنودایزشده با ساختاری یکپارچه و بدون پیچ یا بست قابل‌مشاهده.',
    image: '/images/about/tactile3.png',
    quote:
      'مینیمالیسم با مهارتی ممتاز اجرا شده است؛ هر قطعه مانند اثری ماندگار از هنر معماری به نظر می‌رسد.',
    author: 'سوفی لوران',
    role: 'کلکسیونر خصوصی',
    location: 'پاریس',
    accentGlow: 'from-[#8A857D]/20 via-[#8A857D]/5 to-transparent',
  },
];

interface AccordionPanel {
  id: string;
  number: string;
  subtitle: string;
  title: string;
  description: string;
  tag: string;
  ctaText: string;
}

const panelsData: AccordionPanel[] = [
  {
    id: 'bespoke',
    number: '۰۱',
    subtitle: 'سفارش اختصاصی',
    title: 'نورپردازی فاخرِ سفارشی',
    description:
      'همکاری مستقیم با معماران و کلکسیونرهای خصوصی جهت طراحی و ساخت قطعات سفارشی تک‌نسخه با روکش طلا و متریال‌های نادر.',
    tag: 'مشتریان خصوصی',
    ctaText: 'ثبت سفارش اختصاصی',
  },
  {
    id: 'catalog',
    number: '۰۲',
    subtitle: 'پرونده فنی معماری',
    title: 'کاتالوگ و مشخصات فنی',
    description:
      'دریافت کاتالوگ جامع، فایل‌های سه‌بعدی CAD/BIM و جزئیات تنظیم نور برای پروژه‌های معماری فاخر.',
    tag: 'مشخصات فنی',
    ctaText: 'دریافت کاتالوگ فنی',
  },
  {
    id: 'atelier',
    number: '۰۳',
    subtitle: 'بازدید از استودیو',
    title: 'جلسه خصوصی در آتلیه',
    description:
      'تجربه لمس متریال‌ها و مشاهده کیفیت پخش نور در استودیوی اختصاصی اورل با تعیین وقت قبلی.',
    tag: 'رزرو وقت',
    ctaText: 'رزرو بازدید خصوصی',
  },
];

const marqueeWords = [
  'برنج دست‌ساز',
  'کریستال اپتیکی',
  'طلای ۲۴ عیار',
  'نور ۲۲۰۰ کلوین',
  'آنودایز مات',
  'تراش الماسی',
  'معماری نور',
];

/* ─────────────────────────── HELPERS ─────────────────────────── */

const fa = (n: number) => Math.round(n).toLocaleString('fa-IR', { useGrouping: false });

const Counter = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {fa(val)}
      {suffix}
    </span>
  );
};

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const SectionTag = ({ children, ping = false }: { children: React.ReactNode; ping?: boolean }) => (
  <div className="mb-4 flex items-center gap-3 font-sans text-[11px] text-[#8a5a3a]">
    <span className="relative flex h-2 w-2">
      {ping && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3a2418] opacity-60" />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3a2418]" />
    </span>
    <span>{children}</span>
  </div>
);

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export const AboutSection = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroPinnedRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activePanel, setActivePanel] = useState<number>(0);

  // Spotlight box
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const handleSpotlightMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlightRef.current) return;
    const rect = spotlightRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  // Color temperature box
  const [kelvin, setKelvin] = useState(2200);
  const warmth = (kelvin - 1800) / (4000 - 1800); // 0 warm → 1 cool
  const lampColor = `rgb(${Math.round(255 - warmth * 35)}, ${Math.round(
    170 + warmth * 70
  )}, ${Math.round(90 + warmth * 150)})`;

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted || !containerRef.current || !heroPinnedRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const letters = containerRef.current.querySelectorAll('.aurel-letter');

      gsap.set(titleWrapperRef.current, { opacity: 0, scale: 0.94 });
      if (letters.length) {
        gsap.set(letters, { y: 45, opacity: 0, filter: 'blur(14px)', scale: 1.02 });
      }
      gsap.set(subtitleRef.current, { y: 18, opacity: 0 });
      gsap.set(streakRef.current, { opacity: 0, xPercent: -80 });
      gsap.set(flareRef.current, { opacity: 0, scale: 0.5 });

      const intro = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => ScrollTrigger.refresh(),
      });

      intro
        .to(titleWrapperRef.current, { opacity: 1, scale: 1, duration: 1.6 })
        .to(subtitleRef.current, { y: 0, opacity: 1, duration: 1.3 }, '-=1')
        .to(streakRef.current, { opacity: 0.75, xPercent: 0, duration: 1.5, ease: 'power3.inOut' }, '-=1.1')
        .to(flareRef.current, { opacity: 1, scale: 1, duration: 1.1 }, '-=1');

      if (letters.length) {
        intro.to(
          letters,
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.6,
            stagger: { each: 0.08, from: 'center' },
            ease: 'power4.out',
          },
          0.3
        );
      }

      gsap.to(streakRef.current, {
        opacity: 0.42,
        scale: 1.01,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 4,
      });

      gsap.to(flareRef.current, {
        scale: 1.12,
        opacity: 0.72,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 4,
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroPinnedRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .fromTo(titleWrapperRef.current, { opacity: 1, scale: 1, yPercent: 0 }, { opacity: 0, scale: 1.12, yPercent: -10, ease: 'power1.inOut' }, 0)
        .fromTo(streakRef.current, { opacity: 0.75, xPercent: 0, rotation: 0 }, { opacity: 0, xPercent: 60, rotation: -12, ease: 'power1.inOut' }, 0)
        .fromTo(flareRef.current, { opacity: 1, scale: 1, x: 0, y: 0 }, { opacity: 0, scale: 1.3, x: 80, y: -40, ease: 'power1.inOut' }, 0)
        .fromTo(glowRef.current, { opacity: 0.1, scale: 1 }, { opacity: 0.8, scale: 1.8, ease: 'none' }, 0);
    },
    { scope: containerRef, dependencies: [mounted] }
  );

  if (!mounted) {
    return <div className="min-h-screen w-full bg-[#f6e9dc]" />;
  }

  const activeCraft = craftData[activeIndex];

  return (
    <div
      ref={containerRef}
      dir="rtl"
      lang="fa"
      className="relative w-full select-none overflow-x-hidden bg-[#f6e9dc] text-[#2a170e]"
    >
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress, transformOrigin: 'right' }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] bg-gradient-to-l from-[#D8C2A8] via-[#7a4a2c] to-transparent"
      />

      {/* Fixed meta */}
      <div className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 font-sans text-[10px] font-light text-[#7a5a48] sm:block sm:right-14">
        <span>۰۱</span>
        <span className="mt-1 block text-[9px] text-[#a67a5c]">درباره ما</span>
      </div>

      <div className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 font-sans text-[9px] font-light text-[#7a5a48] sm:flex sm:left-14">
        <span className="rotate-90">پیمایش</span>
        <div className="relative h-12 w-px bg-[#a67a5c]/30">
          <div className="absolute left-0 top-0 h-3 w-px animate-bounce bg-[#3a2418]" />
        </div>
        <div className="h-1.5 w-1.5 rounded-full border border-[#a67a5c]/50" />
      </div>

      {/* ───────── SECTION 1: HERO ───────── */}
      <section ref={heroPinnedRef} className="relative h-screen w-full overflow-hidden">
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[38vw] w-[38vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8b88f]/45 blur-[140px]"
        />
        {/* soft grain lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#7a4a2c_1px,transparent_1px)] [background-size:12.5vw_100%]" />

        <div className="flex h-full items-center justify-center">
          <div ref={titleWrapperRef} className="relative cursor-default text-center will-change-transform">
            <h1 className="relative z-10 flex items-center justify-center whitespace-nowrap bg-gradient-to-b from-[#7a4a2c] via-[#b9825a] to-[#3a2418] bg-clip-text font-sans text-[22vw] font-extralight leading-none text-transparent drop-shadow-[0_24px_40px_rgba(110,72,46,0.28)] sm:text-[19vw]">
              <span className="inline-block whitespace-nowrap">پرتو</span>
            </h1>

            <div ref={streakRef} className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center will-change-transform">
              <div className="h-[2px] w-[125%] -rotate-[16deg] bg-gradient-to-r from-transparent via-[#c9946e] to-transparent shadow-[0_0_25px_#e8b88f]" />
              <div className="absolute h-[18px] w-[115%] -rotate-[16deg] bg-gradient-to-r from-transparent via-[#d9a77f]/40 to-transparent blur-lg" />
            </div>

            <div ref={flareRef} className="pointer-events-none absolute left-[15%] top-[14%] z-30 flex items-center justify-center will-change-transform sm:left-[17%]">
              <div className="h-3.5 w-3.5 rounded-full bg-[#fff8ee] shadow-[0_0_30px_10px_#e8b88f]" />
              <div className="absolute h-28 w-[2px] bg-gradient-to-b from-transparent via-[#b9825a] to-transparent opacity-90" />
              <div className="absolute h-[2px] w-28 bg-gradient-to-r from-transparent via-[#b9825a] to-transparent opacity-90" />
              <div className="absolute h-24 w-24 rounded-full bg-[#e8b88f]/40 blur-2xl" />
            </div>

            <p ref={subtitleRef} className="mt-8 font-sans text-sm font-light text-[#8a5a3a] sm:text-base">
              اشیایی از نور
            </p>
          </div>
        </div>
      </section>

      {/* ───────── MARQUEE ───────── */}
      <div className="relative z-10 overflow-hidden border-y border-[#a67a5c]/30 bg-[#efdcc8] py-5" dir="ltr">
        <motion.div
          className="flex w-max items-center gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="flex items-center gap-12 font-sans text-sm font-extralight text-[#7a5a48]" dir="rtl">
              {w}
              <span className="text-[#8a5a3a]">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ───────── SECTION 2: ANIMATED BENTO ───────── */}
      <section className="relative w-full bg-[#f6e9dc] px-6 py-28 sm:px-16 lg:px-24">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <SectionTag>۰۲ — جهان پرتو</SectionTag>
          <h2 className="font-sans text-4xl font-extralight leading-tight text-[#2a170e] sm:text-6xl">
            تراش‌خورده <span className="font-normal italic text-[#8a5a3a]">در نور.</span>
          </h2>
          <p className="mt-5 max-w-lg font-sans text-sm font-light leading-loose text-[#7a5a48]">
            مجسمه‌های نورانی مینیمال؛ آثاری که با دقت برای ایجاد تعادل معماری طراحی شده‌اند. با باکس‌ها بازی کنید.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 lg:auto-rows-[200px]">
          {/* Box A — spotlight */}
          <motion.div
            ref={spotlightRef}
            custom={0}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            onMouseMove={handleSpotlightMouseMove}
            className="group relative min-h-[320px] overflow-hidden rounded-3xl border border-[#a67a5c]/30 bg-white/55 shadow-[0_10px_28px_rgba(110,72,46,0.12)] p-8 md:col-span-4 lg:row-span-2"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(420px circle at ${mousePos.x}% ${mousePos.y}%, rgba(201,148,110,0.38), transparent 60%)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(122,74,44,0.55)_1px,transparent_1px)] [background-size:26px_26px]"
              style={{
                WebkitMaskImage: `radial-gradient(260px circle at ${mousePos.x}% ${mousePos.y}%, #000, transparent)`,
                maskImage: `radial-gradient(260px circle at ${mousePos.x}% ${mousePos.y}%, #000, transparent)`,
              }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <span className="w-fit rounded-full border border-[#a67a5c]/50 px-3 py-1 font-sans text-[10px] text-[#8a5a3a]">
                نورافکن تعاملی
              </span>
              <div>
                <h3 className="font-sans text-3xl font-extralight leading-snug sm:text-5xl">
                  نور را با <span className="italic text-[#8a5a3a]">دست‌تان</span> دنبال کنید
                </h3>
                <p className="mt-4 max-w-sm font-sans text-xs font-light leading-loose text-[#7a5a48]">
                  هر سطح در پرتو، با زاویه نگاه شما زنده می‌شود؛ درست مثل برنج پرداخت‌شده زیر نور گرم.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Box B — counter */}
          <motion.div
            custom={1}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#a67a5c]/30 bg-white/55 shadow-[0_10px_28px_rgba(110,72,46,0.12)] p-7 md:col-span-2"
          >
            <span className="font-sans text-[10px] text-[#7a5a48]">پروژه معماری فاخر</span>
            <div className="font-sans text-6xl font-extralight text-[#8a5a3a]">
              <Counter to={240} suffix="+" />
            </div>
            <div className="h-px w-full bg-gradient-to-l from-[#D8C2A8]/60 to-transparent" />
          </motion.div>

          {/* Box C — rotating rings */}
          <motion.div
            custom={2}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-3xl border border-[#a67a5c]/30 bg-white/55 shadow-[0_10px_28px_rgba(110,72,46,0.12)] md:col-span-2"
          >
            <motion.div
              className="absolute h-40 w-40 rounded-full border border-dashed border-[#D8C2A8]/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
            />
            <motion.div
              className="absolute h-28 w-28 rounded-full border border-[#a67a5c]/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#3a2418] shadow-[0_0_14px_#D8C2A8]" />
            </motion.div>
            <div className="relative text-center">
              <div className="font-sans text-3xl font-extralight text-[#2a170e]">
                <Counter to={24} />
                <span className="text-[#8a5a3a]">K</span>
              </div>
              <div className="mt-1 font-sans text-[9px] text-[#7a5a48]">پوشش طلا</div>
            </div>
          </motion.div>

          {/* Box D — color temperature */}
          <motion.div
            custom={3}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="relative min-h-[240px] overflow-hidden rounded-3xl border border-[#a67a5c]/30 bg-white/55 shadow-[0_10px_28px_rgba(110,72,46,0.12)] p-7 md:col-span-3 lg:col-span-3"
          >
            <div
              className="pointer-events-none absolute -left-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-300"
              style={{ background: lampColor, opacity: 0.35 }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] text-[#7a5a48]">دمای رنگ نور</span>
                <span className="font-mono text-sm text-[#8a5a3a]">{fa(kelvin)} K</span>
              </div>
              <div
                className="mx-auto my-4 h-16 w-16 rounded-full transition-all duration-300"
                style={{
                  background: lampColor,
                  boxShadow: `0 0 ${30 + warmth * 30}px ${10 + warmth * 8}px ${lampColor}66`,
                }}
              />
              <input
                type="range"
                min={1800}
                max={4000}
                step={100}
                value={kelvin}
                onChange={(e) => setKelvin(Number(e.target.value))}
                aria-label="دمای رنگ نور"
                className="w-full cursor-pointer accent-[#7a4a2c]"
              />
              <div className="mt-2 flex justify-between font-sans text-[9px] text-[#a67a5c]">
                <span>گرم</span>
                <span>سرد</span>
              </div>
            </div>
          </motion.div>

          {/* Box E — flip card */}
          <motion.div
            custom={4}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="group min-h-[240px] [perspective:1000px] md:col-span-3 lg:col-span-3"
          >
            <div className="relative h-full w-full transition-transform duration-[900ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-[#a67a5c]/30 bg-gradient-to-br from-white/80 to-[#f1dcc6] p-7 [backface-visibility:hidden]">
                <span className="font-sans text-[10px] text-[#8a5a3a]">متریال</span>
                <h3 className="font-sans text-2xl font-extralight leading-snug sm:text-3xl">
                  برنج، کریستال <br /> و <span className="italic text-[#8a5a3a]">سکوت</span>
                </h3>
                <span className="font-sans text-[10px] text-[#a67a5c]">برای دیدن جزئیات، نشانگر را بیاورید ↻</span>
              </div>
              <div className="absolute inset-0 flex flex-col justify-center gap-3 rounded-3xl border border-[#D8C2A8]/40 bg-[#3a2418] p-7 text-[#f6e9dc] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="font-mono text-[10px]">BR-2200K · GL-OPTIC-X · AL-BLK-90</span>
                <p className="font-sans text-sm font-medium leading-loose">
                  هر قطعه با دست پرداخت می‌شود و با پوشش نانویی در برابر اکسیدشدن محافظت می‌گردد؛ تا سال‌ها همان درخشش اول را داشته باشد.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────── SECTION 3: EDITORIAL GRID ───────── */}
      <section className="relative w-full border-t border-[#a67a5c]/30 bg-[#f6e9dc] px-6 py-28 sm:px-16 lg:px-24">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <SectionTag>۰۳ — مجموعه‌ای گزیده از آثار</SectionTag>
          <h2 className="font-sans text-4xl font-extralight text-[#2a170e] sm:text-6xl">
            روایت <span className="italic text-[#8a5a3a]">آرشیو.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {magazineItems.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className={`group relative overflow-hidden rounded-2xl border border-[#a67a5c]/30 bg-white/55 transition-all duration-700 hover:border-[#7a4a2c]/50 ${item.aspect}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover grayscale contrast-125 transition-all duration-[1400ms] group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-[#2a170e]/85 via-[#2a170e]/25 to-transparent p-7 sm:p-8">
                <span className="w-fit rounded-full border border-[#a67a5c]/50 bg-black/45 px-3 py-1 font-sans text-[10px] text-white backdrop-blur-md">
                  {item.category}
                </span>
                <div className="translate-y-3 transition-transform duration-700 group-hover:translate-y-0">
                  <h3 className="mb-2 font-sans text-3xl font-extralight text-white transition-colors group-hover:text-[#f0cfae] sm:text-4xl">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 max-w-md font-sans text-xs font-light leading-loose text-white/85 opacity-80 transition-opacity duration-700 group-hover:opacity-100">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────── SECTION 4: CRAFT CARDS ───────── */}
      <section className="relative w-full overflow-hidden border-t border-[#a67a5c]/30 bg-[#efdcc8] px-6 py-28 sm:px-16 lg:px-24">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[#D8C2A8]/30 to-transparent" />
          <div className="absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#a67a5c]/25 to-transparent" />
          <div className="absolute right-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#a67a5c]/25 to-transparent" />
        </div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative z-10 mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <SectionTag ping>۰۴ — آتلیه و معماری جواهر</SectionTag>
            <h2 className="font-sans text-4xl font-extralight tracking-tight sm:text-6xl">
              تراش‌خورده همچون <span className="font-normal italic text-[#8a5a3a]">جواهر فاخر.</span>
            </h2>
          </div>
          <p className="max-w-sm font-sans text-xs font-light leading-loose text-[#7a5a48]">
            جایی که دقت جواهرسازی فاخر با مهندسی نورپردازی معماری پیوند می‌خورد.
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-12">
          <motion.div
            custom={0}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-[#a67a5c]/30 bg-white/55 shadow-[0_10px_28px_rgba(110,72,46,0.12)] p-8 transition-all duration-700 hover:-translate-y-2 hover:border-[#7a4a2c]/50 hover:shadow-[0_20px_50px_rgba(110,72,46,0.2)] sm:p-12 md:col-span-7"
          >
            <div className="pointer-events-none absolute -left-12 -top-12 h-60 w-60 rounded-full border border-[#a67a5c]/20 transition-colors duration-700 group-hover:border-[#a67a5c]/40" />
            <div>
              <span className="mb-6 inline-block rounded-full border border-[#a67a5c]/50 px-3 py-1 font-sans text-[10px] text-[#8a5a3a]">
                ۰۱. تراش دقیق
              </span>
              <h3 className="mb-4 font-sans text-3xl font-light leading-tight sm:text-4xl">
                در حد تراش الماس <br />
                <span className="font-normal italic text-[#8a5a3a]">لبه‌پردازی و پرداخت</span>
              </h3>
              <p className="max-w-md font-sans text-xs font-light leading-loose text-[#7a5a48]">
                هر بدنه برنجی و قطعه کریستال اپتیکی با دقتی در حد گوهرشناسی تراش می‌خورد تا بازتاب‌هایی هم‌تراز با استانداردهای جواهرسازی فاخر ایجاد شود.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-[#a67a5c]/30 pt-8">
              <span className="font-sans text-[11px] text-[#6b4a38]">شاخص‌های مهارت ساخت</span>
              <span className="font-sans text-base italic text-[#8a5a3a] transition-transform duration-500 group-hover:-translate-x-2">
                ← مشاهده جزئیات
              </span>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-[#a67a5c]/30 bg-white/55 shadow-[0_10px_28px_rgba(110,72,46,0.12)] p-8 transition-all duration-700 hover:-translate-y-2 hover:border-[#7a4a2c]/50 hover:shadow-[0_20px_50px_rgba(110,72,46,0.2)] sm:p-12 md:col-span-5"
          >
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full border border-[#a67a5c]/20 transition-transform duration-700 group-hover:scale-125" />
            <div className="mb-6 flex items-center justify-between">
              <span className="inline-block rounded-full border border-[#a67a5c]/30 px-3 py-1 font-sans text-[10px] text-[#7a5a48]">
                ۰۲. متریال
              </span>
              <span className="font-mono text-[10px] text-[#a67a5c]">24K/C360</span>
            </div>
            <div className="my-auto">
              <h3 className="mb-3 font-sans text-2xl font-light sm:text-3xl">
                طلای یکپارچه <span className="italic text-[#8a5a3a]">و</span> برنج پرداخت‌شده
              </h3>
              <p className="font-sans text-xs font-light leading-loose text-[#7a5a48]">
                سطوح با پوشش‌های نانویی مقاوم در برابر اکسیدشدن محافظت می‌شوند تا درخشش گرم آن‌ها برای سال‌ها حفظ شود.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-[#a67a5c]/30 pt-6 font-sans text-[11px] text-[#8a5a3a]">
              <span>پرداخت سطح</span>
              <span>پوشش نانویی ساتن</span>
            </div>
          </motion.div>

          <motion.div
            custom={2}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="group relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl border border-[#a67a5c]/30 bg-gradient-to-r from-white/60 via-[#fcf3e9] to-white/60 p-8 transition-all duration-700 hover:-translate-y-1 hover:border-[#7a4a2c]/50 sm:p-10 md:col-span-12 md:flex-row"
          >
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#a67a5c]/50 font-sans text-2xl text-[#8a5a3a] transition-transform duration-700 group-hover:rotate-45">
                ❖
              </div>
              <div>
                <span className="font-sans text-[10px] text-[#8a5a3a]">۰۳. سفارش‌های اختصاصی فاخر</span>
                <h4 className="mt-1 font-sans text-xl font-light sm:text-2xl">
                  سازه‌های معماری سفارشی برای کلکسیونرهای خصوصی
                </h4>
              </div>
            </div>
            <button className="whitespace-nowrap rounded-full bg-[#3a2418] px-8 py-4 font-sans text-xs font-medium text-[#f6e9dc] shadow-[0_0_20px_rgba(216,194,168,0.2)] transition-colors duration-500 hover:bg-[#7a4a2c]">
              سفارش قطعه اختصاصی
            </button>
          </motion.div>
        </div>
      </section>

      {/* ───────── SECTION 5: MATERIALITY ───────── */}
      <section className="relative w-full overflow-hidden border-t border-[#a67a5c]/30 bg-[#f6e9dc] px-6 py-28 sm:px-16 lg:px-24">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <SectionTag>۰۵ — مشخصات متریال و دیدگاه‌های معماری</SectionTag>
            <h2 className="font-sans text-4xl font-extralight tracking-tight sm:text-6xl">
              لمس‌پذیری <span className="font-normal italic text-[#8a5a3a]">در اوج کمال.</span>
            </h2>
          </div>

          <div className="flex w-fit items-center gap-1 rounded-full border border-[#a67a5c]/30 bg-white/55 shadow-[0_10px_28px_rgba(110,72,46,0.12)] p-1">
            {craftData.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className="relative rounded-full px-5 py-2 font-sans text-xs transition-colors duration-500"
              >
                {activeIndex === index && (
                  <motion.span
                    layoutId="craft-pill"
                    className="absolute inset-0 rounded-full bg-[#3a2418]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeIndex === index ? 'font-medium text-[#f6e9dc]' : 'text-[#7a5a48] hover:text-[#2a170e]'
                  }`}
                >
                  {item.number}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCraft.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5 }}
            className="relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border border-[#a67a5c]/30 bg-white/55 shadow-[0_10px_28px_rgba(110,72,46,0.12)] p-8 sm:p-12 lg:grid-cols-12"
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${activeCraft.accentGlow}`} />

            <div className="z-10 flex flex-col justify-between lg:col-span-7">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#8a5a3a]">{activeCraft.materialCode}</span>
                  <span className="font-sans text-[11px] text-[#7a5a48]">{activeCraft.title}</span>
                </div>
                <h3 className="mb-4 font-sans text-3xl font-light sm:text-5xl">{activeCraft.materialName}</h3>
                <p className="mb-8 font-sans text-xs font-light leading-loose text-[#6b4a38] sm:text-sm">
                  {activeCraft.materialDesc}
                </p>
              </div>

              <div className="border-t border-[#a67a5c]/30 pt-8">
                <p className="mb-4 font-sans text-base italic leading-loose text-[#8a5a3a] sm:text-lg">
                  «{activeCraft.quote}»
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs font-medium">{activeCraft.author}</span>
                  <span className="text-[#a67a5c]">•</span>
                  <span className="font-sans text-xs text-[#7a5a48]">
                    {activeCraft.role}، {activeCraft.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 h-[320px] overflow-hidden rounded-2xl border border-[#a67a5c]/30 sm:h-[400px] lg:col-span-5">
              <motion.img
                key={activeCraft.image}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                src={activeCraft.image}
                alt={activeCraft.materialName}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#efdcc8]/60 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ───────── SECTION 6: ACCORDION ───────── */}
      <section className="relative w-full border-t border-[#a67a5c]/30 bg-[#efdcc8] px-6 py-28 sm:px-16 lg:px-24">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <SectionTag>۰۶ — شروع گفتگو</SectionTag>
          <h2 className="font-sans text-4xl font-extralight sm:text-6xl">
            نور شما، <span className="font-normal italic text-[#8a5a3a]">روایت ما.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4 lg:h-[460px] lg:flex-row">
          {panelsData.map((p, i) => {
            const active = activePanel === i;
            return (
              <motion.div
                key={p.id}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                onMouseEnter={() => setActivePanel(i)}
                onClick={() => setActivePanel(i)}
                style={{ flexGrow: active ? 4 : 1 }}
                className={`relative cursor-pointer overflow-hidden rounded-3xl border p-8 transition-[flex-grow,border-color,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:basis-0 ${
                  active
                    ? 'border-[#7a4a2c]/50 bg-gradient-to-br from-white/85 to-[#f1dcc6]'
                    : 'border-[#a67a5c]/30 bg-white/55 shadow-[0_10px_28px_rgba(110,72,46,0.12)] hover:border-[#a67a5c]/40'
                }`}
              >
                <div
                  className={`pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#e8b88f]/40 blur-3xl transition-opacity duration-700 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="relative z-10 flex h-full min-h-[200px] flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-3xl font-extralight text-[#8a5a3a]">{p.number}</span>
                    <span className="rounded-full border border-[#a67a5c]/30 px-3 py-1 font-sans text-[10px] text-[#7a5a48]">
                      {p.tag}
                    </span>
                  </div>

                  <div>
                    <span className="mb-2 block font-sans text-[11px] text-[#7a5a48]">{p.subtitle}</span>
                    <h3 className="font-sans text-2xl font-light leading-snug sm:text-3xl">{p.title}</h3>

                    <div
                      className={`grid transition-all duration-700 ${
                        active ? 'grid-rows-[1fr] opacity-100' : 'lg:grid-rows-[0fr] lg:opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="mt-4 max-w-md font-sans text-xs font-light leading-loose text-[#6b4a38]">
                          {p.description}
                        </p>
                        <button className="mt-6 rounded-full bg-[#3a2418] px-6 py-3 font-sans text-xs font-medium text-[#f6e9dc] transition-colors duration-500 hover:bg-[#7a4a2c]">
                          {p.ctaText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
