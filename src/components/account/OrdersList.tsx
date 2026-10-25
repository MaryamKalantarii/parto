'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: 'DELIVERED' | 'IN TRANSIT' | 'PROCESSING' | 'CANCELLED';
  price: string;
  itemCount: number;
  image: string;
  itemsSummary: string;
}

const allOrders: OrderItem[] = [
  {
    id: '1',
    orderNumber: '#AU-10024',
    date: '۲۳ فروردین ۱۴۰۵',
    status: 'DELIVERED',
    price: '۴,۸۵۰,۰۰۰ تومان',
    itemCount: 1,
    image: '/images/account/recentorder.jpg',
    itemsSummary: 'آویز معماری لومن',
  },
  {
    id: '2',
    orderNumber: '#AU-10023',
    date: '۸ فروردین ۱۴۰۵',
    status: 'DELIVERED',
    price: '۳,۲۰۰,۰۰۰ تومان',
    itemCount: 1,
    image: '/images/account/recentorder2.jpg',
    itemsSummary: 'چراغ دیواری شکست نور اپتیکال',
  },
  {
    id: '3',
    orderNumber: '#AU-10021',
    date: '۲۵ بهمن ۱۴۰۴',
    status: 'IN TRANSIT',
    price: '۵,۷۶۰,۰۰۰ تومان',
    itemCount: 2,
    image: '/images/account/recentorder3.jpg',
    itemsSummary: 'ستون زمینی یکپارچه (۲ عدد)',
  },
  {
    id: '4',
    orderNumber: '#AU-10018',
    date: '۱۵ دی ۱۴۰۴',
    status: 'DELIVERED',
    price: '۲,۱۰۰,۰۰۰ تومان',
    itemCount: 1,
    image: '/images/account/recentorder.jpg',
    itemsSummary: 'دیمر حلقه برنجی پرتو',
  },
];

export const OrdersList: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'DELIVERED' | 'IN TRANSIT'>('ALL');

  const filteredOrders = allOrders.filter((order) => {
    if (filter === 'ALL') return true;
    return order.status === filter;
  });

  const getStatusLabel = (status: OrderItem['status']) => {
    switch (status) {
      case 'DELIVERED':
        return 'تحویل‌شده';
      case 'IN TRANSIT':
        return 'در حال ارسال';
      case 'PROCESSING':
        return 'در حال پردازش';
      case 'CANCELLED':
        return 'لغو شده';
    }
  };

  const getFilterLabel = (status: 'ALL' | 'DELIVERED' | 'IN TRANSIT') => {
    switch (status) {
      case 'ALL':
        return 'همه';
      case 'DELIVERED':
        return 'تحویل‌شده';
      case 'IN TRANSIT':
        return 'در حال ارسال';
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="font-serif text-xl font-light tracking-wide text-[#F7F5F0]">
            تاریخچه سفارش‌ها
          </h2>
          <p className="font-sans text-xs text-[#8A857D] mt-1">
            مشاهده و پیگیری خریدهای قبلی.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 bg-[#0B0B0A] p-1 rounded-lg border border-white/10">
          {(['ALL', 'DELIVERED', 'IN TRANSIT'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-md font-sans text-xs tracking-wider transition-all ${
                filter === status
                  ? 'bg-white/10 text-[#D8C2A8]'
                  : 'text-[#8A857D] hover:text-[#F7F5F0]'
              }`}
            >
              {getFilterLabel(status)}
            </button>
          ))}
        </div>
      </div>

      {/* ORDERS CARDS */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.id}`}
            className="group bg-[#0B0B0A] border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D8C2A8]/50 transition-all duration-300 block"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex-none">
                <img
                  src={order.image}
                  alt={order.orderNumber}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[#F7F5F0] group-hover:text-[#D8C2A8] transition-colors" dir="ltr">
                    {order.orderNumber}
                  </span>
                  <span
                    className={`text-[10px] font-sans px-2.5 py-0.5 rounded-full border ${
                      order.status === 'DELIVERED'
                        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                        : 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                    }`}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </div>
                <p className="font-serif text-xs text-[#A8A39A] mt-1">{order.itemsSummary}</p>
                <p className="font-sans text-[11px] text-[#6A655D] mt-0.5">{order.date}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
              <div className="text-right">
                <div className="font-serif text-base text-[#F7F5F0]">{order.price}</div>
                <div className="font-sans text-[11px] text-[#6A655D]">
                  {order.itemCount} {order.itemCount > 1 ? 'محصول' : 'محصول'}
                </div>
              </div>

              <span className="text-[#8A857D] group-hover:-translate-x-1 group-hover:text-[#D8C2A8] transition-all">
                ←
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;