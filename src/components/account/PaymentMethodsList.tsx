'use client';


import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AccountCard, ConfirmModal, EmptyState, Field, Icon, Modal, btnGhost, btnPrimary, inputCls } from './ui';
import { bankFromCard, formatCardNumber, isValidCard, onlyDigits, toFa, toman } from './validators';
import { initialWallet, type WalletTx } from './accountData';

export interface BankCard {
  id: string;
  isDefault: boolean;
  holder: string;
  bank: string;
  /** فقط ۶ رقم اول و ۴ رقم آخر */
  masked: string;
}

const initialCards: BankCard[] = [];

const mask = (digits: string) => `${digits.slice(0, 6)}******${digits.slice(12)}`;
const showMasked = (m: string) => toFa(`${m.slice(0, 4)} ${m.slice(4, 6)}•• •••• ${m.slice(12)}`);

interface Props {
  balance?: number;
  txs?: WalletTx[];
  cards?: BankCard[];
  onTopUp?: () => void;
}

export const PaymentMethodsList: React.FC<Props> = ({ balance = initialWallet.balance, txs = initialWallet.txs, cards: initial = initialCards, onTopUp }) => {
  const [cards, setCards] = useState<BankCard[]>(initial);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<BankCard | null>(null);
  const [num, setNum] = useState('');
  const [holder, setHolder] = useState('');
  const [errors, setErrors] = useState<{ num?: string; holder?: string }>({});

  const bank = bankFromCard(num);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (!isValidCard(num)) er.num = 'شماره کارت معتبر نیست؛ ۱۶ رقم را بررسی کنید.';
    if (!holder.trim()) er.holder = 'نام دارنده‌ی کارت را وارد کنید.';
    setErrors(er);
    if (Object.keys(er).length) return;
    const d = onlyDigits(num);
    setCards((p) => [...p, { id: String(Date.now()), isDefault: p.length === 0, holder: holder.trim(), bank: bank ?? 'کارت بانکی', masked: mask(d) }]);
    setNum('');
    setHolder('');
    setOpen(false);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* کیف پول */}
      <section
        className="relative overflow-hidden rounded-[26px] px-6 py-7 text-[#fbf1e6] shadow-[0_18px_44px_rgba(60,36,24,0.3)] sm:px-9 sm:py-9"
        style={{ background: 'radial-gradient(80% 140% at 90% 0%, rgba(200,160,124,0.5), transparent 60%), linear-gradient(160deg,#1c110c,#3a2418)' }}
      >
        <span aria-hidden className="pointer-events-none absolute inset-3 rounded-[20px] border border-[#e8c9aa]/20" />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="flex items-center gap-2 text-[14px] text-[#e6d2bf]">
              <Icon name="wallet" className="h-5 w-5" /> اعتبار کیف پول
            </p>
            <p className="mt-3 flex items-baseline gap-2">
              <b className="text-[34px] font-bold leading-none tabular-nums sm:text-[42px]">{balance.toLocaleString('fa-IR')}</b>
              <span className="text-[14px] text-[#e6d2bf]">تومان</span>
            </p>
            <p className="mt-2 text-[13px] text-[#e6d2bf]/80">از اعتبار می‌توانید هنگام پرداخت سفارش بعدی استفاده کنید.</p>
          </div>
          <button type="button" onClick={onTopUp} className={btnPrimary}>
            <Icon name="plus" className="h-4 w-4" /> افزایش اعتبار
          </button>
        </div>
      </section>

      {/* کارت‌های بانکی */}
      <AccountCard
        title="کارت‌های بانکی"
        subtitle="برای واریز سریع بازگشت وجه به همین کارت‌ها استفاده می‌شود."
        icon="card"
        action={
          <button type="button" onClick={() => setOpen(true)} className={`${btnPrimary} !h-10 !px-5 !text-[13px]`}>
            <Icon name="plus" className="h-4 w-4" /> افزودن کارت
          </button>
        }
      >
        <div className="p-5 sm:p-7">
          {cards.length === 0 ? (
            <EmptyState title="کارتی ثبت نشده است" text="با ثبت کارت، بازگشت وجه سفارش‌های لغوشده سریع‌تر انجام می‌شود." action={<button onClick={() => setOpen(true)} className={btnPrimary}>افزودن کارت</button>} />
          ) : (
            <ul className="grid gap-5 md:grid-cols-2">
              <AnimatePresence>
                {cards.map((c) => (
                  <motion.li key={c.id} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                    <div
                      className="relative overflow-hidden rounded-[22px] p-5 text-[#fbf1e6] shadow-[0_14px_30px_rgba(60,36,24,0.28)]"
                      style={{ background: 'radial-gradient(90% 120% at 100% 0%, rgba(200,160,124,0.45), transparent 60%), linear-gradient(150deg,#33201a,#5a3a28)' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-bold">{c.bank}</span>
                        {c.isDefault && <span className="rounded-full bg-[#e2bf9f]/20 px-3 py-0.5 text-[12px] text-[#f0d8c0] ring-1 ring-[#e2bf9f]/40">پیش‌فرض</span>}
                      </div>
                      <p dir="ltr" className="mt-7 text-center text-[19px] font-medium tracking-[0.12em] tabular-nums">{showMasked(c.masked)}</p>
                      <div className="mt-6 flex items-center justify-between text-[13.5px] text-[#e6d2bf]">
                        <span>{c.holder}</span>
                        <div className="flex items-center gap-3">
                          {!c.isDefault && (
                            <button type="button" onClick={() => setCards((p) => p.map((x) => ({ ...x, isDefault: x.id === c.id })))} className="underline-offset-4 hover:underline">
                              پیش‌فرض شود
                            </button>
                          )}
                          <button type="button" onClick={() => setToDelete(c)} aria-label="حذف کارت" className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                            <Icon name="trash" className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </AccountCard>

      {/* تراکنش‌ها */}
      <AccountCard title="تراکنش‌های کیف پول" icon="receipt">
        <ul className="divide-y divide-[#d9bfa6]/50">
          {txs.map((t) => (
            <li key={t.id} className="flex items-center gap-4 px-5 py-4 sm:px-7">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${t.amount > 0 ? 'bg-[#dfead7] text-[#3f6b3a]' : 'bg-[#f1e0d0] text-[#6b4f3e]'}`}>
                <Icon name={t.amount > 0 ? 'download' : 'bag'} className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1 text-right">
                <p className="text-[14.5px] font-medium text-[#2a1a12]">{t.title}</p>
                <p className="mt-0.5 text-[12.5px] text-[#7a5a46]">{t.date}</p>
              </div>
              <span className={`text-[14.5px] font-bold ${t.amount > 0 ? 'text-[#3f6b3a]' : 'text-[#2a1a12]'}`}>
                {t.amount > 0 ? '+' : '−'} {toman(Math.abs(t.amount))}
              </span>
            </li>
          ))}
        </ul>
      </AccountCard>

      <Modal open={open} onClose={() => setOpen(false)} eyebrow="بازگشت وجه" title="افزودن کارت بانکی" maxWidth="max-w-md">
        <form onSubmit={submit} className="space-y-4" noValidate>
          <Field label="شماره کارت" error={errors.num} hint={bank ? `✓ ${bank}` : undefined}>
            <input className={`${inputCls} text-left tracking-[0.1em]`} dir="ltr" inputMode="numeric" placeholder="6037 9912 3456 7890" value={formatCardNumber(num)} onChange={(e) => { setNum(e.target.value); setErrors((x) => ({ ...x, num: undefined })); }} aria-invalid={!!errors.num} autoComplete="off" />
          </Field>
          <Field label="نام دارنده‌ی کارت" error={errors.holder}>
            <input className={inputCls} value={holder} onChange={(e) => { setHolder(e.target.value); setErrors((x) => ({ ...x, holder: undefined })); }} aria-invalid={!!errors.holder} />
          </Field>
          <p className="flex items-start gap-2 rounded-2xl bg-white/50 p-4 text-[13px] leading-7 text-[#5a3a28]">
            <Icon name="lock" className="mt-1 h-4 w-4 shrink-0 text-[#84563a]" />
            فقط ۶ رقم اول و ۴ رقم آخر کارت ذخیره می‌شود. CVV2، رمز دوم و تاریخ انقضا هرگز دریافت نمی‌شود.
          </p>
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#d9bfa6]/60 pt-5">
            <button type="button" onClick={() => setOpen(false)} className={btnGhost}>انصراف</button>
            <button type="submit" className={btnPrimary}>ذخیره کارت</button>
          </div>
        </form>
      </Modal>

      <ConfirmModal open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={() => toDelete && setCards((p) => { const r = p.filter((c) => c.id !== toDelete.id); return r.length && !r.some((c) => c.isDefault) ? r.map((c, i) => ({ ...c, isDefault: i === 0 })) : r; })} title="حذف کارت" text="این کارت از حساب شما حذف شود؟" />
    </div>
  );
};

export const WalletCards = PaymentMethodsList;
export default PaymentMethodsList;
