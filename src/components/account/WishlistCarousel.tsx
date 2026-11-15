'use client';

import React, { useRef, useState } from 'react';
import { Photo } from '@/components/home/primitives';
import { AccountCard, ArrowLink, Icon } from './ui';
import { toman } from './validators';
import { mockWishlist, type WishItem } from './accountData';

export const WishlistCarousel: React.FC<{ items?: WishItem[]; onViewAll: () => void }> = ({ items = mockWishlist, onViewAll }) => {
  const ref = useRef<HTMLUListElement>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>(() => Object.fromEntries(items.map((i) => [i.id, true])));
  // در RTL: اسکرول مثبت = برگشت به سمت راست (قبلی)
  const scroll = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: 'smooth' });

  return (
    <AccountCard title="علاقه‌مندی‌های من" icon="heart" action={<ArrowLink onClick={onViewAll}>مشاهده همه</ArrowLink>}>
      <div className="relative px-4 py-6 sm:px-6" dir="rtl">
        <ul ref={ref} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-1 sm:gap-5">
          {items.map((it) => (
            <li key={it.id} className="w-[170px] flex-none snap-start sm:w-[190px]">
              <div className="group relative aspect-[1/1] overflow-hidden rounded-[20px] border border-white/70 shadow-[0_8px_20px_rgba(110,72,46,0.18)]">
                <Photo src={it.image} gradient="linear-gradient(135deg,#f3e1cf,#d9b595)" className="h-full w-full transition duration-700 group-hover:scale-110" />
                <button
                  type="button"
                  aria-label={liked[it.id] ? `حذف ${it.title} از علاقه‌مندی‌ها` : `افزودن ${it.title} به علاقه‌مندی‌ها`}
                  aria-pressed={!!liked[it.id]}
                  onClick={() => setLiked((s) => ({ ...s, [it.id]: !s[it.id] }))}
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-[#3a2418] backdrop-blur transition hover:scale-110 hover:bg-white"
                >
                  <Icon name="heart" className={`h-4 w-4 ${liked[it.id] ? 'fill-[#c0674a] text-[#c0674a]' : ''}`} />
                </button>
                {!it.inStock && <span className="absolute bottom-3 right-3 rounded-full bg-[#1c110c]/75 px-3 py-1 text-[12px] text-[#f3dcc4] backdrop-blur">ناموجود</span>}
              </div>
              <p className="mt-3 text-[14px] font-bold text-[#2a1a12]">{it.title}</p>
              <p className="mt-0.5 text-[13px] text-[#6b4f3e]">{toman(it.price)}</p>
            </li>
          ))}
        </ul>

        <button type="button" aria-label="قبلی" onClick={() => scroll(300)} className="absolute right-1 top-[38%] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#e8c9aa] text-[#3a2418] shadow-md transition hover:scale-105 sm:grid">
          <Icon name="chevron" className="h-4 w-4 rotate-180" />
        </button>
        <button type="button" aria-label="بعدی" onClick={() => scroll(-300)} className="absolute left-1 top-[38%] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#e8c9aa] text-[#3a2418] shadow-md transition hover:scale-105 sm:grid">
          <Icon name="chevron" className="h-4 w-4" />
        </button>
      </div>
    </AccountCard>
  );
};

export default WishlistCarousel;
