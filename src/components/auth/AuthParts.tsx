'use client';

import React from 'react';
import { Ico } from '@/components/icons/Ico';

/* اجزای کوچک صفحات ورود و ثبت‌نام */

export function AuthHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <h1 className="text-[28px] font-bold text-[#2a170e]">{title}</h1>
      <p className="mt-2 text-[14px] text-[#4a2f20]">{subtitle}</p>
    </div>
  );
}

/** دکمه‌ی چشم برای نمایش رمز */
export function EyeToggle({ shown, onToggle }: { shown: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? 'پنهان کردن رمز' : 'نمایش رمز'}
      className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#3a2418] transition hover:opacity-70"
    >
      <Ico name={shown ? 'eye' : 'eyeOff'} className="h-[22px] w-[22px]" sw={1.4} />
    </button>
  );
}

export function CheckBox({
  checked, onChange, children,
}: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[14px] text-[#3a2418]">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="parto-field grid h-[26px] w-[26px] flex-none place-items-center rounded-[8px] peer-focus-visible:ring-2 peer-focus-visible:ring-[#c8a07c]">
        {checked && <Ico name="check" className="h-[17px] w-[17px]" sw={2.2} />}
      </span>
      <span>{children}</span>
    </label>
  );
}

export function SocialDivider({ text = 'یا' }: { text?: string }) {
  return (
    <div className="mt-6 flex items-center gap-4 text-[14px] text-[#3a2418]" aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-l from-[#7a4a2c]/45 to-transparent" />
      {text}
      <span className="h-px flex-1 bg-gradient-to-r from-[#7a4a2c]/45 to-transparent" />
    </div>
  );
}
