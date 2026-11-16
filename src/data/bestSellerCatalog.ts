import { bestSellers } from './bestSellers';
import { DISCOUNT_PERCENT } from '@/lib/pricing';
import type { RingItem, GoldType, RingKind } from './ringsCatalog';
import type { Product } from '@/types/product';

/* کاتالوگ محصولات = همان «پرفروش‌ترین‌های» صفحه خانه، در ۳ صفحه‌ی پشت‌سرهم.
   وقتی محصولات واقعی بیشتری اضافه شد، فقط CATALOG_PAGES را کم کنید یا
   به‌جای تکرار، لیست کامل allProducts را به toItem بدهید. */
export const CATALOG_PAGES = 3;
export const CATALOG_PAGE_SIZE = bestSellers.length; // هر صفحه = یک دور کامل پرفروش‌ها

const goldOf = (p: Product): GoldType => {
  const id = p.materials[0]?.id ?? '';
  return id.includes('yellow') ? 'yellow' : id.includes('rose') ? 'rose' : 'white';
};

const kindsOf = (p: Product): RingKind[] => (p.category === 'RINGS' ? ['gold', 'diamond'] : ['diamond']);

function toItem(p: Product, copy: number, index: number): RingItem {
  const price = p.rawPrice * 1000; // rawPrice محصولات بر حسب هزار تومان است
  const oldPrice = p.isDiscount ? Math.round(price / (1 - DISCOUNT_PERCENT / 100) / 10000) * 10000 : undefined;
  const total = CATALOG_PAGES * CATALOG_PAGE_SIZE;
  return {
    id: `${p.slug}-p${copy + 1}`,
    name: p.name,
    subTitle: p.subTitle,
    rawPrice: price,
    oldPrice,
    gold: goldOf(p),
    stone: 'diamond',
    kinds: kindsOf(p),
    brand: 'پرتو',
    image: p.materials[0]?.images[0] ?? '',
    images: (p.materials[0]?.images ?? []).slice(0, 3),
    slug: p.slug,
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    badge: 'پرفروش‌ترین',
    // ترتیب «جدیدترین» همان ترتیب پرفروش‌ها در هر صفحه را حفظ می‌کند
    createdAt: total - (copy * CATALOG_PAGE_SIZE + index),
  };
}

export const bestSellerCatalog: RingItem[] = Array.from({ length: CATALOG_PAGES }).flatMap((_, copy) =>
  bestSellers.map((p, i) => toItem(p, copy, i)),
);
