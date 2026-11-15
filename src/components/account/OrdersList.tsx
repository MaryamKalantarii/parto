'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Photo } from '@/components/home/primitives';
import { AccountCard, Badge, EmptyState, Icon, btnGhost, btnPrimary, inputCls } from './ui';
import { toEn, toFa, toman } from './validators';
import { mockOrders, statusMeta, type Order } from './accountData';
import { OrderStepper } from './RecentOrders';

export type { OrderItem } from './accountData';

type Filter = 'ALL' | 'ACTIVE' | 'DELIVERED' | 'CANCELLED';

const filters: { id: Filter; label: string; test: (o: Order) => boolean }[] = [
  { id: 'ALL', label: 'همه', test: () => true },
  { id: 'ACTIVE', label: 'در جریان', test: (o) => o.status === 'PROCESSING' || o.status === 'IN_TRANSIT' },
  { id: 'DELIVERED', label: 'تحویل‌شده', test: (o) => o.status === 'DELIVERED' },
  { id: 'CANCELLED', label: 'لغو شده', test: (o) => o.status === 'CANCELLED' },
];

interface Props {
  orders?: Order[];
  onReorder?: (o: Order) => void;
  onSupport?: (o: Order) => void;
  onDownload?: (kind: 'invoice' | 'certificate', o: Order) => void;
}

export const OrdersList: React.FC<Props> = ({ orders = mockOrders, onReorder, onSupport, onDownload }) => {
  const [filter, setFilter] = useState<Filter>('ALL');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<string | null>(orders.find((o) => o.status === 'IN_TRANSIT')?.id ?? null);
  const [copied, setCopied] = useState<string | null>(null);

  const list = useMemo(() => {
    const f = filters.find((x) => x.id === filter)!;
    const term = toEn(q).trim().toLowerCase();
    return orders.filter((o) => f.test(o) && (!term || o.number.toLowerCase().includes(term) || o.lines.some((l) => l.title.includes(q.trim()))));
  }, [orders, filter, q]);

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* کلیپ‌بورد در دسترس نبود */
    }
  };

  return (
    <AccountCard title="تاریخچه سفارش‌ها" subtitle="خریدهای قبلی خود را ببینید و سفارش‌های در جریان را پیگیری کنید." icon="bag">
      <div className="space-y-5 p-5 sm:p-7" dir="rtl">
        {/* فیلتر و جستجو */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" aria-label="فیلتر سفارش‌ها" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {filters.map((f) => {
              const on = f.id === filter;
              const n = orders.filter(f.test).length;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(f.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-medium transition ${
                    on ? 'border-transparent bg-gradient-to-br from-[#4a2c1c] to-[#2a170e] text-[#f3dcc4] shadow-[0_8px_18px_rgba(42,23,14,0.28)]' : 'border-[#c8a07c]/45 bg-white/50 text-[#5a3a28] hover:bg-white'
                  }`}
                >
                  {f.label}
                  <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11.5px] ${on ? 'bg-white/20' : 'bg-[#2a1a12]/[0.08]'}`}>{toFa(n)}</span>
                </button>
              );
            })}
          </div>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="جستجوی شماره سفارش یا نام محصول…"
            aria-label="جستجو در سفارش‌ها"
            className={`${inputCls} !h-11 lg:!w-[300px]`}
          />
        </div>

        {list.length === 0 && <EmptyState title="سفارشی پیدا نشد" text="فیلتر یا عبارت جستجو را تغییر دهید." />}

        <ul className="space-y-4">
          {list.map((o, idx) => {
            const isOpen = open === o.id;
            const st = statusMeta[o.status];
            return (
              <motion.li
                key={o.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx, 5) * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`overflow-hidden rounded-[22px] border bg-white/50 transition duration-300 ${isOpen ? 'border-[#c8a07c] shadow-[0_14px_34px_rgba(110,72,46,0.14)]' : 'border-[#d9bfa6]/70 hover:border-[#c8a07c]'}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : o.id)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-wrap items-center gap-4 p-4 text-right sm:p-5"
                >
                  <div className="flex -space-x-3 space-x-reverse">
                    {o.lines.slice(0, 3).map((l, i) => (
                      <Photo key={i} src={l.image} gradient="linear-gradient(135deg,#f3e1cf,#d9b595)" className="h-14 w-14 rounded-2xl border-2 border-[#fbf1e6] shadow-[0_4px_12px_rgba(110,72,46,0.2)]" />
                    ))}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span dir="ltr" className="text-[15px] font-bold text-[#2a1a12]">{o.number}</span>
                      <Badge tone={st.tone}>{st.label}</Badge>
                    </div>
                    <p className="mt-1.5 truncate text-[13.5px] text-[#6b4f3e]">
                      {o.lines.map((l) => l.title).join('، ')} · {o.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[15px] font-bold text-[#2a1a12]">{toman(o.total)}</span>
                    <Icon name="chevron" className={`h-5 w-5 text-[#8a6a54] transition duration-300 ${isOpen ? '-rotate-90' : ''}`} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-6 border-t border-[#d9bfa6]/60 p-4 sm:p-6">
                        {/* مراحل */}
                        <div className="rounded-[18px] bg-white/45 px-3 py-5 sm:px-6">
                          <OrderStepper status={o.status} />
                        </div>

                        {/* اقلام */}
                        <ul className="divide-y divide-[#d9bfa6]/50">
                          {o.lines.map((l, i) => (
                            <li key={i} className="flex items-center gap-4 py-3">
                              <Photo src={l.image} gradient="linear-gradient(135deg,#f3e1cf,#d9b595)" className="h-16 w-16 flex-none rounded-2xl border border-white/70" />
                              <div className="min-w-0 flex-1">
                                <p className="text-[15px] font-bold text-[#2a1a12]">{l.title}</p>
                                <p className="mt-0.5 text-[13px] text-[#7a5a46]">{l.variant}</p>
                              </div>
                              <div className="text-left">
                                <p className="text-[14px] font-medium text-[#2a1a12]">{toman(l.price)}</p>
                                <p className="text-[12.5px] text-[#8a7261]">تعداد: {toFa(l.qty)}</p>
                              </div>
                            </li>
                          ))}
                        </ul>

                        {/* جزئیات */}
                        <dl className="grid gap-4 text-[14px] sm:grid-cols-2">
                          <div className="rounded-2xl bg-white/45 p-4">
                            <dt className="flex items-center gap-2 text-[13px] text-[#7a5a46]"><Icon name="pin" className="h-4 w-4" /> آدرس تحویل</dt>
                            <dd className="mt-1.5 leading-7 text-[#2a1a12]">{o.address}</dd>
                          </div>
                          <div className="rounded-2xl bg-white/45 p-4">
                            <dt className="flex items-center gap-2 text-[13px] text-[#7a5a46]"><Icon name="card" className="h-4 w-4" /> روش پرداخت</dt>
                            <dd className="mt-1.5 text-[#2a1a12]">{o.payment}</dd>
                          </div>
                          {o.trackingCode && (
                            <div className="rounded-2xl bg-white/45 p-4 sm:col-span-2">
                              <dt className="flex items-center gap-2 text-[13px] text-[#7a5a46]"><Icon name="truck" className="h-4 w-4" /> کد رهگیری پست</dt>
                              <dd className="mt-1.5 flex flex-wrap items-center gap-3">
                                <span dir="ltr" className="font-bold tracking-wide text-[#2a1a12]">{o.trackingCode}</span>
                                <button type="button" onClick={() => copy(o.trackingCode!)} className="inline-flex items-center gap-1.5 rounded-full border border-[#c8a07c]/60 px-3 py-1 text-[12.5px] text-[#5a3a28] transition hover:bg-[#f3dcc4]">
                                  <Icon name={copied === o.trackingCode ? 'check' : 'copy'} className="h-3.5 w-3.5" />
                                  {copied === o.trackingCode ? 'کپی شد' : 'کپی'}
                                </button>
                              </dd>
                            </div>
                          )}
                        </dl>

                        {/* اقدام‌ها */}
                        <div className="flex flex-wrap items-center gap-3">
                          <button type="button" onClick={() => onDownload?.('invoice', o)} className={btnGhost}>
                            <Icon name="receipt" className="h-[18px] w-[18px]" /> دانلود فاکتور
                          </button>
                          {o.hasCertificate && (
                            <button type="button" onClick={() => onDownload?.('certificate', o)} className={btnGhost}>
                              <Icon name="award" className="h-[18px] w-[18px]" /> گواهی اصالت
                            </button>
                          )}
                          <button type="button" onClick={() => onSupport?.(o)} className={btnGhost}>
                            <Icon name="headset" className="h-[18px] w-[18px]" /> پشتیبانی این سفارش
                          </button>
                          {o.status !== 'PROCESSING' && (
                            <button type="button" onClick={() => onReorder?.(o)} className={`${btnPrimary} sm:mr-auto`}>
                              خرید مجدد
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </AccountCard>
  );
};

export default OrdersList;
