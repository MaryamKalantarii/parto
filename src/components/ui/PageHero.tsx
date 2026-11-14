import Link from 'next/link';
import { Bg } from '@/components/ui/Bg';
import { IMG } from '@/lib/themeImages';

/* هیرو صفحات داخلی (تماس، درباره ما، خدمات مشتریان، تکمیل خرید) — زیر هدر ثابت سایت */
export function PageHero({
  title, subtitle, crumb, big = false, ring = IMG.ringHero,
}: { title: string; subtitle: string; crumb?: string; big?: boolean; ring?: string }) {
  return (
    <section className="relative isolate h-[290px] overflow-hidden sm:h-[310px] lg:h-[340px]">
      <Bg src={IMG.silk} fallback="linear-gradient(160deg,#d9b592,#b98d68 45%,#8d6243)" pos="center 30%" className="absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(180deg,rgba(28,17,12,.85) 0%,rgba(70,40,24,.28) 48%,rgba(0,0,0,0) 100%), linear-gradient(270deg,rgba(43,23,14,.72) 0%,rgba(43,23,14,.35) 38%,rgba(0,0,0,0) 62%)' }}
      />
      <Bg src={ring} fallback="transparent" size="contain" pos="left center" className="pointer-events-none absolute inset-y-2 left-0 hidden w-[52%] sm:block" />
      <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col justify-center px-5 pb-8 pt-[68px] text-right lg:px-11 lg:pt-[88px]">
        {crumb && (
          <nav aria-label="مسیر صفحه" className="mb-2 text-[12px] text-[#f0dccb]/90">
            <Link href="/" className="hover:text-white">خانه</Link>
            <span className="mx-1.5">/</span>
            <span>{crumb}</span>
          </nav>
        )}
        <h1 className={`font-bold text-[#fbeee2] drop-shadow-[0_2px_8px_rgba(30,12,4,0.45)] ${big ? 'text-[36px] lg:text-[38px]' : 'text-[32px] lg:text-[34px]'}`}>{title}</h1>
        <p className="mt-2 text-[15px] text-[#f6e4d4]">{subtitle}</p>
        <span aria-hidden className="mt-3 h-px w-[60px] bg-gradient-to-l from-[#f0dccb]/80 to-transparent" />
      </div>
      <div aria-hidden className="parto-wave absolute inset-x-0 -bottom-px h-[52px] bg-[#f8e4d5] sm:h-[64px]" />
    </section>
  );
}
