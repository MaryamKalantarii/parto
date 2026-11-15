'use client';

/**
 * اجزای مشترک حساب کاربری  →  components/account/ui.tsx
 * همه‌ی بخش‌ها از همین‌جا کارت، دکمه، مودال، فیلد و آیکن می‌گیرند تا ظاهرشان یکدست بماند.
 */

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { DiamondIcon } from '@/components/home/primitives';

export { toFa, toEn, toman } from './validators';

/* ───────── آیکن‌ها ───────── */
const P = {
  bag: 'M4 8h16l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H6.7a1.5 1.5 0 0 1-1.5-1.3L4 8Z M8.5 8V7a3.5 3.5 0 0 1 7 0v1',
  heart: 'M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20Z',
  pin: 'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z M12 7.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z',
  user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M4 20c1.5-4 4.5-5.5 8-5.5s6.5 1.5 8 5.5',
  wallet: 'M3 7.5A2.5 2.5 0 0 1 5.5 5H18v3 M3 7.5V17a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5.5A2.5 2.5 0 0 1 3 7.5Z M16.5 13.5h.01',
  card: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z M3 10h18 M7 15h3',
  shield: 'M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6L12 3Z M8.8 12l2.4 2.4 4-4.4',
  bell: 'M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z M10 20a2 2 0 0 0 4 0',
  truck: 'M2 7h12v9H2z M14 10h4l3 3v3h-7 M4.7 17.5a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 1 0-3.6 0Z M15.7 17.5a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 1 0-3.6 0Z',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3Z M9 8h6 M9 12h6',
  award: 'M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z M8.5 14.5 7 21l5-3 5 3-1.5-6.5',
  gift: 'M4 10h16v10H4z M3 7h18v3H3z M12 7v13 M12 7c-1.5-3-5-3-5-.8C7 7.6 9 7 12 7Zm0 0c1.5-3 5-3 5-.8C17 7.6 15 7 12 7Z',
  trash: 'M5 7h14 M9 7V5h6v2 M7 7l1 12h8l1-12 M10 11v5 M14 11v5',
  edit: 'M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z M13.5 6.5l4 4',
  plus: 'M12 5v14 M5 12h14',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  copy: 'M9 9h10v11H9V9Z M5 15V4h10',
  download: 'M12 4v11 M7.5 11 12 15.5 16.5 11 M5 20h14',
  headset: 'M4 14v-2a8 8 0 0 1 16 0v2 M3 14.5A1.5 1.5 0 0 1 4.5 13H7v7H4.5A1.5 1.5 0 0 1 3 18.5v-4Z M21 14.5a1.5 1.5 0 0 0-1.5-1.5H17v7h2.5a1.5 1.5 0 0 0 1.5-1.5v-4Z',
  chevron: 'm15 6-6 6 6 6',
  x: 'M6 6l12 12 M18 6 6 18',
  lock: 'M6 11h12v9H6z M8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  phone: 'M7 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5L16 11.5l4 1.5v3a2 2 0 0 1-2 2A14 14 0 0 1 5 5a2 2 0 0 1 2-2Z',
  mail: 'M4 6h16v12H4z M4 7l8 6 8-6',
  clock: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z M12 8v4.5l3 1.5',
  box: 'M3.5 8 12 4l8.5 4v8L12 20l-8.5-4V8Z M3.5 8 12 12l8.5-4 M12 12v8',
  logout: 'M14 4h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3 M4 12h11 M8 8l-4 4 4 4',
  id: 'M3 6h18v12H3z M7.5 11a1.5 1.5 0 1 0 0 .01 M5.5 15c.5-1.4 1.5-2 2-2s1.5.6 2 2 M13 10h5 M13 14h4',
  camera: 'M4 8h3l1.5-2h7L17 8h3v11H4V8Z M12 10.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
} as const;

export type IconName = keyof typeof P;

export function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={P[name]} />
    </svg>
  );
}

/* ───────── دکمه‌ها (کلاس‌های آماده) ───────── */
export const btnPrimary =
  'btn-gold inline-flex h-11 items-center justify-center gap-2 rounded-full px-7 text-[14px] font-bold transition disabled:cursor-not-allowed disabled:opacity-50';
export const btnGhost =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#c8a07c]/60 bg-white/40 px-6 text-[14px] font-medium text-[#4a2f20] transition hover:bg-[#f3dcc4] disabled:cursor-not-allowed disabled:opacity-50';
export const btnDanger =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#b4472f] px-7 text-[14px] font-bold text-white transition hover:brightness-110';
export const iconBtn =
  'grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d9bfa6]/70 bg-white/50 text-[#6b4f3e] transition hover:border-[#c8a07c] hover:bg-white hover:text-[#2a1a12]';

/* ───────── کارت اصلی ───────── */
export function AccountCard({
  title,
  subtitle,
  icon,
  action,
  children,
  className = '',
}: {
  title: string;
  subtitle?: string;
  icon?: IconName;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section dir="rtl" className={`glass-cream overflow-hidden rounded-[24px] ${className}`}>
      <header className="relative flex flex-wrap items-center justify-between gap-3 bg-[#ecd5c0]/55 px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#4a2c1c] to-[#2a170e] text-[#f3dcc4] shadow-[0_6px_14px_rgba(42,23,14,0.3)]">
              <Icon name={icon} />
            </span>
          )}
          <div>
            <h2 className="text-[17px] font-bold text-[#2a1a12]">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[13px] text-[#7a5a46]">{subtitle}</p>}
          </div>
        </div>
        {action}
        <span aria-hidden className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-l from-transparent via-[#c8a07c]/60 to-transparent" />
      </header>
      {children}
    </section>
  );
}

export function ArrowLink({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) {
  const cls = 'group inline-flex items-center gap-2 text-[13px] font-medium text-[#4a2f20] transition hover:text-[#84563a]';
  const arrow = <Icon name="chevron" className="h-4 w-4 transition group-hover:-translate-x-1" />;
  return href ? (
    <Link href={href} className={cls}>{children}{arrow}</Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>{children}{arrow}</button>
  );
}

export function EditButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-2 rounded-full border border-[#c8a07c]/60 bg-white/40 px-5 py-2 text-[13px] font-medium text-[#5a3a28] transition hover:bg-[#f3dcc4]">
      <Icon name="edit" className="h-4 w-4" />
      {children}
    </button>
  );
}

/* ───────── نشان وضعیت ───────── */
const tones = {
  success: 'bg-[#dfead7] text-[#3f6b3a] border-[#bcd3b0]',
  warn: 'bg-[#f6e6c6] text-[#8a5a14] border-[#e6cc95]',
  neutral: 'bg-[#f1e0d0] text-[#6b4f3e] border-[#d9bfa6]',
  danger: 'bg-[#f6dcd4] text-[#9a3a26] border-[#e3b3a5]',
  gold: 'bg-[#e8c9aa]/40 text-[#7a4e2e] border-[#c8a07c]/50',
} as const;

export function Badge({ tone = 'neutral', children }: { tone?: keyof typeof tones; children: React.ReactNode }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12.5px] font-medium ${tones[tone]}`}>{children}</span>;
}

/* ───────── حالت خالی ───────── */
export function EmptyState({ title, text, action }: { title: string; text?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-[20px] border border-dashed border-[#d9bfa6] px-6 py-12 text-center">
      <DiamondIcon className="h-12 w-14 text-[#c8a07c]/60" />
      <p className="mt-4 text-[16px] font-bold text-[#2a1a12]">{title}</p>
      {text && <p className="mt-1 max-w-[360px] text-[14px] leading-7 text-[#7a5a46]">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ───────── فرم ───────── */
export const inputCls =
  'h-12 w-full rounded-xl border border-[#d9bfa6]/80 bg-white/70 px-4 text-[14.5px] text-[#2a1a12] outline-none transition placeholder:text-[#9a8272] focus:border-[#b3865f] focus:bg-white focus:ring-4 focus:ring-[#c8a07c]/20 aria-[invalid=true]:border-[#b4472f] aria-[invalid=true]:ring-[#b4472f]/10';

export function Field({ label, error, hint, children, className = '' }: { label: string; error?: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block text-right ${className}`}>
      <span className="mb-2 block text-[13.5px] font-medium text-[#5a3a28]">{label}</span>
      {children}
      {error ? (
        <span role="alert" className="mt-1.5 block text-[12.5px] text-[#b4472f]">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-[12.5px] text-[#8a7261]">{hint}</span>
      ) : null}
    </label>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition duration-300 ${checked ? 'bg-gradient-to-l from-[#b3865f] to-[#c8a07c]' : 'bg-[#d9bfa6]/70'}`}
    >
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${checked ? 'right-[24px]' : 'right-1'}`} />
    </button>
  );
}

/* ───────── مودال (روی موبایل از پایین باز می‌شود) ───────── */
export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  maxWidth = 'max-w-lg',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4" dir="rtl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1c110c]/70 backdrop-blur-md"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 max-h-[92vh] w-full ${maxWidth} overflow-y-auto rounded-t-[28px] border border-[#d9bfa6]/60 bg-[#f8efe6] p-6 text-right shadow-[0_25px_60px_rgba(0,0,0,0.55)] sm:rounded-[28px] sm:p-9`}
          >
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#d9bfa6]/60 pb-5">
              <div>
                {eyebrow && <span className="text-[12.5px] font-medium text-[#84563a]">{eyebrow}</span>}
                <h3 className="mt-1 text-[21px] font-bold text-[#2a1a12]">{title}</h3>
              </div>
              <button type="button" onClick={onClose} aria-label="بستن" className={iconBtn}>
                <Icon name="x" className="h-4 w-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  text,
  confirmLabel = 'بله، حذف شود',
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  text: string;
  confirmLabel?: string;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-md">
      <p className="text-[15px] leading-8 text-[#5a3a28]">{text}</p>
      <div className="mt-7 flex flex-wrap items-center justify-end gap-3">
        <button type="button" onClick={onClose} className={btnGhost}>انصراف</button>
        <button type="button" onClick={() => { onConfirm(); onClose(); }} className={btnDanger}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}
