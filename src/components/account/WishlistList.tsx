'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Photo } from '@/components/home/primitives';
import { AccountCard, EmptyState, Icon, btnGhost, btnPrimary } from './ui';
import { toFa, toman } from './validators';
import { mockWishlist, type WishItem } from './accountData';

export type WishlistItem = WishItem;

interface Props {
  items?: WishItem[];
  onAddToCart?: (item: WishItem) => void;
}

export const WishlistList: React.FC<Props> = ({ items: initial = mockWishlist, onAddToCart }) => {
  const [items, setItems] = useState<WishItem[]>(initial);
  const [added, setAdded] = useState<string[]>([]);
  const [notify, setNotify] = useState<string[]>([]);

  const add = (it: WishItem) => {
    onAddToCart?.(it);
    setAdded((a) => [...a, it.id]);
    setTimeout(() => setAdded((a) => a.filter((x) => x !== it.id)), 1800);
  };
  const addAll = () => items.filter((i) => i.inStock).forEach(add);
  const available = items.filter((i) => i.inStock);
  const total = available.reduce((a, i) => a + i.price, 0);

  return (
    <AccountCard
      title="علاقه‌مندی‌ها"
      subtitle={`${toFa(items.length)} قطعه‌ی ذخیره‌شده`}
      icon="heart"
      action={
        available.length > 1 && (
          <button type="button" onClick={addAll} className={`${btnGhost} !h-10 !px-5 !text-[13px]`}>
            افزودن همه‌ی موجودها به سبد
          </button>
        )
      }
    >
      <div className="p-5 sm:p-7" dir="rtl">
        {items.length === 0 ? (
          <EmptyState
            title="لیست علاقه‌مندی‌های شما خالی است"
            text="با زدن قلب روی هر جواهر، آن را اینجا نگه می‌دارید تا بعداً سراغش بیایید."
            action={<Link href="/collection" className={btnPrimary}>مشاهده مجموعه‌ها</Link>}
          />
        ) : (
          <>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {items.map((it) => (
                  <motion.li
                    key={it.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-b from-[#fffaf4] to-[#f6e5d4] shadow-[0_10px_24px_rgba(90,56,34,0.1)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(90,56,34,0.18)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Photo src={it.image} gradient="linear-gradient(135deg,#f3e1cf,#d9b595)" className={`absolute inset-0 transition duration-[1200ms] group-hover:scale-110 ${it.inStock ? '' : 'opacity-70 saturate-50'}`} />
                      <span className="absolute right-3 top-3 rounded-full bg-[#1c110c]/70 px-3 py-1 text-[12px] text-[#f3dcc4] backdrop-blur">{it.category}</span>
                      <button
                        type="button"
                        aria-label={`حذف ${it.title} از علاقه‌مندی‌ها`}
                        onClick={() => setItems((p) => p.filter((x) => x.id !== it.id))}
                        className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-[#c0674a] backdrop-blur transition hover:scale-110 hover:bg-white"
                      >
                        <Icon name="heart" className="h-4 w-4 fill-current" />
                      </button>
                    </div>
                    <div className="p-4 text-right">
                      <h3 className="text-[16px] font-bold text-[#2a1a12]">{it.title}</h3>
                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <span className="text-[14.5px] font-medium text-[#3a2418]">{toman(it.price)}</span>
                        <span className={`text-[12.5px] font-medium ${it.inStock ? 'text-[#3f6b3a]' : 'text-[#9a3a26]'}`}>{it.inStock ? 'موجود' : 'ناموجود'}</span>
                      </div>
                      {it.inStock ? (
                        <button type="button" onClick={() => add(it)} className={`${btnPrimary} mt-4 w-full !h-11`}>
                          {added.includes(it.id) ? (<><Icon name="check" className="h-4 w-4" /> به سبد اضافه شد</>) : 'افزودن به سبد خرید'}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setNotify((n) => (n.includes(it.id) ? n.filter((x) => x !== it.id) : [...n, it.id]))}
                          aria-pressed={notify.includes(it.id)}
                          className={`${btnGhost} mt-4 w-full`}
                        >
                          <Icon name="bell" className="h-4 w-4" />
                          {notify.includes(it.id) ? 'موجود شد، خبرم کن ✓' : 'وقتی موجود شد خبرم کن'}
                        </button>
                      )}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {available.length > 0 && (
              <p className="mt-6 text-[13.5px] text-[#7a5a46]">
                مجموع قیمت قطعه‌های موجود: <b className="text-[#2a1a12]">{toman(total)}</b>
              </p>
            )}
          </>
        )}
      </div>
    </AccountCard>
  );
};

export default WishlistList;
