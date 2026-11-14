"use client";

/**
 * سکشن‌های پیشنهادی برای تکمیل صفحه اصلی پرتو
 * ─────────────────────────────────────────────
 *  GoldPriceBar   نوار قیمت طلا (زیر هیرو)
 *  ProcessSteps   مراحل طراحی اختصاصی (پشتیبان وعده‌ی هیرو)
 *  Testimonials   نظرات واقعی مشتریان (جایگزین بنر «تجربه مشتریان»)
 *  JournalPosts   آخرین مقالات مجله (جایگزین بنر «مجله جواهرات»)
 *  FaqSection     سوالات متداول + اسکیمای FAQ برای سئو
 *
 * همه از primitives و Reveal خود پروژه استفاده می‌کنند و رنگ‌ها همان پالت فعلی است.
 * متن‌ها و عددها «نمونه» هستند؛ قبل از فروش قالب، از props یا data جایگزین شوند.
 */

import React, { useRef } from "react";
import Link from "next/link";
import { GoldButton, Photo, RoundArrow, SectionHeading, ArrowLeft, DiamondIcon } from "./primitives";
import { Reveal } from "@/components/ui/Reveal";

/* رنگ طلایی خوانا روی زمینه‌ی کرم (کنتراست ≈ ۵:۱؛ #b3865f فقط برای خط و آیکن مناسب است) */
const GOLD_TEXT = "text-[#84563a]";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-medium ${GOLD_TEXT}`}>
      <span aria-hidden className="h-px w-8 bg-[#c8a07c] sm:w-12" />
      {children}
    </p>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`امتیاز ${value} از ۵`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" className={`h-4 w-4 ${n <= value ? "text-[#c8a07c]" : "text-[#c8a07c]/25"}`} fill="currentColor" aria-hidden>
          <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8L12 2.8Z" />
        </svg>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   ۱) نوار قیمت طلا — در ایران برای فروشگاه جواهر تقریباً استاندارد است
   ═══════════════════════════════════════════════════════════ */
export type GoldPrice = { label: string; value: string; change?: "up" | "down" | "flat" };

const defaultPrices: GoldPrice[] = [
  { label: "طلای ۱۸ عیار (هر گرم)", value: "۶٬۲۰۰٬۰۰۰", change: "up" },
  { label: "سکه امامی", value: "۶۴٬۵۰۰٬۰۰۰", change: "flat" },
  { label: "نیم‌سکه", value: "۳۴٬۱۰۰٬۰۰۰", change: "down" },
  { label: "اونس جهانی", value: "۲٬۶۵۰ دلار", change: "up" },
];

export function GoldPriceBar({ prices = defaultPrices, updatedAt = "۱۴:۳۰" }: { prices?: GoldPrice[]; updatedAt?: string }) {
  return (
    <section aria-label="قیمت لحظه‌ای طلا" className="relative z-10 mx-auto -mt-2 max-w-[1360px] px-5 sm:px-10">
      <Reveal variant="up">
        <div className="glass-cream flex items-center gap-4 overflow-hidden rounded-full px-5 py-3 sm:px-7">
          <span className={`hidden shrink-0 items-center gap-2 text-[13px] font-bold sm:flex ${GOLD_TEXT}`}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8a07c] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#b3865f]" />
            </span>
            قیمت طلا
          </span>
          <ul className="no-scrollbar flex flex-1 items-center gap-6 overflow-x-auto sm:gap-0 sm:overflow-visible">
            {prices.map((p, i) => (
              <li
                key={p.label}
                className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[13px] sm:flex-1 sm:justify-center ${i > 0 ? "sm:border-r sm:border-[#c8a07c]/30" : ""}`}
              >
                <span className="text-[#7a5a46]">{p.label}</span>
                <b className="font-bold tabular-nums text-[#2a1a12]">{p.value}</b>
                {p.change && p.change !== "flat" && (
                  <span aria-label={p.change === "up" ? "افزایش" : "کاهش"} className={p.change === "up" ? "text-emerald-700" : "text-rose-700"}>
                    {p.change === "up" ? "▲" : "▼"}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <span className="hidden shrink-0 text-[12px] text-[#7a5a46] md:block">به‌روزرسانی {updatedAt}</span>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ۲) مراحل طراحی اختصاصی
   ═══════════════════════════════════════════════════════════ */
const ic = "h-7 w-7";
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const steps = [
  {
    title: "مشاوره رایگان",
    desc: "ایده، بودجه و سلیقه‌ی شما را با یکی از زرگران ما در میان می‌گذارید.",
    icon: (
      <svg viewBox="0 0 24 24" className={ic} {...stroke}>
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
        <path d="M8.5 11h7M8.5 14h4" />
      </svg>
    ),
  },
  {
    title: "طراحی و تأیید",
    desc: "طرح سه‌بعدی و برآورد قیمت را می‌بینید و تا رسیدن به طرح دلخواه اصلاح می‌کنیم.",
    icon: (
      <svg viewBox="0 0 24 24" className={ic} {...stroke}>
        <path d="m4 20 4-1L19 8l-3-3L5 16l-1 4Z" />
        <path d="m14 7 3 3" />
      </svg>
    ),
  },
  {
    title: "ساخت دست‌ساز",
    desc: "قطعه با طلای اصل و سنگ‌های گواهی‌دار در کارگاه ما ساخته می‌شود.",
    icon: <DiamondIcon className={ic} />,
  },
  {
    title: "تحویل با گواهی",
    desc: "قطعه در بسته‌بندی لوکس و همراه با گواهی اصالت و فاکتور رسمی به دست شما می‌رسد.",
    icon: (
      <svg viewBox="0 0 24 24" className={ic} {...stroke}>
        <rect x="3" y="8" width="18" height="12" rx="2" />
        <path d="M3 12h18M12 8v12M12 8c-1.5-3-5-3-5-.8C7 8.6 9 8 12 8Zm0 0c1.5-3 5-3 5-.8C17 8.6 15 8 12 8Z" />
      </svg>
    ),
  },
];

export function ProcessSteps({ href = "/contact" }: { href?: string }) {
  return (
    <section className="mx-auto mt-14 max-w-[1360px] px-5 sm:mt-16 sm:px-10" aria-labelledby="process-title">
      <Reveal>
        <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div className="text-right">
            <Eyebrow>طراحی اختصاصی</Eyebrow>
            <h2 id="process-title" className="mt-3 text-[24px] font-bold leading-tight text-[#2a1a12] sm:text-[30px]">
              چهار قدم تا جواهری که فقط مالِ شماست
            </h2>
            <p className="mt-1.5 text-[14px] text-[#7a5a46]">از ایده تا تحویل، همراهتان هستیم.</p>
          </div>
          <GoldButton href={href} className="!px-7 !py-3 !text-[14px]">
            شروع طراحی اختصاصی
            <ArrowLeft className="h-4 w-4" />
          </GoldButton>
        </div>
      </Reveal>

      <ol className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* خط اتصال بین مرحله‌ها (فقط دسکتاپ) */}
        <span aria-hidden className="pointer-events-none absolute inset-x-[12%] top-[58px] hidden h-px bg-gradient-to-l from-transparent via-[#c8a07c]/60 to-transparent lg:block" />
        {steps.map((s, i) => (
          <li key={s.title}>
            <Reveal delay={i * 120} className="h-full">
              <div className="group relative h-full rounded-[28px] border border-[#c8a07c]/30 bg-gradient-to-b from-[#fffaf4] to-[#f6e5d4] p-6 text-right shadow-[0_14px_30px_rgba(90,56,34,0.10)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(90,56,34,0.18)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#4a2c1c] to-[#2a170e] text-[#f3dcc4] shadow-[0_8px_18px_rgba(42,23,14,0.35)] transition duration-500 group-hover:scale-105 group-hover:from-[#c8a07c] group-hover:to-[#a87a56] group-hover:text-[#2a1a12]">
                    {s.icon}
                  </span>
                  <span aria-hidden className="select-none text-[34px] font-light leading-none text-[#c8a07c]/55">
                    {["۰۱", "۰۲", "۰۳", "۰۴"][i]}
                  </span>
                </div>
                <h3 className="mt-5 text-[17px] font-bold text-[#2a1a12]">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-7 text-[#6b4a36]">{s.desc}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ۳) نظرات مشتریان (نمونه)
   ═══════════════════════════════════════════════════════════ */
export type Review = { name: string; city: string; product: string; rating: number; text: string; photo?: string };

const reviewsDefault: Review[] = [
  { name: "مریم کاظمی", photo: "/images/reviews/customer.png", city: "تهران", product: "انگشتر لومیر", rating: 5, text: "بسته‌بندی فوق‌العاده بود و انگشتر دقیقاً مثل عکس. گواهی اصالت هم همراهش بود؛ برای هدیه‌ی سالگرد عالی بود." },
  { name: "سارا محمدی", photo: "/images/reviews/customer-2.png", city: "اصفهان", product: "گردنبند ونکلیف", rating: 5, text: "پشتیبانی خیلی سریع جواب داد و سایزبندی را راهنمایی کردند. ارسال هم دو روزه رسید." },
  { name: "علی رضایی", photo: "/images/reviews/customer-3.png", city: "شیراز", product: "طراحی اختصاصی حلقه", rating: 5, text: "طرح اختصاصی حلقه‌ی نامزدی را با مشاوره‌ی زرگرشان ساختیم. نتیجه از انتظارم بهتر شد." },
  { name: "نگار حسینی", photo: "/images/reviews/customer-1.png", city: "مشهد", product: "دستبند مروارید", rating: 4, text: "کیفیت ساخت عالی است. فقط ای‌کاش گزینه‌ی بیشتری برای رنگ طلا داشت." },
  { name: "امیر توکلی", photo: "/images/reviews/customer-5.png", city: "تبریز", product: "گوشواره وریته", rating: 5, text: "قیمت شفاف و فاکتور رسمی داشت؛ برای خرید طلا همین اعتماد مهم‌ترین چیز است." },
];

export function Testimonials({ reviews = reviewsDefault }: { reviews?: Review[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 340, behavior: "smooth" });
  return (
    <section className="mx-auto mt-14 max-w-[1360px] px-5 sm:mt-16 sm:px-10" aria-labelledby="reviews-title">
      <Reveal>
        <div className="mb-7 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div className="text-right">
            <Eyebrow>نظر شما، افتخار ماست</Eyebrow>
            <h2 id="reviews-title" className="mt-3 text-[24px] font-bold leading-tight text-[#2a1a12] sm:text-[30px]">
              تجربه مشتریان
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-[#c8a07c]/35 bg-white/50 py-2 pl-5 pr-4">
              <b className="text-[22px] font-bold leading-none tabular-nums text-[#2a1a12]">۴٫۸</b>
              <div className="flex flex-col gap-1">
                <Stars value={5} />
                <span className="text-[12px] text-[#7a5a46]">از ۱٬۲۰۰ نظر ثبت‌شده</span>
              </div>
            </div>
            <div className="hidden gap-2 md:flex">
              <RoundArrow dir="right" dark={false} label="نظر قبلی" onClick={() => scroll(1)} />
              <RoundArrow dir="left" dark={false} label="نظر بعدی" onClick={() => scroll(-1)} />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal variant="fade" delay={100}>
        <ul
          ref={ref}
          tabIndex={0}
          aria-label="نظرات مشتریان"
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 pt-2 outline-none sm:mx-0 sm:px-0 lg:gap-6"
        >
          {reviews.map((r) => (
            <li key={r.name} className="w-[290px] shrink-0 snap-start sm:w-[340px]">
              <figure className="group relative flex h-full flex-col rounded-[28px] border border-white/80 bg-gradient-to-b from-[#fffaf4] to-[#f6e5d4] p-6 text-right shadow-[0_14px_30px_rgba(90,56,34,0.12)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(90,56,34,0.2)]">
                <svg aria-hidden viewBox="0 0 32 24" className="absolute left-6 top-6 h-8 w-10 text-[#c8a07c]/35" fill="currentColor">
                  <path d="M0 24V13.6C0 6.1 4 1.3 11.2 0l1.2 3.6C8.4 4.8 6.6 7.2 6.4 10.4H12V24H0Zm19.2 0V13.6C19.2 6.1 23.2 1.3 30.4 0l1.2 3.6c-4 1.2-5.8 3.6-6 6.8H31.2V24H19.2Z" />
                </svg>
                <div className="flex items-center gap-3">
                  <Stars value={r.rating} />
                  <span className="rounded-full bg-[#2a1a12]/[0.06] px-2.5 py-0.5 text-[11.5px] font-medium text-[#5a3a28]">خرید تأییدشده</span>
                </div>
                <blockquote className="mt-4 flex-1 text-[14px] leading-8 text-[#4a2f20]">«{r.text}»</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-[#c8a07c]/25 pt-4">
                  {/* عکس مشتری؛ اگر فایل نبود، حرف اول اسم روی گرادیانت دیده می‌شود */}
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#c8a07c] to-[#8d6243] text-[18px] font-bold text-white ring-2 ring-[#c8a07c]/60 ring-offset-2 ring-offset-[#fbf0e4]">
                    <span aria-hidden>{r.name.trim()[0]}</span>
                    {r.photo && (
                      <Photo
                        src={r.photo}
                        gradient="linear-gradient(transparent,transparent)"
                        className="absolute inset-0 transition duration-700 group-hover:scale-110"
                        style={{ backgroundPosition: "center top" }}
                      />
                    )}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <b className="text-[14px] font-bold text-[#2a1a12]">{r.name}</b>
                    <span className="mt-1 text-[12.5px] text-[#7a5a46]">
                      {r.city} · {r.product}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ۴) مجله جواهرات
   ═══════════════════════════════════════════════════════════ */
export type Post = { title: string; excerpt: string; tag: string; read: string; img: string; href: string };

const postsDefault: Post[] = [
  { title: "راهنمای انتخاب حلقه‌ی ازدواج؛ از عیار تا مدل", excerpt: "پیش از خرید این پنج نکته را بدانید تا انتخابی ماندگار داشته باشید.", tag: "راهنمای خرید", read: "۵ دقیقه", img: "/images/post/post-1.png", href: "/blog/wedding-ring-guide" },
  { title: "چطور طلا را سال‌ها براق و نو نگه داریم؟", excerpt: "روش‌های ساده و ایمن برای تمیزکردن و نگهداری از جواهرات در خانه.", tag: "نگهداری", read: "۴ دقیقه", img: "/images/post/post-2.png", href: "/blog/gold-care" },
  { title: "الماس طبیعی یا آزمایشگاهی؟ تفاوت‌ها و انتخاب درست", excerpt: "مقایسه‌ی قیمت، ارزش در بازفروش و گواهی‌ها در یک نگاه.", tag: "دانش جواهر", read: "۷ دقیقه", img: "/images/post/post-3.png", href: "/blog/natural-vs-lab-diamond" },
];

export function JournalPosts({ posts = postsDefault }: { posts?: Post[] }) {
  return (
    <section className="mx-auto mt-14 max-w-[1360px] px-5 sm:mt-16 sm:px-10" aria-labelledby="journal-title">
      <Reveal>
        <SectionHeading title="مجله جواهرات" subtitle="راهنمای انتخاب و نگهداری" href="/blog" />
      </Reveal>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.href} delay={i * 120} className="h-full">
            <article className="group h-full overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-b from-[#fffaf4] to-[#f6e5d4] shadow-[0_14px_30px_rgba(90,56,34,0.12)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(90,56,34,0.2)]">
              <Link href={p.href} className="flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Photo
                    src={p.img}
                    gradient="linear-gradient(135deg,#d9b08c,#8d6243)"
                    className="absolute inset-0 transition duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-[#1c110c]/70 px-3 py-1 text-[12px] font-medium text-[#f3dcc4] backdrop-blur">{p.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-6 text-right">
                  <span className="text-[12.5px] text-[#7a5a46]">زمان مطالعه: {p.read}</span>
                  <h3 className="mt-2 text-[17px] font-bold leading-8 text-[#2a1a12]">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-7 text-[#6b4a36]">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-[#3a2418]">
                    ادامه مطلب
                    <ArrowLeft className="h-4 w-4 transition duration-500 group-hover:-translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ۵) سوالات متداول (بدون JS؛ با <details> و اسکیمای FAQPage)
   ═══════════════════════════════════════════════════════════ */
export type Faq = { q: string; a: string };

const faqDefault: Faq[] = [
  { q: "آیا جواهرات پرتو گواهی اصالت دارند؟", a: "بله. همه‌ی قطعات با فاکتور رسمی و گواهی اصالت عیار تحویل داده می‌شوند و الماس‌ها گواهی معتبر جداگانه دارند." },
  { q: "ارسال سفارش چقدر طول می‌کشد و بیمه است؟", a: "سفارش‌های موجود در تهران ۱ تا ۲ روز کاری و سایر شهرها ۲ تا ۴ روز کاری ارسال می‌شود. همه‌ی مرسوله‌ها تا ارزش کامل بیمه هستند." },
  { q: "اگر سایز انگشتر یا دستبند مناسب نبود چه می‌شود؟", a: "تا ۷ روز پس از تحویل می‌توانید قطعه را برای تعویض سایز یا مدل ارسال کنید. جزئیات در صفحه‌ی شرایط بازگشت کالا آمده است." },
  { q: "ساخت سفارش اختصاصی چند روز طول می‌کشد؟", a: "بسته به پیچیدگی طرح، معمولاً ۱۰ تا ۲۱ روز کاری. پیش از شروع ساخت، طرح و قیمت نهایی را تأیید می‌کنید." },
  { q: "چه روش‌های پرداختی دارید؟", a: "پرداخت آنلاین با همه‌ی کارت‌های شتاب، و برای سفارش‌های اختصاصی امکان پرداخت مرحله‌ای (پیش‌پرداخت و تسویه هنگام تحویل)." },
  { q: "برای نگهداری از جواهراتم چه کنم؟", a: "از تماس با عطر و مواد شوینده دور نگه دارید و جداگانه در جعبه‌ی نرم بگذارید. راهنمای کامل را در مجله بخوانید." },
];

export function FaqSection({ faqs = faqDefault }: { faqs?: Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="mx-auto mt-14 max-w-[1360px] px-5 sm:mt-16 sm:px-10" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-14">
        <Reveal>
          <div className="text-right lg:sticky lg:top-28">
            <Eyebrow>پاسخ پرسش‌های شما</Eyebrow>
            <h2 id="faq-title" className="mt-3 text-[24px] font-bold leading-tight text-[#2a1a12] sm:text-[30px]">
              سوالات متداول
            </h2>
            <p className="mt-2 text-[14px] leading-7 text-[#6b4a36]">پاسخ سوالتان را پیدا نکردید؟ کارشناسان ما هر روز آماده‌ی پاسخگویی‌اند.</p>
            <GoldButton href="/contact" className="mt-5 !px-7 !py-3 !text-[14px]">
              تماس با پشتیبانی
              <ArrowLeft className="h-4 w-4" />
            </GoldButton>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 70}>
              <details className="group rounded-[22px] border border-[#c8a07c]/30 bg-gradient-to-b from-[#fffaf4] to-[#f6e5d4] shadow-[0_8px_20px_rgba(90,56,34,0.08)] transition duration-300 open:shadow-[0_14px_30px_rgba(90,56,34,0.16)] [&[open]>summary_.faq-icon]:rotate-45 [&[open]>summary_.faq-icon]:bg-[#c8a07c] [&[open]>summary_.faq-icon]:text-[#2a1a12]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-right text-[15px] font-bold text-[#2a1a12] marker:hidden sm:px-6 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#2a1a12]/[0.07] text-[#3a2418] transition duration-300">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[14px] leading-8 text-[#5a3a28] sm:px-6">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
