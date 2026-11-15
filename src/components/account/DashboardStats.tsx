'use client';

/**
 * کارت‌های آمار بالای داشبورد (جدید)  →  components/account/DashboardStats.tsx
 * هر کارت با کلیک به تب مربوط می‌رود. اعداد با انیمیشن بالا می‌روند (و با reduced-motion بدون انیمیشن).
 */

import React, { useEffect, useState } from 'react';
import { Icon, type IconName } from './ui';
import type { AccountTab } from './AccountSidebar';

function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setV(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 900);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v.toLocaleString('fa-IR')}</>;
}

export interface Stat {
  tab: AccountTab;
  label: string;
  value: number;
  unit?: string;
  icon: IconName;
}

export const defaultStats: Stat[] = [
  { tab: 'orders', label: 'سفارش‌های فعال', value: 1, icon: 'truck' },
  { tab: 'wishlist', label: 'علاقه‌مندی‌ها', value: 4, icon: 'heart' },
  { tab: 'wallet', label: 'اعتبار کیف پول', value: 1750000, unit: 'تومان', icon: 'wallet' },
  { tab: 'account', label: 'امتیاز باشگاه', value: 320, unit: 'امتیاز', icon: 'award' },
];

export function DashboardStats({ stats = defaultStats, onNavigate }: { stats?: Stat[]; onNavigate: (tab: AccountTab) => void }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4" dir="rtl">
      {stats.map((s) => (
        <li key={s.label}>
          <button
            type="button"
            onClick={() => onNavigate(s.tab)}
            className="group glass-cream relative flex h-full w-full flex-col items-start gap-3 overflow-hidden rounded-[22px] p-4 text-right transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(110,72,46,0.2)] sm:p-5"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#4a2c1c] to-[#2a170e] text-[#f3dcc4] transition duration-500 group-hover:from-[#c8a07c] group-hover:to-[#a87a56] group-hover:text-[#2a1a12]">
              <Icon name={s.icon} className="h-[22px] w-[22px]" />
            </span>
            <span className="text-[13px] text-[#6b4f3e]">{s.label}</span>
            <span className="flex items-baseline gap-1.5 text-[#2a1a12]">
              <b className="text-[22px] font-bold leading-none tabular-nums sm:text-[26px]">
                <CountUp to={s.value} />
              </b>
              {s.unit && <span className="text-[12.5px] text-[#7a5a46]">{s.unit}</span>}
            </span>
            <span aria-hidden className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-[#c8a07c]/15 blur-2xl transition duration-500 group-hover:bg-[#c8a07c]/30" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default DashboardStats;
