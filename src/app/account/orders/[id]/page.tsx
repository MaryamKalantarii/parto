
'use client';

import React, { use } from 'react';
import Link from 'next/link';

interface OrderDetail {
  id: string;
  orderNumber: string;
  date: string;
  status: 'DELIVERED' | 'IN TRANSIT' | 'PROCESSING';
  totalPrice: string;
  shippingAddress: string;
  paymentMethod: string;
  items: {
    id: string;
    title: string;
    code: string;
    price: string;
    quantity: number;
    image: string;
  }[];
}

// دیتای موقت سفارش‌ها
const ordersData: Record<string, OrderDetail> = {
  '1': {
    id: '1',
    orderNumber: '#AU-10024',
    date: '۱۲ فروردین ۱۴۰۵',
    status: 'DELIVERED',
    totalPrice: '۴,۸۵۰,۰۰۰ تومان',
    shippingAddress: 'تهران، خیابان پارک، پلاک ۷۴۰، واحد ۱۲',
    paymentMethod: 'امریکن اکسپرس •••• ۴۲۴۲',
    items: [
      {
        id: 'p1',
        title: 'آویز معماری لومِن',
        code: 'BR-2200K',
        price: '۴,۸۵۰,۰۰۰ تومان',
        quantity: 1,
        image: '/images/account/recentorder.jpg',
      },
    ],
  },

  '2': {
    id: '2',
    orderNumber: '#AU-10023',
    date: '۸ فروردین ۱۴۰۵',
    status: 'DELIVERED',
    totalPrice: '۳,۲۰۰,۰۰۰ تومان',
    shippingAddress: 'تهران، خیابان پارک، پلاک ۷۴۰، واحد ۱۲',
    paymentMethod: 'ویزا •••• ۸۸۱۹',
    items: [
      {
        id: 'p2',
        title: 'دیوارکوب شکست نور اپتیکال',
        code: 'GL-OPTIC-X',
        price: '۳,۲۰۰,۰۰۰ تومان',
        quantity: 1,
        image: '/images/account/recentorder2.jpg',
      },
    ],
  },

  '3': {
    id: '3',
    orderNumber: '#AU-10021',
    date: '۲۵ بهمن ۱۴۰۴',
    status: 'IN TRANSIT',
    totalPrice: '۵,۷۶۰,۰۰۰ تومان',
    shippingAddress: 'تهران، خیابان پارک، پلاک ۷۴۰، واحد ۱۲',
    paymentMethod: 'مسترکارت •••• ۱۰۹۲',
    items: [
      {
        id: 'p3',
        title: 'ستون زمینی یکپارچه',
        code: 'AL-BLK-90',
        price: '۲,۸۸۰,۰۰۰ تومان',
        quantity: 2,
        image: '/images/account/recentorder3.jpg',
      },
    ],
  },
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // در Next.js 15 پارامترهای آدرس به‌صورت Promise دریافت می‌شوند
  const { id } = use(params);
  const order = ordersData[id] || ordersData['1'];

  const getStatusLabel = (status: OrderDetail['status']) => {
    switch (status) {
      case 'DELIVERED':
        return 'تحویل‌شده';
      case 'IN TRANSIT':
        return 'در حال ارسال';
      case 'PROCESSING':
        return 'در حال پردازش';
      default:
        return status;
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-[#060605] text-[#F7F5F0] font-sans antialiased selection:bg-[#D8C2A8] selection:text-[#060605]"
      dir="rtl"
    >
      <main className="max-w-[1200px] mx-auto px-6 sm:px-12 py-12">

        {/* مسیر صفحه و دکمه بازگشت */}
        <div className="mb-8">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] text-[#8A857D] hover:text-[#D8C2A8] transition-colors mb-6"
          >
            ← بازگشت به حساب کاربری
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="font-sans text-[10px] tracking-[0.4em] text-[#D8C2A8]">
                جزئیات سفارش
              </span>

              <h1
                className="font-serif text-3xl sm:text-5xl font-extralight tracking-wide text-[#F7F5F0] mt-1"
                dir="ltr"
              >
                {order.orderNumber}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`text-[10px] font-sans px-3 py-1.5 rounded-full border ${
                  order.status === 'DELIVERED'
                    ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                    : 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                }`}
              >
                {getStatusLabel(order.status)}
              </span>

              <span className="font-mono text-xs text-[#8A857D]">
                {order.date}
              </span>
            </div>
          </div>
        </div>

        {/* محتوای سفارش */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* لیست محصولات */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-xl font-light text-[#F7F5F0]">
              محصولات خریداری‌شده
            </h2>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0B0B0A] border border-white/10 rounded-xl p-5 flex items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex-none">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-light text-[#F7F5F0]">
                        {item.title}
                      </h3>

                      <p className="font-mono text-[10px] text-[#D8C2A8] mt-1">
                        {item.code}
                      </p>

                      <p className="font-sans text-xs text-[#6A655D] mt-1">
                        تعداد: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="font-serif text-lg text-[#F7F5F0]">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* خلاصه سفارش و ارسال */}
          <div className="lg:col-span-4 space-y-8">

            {/* اطلاعات ارسال */}
            <div className="bg-[#0B0B0A] border border-white/10 rounded-xl p-6 space-y-6">
              <div>
                <span className="block font-sans text-[9px] tracking-[0.25em] text-[#6A655D] mb-2">
                  آدرس ارسال
                </span>

                <p className="font-sans text-xs font-light text-[#A8A39A] leading-relaxed">
                  {order.shippingAddress}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="block font-sans text-[9px] tracking-[0.25em] text-[#6A655D] mb-2">
                  روش پرداخت
                </span>

                <p className="font-sans text-xs font-light text-[#A8A39A]">
                  {order.paymentMethod}
                </p>
              </div>
            </div>

            {/* خلاصه مبلغ */}
            <div className="bg-[#0B0B0A] border border-white/10 rounded-xl p-6 space-y-4">
              <div className="flex justify-between font-sans text-xs text-[#8A857D]">
                <span>جمع سفارش</span>
                <span>{order.totalPrice}</span>
              </div>

              <div className="flex justify-between font-sans text-xs text-[#8A857D]">
                <span>هزینه ارسال</span>
                <span className="text-[#D8C2A8]">رایگان</span>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between font-serif text-xl text-[#F7F5F0]">
                <span>مبلغ نهایی</span>
                <span>{order.totalPrice}</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
