import React from "react";
import { GoldButton, Photo, DiamondIcon, ArrowLeft } from "./primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Motion helpers (pure CSS, no extra dependency, server-safe)       */
/* ------------------------------------------------------------------ */
function MotionStyles() {
  return (
    <style>{`
      @keyframes parto-kenburns {
        0%   { transform: scale(1) translate3d(0,0,0); }
        100% { transform: scale(1.08) translate3d(-1.5%,-1%,0); }
      }
      @keyframes parto-twinkle {
        0%, 100% { opacity: .15; transform: scale(.6) rotate(0deg); }
        50%      { opacity: 1;   transform: scale(1.15) rotate(45deg); }
      }
      @keyframes parto-line {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      @keyframes parto-rise {
        0%   { opacity: 0; transform: translate3d(0,14px,0); }
        100% { opacity: 1; transform: translate3d(0,0,0); }
      }
      @keyframes parto-pulse-ring {
        0%   { box-shadow: 0 0 0 0 rgba(200,160,124,.45); }
        100% { box-shadow: 0 0 0 14px rgba(200,160,124,0); }
      }
      .parto-kenburns { animation: parto-kenburns 22s ease-in-out infinite alternate; will-change: transform; }
      .parto-twinkle  { animation: parto-twinkle 3.6s ease-in-out infinite; }
      .parto-gold-line {
        background: linear-gradient(90deg, transparent 0%, #c8a07c 30%, #fff3de 50%, #c8a07c 70%, transparent 100%);
        background-size: 200% 100%;
        animation: parto-line 5s linear infinite;
      }
      .parto-rise-1 { animation: parto-rise .9s .15s cubic-bezier(.2,.7,.2,1) both; }
      .parto-rise-2 { animation: parto-rise .9s .35s cubic-bezier(.2,.7,.2,1) both; }
      .parto-rise-3 { animation: parto-rise .9s .55s cubic-bezier(.2,.7,.2,1) both; }
      .parto-pulse    { animation: parto-pulse-ring 2.4s ease-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .parto-kenburns, .parto-twinkle, .parto-gold-line,
        .parto-rise-1, .parto-rise-2, .parto-rise-3, .parto-pulse { animation: none !important; }
      }
    `}</style>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`parto-twinkle pointer-events-none absolute text-[#c8a07c] ${className}`}
      fill="currentColor"
    >
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand story                                                        */
/* ------------------------------------------------------------------ */
export function BrandStory() {
  return (
    <section className="mx-auto mt-12 max-w-[1360px] px-5 sm:mt-14 sm:px-10">
      <MotionStyles />
      <Reveal variant="scale">
        <div className="group relative flex min-h-[300px] items-center overflow-hidden rounded-[28px] shadow-[0_18px_44px_rgba(110,72,46,0.16)] transition-shadow duration-700 hover:shadow-[0_26px_60px_rgba(110,72,46,0.26)] min-h-[340px] md:h-[330px] md:min-h-0 md:rounded-[44px]">
          <Parallax speed={0.1} className="absolute inset-x-0 -bottom-[8%] -top-[8%]">
            <Photo
              src="/images/aboutmain/about1.jpg"
              gradient="linear-gradient(100deg,#d9b9a0,#ecd8c6 55%,#f4e7da)"
              className="parto-kenburns absolute inset-0"
              style={{ backgroundPosition: "left center" }}
            />
          </Parallax>

          <div className="absolute inset-0 bg-gradient-to-t from-[#f4e7da] via-[#f4e7da]/90 to-[#f4e7da]/40 md:bg-gradient-to-l md:from-[#f4e7da] md:via-[#f4e7da]/85 md:to-transparent" />

          {/* inner hairline frame */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 rounded-[22px] border border-[#c8a07c]/30 transition duration-700 group-hover:border-[#c8a07c]/60 md:inset-4 md:rounded-[30px]"
          />

          {/* light sweep on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition duration-[1600ms] ease-out group-hover:translate-x-[620%] group-hover:opacity-100"
          />

          <DiamondIcon className="anim-float pointer-events-none absolute left-6 top-6 h-20 w-24 text-[#c8a07c]/30 md:left-20 md:top-1/2 md:h-52 md:w-64 md:-translate-y-1/2" />

          {/* sparkles */}
          <Sparkle className="left-[8%] top-[18%] h-3 w-3 md:left-[10%] md:top-[22%]" />
          <Sparkle className="left-[26%] top-[70%] h-2 w-2 [animation-delay:1.2s] md:left-[24%] md:top-[68%]" />
          <Sparkle className="left-[38%] top-[30%] hidden h-2.5 w-2.5 [animation-delay:2.1s] md:block" />

          <div className="relative max-w-[560px] px-6 py-10 text-right md:py-0 md:pl-0 md:pr-16">
            <div className="parto-rise-1 flex items-center justify-start gap-3">
              <span className="text-[11px] font-medium tracking-wide text-[#a87b58]">از سال ۱۳۹۸</span>
              <span className="parto-gold-line h-px w-14" />
            </div>
            <h2 className="parto-rise-2 mt-3 text-[24px] font-bold text-[#2a1a12] sm:text-[26px] md:text-[30px]">داستان برند پرتو</h2>
            <p className="parto-rise-3 mt-4 text-[13px] leading-7 text-[#5a3a28] sm:text-[13px] md:text-[14px] md:leading-8">
پرتو با نگاهی تازه به دنیای فروش آنلاین طلا و جواهرات شکل گرفت؛ جایی که فناوری، زیبایی و تجربه کاربری در کنار هم قرار می‌گیرند. هدف ما ساخت بستری مدرن، منعطف و حرفه‌ای است تا هر کسب‌وکار بتواند هویت منحصربه‌فرد خود را در دنیای دیجیتال به نمایش بگذارد.            </p>
            <GoldButton
              href="/about"
              className="parto-pulse mt-6 !bg-[#3a2418] !bg-none !text-[#f3dcc4] !shadow-none transition-transform duration-500 hover:-translate-y-0.5"
            >
              بیشتر بدانید
            </GoldButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Special collections                                                */
/* ------------------------------------------------------------------ */
const collections = [
  { title: "کالکشن کلاسیک", sub: "جاودانه و خاص", img: "/images/collection/clasik.png",href: "/collection/classic" },
  { title: "کالکشن عشق", sub: "هم‌پای ساده برای همیشه", img: "/images/collection/love.png", href: "/collection" },
  { title: "کالکشن مروارید", sub: "زیبایی در سادگی", img: "/images/collection/morvarid.png", href: "/collection" },
];

const faNum = ["۰۱", "۰۲", "۰۳"];

export function SpecialCollections() {
  return (
    <section className="mx-auto mt-12 max-w-[1360px] px-5 sm:mt-14 sm:px-10">
      <MotionStyles />
      <Reveal>
        <div className="mb-7 text-right">
          <div className="flex items-center gap-3">
            <h2 className="text-[22px] font-bold text-[#2a1a12] sm:text-[26px]">کالکشن‌های ویژه</h2>
            <span className="parto-gold-line hidden h-px flex-1 sm:block" />
          </div>
          <p className="mt-1 text-[12px] text-[#7a5a46]">مجموعه‌های منتخب؛ فرد و خاص</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {collections.map((c, i) => (
          <Reveal
            key={c.title}
            delay={i * 140}
            className="md:[&:nth-child(3)]:col-span-2 lg:[&:nth-child(3)]:col-span-1"
          >
            <Link
              href={c.href}
              className="group lift relative block h-[220px] overflow-hidden rounded-[28px] shadow-[0_18px_40px_rgba(60,36,24,0.28)] transition-transform duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_58px_rgba(60,36,24,0.4)] sm:h-[250px] sm:rounded-[34px] lg:h-[270px]"
            >
              <Photo
                src={c.img}
                gradient="radial-gradient(70% 90% at 30% 30%, #8a6046, #2a1a12 80%)"
                className="absolute inset-0 transition duration-[1400ms] ease-out group-hover:rotate-[0.8deg] group-hover:scale-[1.12]"
                style={{ backgroundPosition: "left center" }}
              />

              <div className="absolute inset-0 bg-gradient-to-l from-[#1c110c]/90 via-[#1c110c]/55 to-[#1c110c]/10 transition duration-700 group-hover:from-[#1c110c]/95 group-hover:via-[#1c110c]/60" />

              {/* gold glow rising from the bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#c8a07c]/0 to-transparent opacity-0 transition duration-700 group-hover:from-[#c8a07c]/20 group-hover:opacity-100" />

              {/* diagonal light sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/5 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition duration-[1400ms] ease-out group-hover:translate-x-[800%] group-hover:opacity-100"
              />

              {/* hairline frame */}
              <span
                aria-hidden
                className="absolute inset-3 rounded-[22px] border border-[#e8c9aa]/0 transition duration-700 group-hover:inset-2.5 group-hover:border-[#e8c9aa]/45 sm:rounded-[26px]"
              />

              {/* index number */}
              <span className="absolute left-5 top-4 select-none text-[28px] font-light leading-none text-[#f3dcc4]/25 transition duration-700 group-hover:-translate-y-0.5 group-hover:text-[#f3dcc4]/70 sm:left-6 sm:top-5">
                {faNum[i]}
              </span>

              <div className="absolute inset-y-0 right-0 flex w-[66%] flex-col justify-center p-6 text-right sm:w-[58%] sm:p-7">
                <span className="mb-3 h-px w-8 origin-right bg-[#e8c9aa]/70 transition-all duration-700 group-hover:w-16" />
                <h3 className="text-[19px] font-bold text-[#f3dcc4] transition duration-700 group-hover:-translate-y-0.5 sm:text-[20px]">
                  {c.title}
                </h3>
                <p className="mt-1 text-[12px] text-[#e6d2bf]/85 transition duration-700 delay-75 group-hover:-translate-y-0.5 group-hover:text-[#f3dcc4]">
                  {c.sub}
                </p>
                <span className="btn-gold mt-5 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2 text-[12px] font-medium transition duration-500 group-hover:gap-3 group-hover:shadow-[0_10px_24px_rgba(200,160,124,0.45)]">
                  مشاهده مجموعه
                  <ArrowLeft className="h-3.5 w-3.5 transition duration-500 group-hover:-translate-x-1.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
