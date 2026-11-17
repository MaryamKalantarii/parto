
'use client';

import React from 'react';
import Link from 'next/link';
import { Ico } from '@/components/icons/Ico';

/* دکمه‌ها و فیلد گرد مشترک فرم‌های ورود، ثبت‌نام و تماس (استایل‌ها در globals.css: parto-*) */

export function DarkBtn({
  children,
  className = '',
  href,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `parto-btn-dark inline-flex items-center justify-center gap-2.5 rounded-full text-[15px] font-medium ${className}`;

  if (href) return <Link href={href} className={cls}>{children}</Link>;

  return <button {...rest} className={cls}>{children}</button>;
}

export function SoftBtn({
  children,
  className = '',
  href,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `parto-btn-soft inline-flex items-center justify-center gap-2 rounded-full text-[13px] font-medium ${className}`;

  if (href) return <Link href={href} className={cls}>{children}</Link>;

  return <button {...rest} className={cls}>{children}</button>;
}

/** فیلد گرد با آیکون سمت راست (RTL) */

type PFieldProps = {
  icon?: string;
  label: string;
  as?: 'input' | 'textarea' | 'select';
  rows?: number;
  className?: string;
} & (
  | React.InputHTMLAttributes<HTMLInputElement>
  | React.TextareaHTMLAttributes<HTMLTextAreaElement>
  | React.SelectHTMLAttributes<HTMLSelectElement>
);

export function PField({
  icon,
  label,
  as = 'input',
  rows = 4,
  className = '',
  ...rest
}: PFieldProps) {
  const base =
    'parto-field w-full text-right text-[14px] ' +
    (as === 'textarea'
      ? 'rounded-[22px] py-4 pr-[52px] pl-5 resize-none'
      : 'h-[52px] rounded-full pr-[52px] pl-5');

  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{label}</span>

      {icon && (
        <span
          className={`pointer-events-none absolute right-[18px] text-[#3a2418] ${
            as === 'textarea'
              ? 'top-[17px]'
              : 'top-1/2 -translate-y-1/2'
          }`}
        >
          <Ico name={icon} className="h-[22px] w-[22px]" sw={1.4} />
        </span>
      )}

      {as === 'textarea' ? (
        <textarea
          rows={rows}
          placeholder={label}
          className={base}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === 'select' ? (
        <>
          <select
            className={base + ' appearance-none'}
            {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
          />
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#3a2418]">
            <Ico name="chevD" className="h-[18px] w-[18px]" />
          </span>
        </>
      ) : (
        <input
          placeholder={label}
          className={base}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </label>
  );
}
