
'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: #080706;
          overflow-x: hidden;
        }

        .signup-page {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #080706;
          color: #f5f1e9;
          font-family: var(--font-sans), 'Vazirmatn', sans-serif;
        }

        /* BACKGROUND */

        .signup-page .background {
          position: absolute;
          inset: 0;
          z-index: -2;
          background-image: url('/images/signup/aurel-signup.png');
          background-size: cover;
          background-position: right center;
          background-repeat: no-repeat;
        }

        .signup-page .overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            #080706 0%,
            rgba(8, 7, 6, 0.97) 25%,
            rgba(8, 7, 6, 0.88) 43%,
            rgba(8, 7, 6, 0.45) 65%,
            rgba(8, 7, 6, 0.12) 100%
          );
        }

        /* HEADER */

        .signup-page .header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          width: 100%;
          padding: 32px 5vw;
          direction: rtl;
        }

        .signup-page .logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #f5f1e9;
          font-family: var(--font-serif), Georgia, serif;
          font-size: 19px;
          font-weight: 400;
          letter-spacing: 5px;
          text-decoration: none;
          direction: ltr;
        }

        .signup-page .logo-star {
          font-size: 17px;
          line-height: 1;
        }

        .signup-page .tagline {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 20px;
          letter-spacing: 4px;
          white-space: nowrap;
          direction: ltr;
        }

        .signup-page .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .signup-page .back-link:hover {
          opacity: 0.6;
        }

        /* CONTENT — LEFT SIDE */

        .signup-page .content {
          position: relative;
          z-index: 2;
          width: min(390px, 38vw);
          margin: 3vh auto 60px 8vw;
          text-align: right;
          direction: rtl;
        }

        .signup-page .welcome {
          margin-bottom: 12px;
          color: #c7b18a;
          font-size: 13px;
          font-weight: 400;
        }

        .signup-page .content h1 {
          margin: 0;
          color: #f6f2eb;
          font-family: var(--font-sans), 'Vazirmatn', sans-serif;
          font-size: 29px;
          font-weight: 400;
          line-height: 1.9;
        }

        .signup-page .brand-name {
          font-family: var(--font-serif), Georgia, serif;
          letter-spacing: 2px;
          direction: ltr;
          unicode-bidi: isolate;
        }

        .signup-page .subtitle {
          margin: 8px 0 0;
          color: rgba(255, 255, 255, 0.65);
          font-size: 13px;
          line-height: 2;
        }

        /* FORM */

        .signup-page .form {
          width: 100%;
          margin-top: 24px;
        }

        .signup-page .field {
          display: flex;
          flex-direction: column;
          gap: 9px;
          width: 100%;
          margin-bottom: 19px;
        }

        .signup-page .field label {
          display: block;
          color: rgba(255, 255, 255, 0.82);
          font-size: 12px;
          font-weight: 400;
          text-align: right;
        }

        .signup-page .field input {
          display: block;
          width: 100%;
          height: 43px;
          padding: 0 12px;
          border: 1px solid rgba(221, 203, 171, 0.25);
          border-radius: 2px;
          outline: none;
          background: rgba(255, 255, 255, 0.035);
          color: #f5f1e9;
          font-family: var(--font-sans), 'Vazirmatn', sans-serif;
          font-size: 13px;
          text-align: right;
          direction: rtl;
          transition:
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .signup-page .field input::placeholder {
          color: rgba(255, 255, 255, 0.35);
          font-size: 12px;
        }

        .signup-page .field input:focus {
          border-color: rgba(221, 203, 171, 0.75);
          background: rgba(255, 255, 255, 0.055);
        }

        .signup-page .field input#signup-email {
          direction: ltr;
          text-align: left;
        }

        /* PASSWORD VISIBILITY */

        .signup-page .password-wrapper {
          position: relative;
          width: 100%;
        }

        .signup-page .password-wrapper input {
          padding-left: 44px;
        }

        .signup-page .eye-button {
          position: absolute;
          top: 50%;
          left: 12px;
          display: flex;
          width: 25px;
          height: 25px;
          align-items: center;
          justify-content: center;
          padding: 0;
          transform: translateY(-50%);
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-size: 16px;
          cursor: pointer;
        }

        .signup-page .eye-button:hover {
          color: #e4d2b0;
        }

        /* SIGNUP BUTTON */

        .signup-page .sign-in-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          height: 48px;
          margin-top: 23px;
          border: 1px solid rgba(221, 203, 171, 0.5);
          background: rgba(221, 203, 171, 0.07);
          color: #f5f1e9;
          font-family: var(--font-sans), 'Vazirmatn', sans-serif;
          font-size: 13px;
          cursor: pointer;
          transition:
            background 0.3s ease,
            border-color 0.3s ease;
        }

        .signup-page .sign-in-button:hover {
          border-color: #e4d2b0;
          background: rgba(221, 203, 171, 0.15);
        }

        .signup-page .sign-in-arrow {
          font-size: 16px;
        }

        /* LOGIN LINK */

        .signup-page .create-account {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 11px;
          margin-top: 25px;
          padding-bottom: 25px;
        }

        .signup-page .create-account-label {
          color: rgba(255, 255, 255, 0.55);
          font-size: 12px;
        }

        .signup-page .create-account a {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 12px;
          text-decoration: none;
          transition: opacity 0.25s ease;
        }

        .signup-page .create-account a:hover {
          opacity: 0.65;
        }

        /* TABLET */

        @media (max-width: 900px) {
          .signup-page .background {
            background-size: auto 85vh;
            background-position: right top;
          }

          .signup-page .overlay {
            background: linear-gradient(
              90deg,
              #080706 0%,
              rgba(8, 7, 6, 0.97) 30%,
              rgba(8, 7, 6, 0.85) 48%,
              rgba(8, 7, 6, 0.3) 75%,
              rgba(8, 7, 6, 0.12) 100%
            );
          }

          .signup-page .header {
            padding: 28px 4vw;
          }

          .signup-page .tagline {
            display: none;
          }

          .signup-page .content {
            width: min(360px, 43vw);
            margin-left: 5vw;
            margin-right: auto;
          }
        }

        /* MOBILE */

        @media (max-width: 600px) {
          .signup-page {
            min-height: 100vh;
          }

          .signup-page .background {
            background-size: auto 45vh;
            background-position: right top;
          }

          .signup-page .overlay {
            background: linear-gradient(
              180deg,
              rgba(8, 7, 6, 0.02) 0%,
              rgba(8, 7, 6, 0.08) 25%,
              rgba(8, 7, 6, 0.65) 42%,
              #080706 55%,
              #080706 100%
            );
          }

          .signup-page .header {
            padding: 22px 20px;
          }

          .signup-page .logo {
            font-size: 17px;
          }

          .signup-page .back-link {
            font-size: 11px;
          }

          .signup-page .content {
            width: auto;
            margin: 34vh 24px 0;
          }

          .signup-page .content h1 {
            font-size: 25px;
            line-height: 1.9;
          }

          .signup-page .subtitle {
            font-size: 12px;
          }

          .signup-page .form {
            margin-top: 22px;
          }

          .signup-page .field {
            margin-bottom: 17px;
          }
        }

        @media (max-width: 380px) {
          .signup-page .content {
            margin-right: 18px;
            margin-left: 18px;
          }

          .signup-page .content h1 {
            font-size: 23px;
          }

          .signup-page .header {
            padding-right: 16px;
            padding-left: 16px;
          }
        }
      `}</style>

      <main className="signup-page" dir="rtl">
        <div className="background" aria-hidden="true" />
        <div className="overlay" aria-hidden="true" />

        <header className="header">
          <Link href="/" className="logo">
            <span className="logo-star">✦</span>
            <span>پرتو</span>
          </Link>

          <div className="tagline">صفحه ثبت نام</div>

          <Link href="/" className="back-link">
            <span>بازگشت به سایت</span>
            <span aria-hidden="true">←</span>
          </Link>
        </header>

        <section className="content">
          <div className="welcome">به جمع ما بپیوندید</div>

          <h1>
            حساب کاربری
            <br />
            <span className="brand-name">پرتو</span> بسازید.
          </h1>

          <p className="subtitle">
            برای تجربه مجموعه‌های ویژه، حساب خود را ایجاد کنید.
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="fullname">نام و نام خانوادگی</label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="نام کامل خود را وارد کنید"
                autoComplete="name"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="signup-email">آدرس ایمیل</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="signup-password">رمز عبور</label>

              <div className="password-wrapper">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="رمز عبور دلخواه را وارد کنید"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? 'مخفی کردن رمز عبور' : 'نمایش رمز عبور'
                  }
                >
                  {showPassword ? '◉' : '◌'}
                </button>
              </div>
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">تکرار رمز عبور</label>

              <div className="password-wrapper">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="رمز عبور را دوباره وارد کنید"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? 'مخفی کردن رمز عبور'
                      : 'نمایش رمز عبور'
                  }
                >
                  {showConfirmPassword ? '◉' : '◌'}
                </button>
              </div>
            </div>

            <button type="submit" className="sign-in-button">
              <span>ایجاد حساب کاربری</span>
              <span className="sign-in-arrow" aria-hidden="true">
                ←
              </span>
            </button>
          </form>

          <div className="create-account">
            <span className="create-account-label">
              قبلاً در پرتو عضو شده‌اید؟
            </span>

            <Link href="/login">
              <span>ورود به حساب کاربری</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
