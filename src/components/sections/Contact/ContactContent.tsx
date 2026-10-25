"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import "@/app/contact/Contact.css";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactDetails = [
  {
    icon: "pin",
    label: "موقعیت ما",
    lines: ["خیابان لوکس ۱۲۳", "نیویورک، ایالات متحده"],
  },
  {
    icon: "phone",
    label: "تلفن تماس",
    lines: ["+۱ (۵۵۵) ۱۲۳-۴۵۶۷"],
  },
  {
    icon: "mail",
    label: "پست الکترونیک",
    lines: ["hello@aurel.com"],
  },
  {
    icon: "clock",
    label: "ساعات کاری",
    lines: ["دوشنبه تا جمعه: ۹:۰۰ صبح الی ۶:۰۰ عصر", "شنبه و یکشنبه: ۱۰:۰۰ صبح الی ۴:۰۰ عصر"],
  },
];

function ContactIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.45,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M21 16.5v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.7 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7 9.4a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.2Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="1" />
          <path d="m3 6 9 7 9-7" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
  }
}

export default function ContactContent() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [status, setStatus] = useState("");

  const updateField = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setStatus("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("با تشکر. پیام شما با موفقیت به تیم ما ارسال شد.");
  };

  return (
    <div className="aurel-contact pt-32 pb-20" dir="rtl">
      <div className="contact-shade" aria-hidden="true" />

      <section className="contact-layout max-w-7xl mx-auto px-6 md:px-12">
        <div className="contact-copy">
          <p className="eyebrow text-xs">
            <span>در ارتباط باشید</span>
          </p>

          <h1 className="text-4xl md:text-5xl font-light whitespace-nowrap tracking-wide mt-2">
            ارتباط با ما
          </h1>

          <p className="intro text-base leading-relaxed mt-6">
            ما اینجا هستیم تا به شما کمک کنیم. چه درباره مجموعه‌های ما سوالی داشته باشید،
            چه در فرآیند سفارش نیاز به راهنمایی داشته باشید و چه بخواهید با ما در ارتباط باشید،
            تیم ما همواره آماده پاسخگویی به شماست.
          </p>

          <div className="contact-details mt-8">
            {contactDetails.map((item) => (
              <div className="detail-row mb-6" key={item.label}>
                <span className="detail-icon">
                  <ContactIcon name={item.icon} />
                </span>

                <div>
                  <h2 className="text-sm font-medium">{item.label}</h2>
                  {item.lines.map((line) => (
                    <p key={line} className="text-sm opacity-80 mt-1">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="social-links text-sm gap-4 mt-6" aria-label="شبکه‌های اجتماعی">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">اینستاگرام</a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer">پینترست</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">فیسبوک</a>
            <a href="https://x.com" target="_blank" rel="noreferrer">ایکس</a>
          </div>
        </div>

        <div className="form-panel">
          <form onSubmit={handleSubmit} className="text-sm">
            <label htmlFor="name" className="text-xs uppercase tracking-wider">نام و نام خانوادگی</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="نام شما"
              value={form.name}
              onChange={updateField}
              autoComplete="name"
              required
              className="text-sm py-3"
            />

            <label htmlFor="email" className="text-xs uppercase tracking-wider">پست الکترونیک</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="آدرس ایمیل شما"
              value={form.email}
              onChange={updateField}
              autoComplete="email"
              required
              className="text-sm py-3"
            />

            <label htmlFor="subject" className="text-xs uppercase tracking-wider">موضوع</label>
            <div className="select-wrap">
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={updateField}
                required
                className="text-sm py-3"
              >
                <option value="" disabled>
                  انتخاب موضوع
                </option>
                <option value="orders">سفارش‌ها و ارسال</option>
                <option value="products">اطلاعات محصولات</option>
                <option value="returns">مرجوعی و تعویض</option>
                <option value="partnerships">همکاری‌ها</option>
                <option value="other">سایر موارد</option>
              </select>

              <span aria-hidden="true">⌄</span>
            </div>

            <label htmlFor="message" className="text-xs uppercase tracking-wider">متن پیام</label>
            <textarea
              id="message"
              name="message"
              placeholder="پیام خود را بنویسید..."
              value={form.message}
              onChange={updateField}
              rows={5}
              required
              className="text-sm p-3"
            />

            <button className="submit-button text-xs tracking-widest py-4" type="submit">
              <span>ارسال پیام</span>
              <span className="arrow" aria-hidden="true">
                ⟵
              </span>
            </button>

            {status && (
              <p className="form-status text-sm mt-4" role="status">
                {status}
              </p>
            )}
          </form>
        </div>
      </section>

      <div className="bottom-glow" aria-hidden="true" />
    </div>
  );
}