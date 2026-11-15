'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditProfileModal, UserProfileData } from './EditProfileModal';
import { AccountCard, EditButton, Icon, type IconName } from './ui';
import { toFa } from './validators';

interface ProfileInfoProps {
  user: UserProfileData;
  onSave: (data: UserProfileData) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

function Field({ icon, label, value, ltr, big }: { icon: IconName; label: string; value: string; ltr?: boolean; big?: boolean }) {
  return (
    <div className="flex items-start gap-3 px-5 py-5 sm:px-7">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8c9aa]/35 text-[#84563a]">
        <Icon name={icon} className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0">
        <span className="block text-[13px] text-[#6b4f3e]">{label}</span>
        <span dir={ltr ? 'ltr' : undefined} className={`mt-1.5 block break-words text-right text-[#2a1a12] ${big ? 'text-[19px] font-bold' : 'text-[15px] font-medium leading-7'}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

/* درصد کامل‌بودن پروفایل */
function completion(u: UserProfileData) {
  const parts = [u.firstName, u.lastName, u.phone, u.email, u.address, u.avatarUrl, u.nationalCode];
  return Math.round((parts.filter(Boolean).length / parts.length) * 100);
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, onSave, modalOpen, setModalOpen }) => {
  const pct = completion(user);
  const missing = !user.nationalCode ? 'کد ملی را برای صدور فاکتور رسمی اضافه کنید.' : !user.avatarUrl ? 'یک تصویر پروفایل اضافه کنید.' : !user.address ? 'آدرس پیش‌فرض را ثبت کنید.' : '';

  return (
    <>
      <EditProfileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} userData={user} onSave={onSave} />

      <AccountCard title="اطلاعات کاربری" icon="user" action={<EditButton onClick={() => setModalOpen(true)}>ویرایش اطلاعات</EditButton>}>
        <div className="flex flex-col sm:flex-row sm:items-stretch" dir="rtl">
          {/* آواتار */}
          <div className="grid flex-none place-items-center py-6 sm:w-[220px] sm:border-l sm:border-[#d9bfa6]/50">
            <div className="relative h-[120px] w-[120px]">
              <span className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-[#f3dcc4] via-[#c8a07c] to-[#a87a56] opacity-80" />
              <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-full border-4 border-[#fbf1e6] bg-gradient-to-br from-[#c8a07c] to-[#8d6243] text-[44px] font-bold text-white">
                {user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatarUrl} alt={user.firstName} className="h-full w-full object-cover" />
                ) : (
                  user.firstName?.trim()[0]
                )}
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                aria-label="تغییر تصویر"
                className="absolute bottom-0 left-0 grid h-9 w-9 place-items-center rounded-full border-2 border-[#fbf1e6] bg-gradient-to-br from-[#f0c8a8] to-[#d9a47e] text-[#2a1a12] shadow-md transition hover:scale-105"
              >
                <Icon name="camera" className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* فیلدها */}
          <div className="grid flex-1 sm:grid-cols-2">
            <div className="border-b border-[#d9bfa6]/50 sm:border-l"><Field icon="user" label="نام و نام خانوادگی" value={`${user.firstName} ${user.lastName}`} big /></div>
            <div className="border-b border-[#d9bfa6]/50"><Field icon="phone" label="شماره موبایل" value={toFa(user.phone)} ltr big /></div>
            <div className="border-b border-[#d9bfa6]/50 sm:border-b-0 sm:border-l"><Field icon="pin" label="آدرس پیش‌فرض" value={user.address || '—'} /></div>
            <div><Field icon="mail" label="ایمیل" value={user.email} ltr /></div>
          </div>
        </div>

        {/* کامل‌بودن پروفایل */}
        {pct < 100 && (
          <div className="border-t border-[#d9bfa6]/50 px-5 py-4 sm:px-7" dir="rtl">
            <div className="flex items-center justify-between gap-4 text-[13.5px]">
              <span className="font-medium text-[#2a1a12]">پروفایل شما {toFa(pct)}٪ کامل است</span>
              {missing && <span className="hidden text-[#7a5a46] sm:block">{missing}</span>}
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#d9bfa6]/50">
              <motion.div
                className="h-full origin-right rounded-full bg-gradient-to-l from-[#e2bf9f] to-[#b3865f]"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        )}
      </AccountCard>
    </>
  );
};

export default ProfileInfo;
