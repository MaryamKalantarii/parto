'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AccountCard, Badge, ConfirmModal, EmptyState, Field, Icon, Modal, btnGhost, btnPrimary, inputCls } from './ui';
import { isValidMobile, isValidPostalCode, onlyDigits, toFa } from './validators';

export interface AddressItem {
  id: string;
  isDefault: boolean;
  /** برچسب آدرس: خانه، محل کار، … */
  title?: string;
  /** نام گیرنده */
  fullName: string;
  street: string;
  plaque?: string;
  /** واحد / طبقه */
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  /** موبایل گیرنده */
  phone: string;
}

const PROVINCES = [
  'آذربایجان شرقی', 'آذربایجان غربی', 'اردبیل', 'اصفهان', 'البرز', 'ایلام', 'بوشهر', 'تهران', 'چهارمحال و بختیاری', 'خراسان جنوبی',
  'خراسان رضوی', 'خراسان شمالی', 'خوزستان', 'زنجان', 'سمنان', 'سیستان و بلوچستان', 'فارس', 'قزوین', 'قم', 'کردستان', 'کرمان',
  'کرمانشاه', 'کهگیلویه و بویراحمد', 'گلستان', 'گیلان', 'لرستان', 'مازندران', 'مرکزی', 'هرمزگان', 'همدان', 'یزد',
];
const TITLES = ['خانه', 'محل کار', 'دیگر'];

const initialAddresses: AddressItem[] = [
  { id: 'a1', isDefault: true, title: 'خانه', fullName: 'سیده نژاد', street: 'خیابان آزادی', plaque: '۱۲۳', apartment: 'طبقه‌ی ۳، واحد ۱۲', city: 'تهران', state: 'تهران', postalCode: '1968713456', country: 'ایران', phone: '09123456789' },
  { id: 'a2', isDefault: false, title: 'محل کار', fullName: 'سیده نژاد', street: 'میدان ونک، خیابان ملاصدرا، برج آسمان', plaque: '۲۱', apartment: 'طبقه‌ی ۸، واحد ۴', city: 'تهران', state: 'تهران', postalCode: '1991653741', country: 'ایران', phone: '09123456789' },
  { id: 'a3', isDefault: false, title: 'دیگر', fullName: 'مریم نژاد', street: 'بلوار چمران، خیابان ارم', plaque: '۱۵', apartment: 'واحد ۲', city: 'شیراز', state: 'فارس', postalCode: '7134915678', country: 'ایران', phone: '09177654321' },
];

type Form = Omit<AddressItem, 'id'>;
const emptyForm = (isDefault: boolean): Form => ({ isDefault, title: 'خانه', fullName: '', street: '', plaque: '', apartment: '', city: '', state: 'تهران', postalCode: '', country: 'ایران', phone: '' });

export const AddressesList: React.FC<{ addresses?: AddressItem[]; defaultName?: string }> = ({ addresses: initial = initialAddresses, defaultName = '' }) => {
  const [addresses, setAddresses] = useState<AddressItem[]>(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AddressItem | null>(null);
  const [form, setForm] = useState<Form>(emptyForm(false));
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [toDelete, setToDelete] = useState<AddressItem | null>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm(addresses.length === 0), fullName: defaultName });
    setErrors({});
    setOpen(true);
  };
  const openEdit = (a: AddressItem) => {
    setEditing(a);
    setForm({ ...a });
    setErrors({});
    setOpen(true);
  };

  const setDefault = (id: string) => setAddresses((p) => p.map((a) => ({ ...a, isDefault: a.id === id })));
  const remove = (id: string) =>
    setAddresses((p) => {
      const rest = p.filter((a) => a.id !== id);
      // اگر آدرس پیش‌فرض حذف شد، اولین آدرس باقی‌مانده پیش‌فرض می‌شود
      return rest.length && !rest.some((a) => a.isDefault) ? rest.map((a, i) => ({ ...a, isDefault: i === 0 })) : rest;
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (!form.fullName.trim()) er.fullName = 'نام گیرنده را وارد کنید.';
    if (!isValidMobile(form.phone)) er.phone = 'موبایل گیرنده باید ۱۱ رقم و با ۰۹ شروع شود.';
    if (!form.state) er.state = 'استان را انتخاب کنید.';
    if (!form.city.trim()) er.city = 'شهر را وارد کنید.';
    if (!isValidPostalCode(form.postalCode)) er.postalCode = 'کدپستی باید ۱۰ رقم باشد.';
    if (form.street.trim().length < 8) er.street = 'نشانی را کامل‌تر بنویسید.';
    setErrors(er);
    if (Object.keys(er).length) return;

    const clean: Form = { ...form, phone: onlyDigits(form.phone), postalCode: onlyDigits(form.postalCode) };
    setAddresses((prev) => {
      const base = clean.isDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev;
      return editing ? base.map((a) => (a.id === editing.id ? { ...a, ...clean } : a)) : [...base, { id: String(Date.now()), ...clean }];
    });
    setOpen(false);
  };

  return (
    <>
      <AccountCard
        title="آدرس‌های ثبت‌شده"
        subtitle="مقصد تحویل سفارش‌ها و آدرس پیش‌فرض را مدیریت کنید."
        icon="pin"
        action={
          <button type="button" onClick={openAdd} className={`${btnPrimary} !h-10 !px-5 !text-[13px]`}>
            <Icon name="plus" className="h-4 w-4" /> افزودن آدرس
          </button>
        }
      >
        <div className="p-5 sm:p-7" dir="rtl">
          {addresses.length === 0 ? (
            <EmptyState title="هنوز آدرسی ثبت نکرده‌اید" text="با ثبت آدرس، تکمیل خرید بعدی چند ثانیه بیشتر طول نمی‌کشد." action={<button onClick={openAdd} className={btnPrimary}>ثبت اولین آدرس</button>} />
          ) : (
            <ul className="grid gap-5 md:grid-cols-2">
              <AnimatePresence>
                {addresses.map((a) => (
                  <motion.li
                    key={a.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative flex flex-col rounded-[22px] border bg-white/55 p-5 transition duration-300 ${a.isDefault ? 'border-[#c8a07c] shadow-[0_12px_28px_rgba(110,72,46,0.14)]' : 'border-[#d9bfa6]/70 hover:border-[#c8a07c]'}`}
                  >
                    {a.isDefault && <span aria-hidden className="absolute right-0 top-6 h-10 w-1 rounded-l-full bg-gradient-to-b from-[#e2bf9f] to-[#b3865f]" />}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e8c9aa]/40 text-[#84563a]">
                          <Icon name={a.title === 'محل کار' ? 'box' : 'pin'} className="h-5 w-5" />
                        </span>
                        <span className="text-[16px] font-bold text-[#2a1a12]">{a.title || 'آدرس'}</span>
                        {a.isDefault && <Badge tone="gold">پیش‌فرض</Badge>}
                      </div>
                      <div className="flex gap-1.5">
                        <button type="button" onClick={() => openEdit(a)} aria-label="ویرایش آدرس" className="grid h-9 w-9 place-items-center rounded-full border border-[#d9bfa6]/70 bg-white/60 text-[#5a3a28] transition hover:bg-[#f3dcc4]"><Icon name="edit" className="h-4 w-4" /></button>
                        <button type="button" onClick={() => setToDelete(a)} aria-label="حذف آدرس" className="grid h-9 w-9 place-items-center rounded-full border border-[#d9bfa6]/70 bg-white/60 text-[#9a3a26] transition hover:bg-[#f6dcd4]"><Icon name="trash" className="h-4 w-4" /></button>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1 text-[14.5px] leading-8 text-[#3a2418]">
                      <p>
                        {a.state}، {a.city}، {a.street}
                        {a.plaque ? `، پلاک ${toFa(a.plaque)}` : ''}
                        {a.apartment ? `، ${a.apartment}` : ''}
                      </p>
                      <p className="text-[13.5px] text-[#6b4f3e]">
                        کدپستی: <span dir="ltr" className="inline-block">{toFa(a.postalCode)}</span>
                      </p>
                      <p className="text-[13.5px] text-[#6b4f3e]">
                        گیرنده: {a.fullName} · <span dir="ltr" className="inline-block">{toFa(a.phone)}</span>
                      </p>
                    </div>

                    {!a.isDefault && (
                      <button type="button" onClick={() => setDefault(a.id)} className="mt-4 self-start border-t border-[#d9bfa6]/50 pt-3 text-[13px] font-medium text-[#84563a] hover:underline">
                        تنظیم به‌عنوان آدرس پیش‌فرض
                      </button>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </AccountCard>

      {/* فرم افزودن / ویرایش */}
      <Modal open={open} onClose={() => setOpen(false)} eyebrow="آدرس تحویل" title={editing ? 'ویرایش آدرس' : 'افزودن آدرس جدید'} maxWidth="max-w-xl">
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="عنوان آدرس">
            {TITLES.map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={form.title === t}
                onClick={() => set('title', t)}
                className={`rounded-full border px-5 py-2 text-[13.5px] font-medium transition ${form.title === t ? 'border-transparent bg-gradient-to-br from-[#4a2c1c] to-[#2a170e] text-[#f3dcc4]' : 'border-[#c8a07c]/50 bg-white/50 text-[#5a3a28]'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="نام و نام خانوادگی گیرنده" error={errors.fullName}>
              <input className={inputCls} value={form.fullName} onChange={(e) => set('fullName', e.target.value)} aria-invalid={!!errors.fullName} autoComplete="name" />
            </Field>
            <Field label="موبایل گیرنده" error={errors.phone}>
              <input className={`${inputCls} text-left`} dir="ltr" inputMode="numeric" placeholder="09123456789" value={form.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} autoComplete="tel" />
            </Field>
            <Field label="استان" error={errors.state}>
              <select className={inputCls} value={form.state} onChange={(e) => set('state', e.target.value)} aria-invalid={!!errors.state}>
                {PROVINCES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="شهر" error={errors.city}>
              <input className={inputCls} value={form.city} onChange={(e) => set('city', e.target.value)} aria-invalid={!!errors.city} />
            </Field>
          </div>

          <Field label="نشانی (خیابان، کوچه)" error={errors.street}>
            <input className={inputCls} placeholder="مثال: خیابان ولیعصر، بالاتر از فرشته، کوچه‌ی ششم" value={form.street} onChange={(e) => set('street', e.target.value)} aria-invalid={!!errors.street} autoComplete="street-address" />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="پلاک">
              <input className={inputCls} value={form.plaque ?? ''} onChange={(e) => set('plaque', e.target.value)} />
            </Field>
            <Field label="واحد / طبقه">
              <input className={inputCls} placeholder="واحد ۴، طبقه ۲" value={form.apartment ?? ''} onChange={(e) => set('apartment', e.target.value)} />
            </Field>
            <Field label="کدپستی (۱۰ رقم)" error={errors.postalCode}>
              <input className={`${inputCls} text-left`} dir="ltr" inputMode="numeric" maxLength={10} value={form.postalCode} onChange={(e) => set('postalCode', e.target.value)} aria-invalid={!!errors.postalCode} autoComplete="postal-code" />
            </Field>
          </div>

          <label className="flex cursor-pointer items-center gap-3 pt-1 text-[14px] text-[#3a2418]">
            <input type="checkbox" checked={form.isDefault} onChange={(e) => set('isDefault', e.target.checked)} className="h-5 w-5 accent-[#b3865f]" />
            این آدرس، آدرس پیش‌فرض من باشد
          </label>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#d9bfa6]/60 pt-5">
            <button type="button" onClick={() => setOpen(false)} className={btnGhost}>انصراف</button>
            <button type="submit" className={btnPrimary}>ذخیره آدرس</button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => toDelete && remove(toDelete.id)}
        title="حذف آدرس"
        text={toDelete ? `آدرس «${toDelete.title || 'بدون عنوان'}» حذف شود؟ این کار قابل بازگشت نیست.` : ''}
      />
    </>
  );
};

export default AddressesList;
