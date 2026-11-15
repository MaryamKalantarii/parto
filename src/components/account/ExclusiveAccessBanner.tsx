'use client';

import React from 'react';
import Link from 'next/link';
import { DiamondIcon } from '@/components/home/primitives';
import { Icon } from './ui';

interface Props {
  title?: string;
  text?: string;
  href?: string;
  cta?: string;
}

export const ExclusiveAccessBanner: React.FC<Props> = ({
  title = 'همیشه در کنار شما',
  text = 'پرتو، انتخابی برای تمام لحظه‌ها',
  href = '/collection',
  cta = 'مشاهده مجموعه‌ها',
}) => {
  return (
    <aside
      dir="rtl"
      className="group relative overflow-hidden rounded-[26px] border border-white/60 px-6 py-8 text-center shadow-[0_14px_40px_rgba(110,72,46,0.18)]"
      style={{
        background: 'radial-gradient(90% 120% at 20% 0%, rgba(255,255,255,0.6), transparent 60%), linear-gradient(160deg,#f1d3bb,#e3b89a 55%,#ecc9ae)',
      }}
    >
      {/* قاب نازک داخلی و نور مورب با هاور */}
      <span aria-hidden className="pointer-events-none absolute inset-2.5 rounded-[20px] border border-white/60" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition duration-[1400ms] ease-out group-hover:translate-x-[600%] group-hover:opacity-100" />
      <DiamondIcon className="anim-float mx-auto h-8 w-10 text-[#8d6243]" />
      <h3 className="mt-3 text-[18px] font-bold text-[#3a2418]">{title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-7 text-[#5a3a28]">{text}</p>
      <Link href={href} className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-[#3a2418] px-6 py-2.5 text-[13.5px] font-bold text-[#f3dcc4] transition hover:gap-3">
        {cta}
        <Icon name="chevron" className="h-4 w-4" />
      </Link>
    </aside>
  );
};

export default ExclusiveAccessBanner;
