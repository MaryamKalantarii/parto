import { allProducts } from './products';
import type { Product } from '@/types/product';

/* پرفروش‌ترین‌ها — منبع واحد برای صفحه خانه، سبد خرید و کاتالوگ محصولات.
   محصولات isBestSeller اول می‌آیند و در صورت کمبود، با بقیه‌ی محصولات تا ۶ مورد پر می‌شود. */
export const BEST_SELLERS_COUNT = 6;

export const bestSellers: Product[] = [
  ...allProducts.filter((p) => p.isBestSeller),
  ...allProducts.filter((p) => !p.isBestSeller),
].slice(0, BEST_SELLERS_COUNT);
