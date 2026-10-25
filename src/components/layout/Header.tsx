"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "مجموعه آثار", href: "/collection" },
  { label: "محصولات", href: "/product" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-500
          px-8 sm:px-16 py-7
          hidden lg:flex items-center justify-between
          ${
            scrolled
              ? "bg-[#050505]/85 backdrop-blur-md py-5 border-b border-white/10"
              : "bg-transparent"
          }
        `}
      >
        {/* سمت راست دسکتاپ: لوگو و نسخه */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-lg tracking-[0.25em] font-serif font-light text-[#F7F5F0] hover:text-[#D8C2A8] transition-colors duration-300"
          >
            پرتو
          </Link>

          <div className="flex items-center gap-2 pr-6 border-r border-white/15">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>

            <span className="text-[11px] tracking-[0.2em] text-[#E8E5DF]/60 uppercase font-mono">
              نسخه ۲۰۲۶
            </span>
          </div>
        </div>

        {/* ناوبری دسکتاپ با متن‌های بزرگ‌تر */}
        <nav className="flex items-center gap-12">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                relative text-[13px] tracking-[0.12em] text-[#E8E5DF]/80 uppercase font-normal
                transition-colors duration-300 hover:text-[#F7F5F0]
                after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1.5px]
                after:bg-white/70 after:transition-all after:duration-300 hover:after:w-full
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* سمت چپ دسکتاپ: سبد خرید، حساب کاربری و ورود */}
        <div className="flex items-center gap-5">
          <Link
            href="/cart"
            aria-label="سبد خرید"
            className="group relative flex items-center justify-center p-2 text-[#E8E5DF]/80 hover:text-[#D8C2A8] transition-colors duration-300 ml-1"
          >
            <svg
              className="w-6 h-6 stroke-[1.4] transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 8a4 4 0 0 1 8 0" />
              <rect x="5" y="8" width="14" height="12" rx="3" />
              <circle cx="12" cy="13" r="1.2" fill="currentColor" />
            </svg>

            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#D8C2A8] opacity-90 group-hover:scale-125 transition-transform" />
          </Link>

          <Link
            href="/account"
            className="px-5 py-2 rounded-full border border-white/20 text-[11px] tracking-[0.12em] text-[#E8E5DF] hover:border-[#D8C2A8] hover:text-[#D8C2A8] hover:bg-white/5 transition-all duration-300 uppercase font-light"
          >
            حساب کاربری
          </Link>

          <Link
            href="/login"
            className="px-5 py-2 rounded-full bg-[#F7F5F0] text-[#050505] text-[11px] tracking-[0.12em] hover:bg-[#D8C2A8] transition-all duration-300 uppercase font-medium"
          >
            ورود
          </Link>
        </div>
      </header>

      {/* ناوبری موبایل */}
      <div className="lg:hidden">
        <div className="fixed top-0 inset-x-0 z-[70] flex h-[74px] items-center justify-between border-b border-white/10 bg-[#11100F]/90 px-6 text-[#F7F5F0] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={menuOpen}
            aria-controls="aurel-mobile-navigation"
            className="flex h-10 w-10 items-center justify-center"
          >
            <span className="flex w-6 flex-col gap-[7px]">
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 ${
                  menuOpen
                    ? "w-6 translate-y-[4px] rotate-45"
                    : "w-6"
                }`}
              />
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 ${
                  menuOpen
                    ? "w-6 -translate-y-[4px] -rotate-45"
                    : "w-4"
                }`}
              />
            </span>
          </button>

          <Link
            href="/"
            onClick={closeMenu}
            className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl font-light tracking-[0.3em]"
          >
            پرتو
          </Link>

          <Link
            href="/login"
            onClick={closeMenu}
            className="text-xs tracking-[0.15em] font-medium transition-colors hover:text-[#D8C2A8]"
          >
            ورود
          </Link>
        </div>

        {/* منوی تمام صفحه موبایل */}
        <div
          id="aurel-mobile-navigation"
          aria-hidden={!menuOpen}
          className={`fixed inset-0 z-[65] bg-[#11100F] text-[#F7F5F0] transition-all duration-500 text-right ${
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-3 pointer-events-none opacity-0"
          }`}
        >
          <div className="flex h-full flex-col justify-center px-8 pb-12 pt-24">
            <p className="mb-8 font-mono text-[10px] tracking-[0.3em] text-white/50">
              پرتو — اصالت و درخشش.
            </p>

            <nav className="flex flex-col">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={closeMenu}
                  className="flex items-center justify-between border-b border-white/15 py-6 font-serif text-2xl font-light tracking-wide transition-colors hover:text-[#D8C2A8]"
                >
                  <span className="font-sans text-xs text-white/40">
                    ۰{index + 1}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <Link
              href="/cart"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              className="mt-8 flex items-center justify-between border-b border-white/15 py-5 text-xs tracking-[0.15em]"
            >
              <span>←</span>
              <span>سبد خرید</span>
            </Link>

            <Link
              href="/account"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              className="mt-6 flex items-center justify-between border border-white/25 px-6 py-4 text-xs tracking-[0.15em] transition-colors hover:border-[#D8C2A8] hover:text-[#D8C2A8]"
            >
              <span>←</span>
              <span>حساب کاربری</span>
            </Link>

            <Link
              href="/login"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              className="mt-4 flex items-center justify-between bg-[#F7F5F0] text-[#050505] px-6 py-4 text-xs tracking-[0.15em] font-medium transition-colors hover:bg-[#D8C2A8]"
            >
              <span>←</span>
              <span>ورود به حساب</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;