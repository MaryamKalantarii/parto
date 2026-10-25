
'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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

        .login-page {
          position: relative;
          isolation: isolate;
          min-height: 100vh;
          overflow: hidden;
          background: #080706;
          color: #f5f1e9;
          font-family: var(--font-sans), 'Vazirmatn', sans-serif;
        }

        /* BACKGROUND IMAGE — LEFT SIDE */

        
      .background {
        position: absolute;
        inset: 0;
        z-index: -2;
        background-image: url('/images/login/test.png');
        background-size: cover;
        background-position: right center;
        background-repeat: no-repeat;
      }


       
      .overlay {
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        background: linear-gradient(
          90deg,
          #080706 0%,
          rgba(8, 7, 6, 0.97) 25%,
          rgba(8, 7, 6, 0.82) 43%,
          rgba(8, 7, 6, 0.25) 68%,
          rgba(8, 7, 6, 0.05) 100%
        );
      }

        /* HEADER */

        .header {
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

        .logo {
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

        .logo-star {
          font-size: 17px;
          line-height: 1;
        }

        .tagline {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 20px;
          letter-spacing: 4px;
          white-space: nowrap;
          direction: ltr;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-link:hover {
          opacity: 0.6;
        }

        /* MAIN CONTENT — RIGHT SIDE */

         
      .content {
        position: relative;
        z-index: 2;
        width: min(390px, 38vw);
        margin: 5vh auto 60px 8vw;
        text-align: right;
        direction: rtl;
      }


        .welcome {
          margin-bottom: 14px;
          color: #c7b18a;
          font-size: 13px;
          font-weight: 400;
        }

        .content h1 {
          margin: 0;
          color: #f6f2eb;
          font-family: var(--font-sans), 'Vazirmatn', sans-serif;
          font-size: 29px;
          font-weight: 400;
          line-height: 1.9;
        }

        .brand-name {
          font-family: var(--font-serif), Georgia, serif;
          letter-spacing: 2px;
          direction: ltr;
          unicode-bidi: isolate;
        }

        .subtitle {
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.65);
          font-size: 13px;
          line-height: 2;
        }

        /* FORM */

        .form {
          width: 100%;
          margin-top: 30px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          margin-bottom: 24px;
        }

        .field label {
          display: block;
          color: rgba(255, 255, 255, 0.82);
          font-size: 12px;
          font-weight: 400;
          text-align: right;
        }

        .field input {
          display: block;
          width: 100%;
          height: 46px;
          padding: 0 13px;
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

        .field input::placeholder {
          color: rgba(255, 255, 255, 0.35);
          font-size: 12px;
        }

        .field input:focus {
          border-color: rgba(221, 203, 171, 0.75);
          background: rgba(255, 255, 255, 0.055);
        }

        .field input#email {
          direction: ltr;
          text-align: left;
        }

        /* PASSWORD VISIBILITY */

        .password-wrapper {
          position: relative;
          width: 100%;
        }

        .password-wrapper input {
          padding-right: 13px;
          padding-left: 44px;
        }

        .eye-button {
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

        .eye-button:hover {
          color: #e4d2b0;
        }

        /* FORGOT PASSWORD */

        .forgot {
          display: inline-block;
          margin-top: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 11px;
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .forgot:hover {
          color: #e4d2b0;
        }

        /* SIGN IN BUTTON */

        .sign-in-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          height: 48px;
          margin-top: 25px;
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

        .sign-in-button:hover {
          border-color: #e4d2b0;
          background: rgba(221, 203, 171, 0.15);
        }

        .sign-in-arrow {
          font-size: 16px;
        }

        /* CREATE ACCOUNT */

        .create-account {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 11px;
          margin-top: 30px;
        }

        .create-account-label {
          color: rgba(255, 255, 255, 0.55);
          font-size: 12px;
        }

        .create-account a {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 12px;
          text-decoration: none;
          transition: opacity 0.25s ease;
        }

        .create-account a:hover {
          opacity: 0.65;
        }

        /* TABLET */

        @media (max-width: 900px) {
          .background {
          background-size: auto 85vh;
          background-position: right top;
          background-repeat: no-repeat;
        }
          .overlay {
            background: linear-gradient(
              270deg,
              #080706 0%,
              rgba(8, 7, 6, 0.97) 38%,
              rgba(8, 7, 6, 0.82) 55%,
              rgba(8, 7, 6, 0.18) 100%
            );
          }

          .content {
              width: min(360px, 43vw);
              margin-left: 5vw;
              margin-right: auto;
            }

          .header {
            padding: 28px 4vw;
          }

          .tagline {
            display: none;
          }
        }

        /* MOBILE */

       @media (max-width: 600px) {
  .login-page {
    min-height: 100vh;
  }

  .background {
    background-size: auto 45vh;
    background-position: right top;
    background-repeat: no-repeat;
  }

  .overlay {
    background: linear-gradient(
      180deg,
      rgba(8, 7, 6, 0.02) 0%,
      rgba(8, 7, 6, 0.08) 45%,
      rgba(8, 7, 6, 0.65) 75%,
      #080706 100%
    );
  }

  .header {
    padding: 22px 20px;
  }

  .logo {
    font-size: 17px;
  }

  .back-link {
    font-size: 11px;
  }

  .content {
    width: auto;
    margin: 34vh 24px 45px;
  }

  .content h1 {
    font-size: 25px;
    line-height: 1.9;
  }

  .subtitle {
    font-size: 12px;
  }

  .form {
    margin-top: 25px;
  }
}
      `}</style>

      <main className="login-page" dir="rtl">
        <div className="background" aria-hidden="true" />
        <div className="overlay" aria-hidden="true" />

        <header className="header">
          <Link href="/" className="logo">
            <span className="logo-star">✦</span>
            <span>پرتو</span>
          </Link>

          <div className="tagline">صفحه ورود</div>

          <Link href="/" className="back-link">
            <span>بازگشت به سایت</span>
            <span aria-hidden="true">←</span>
          </Link>
        </header>

        <section className="content">
          <div className="welcome">خوش برگشتید</div>

          <h1>
            به دنیای
            <br />
            <span className="brand-name">پرتو</span> خوش آمدید.
          </h1>

          <p className="subtitle">
            برای ادامه مسیر خود وارد حساب کاربری‌تان شوید.
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">آدرس ایمیل</label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">رمز عبور</label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="رمز عبور خود را وارد کنید"
                  autoComplete="current-password"
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

            <Link href="/forgot-password" className="forgot">
              رمز عبور خود را فراموش کرده‌اید؟
            </Link>

            <button type="submit" className="sign-in-button">
              <span>ورود به حساب کاربری</span>
              <span className="sign-in-arrow" aria-hidden="true">
                ←
              </span>
            </button>
          </form>

          <div className="create-account">
            <span className="create-account-label">
              هنوز عضو پرتو نشده‌اید؟
            </span>

            <Link href="/signup">
              <span>ایجاد حساب کاربری</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
