'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Modal, Field, inputCls, btnPrimary, btnGhost } from './ui';
import { isValidMobile, isValidNationalCode, onlyDigits } from './validators';

export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  avatarUrl?: string;
  /** کد ملی؛ برای صدور فاکتور رسمی لازم است */
  nationalCode?: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserProfileData;
  onSave: (newData: UserProfileData) => void;
}

type Errors = Partial<Record<keyof UserProfileData | 'avatar', string>>;

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, userData, onSave }) => {
  const [form, setForm] = useState<UserProfileData>(userData);
  const [errors, setErrors] = useState<Errors>({});
  const fileRef = useRef<HTMLInputElement>(null);

  // هر بار که مودال باز می‌شود، فرم از داده‌ی فعلی پر شود
  useEffect(() => {
    if (isOpen) {
      setForm(userData);
      setErrors({});
    }
    // فقط هنگام باز/بسته‌شدن؛ تا اگر والد دوباره رندر شد، چیزی که کاربر تایپ کرده پاک نشود
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const set = (k: keyof UserProfileData, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return setErrors((x) => ({ ...x, avatar: 'فقط فایل JPG، PNG یا WEBP قابل قبول است.' }));
    if (file.size > 5 * 1024 * 1024) return setErrors((x) => ({ ...x, avatar: 'حجم تصویر باید کمتر از ۵ مگابایت باشد.' }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, avatarUrl: reader.result as string }));
      setErrors((x) => ({ ...x, avatar: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (!form.firstName.trim()) er.firstName = 'نام را وارد کنید.';
    if (!form.lastName.trim()) er.lastName = 'نام خانوادگی را وارد کنید.';
    if (!isValidMobile(form.phone)) er.phone = 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'ایمیل معتبر وارد کنید.';
    if (form.nationalCode && !isValidNationalCode(form.nationalCode)) er.nationalCode = 'کد ملی معتبر نیست.';
    setErrors(er);
    if (Object.keys(er).length) return;
    onSave({ ...form, phone: onlyDigits(form.phone), nationalCode: form.nationalCode ? onlyDigits(form.nationalCode) : '' });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} eyebrow="تنظیمات پروفایل" title="ویرایش اطلاعات شخصی">
      <form onSubmit={submit} className="space-y-5" noValidate>
        {/* تصویر */}
        <div className="flex items-center gap-5 border-b border-[#d9bfa6]/60 pb-5">
          <div className="relative grid h-20 w-20 flex-none place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#c8a07c] to-[#8d6243] text-[30px] font-bold text-white ring-2 ring-[#c8a07c]/60 ring-offset-2 ring-offset-[#f8efe6]">
            {form.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.avatarUrl} alt="پیش‌نمایش تصویر" className="h-full w-full object-cover" />
            ) : (
              form.firstName?.trim()[0] || 'پ'
            )}
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onFile} className="hidden" />
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => fileRef.current?.click()} className={`${btnGhost} !h-10 !px-5 !text-[13px]`}>
                بارگذاری تصویر
              </button>
              {form.avatarUrl && (
                <button type="button" onClick={() => setForm((f) => ({ ...f, avatarUrl: undefined }))} className="px-3 text-[13px] text-[#9a3a26] hover:underline">
                  حذف
                </button>
              )}
            </div>
            <p className={`mt-2 text-[12.5px] ${errors.avatar ? 'text-[#b4472f]' : 'text-[#8a7261]'}`} role={errors.avatar ? 'alert' : undefined}>
              {errors.avatar ?? 'JPG، PNG یا WEBP؛ حداکثر ۵ مگابایت'}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="نام" error={errors.firstName}>
            <input className={inputCls} value={form.firstName} onChange={(e) => set('firstName', e.target.value)} aria-invalid={!!errors.firstName} autoComplete="given-name" />
          </Field>
          <Field label="نام خانوادگی" error={errors.lastName}>
            <input className={inputCls} value={form.lastName} onChange={(e) => set('lastName', e.target.value)} aria-invalid={!!errors.lastName} autoComplete="family-name" />
          </Field>
        </div>

        <Field label="شماره همراه" error={errors.phone}>
          <input className={`${inputCls} text-left`} dir="ltr" inputMode="numeric" placeholder="09123456789" value={form.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} autoComplete="tel" />
        </Field>

        <Field label="ایمیل" error={errors.email}>
          <input className={`${inputCls} text-left`} dir="ltr" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} autoComplete="email" />
        </Field>

        <Field label="کد ملی (اختیاری)" error={errors.nationalCode} hint="برای صدور فاکتور رسمی لازم است و فقط برای همین کار استفاده می‌شود.">
          <input className={`${inputCls} text-left`} dir="ltr" inputMode="numeric" maxLength={10} value={form.nationalCode ?? ''} onChange={(e) => set('nationalCode', e.target.value)} aria-invalid={!!errors.nationalCode} />
        </Field>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#d9bfa6]/60 pt-5">
          <button type="button" onClick={onClose} className={btnGhost}>انصراف</button>
          <button type="submit" className={btnPrimary}>ذخیره تغییرات</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
