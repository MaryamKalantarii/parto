'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { Bg } from '@/components/ui/Bg';
import { Ico } from '@/components/icons/Ico';
import { IMG } from '@/lib/themeImages';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ظاهر شدن نرم هنگام اسکرول */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* عدد شمارشی با ارقام فارسی */
export function AnimatedNumber({
  to,
  prefix = '',
  suffix = '',
  grouping = false,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  grouping?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: EASE, onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);

  return (
    <span ref={ref} dir="rtl">
      {prefix}
      {Math.round(v).toLocaleString('fa-IR', { useGrouping: grouping })}
      {suffix}
    </span>
  );
}

/* جرقه‌های شناور تزئینی */
export function Sparkles({ count = 6, className = '' }: { count?: number; className?: string }) {
  const items = Array.from({ length: count }, (_, i) => ({
    left: `${10 + ((i * 83) % 80)}%`,
    top: `${8 + ((i * 47) % 78)}%`,
    size: 6 + ((i * 5) % 9),
    delay: i * 0.55,
    dur: 3.2 + (i % 3),
  }));
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {items.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rotate-45 bg-white/90 shadow-[0_0_12px_3px_rgba(255,236,210,0.9)]"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size, borderRadius: 2 }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1.15, 0.4], y: [0, -10, 0] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ویترین متحرک جایگزین ویدیو */
export function IntroShowcase() {
  return (
    <div className="relative grid grid-cols-2 gap-4">
      {/* تصویر اصلی با زوم آرام و برق نور */}
      <motion.figure
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative col-span-2 overflow-hidden rounded-[26px] border border-white/70 shadow-[0_14px_34px_rgba(110,72,46,0.22)]"
      >
        <motion.div
          className="h-full w-full"
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Bg src={IMG.ringBox} className="aspect-[1.95/1] min-h-[220px] w-full" />
        </motion.div>

        <motion.span
          aria-hidden
          className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ left: '-40%' }}
          animate={{ left: '140%' }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
        />
        <Sparkles count={7} />

        <motion.figcaption
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[12px] font-bold text-[#2a170e] shadow-[0_8px_20px_rgba(110,72,46,0.2)] backdrop-blur-md"
        >
          <Ico name="shieldCheck" className="h-[18px] w-[18px]" sw={1.5} />
          ضمانت اصالت کالا
        </motion.figcaption>
      </motion.figure>

      {/* باکس حلقه‌ی چرخان */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        whileHover={{ y: -6 }}
        className="border border-[#e8d6c4] bg-white/90 shadow-[0_10px_30px_rgba(90,58,40,0.08)] relative grid min-h-[170px] place-items-center overflow-hidden rounded-[22px]"
      >
        <motion.span
          aria-hidden
          className="absolute h-[130px] w-[130px] rounded-full border border-dashed border-[#a67a5c]/70"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          aria-hidden
          className="absolute h-[96px] w-[96px] rounded-full border border-[#7a4a2c]/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#7a4a2c] shadow-[0_0_10px_#c9946e]" />
        </motion.span>
        <div className="relative text-center">
          <div className="text-[24px] font-bold text-[#2a170e]">
            <AnimatedNumber to={10} prefix="+" />
          </div>
          <div className="text-[11px] text-[#7a5a48]">سال درخشش</div>
        </div>
      </motion.div>

      {/* باکس النگو با هاور */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        whileHover={{ y: -6 }}
        className="group relative min-h-[170px] overflow-hidden rounded-[22px] border border-white/70 shadow-[0_10px_26px_rgba(110,72,46,0.18)]"
      >
        <Bg
          src={IMG.bracelet}
          fallback="linear-gradient(135deg,#f3d5bd,#d6a783)"
          className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a170e]/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="text-[14px] font-bold">طراحی خاص</div>
          <div className="mt-0.5 text-[11px] text-white/80 transition-all duration-500 group-hover:tracking-wide">
            هر قطعه، یک داستان
          </div>
        </div>
        <Sparkles count={3} />
      </motion.div>
    </div>
  );
}

/* نوار متحرک ارزش‌ها */
export function MarqueeStrip({ words }: { words: string[] }) {
  const list = [...words, ...words, ...words, ...words];
  return (
    <div dir="ltr" className="relative overflow-hidden rounded-full border border-[#e8d6c4] bg-white/80 py-3.5 shadow-[0_8px_22px_rgba(110,72,46,0.12)] backdrop-blur">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#f6ebe0] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#f6ebe0] to-transparent" />
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
      >
        {list.map((w, i) => (
          <span key={i} dir="rtl" className="flex items-center gap-10 text-[14px] font-bold text-[#4a2f20]">
            {w}
            <span className="rotate-45 text-[11px] text-[#b9825a]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* مراحل با خط متحرک */
export function ProcessSteps({
  steps,
}: {
  steps: { icon: string; title: string; sub: string }[];
}) {
  return (
    <div className="relative">
      <motion.span
        aria-hidden
        className="absolute right-[10%] top-[34px] hidden h-px w-[80%] origin-right bg-gradient-to-l from-[#7a4a2c] via-[#c9946e] to-[#7a4a2c]/20 lg:block"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.8, ease: EASE }}
      />
      <ol className="relative grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-5">
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15 * i, ease: EASE }}
            className="group flex flex-col items-center text-center"
          >
            <span className="relative grid h-[68px] w-[68px] place-items-center rounded-full border border-[#a67a5c]/50 bg-[#fbf4ec] shadow-[0_10px_22px_rgba(110,72,46,0.18)] transition duration-500 group-hover:-translate-y-1.5 group-hover:bg-white">
              <Ico name={s.icon} className="h-[30px] w-[30px] text-[#3a2418]" sw={1.2} />
              <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[#3a2418] text-[11px] font-bold text-[#f6e9dc]">
                {(i + 1).toLocaleString('fa-IR')}
              </span>
            </span>
            <h3 className="mt-3 text-[15px] font-bold text-[#2a170e]">{s.title}</h3>
            <p className="mt-1 max-w-[170px] text-[12px] leading-6 text-[#7a5a48]">{s.sub}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* باکس‌های تعاملی: کارت‌های شیشه‌ای با نور دنبال‌کننده‌ی موس */
export function GlowCards({
  items,
}: {
  items: { icon: string; title: string; sub: string; tag: string }[];
}) {
  const [pos, setPos] = useState<Record<number, { x: number; y: number }>>({});
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setPos((p) => ({ ...p, [i]: { x: e.clientX - r.left, y: e.clientY - r.top } }));
          }}
          className="border border-[#e8d6c4] bg-white/90 shadow-[0_10px_30px_rgba(90,58,40,0.08)] group relative min-h-[210px] overflow-hidden rounded-[24px] p-7"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(260px circle at ${pos[i]?.x ?? 0}px ${pos[i]?.y ?? 0}px, rgba(217,185,154,0.45), transparent 70%)`,
            }}
          />
          <div className="relative flex h-full flex-col justify-between gap-6">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[#a67a5c]/40 bg-white/60">
                <Ico name={it.icon} className="h-[26px] w-[26px] text-[#3a2418]" sw={1.2} />
              </span>
              <span className="rounded-full border border-[#a67a5c]/40 px-3 py-1 text-[11px] text-[#7a5a48]">{it.tag}</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#2a170e]">{it.title}</h3>
              <p className="mt-2 text-[12.5px] leading-7 text-[#6b4a38]">{it.sub}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
