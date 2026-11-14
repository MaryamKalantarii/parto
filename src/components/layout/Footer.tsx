"use client";

import React from "react";
import Link from "next/link";
import { Ico, DiamondLogo } from "@/components/icons/Ico";

/* فوتر اصلی سایت */

const columns = [
  {
    title: "راهنمای خرید",
    links: [
      { label: "شیوه‌های سفارش", href: "/customer-services#faq" },
      { label: "روش‌های پرداخت", href: "/customer-services#faq" },
      { label: "ارسال و تحویل", href: "/customer-services#faq" },
      { label: "ضمانت اصالت", href: "/about" },
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      { label: "راهنمای خرید", href: "/customer-services" },
      { label: "شرایط بازگشت کالا", href: "/customer-services#faq" },
      { label: "پیگیری سفارش", href: "/customer-services#track" },
      { label: "پشتیبانی مشتریان", href: "/customer-services#support" },
    ],
  },
  {
    title: "دسترسی سریع",
    links: [
      { label: "صفحه اصلی", href: "/" },
      { label: "محصولات", href: "/product" },
      { label: "درباره ما", href: "/about" },
      { label: "خدمات مشتریان", href: "/customer-services" },
      { label: "تماس با ما", href: "/contact" },
    ],
  },
];

function FooterLogo() {
  return (
    <Link href="/" dir="ltr" aria-label="PARTO" className="inline-flex flex-col items-center leading-none text-[#f3dcc4]">
      <DiamondLogo className="h-[30px] w-[36px]" />
      <span className="mt-1 font-serif text-[40px] tracking-[0.1em]">PARTO</span>
      <span className="mt-0.5 font-serif text-[9px] italic tracking-[0.06em] text-[#d9b48f]">Jewelry for a lifetime</span>
    </Link>
  );
}

function Social({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a href="#" aria-label={label} className="grid h-[26px] w-[26px] place-items-center text-[#e8c9aa] transition hover:text-white">
      {children}
    </a>
  );
}

function scrollToTop() {
  const l = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
  if (l) l.scrollTo(0, { duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`relative text-[#ecd9c6] ${className}`}>
      {/* لبه موجی بالای فوتر */}
      <div aria-hidden className="parto-footer-wave absolute inset-x-0 -top-[44px] h-[46px] bg-[#2a170e]" />
      <div
        className="relative bg-gradient-to-b from-[#2a170e] to-[#1c0f08]"
        style={{ backgroundImage: "radial-gradient(60% 90% at 90% 0%, rgba(140,90,60,0.28), transparent 65%), linear-gradient(180deg,#2c180f,#1b0e07)" }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-5 pb-6 pt-9 lg:px-11">
          <div className="grid grid-cols-2 gap-y-8 text-right lg:grid-cols-[1fr_1fr_1fr_1fr_1.15fr]">
            <div className="border-white/15 px-2 lg:border-l lg:px-8 lg:first:pr-0">
              <h3 className="mb-4 text-[15px] font-bold text-[#f3dcc4]">تماس با ما</h3>
              <ul className="space-y-3 text-[13px] text-[#ecd9c6]/90">
                <li className="flex items-center gap-2"><Ico name="phone" className="h-[14px] w-[14px] flex-none text-[#d9b48f]" /><span dir="ltr">۰۲۱-۷۷۷۴۸۴۶</span></li>
                <li className="flex items-center gap-2"><Ico name="mail" className="h-[14px] w-[14px] flex-none text-[#d9b48f]" /><span dir="ltr">info@parto.com</span></li>
                <li className="flex items-center gap-2"><Ico name="pin" className="h-[14px] w-[14px] flex-none text-[#d9b48f]" />تهران، ایران</li>
              </ul>
            </div>

            {columns.map((c) => (
              <div key={c.title} className="border-white/15 px-2 lg:border-l lg:px-8">
                <h3 className="mb-4 text-[15px] font-bold text-[#f3dcc4]">{c.title}</h3>
                <ul className="space-y-2.5 text-[13px] text-[#ecd9c6]/90">
                  {c.links.map((l) => (
                    <li key={l.label}><Link href={l.href} className="transition hover:text-white">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 flex flex-col items-center justify-center lg:col-span-1">
              <FooterLogo />
              <div className="mt-5 flex items-center gap-3" dir="ltr">
                <Social label="اینستاگرام"><Ico name="instagram" className="h-[22px] w-[22px]" /></Social>
                <Social label="تلگرام"><Ico name="send" className="h-[22px] w-[22px]" /></Social>
                <Social label="واتساپ"><Ico name="whatsapp" className="h-[22px] w-[22px]" /></Social>
                <Social label="ایتا"><Ico name="chat" className="h-[22px] w-[22px]" /></Social>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse items-center justify-between gap-5 border-t border-white/10 pt-5 text-[12px] text-[#ecd9c6]/75 sm:flex-row">
            <div className="flex items-center gap-5" dir="ltr">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="بازگشت به بالا"
                className="grid h-[38px] w-[38px] place-items-center rounded-full border border-[#e8c9aa]/70 text-[#e8c9aa] transition hover:bg-[#e8c9aa] hover:text-[#2a170e]"
              >
                <Ico name="chevU" className="h-[18px] w-[18px]" sw={1.8} />
              </button>
              <span className="relative block h-8 w-[46px]" aria-label="مستر کارت">
                <span className="absolute left-0 top-0 h-8 w-8 rounded-full bg-[#e3262e]" />
                <span className="absolute left-[14px] top-0 h-8 w-8 rounded-full bg-[#f79e1b]/95 mix-blend-screen" />
              </span>
              <span className="grid h-[28px] w-[48px] place-items-center rounded-[5px] bg-[#2a5fb0] text-[9px] font-bold text-white" aria-label="شاپرک">سامان</span>
              <span className="grid h-[34px] w-[34px] place-items-center rounded-full border-2 border-[#3a6fd0] font-serif text-[18px] font-bold italic text-[#3a6fd0]" aria-label="نماد اعتماد">e</span>
            </div>
            <p>© کلیه حقوق مادی و معنوی متعلق به پرتو محفوظ است. ۱۴۰۴</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
