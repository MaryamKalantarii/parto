"use client";
import { X, Minus, Plus } from "lucide-react";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <div className={`fixed inset-0 z-[70] pointer-events-none transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}>
    <div className={`absolute inset-0 bg-black/35 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0"}`} onClick={onClose} />
    <aside className={`absolute left-0 top-0 h-full w-full max-w-[520px] bg-[var(--pearl)] text-[var(--graphite)] p-8 md:p-12 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] text-right ${open ? "translate-x-0 pointer-events-auto" : "-translate-x-full"}`}>
      <div className="flex justify-between items-center flex-row-reverse"><span className="eyebrow">سبد خرید شما</span><button onClick={onClose}><X size={19} strokeWidth={1.2}/></button></div>
      <div className="mt-20 flex gap-6 items-center flex-row-reverse"><div className="w-24 aspect-square bg-[var(--stone)] grid place-items-center"><div className="w-14 h-14 rounded-full border-[13px] border-[#cbc9c4]" /></div><div className="flex-1"><div className="eyebrow">انگشتر پرتو</div><p className="text-xs opacity-55 mt-2">نقره / سایز ۸</p><div className="flex justify-between mt-5 flex-row-reverse"><div className="flex items-center gap-3"><Plus size={12}/><span>۱</span><Minus size={12}/></div><span>۳,۸۵۰ تومان</span></div></div></div>
      <div className="absolute bottom-10 left-8 right-8 md:left-12 md:right-12"><div className="flex justify-between border-t border-black/10 pt-5 text-xs flex-row-reverse"><span>مجموع</span><span>۳,۸۵۰ تومان</span></div><button className="mt-5 w-full bg-[var(--black)] text-[var(--pearl)] py-5 text-[10px] tracking-[.18em]">تسویه حساب ←</button></div>
    </aside>
  </div>;
}

export interface ProductMaterial {
  id: string;
  label: string;
  gradient: string;
  images: string[];
}

export interface Product {
  id: string;
  number: string;
  slug: string;
  name: string;
  subTitle: string;
  category: string;
  price: string;
  rawPrice: number;
  rating: number;
  reviewsCount: number;
  description: string;
  isBestSeller: boolean;
  isDiscount: boolean;
  isNew: boolean;
  materials: ProductMaterial[];
}

export const allProducts: Product[] = [
  {
    id: '1',
    number: '۰۱ / ۱۲',
    slug: 'lumiere-ring',
    name: 'انگشتر لومیر',
    subTitle: 'انگشتر تک نگین الماس',
    category: 'RINGS',
    price: '۳,۸۵۰,۰۰۰ تومان',
    rawPrice: 3850,
    rating: 4.9,
    reviewsCount: 124,
    description: 'تجسمی جاودانه از زیبایی خالص. انگشتر لومیر نور را در ناب‌ترین شکل خود به تصویر می‌کشد — طراحی‌شده برای یک عمر.',
    isBestSeller: true,
    isDiscount: false,
    isNew: true,
    materials: [
      {
        id: 'white-gold',
        label: 'طلای سفید',
        gradient: 'from-zinc-300 via-[#e4e4e7] to-zinc-500',
        images: [
          '/images/product-hero-model1111.jpg',
          '/images/product-detail-2.jpg',
          '/images/product-detail-3.jpg',
          '/images/product-detail-4.jpg',
          '/images/product-detail-5.jpg',
        ],
      },
      {
        id: 'yellow-gold',
        label: 'طلای زرد',
        gradient: 'from-[#ffd700] via-[#d4af37] to-[#996515]',
        images: [
          '/images/product-hero-model1111.jpg',
          '/images/product-detail-2.jpg',
          '/images/product-detail-3.jpg',
          '/images/product-detail-4.jpg',
          '/images/product-detail-5.jpg',
        ],
      },
      {
        id: 'rose-gold',
        label: 'طلای رزگلد',
        gradient: 'from-[#e8a598] via-[#f7d6cd] to-[#b76e79]',
        images: [
          '/images/product-hero-model1111.jpg',
          '/images/product-detail-2.jpg',
          '/images/product-detail-3.jpg',
          '/images/product-detail-4.jpg',
          '/images/product-detail-5.jpg',
        ],
      },
      {
        id: 'silver',
        label: 'نقره استرلینگ',
        gradient: 'from-slate-200 via-gray-300 to-slate-400',
        images: [
          '/images/product-hero-model1111.jpg',
          '/images/product-detail-2.jpg',
          '/images/product-detail-3.jpg',
          '/images/product-detail-4.jpg',
          '/images/product-detail-5.jpg',
        ],
      },
    ],
  },
];