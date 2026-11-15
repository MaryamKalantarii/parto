'use client';

/**
 * اطلاعات حساب و امنیت (جدید)  →  components/account/AccountSettings.tsx
 * فاکتور رسمی (کد ملی)، اعلان‌های پیامکی/ایمیلی، تغییر رمز با نمایشگر قدرت، ورود با کد پیامکی و حذف حساب.
 */

import React, { useState } from 'react';
import { AccountCard, ConfirmModal, Field, Icon, Toggle, btnDanger, btnGhost, btnPrimary, inputCls } from './ui';
import { isValidNationalCode, onlyDigits, passwordStrength } from './validators';

interface Props {
  nationalCode?: string;
  onSaveNationalCode?: (code: string) => void;
  onChangePassword?: (oldPass: string, newPass: string) => void;
  onDeleteAccount?: () => void;
}

const strengthLabel = ['خیلی ضعیف', 'ضعیف', 'متوسط', 'خوب', 'عالی'];
const strengthColor = ['#d9bfa6', '#c0674a', '#d9a15c', '#8fae6a', '#4f8a47'];

const Row = ({ title, text, checked, onChange }: { title: string; text: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <li className="flex items-center justify-between gap-4 py-4">
    <div className="text-right">
      <p className="text-[15px] font-medium text-[#2a1a12]">{title}</p>
      <p className="mt-0.5 text-[13px] leading-6 text-[#7a5a46]">{text}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} label={title} />
  </li>
);

export const AccountSettings: React.FC<Props> = ({ nationalCode = '', onSaveNationalCode, onChangePassword, onDeleteAccount }) => {
  /* هویت و فاکتور */
  const [nc, setNc] = useState(nationalCode);
  const [ncErr, setNcErr] = useState('');
  const [ncSaved, setNcSaved] = useState(false);

  /* اعلان‌ها */
  const [prefs, setPrefs] = useState({ sms: true, email: true, news: false, dates: true });
  const setPref = (k: keyof typeof prefs) => (v: boolean) => setPrefs((p) => ({ ...p, [k]: v }));

  /* رمز */
  const [pw, setPw] = useState({ old: '', next: '', again: '' });
  const [pwErr, setPwErr] = useState('');
  const [pwDone, setPwDone] = useState(false);
  const [otp, setOtp] = useState(true);
  const score = passwordStrength(pw.next);

  const [del, setDel] = useState(false);

  const saveNc = (e: React.FormEvent) => {
    e.preventDefault();
    if (nc && !isValidNationalCode(nc)) return setNcErr('کد ملی معتبر نیست.');
    setNcErr('');
    onSaveNationalCode?.(onlyDigits(nc));
    setNcSaved(true);
    setTimeout(() => setNcSaved(false), 2000);
  };

  const savePw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw.old) return setPwErr('رمز فعلی را وارد کنید.');
    if (pw.next.length < 8) return setPwErr('رمز جدید باید حداقل ۸ کاراکتر باشد.');
    if (pw.next !== pw.again) return setPwErr('تکرار رمز جدید یکسان نیست.');
    setPwErr('');
    onChangePassword?.(pw.old, pw.next);
    setPw({ old: '', next: '', again: '' });
    setPwDone(true);
    setTimeout(() => setPwDone(false), 2500);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <AccountCard title="فاکتور رسمی" subtitle="برای صدور فاکتور رسمی، کد ملی لازم است." icon="id">
        <form onSubmit={saveNc} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:p-7" noValidate>
          <Field label="کد ملی" error={ncErr} className="flex-1">
            <input className={`${inputCls} text-left`} dir="ltr" inputMode="numeric" maxLength={10} value={nc} onChange={(e) => { setNc(e.target.value); setNcErr(''); }} aria-invalid={!!ncErr} />
          </Field>
          <button type="submit" className={`${btnPrimary} sm:mb-[1px]`}>
            {ncSaved ? (<><Icon name="check" className="h-4 w-4" /> ذخیره شد</>) : 'ذخیره'}
          </button>
        </form>
      </AccountCard>

      <AccountCard title="اعلان‌ها و یادآوری‌ها" icon="bell">
        <ul className="divide-y divide-[#d9bfa6]/50 px-5 sm:px-7">
          <Row title="پیامک وضعیت سفارش" text="ثبت، ارسال و تحویل سفارش را با پیامک بدانید." checked={prefs.sms} onChange={setPref('sms')} />
          <Row title="ایمیل فاکتور و رسید" text="نسخه‌ی دیجیتال فاکتور به ایمیل شما ارسال شود." checked={prefs.email} onChange={setPref('email')} />
          <Row title="پیشنهادهای ویژه و خبرنامه" text="جدیدترین مجموعه‌ها و تخفیف‌های اختصاصی اعضا." checked={prefs.news} onChange={setPref('news')} />
          <Row title="یادآوری مناسبت‌ها" text="چند روز قبل از تولد و سالگرد، به شما یادآوری می‌کنیم." checked={prefs.dates} onChange={setPref('dates')} />
        </ul>
      </AccountCard>

      <AccountCard title="امنیت حساب" icon="shield">
        <div className="space-y-6 p-5 sm:p-7">
          <form onSubmit={savePw} className="space-y-4" noValidate>
            <h3 className="text-[15px] font-bold text-[#2a1a12]">تغییر رمز عبور</h3>
            <Field label="رمز فعلی">
              <input type="password" dir="ltr" className={`${inputCls} text-left`} value={pw.old} onChange={(e) => setPw({ ...pw, old: e.target.value })} autoComplete="current-password" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="رمز جدید">
                <input type="password" dir="ltr" className={`${inputCls} text-left`} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} autoComplete="new-password" />
              </Field>
              <Field label="تکرار رمز جدید">
                <input type="password" dir="ltr" className={`${inputCls} text-left`} value={pw.again} onChange={(e) => setPw({ ...pw, again: e.target.value })} autoComplete="new-password" />
              </Field>
            </div>
            {pw.next && (
              <div aria-live="polite">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <span key={i} className="h-1.5 flex-1 rounded-full transition-colors duration-300" style={{ background: i <= score ? strengthColor[score] : '#d9bfa6aa' }} />
                  ))}
                </div>
                <p className="mt-1.5 text-[12.5px] text-[#6b4f3e]">قدرت رمز: {strengthLabel[score]}</p>
              </div>
            )}
            {pwErr && <p role="alert" className="text-[13px] text-[#b4472f]">{pwErr}</p>}
            <button type="submit" className={btnPrimary}>
              {pwDone ? (<><Icon name="check" className="h-4 w-4" /> رمز تغییر کرد</>) : 'تغییر رمز'}
            </button>
          </form>

          <ul className="border-t border-[#d9bfa6]/60">
            <Row title="ورود با کد یک‌بارمصرف پیامکی" text="هنگام ورود، یک کد تأیید به موبایل شما ارسال می‌شود." checked={otp} onChange={setOtp} />
          </ul>
        </div>
      </AccountCard>

      <section className="rounded-[24px] border border-[#e3b3a5] bg-[#f6dcd4]/40 p-5 sm:p-7">
        <h2 className="text-[16px] font-bold text-[#9a3a26]">حذف حساب کاربری</h2>
        <p className="mt-2 max-w-[560px] text-[14px] leading-7 text-[#6b4f3e]">با حذف حساب، اطلاعات شخصی، آدرس‌ها و علاقه‌مندی‌های شما پاک می‌شود. سابقه‌ی مالی سفارش‌ها طبق قانون برای مدتی نگهداری می‌شود.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => setDel(true)} className={btnDanger}>حذف حساب</button>
          <button type="button" className={btnGhost}>دریافت نسخه‌ی اطلاعات من</button>
        </div>
      </section>

      <ConfirmModal open={del} onClose={() => setDel(false)} onConfirm={() => onDeleteAccount?.()} title="حذف حساب کاربری" text="آیا از حذف حساب خود مطمئن هستید؟ این کار قابل بازگشت نیست." confirmLabel="بله، حساب حذف شود" />
    </div>
  );
};

export default AccountSettings;
