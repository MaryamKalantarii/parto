'use client';

import React, { useState } from 'react';
import { EditProfileModal, UserProfileData } from './EditProfileModal';

export const ProfileInfo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<UserProfileData>({
    firstName: 'الکس',
    lastName: 'مورگان',
    email: 'alex.morgan@example.com',
    phone: '۰۹۱۲۱۲۳۴۵۶۷',
    avatarUrl: undefined,
  });

  const handleSave = (newData: UserProfileData) => {
    setUser(newData);
  };

  return (
    <div className="text-right" dir="rtl">
      {/* Edit Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={user}
        onSave={handleSave}
      />

      {/* Header Area */}
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/10">
        <h2 className="font-serif text-lg font-light tracking-wide text-[#F7F5F0]">
          اطلاعات پروفایل
        </h2>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="font-sans text-xs tracking-wider text-[#D8C2A8] hover:underline flex items-center gap-1.5"
        >
          <span>✎</span> ویرایش
        </button>
      </div>

      {/* Avatar & Summary */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-16 h-16 rounded-full border border-white/20 bg-white/5 overflow-hidden flex items-center justify-center font-serif text-2xl text-[#D8C2A8] flex-none">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.firstName} className="w-full h-full object-cover" />
          ) : (
            user.firstName.charAt(0)
          )}
        </div>
        <div>
          <h3 className="font-serif text-xl font-light text-[#F7F5F0]">
            {user.firstName} {user.lastName}
          </h3>
          <p className="font-sans text-xs text-[#8A857D] mt-0.5" dir="ltr">{user.email}</p>
          <p className="font-mono text-xs text-[#6A655D] mt-0.5" dir="ltr">{user.phone}</p>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
        <div>
          <span className="block font-sans text-xs tracking-wider text-[#6A655D] mb-1">
            نام
          </span>
          <span className="font-sans text-xs text-[#F7F5F0]">{user.firstName}</span>
        </div>
        <div>
          <span className="block font-sans text-xs tracking-wider text-[#6A655D] mb-1">
            نام خانوادگی
          </span>
          <span className="font-sans text-xs text-[#F7F5F0]">{user.lastName}</span>
        </div>
        <div>
          <span className="block font-sans text-xs tracking-wider text-[#6A655D] mb-1">
            شماره همراه
          </span>
          <span className="font-mono text-xs text-[#F7F5F0]" dir="ltr">{user.phone}</span>
        </div>
        <div className="col-span-2 sm:col-span-3 pt-4 border-t border-white/5">
          <span className="block font-sans text-xs tracking-wider text-[#6A655D] mb-1">
            آدرس ایمیل
          </span>
          <span className="font-sans text-xs text-[#D8C2A8]" dir="ltr">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;