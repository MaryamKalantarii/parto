'use client';

import React from 'react';
import { Photo } from '@/components/home/primitives';
import { AccountCard, ArrowLink, Badge, Icon, btnGhost } from './ui';
import { toFa, toman } from './validators';
import { initialOrders, orderSteps, statusMeta, type Order, type OrderStatus } from './accountData';

export type { OrderItem } from './accountData';

export function OrderStepper({ status }: { status: OrderStatus }) {
  if (status === 'CANCELLED') return <Badge tone="danger">این سفارش لغو شده است</Badge>;
  const cur = statusMeta[status].step;
  const delivered = status === 'DELIVERED';
  return (
    <ol className="flex items-start" aria-label="مراحل سفارش" dir="rtl">
      {orderSteps.map((label, i) => {
        const done = i < cur || delivered;
        const current = i === cur && !delivered;
        return (
          <li key={label} className="relative flex flex-1 flex-col items-center text-center">
            {i > 0 && (
              <span aria-hidden className={`absolute left-1/2 top-[15px] h-0.5 w-full ${done || current ? 'bg-gradient-to-l from-[#b3865f] to-[#c8a07c]' : 'bg-[#d9bfa6]/60'}`} />
            )}
            <span
              className={`relative z-10 grid h-[31px] w-[31px] place-items-center rounded-full border-2 transition ${
                done
                  ? 'border-transparent bg-gradient-to-br from-[#c8a07c] to-[#a87a56] text-white'
                  : current
                    ? 'border-[#b3865f] bg-[#fbf1e6] text-[#84563a] shadow-[0_0_0_5px_rgba(200,160,124,0.25)]'
                    : 'border-[#d9bfa6] bg-[#f6ebe0] text-[#b9a08a]'
              }`}
            >
              {done ? <Icon name="check" className="h-4 w-4" /> : <span className="text-[12px] font-bold">{toFa(i + 1)}</span>}
            </span>
            <span className={`mt-2 max-w-[92px] text-[12.5px] leading-5 ${done || current ? 'font-medium text-[#2a1a12]' : 'text-[#8a7261]'}`}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Thumbs({ order, size = 64 }: { order: Order; size?: number }) {
  return (
    <div className="flex -space-x-3 space-x-reverse">
      {order.lines.slice(0, 3).map((l, i) => (
        <Photo
          key={i}
          src={l.image}
          gradient="linear-gradient(135deg,#f3e1cf,#d9b595)"
          className="rounded-2xl border-2 border-[#fbf1e6] shadow-[0_6px_16px_rgba(110,72,46,0.2)]"
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}

interface Props {
  orders?: Order[];
  /** رفتن به تب «سفارش‌های من» */
  onViewAll?: () => void;
}

export const RecentOrders: React.FC<Props> = ({ orders = initialOrders, onViewAll }) => {
  const active = orders.find((o) => o.status === 'PROCESSING' || o.status === 'IN_TRANSIT') ?? orders[0];
  const others = orders.filter((o) => o !== active).slice(0, 2);

  return (
    <AccountCard title="آخرین سفارش‌ها" icon="bag" action={<ArrowLink onClick={onViewAll}>مشاهده همه سفارش‌ها</ArrowLink>}>
      {!active ? (
        <p className="px-7 py-10 text-center text-[14px] text-[#7a5a46]">هنوز سفارشی ثبت نکرده‌اید.</p>
      ) : (
        <div dir="rtl">
          {/* سفارش اصلی با پیگیری */}
          <div className="px-5 py-6 sm:px-8">
            <div className="flex flex-wrap items-center gap-4">
              <Thumbs order={active} size={72} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[17px] font-bold text-[#2a1a12]">
                    سفارش <span dir="ltr" className="inline-block">{active.number}</span>
                  </span>
                  <Badge tone={statusMeta[active.status].tone}>{statusMeta[active.status].label}</Badge>
                </div>
                <p className="mt-1.5 text-[13.5px] text-[#6b4f3e]">
                  {active.date} · {toFa(active.lines.reduce((a, l) => a + l.qty, 0))} کالا · {toman(active.total)}
                </p>
              </div>
              <button type="button" onClick={onViewAll} className={btnGhost}>
                جزئیات و پیگیری
                <Icon name="chevron" className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-7 rounded-[20px] bg-white/40 px-3 py-5 sm:px-6">
              <OrderStepper status={active.status} />
            </div>
          </div>

          {/* سفارش‌های قبلی */}
          {others.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={onViewAll}
              className="group flex w-full items-center gap-4 border-t border-[#d9bfa6]/50 px-5 py-4 text-right transition hover:bg-white/40 sm:px-8"
            >
              <Thumbs order={o} size={48} />
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-bold text-[#2a1a12]">
                  سفارش <span dir="ltr" className="inline-block">{o.number}</span>
                </div>
                <div className="mt-0.5 text-[13px] text-[#7a5a46]">{o.date} · {toman(o.total)}</div>
              </div>
              <span className="hidden sm:block"><Badge tone={statusMeta[o.status].tone}>{statusMeta[o.status].label}</Badge></span>
              <Icon name="chevron" className="h-4 w-4 text-[#8a6a54] transition group-hover:-translate-x-1" />
            </button>
          ))}
        </div>
      )}
    </AccountCard>
  );
};

export default RecentOrders;
