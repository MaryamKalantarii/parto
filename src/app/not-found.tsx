'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';

const sparks = Array.from({ length: 14 }, (_, i) => ({
  left: `${6 + ((i * 37) % 88)}%`,
  top: `${10 + ((i * 53) % 78)}%`,
  size: 4 + ((i * 3) % 7),
  delay: (i * 0.45).toFixed(2),
  dur: (3.6 + (i % 4)).toFixed(1),
}));

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main dir="rtl" lang="fa" className={`parto-404 ${mounted ? 'is-visible' : ''}`}>
      <Header />

      {/* پس‌زمینه */}
      <div className="parto-404__background" />
      <div className="parto-404__overlay" />
      <div className="parto-404__glow" />
      <div className="parto-404__sparks" aria-hidden>
        {sparks.map((s, i) => (
          <span
            key={i}
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      {/* محتوا */}
      <section className="parto-404__content">
        <div className="parto-404__ring" aria-hidden>
          <i />
          <i />
        </div>

        <h1 className="parto-404__number" aria-label="خطای ۴۰۴">
          ۴۰۴
        </h1>

        <span aria-hidden className="parto-404__divider">
          <b />
          <em>◆</em>
          <b />
        </span>

        <p className="parto-404__headline">پرتو این صفحه را پیدا نکرد</p>

        <p className="parto-404__description">
          صفحه‌ای که دنبالش می‌گردید شاید حذف شده باشد،
          <br className="desktop-break" />
          نامش تغییر کرده یا موقتاً در دسترس نیست.
        </p>

        <Link href="/" className="parto-404__button">
          <span>بازگشت به خانه</span>
          <ArrowLeft className="parto-404__arrow" />
        </Link>
      </section>

      <footer className="parto-404__footer">
   
        <span>۴۰۴ — صفحه پیدا نشد</span>
      </footer>

      <style jsx global>{`
        .parto-404,
        .parto-404 * {
          box-sizing: border-box;
        }

        .parto-404 {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          background: #1c110c;
          color: #fbeee2;
          font-family: var(--font-sans, 'Vazirmatn', sans-serif);
        }

        .parto-404__background {
          position: absolute;
          z-index: -4;
          inset: 0;
          background-image: url('/images/404/404.jpg'),
            radial-gradient(60% 70% at 50% 40%, #6b4430 0%, #3b2419 55%, #1c110c 100%);
          background-size: cover, cover;
          background-position: center center;
          transform: scale(1.06);
          transition: transform 2s cubic-bezier(0.2, 0.65, 0.3, 1);
        }
        .parto-404.is-visible .parto-404__background {
          transform: scale(1);
        }

        .parto-404__overlay {
          position: absolute;
          z-index: -3;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at center, rgba(28, 17, 12, 0.35) 0%, rgba(20, 11, 7, 0.88) 100%);
        }

        .parto-404__glow {
          position: absolute;
          z-index: -2;
          left: 50%;
          top: 46%;
          width: min(70vw, 620px);
          height: min(70vw, 620px);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, rgba(226, 191, 159, 0.32) 0%, rgba(200, 160, 124, 0.1) 40%, transparent 70%);
          filter: blur(30px);
          animation: parto404-breathe 6s ease-in-out infinite;
        }

        .parto-404__sparks {
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
        }
        .parto-404__sparks span {
          position: absolute;
          background: #fff2e0;
          transform: rotate(45deg);
          border-radius: 2px;
          box-shadow: 0 0 12px 3px rgba(255, 220, 180, 0.85);
          opacity: 0;
          animation: parto404-twinkle ease-in-out infinite;
        }

        .parto-404__content {
          position: relative;
          z-index: 1;
          min-height: calc(100vh - 120px);
          padding: 40px 24px 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 1s ease 0.15s, transform 1s cubic-bezier(0.2, 0.65, 0.3, 1) 0.15s;
        }
        .parto-404.is-visible .parto-404__content {
          opacity: 1;
          transform: translateY(0);
        }

        /* حلقه‌های چرخان پشت عدد */
        .parto-404__ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(78vw, 430px);
          height: min(78vw, 430px);
          transform: translate(-50%, -62%);
          pointer-events: none;
        }
        .parto-404__ring i {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px dashed rgba(226, 191, 159, 0.35);
          animation: parto404-spin 40s linear infinite;
        }
        .parto-404__ring i:last-child {
          inset: 14%;
          border: 1px solid rgba(226, 191, 159, 0.2);
          animation-direction: reverse;
          animation-duration: 28s;
        }

        .parto-404__number {
          position: relative;
          margin: 0;
          font-size: clamp(110px, 17vw, 210px);
          font-weight: 200;
          line-height: 1;
          background: linear-gradient(
            110deg,
            #f3dcc4 0%,
            #fff6ea 25%,
            #c8a07c 50%,
            #fff6ea 75%,
            #f3dcc4 100%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 14px 34px rgba(0, 0, 0, 0.55));
          animation: parto404-shimmer 6s linear infinite;
        }

        .parto-404__divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 18px 0 6px;
        }
        .parto-404__divider b {
          display: block;
          width: 70px;
          height: 1px;
          background: linear-gradient(to left, rgba(226, 191, 159, 0.8), transparent);
        }
        .parto-404__divider b:last-child {
          background: linear-gradient(to right, rgba(226, 191, 159, 0.8), transparent);
        }
        .parto-404__divider em {
          font-style: normal;
          font-size: 10px;
          color: #e2bf9f;
        }

        .parto-404__headline {
          margin: 14px 0 14px;
          font-size: clamp(20px, 2.4vw, 28px);
          font-weight: 700;
          color: #fbeee2;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.45);
        }

        .parto-404__description {
          margin: 0 0 34px;
          color: rgba(240, 220, 203, 0.85);
          font-size: 14px;
          line-height: 2.1;
        }

        .parto-404__button {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 14px 34px;
          border-radius: 999px;
          border: 1px solid rgba(226, 191, 159, 0.55);
          background: linear-gradient(180deg, rgba(90, 58, 40, 0.75), rgba(42, 23, 14, 0.85));
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 220, 190, 0.25);
          backdrop-filter: blur(8px);
          color: #fbeee2;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          transition: transform 0.4s ease, background 0.4s ease, color 0.4s ease, border-color 0.4s ease;
        }
        .parto-404__button::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 40%;
          left: -60%;
          transform: skewX(-18deg);
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          animation: parto404-sweep 4.5s ease-in-out infinite;
        }
        .parto-404__button:hover {
          transform: translateY(-3px);
          background: linear-gradient(180deg, #f6e0c8, #dcb896);
          color: #2a170e;
          border-color: #f3dcc4;
        }

        .parto-404__arrow {
          width: 16px;
          height: 16px;
          stroke-width: 1.5;
          transition: transform 0.3s ease;
        }
        .parto-404__button:hover .parto-404__arrow {
          transform: translateX(-5px);
        }

        .parto-404__footer {
          position: absolute;
          right: 5.5%;
          bottom: 24px;
          left: 5.5%;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: rgba(246, 239, 228, 0.6);
          font-size: 11px;
        }

        @keyframes parto404-spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes parto404-breathe {
          0%,
          100% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }
        @keyframes parto404-twinkle {
          0%,
          100% {
            opacity: 0;
            transform: rotate(45deg) scale(0.4) translateY(0);
          }
          50% {
            opacity: 1;
            transform: rotate(45deg) scale(1.1) translateY(-12px);
          }
        }
        @keyframes parto404-shimmer {
          to {
            background-position: -250% 0;
          }
        }
        @keyframes parto404-sweep {
          0%,
          60% {
            left: -60%;
          }
          100% {
            left: 140%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .parto-404 *,
          .parto-404 *::after {
            animation: none !important;
          }
        }

        @media (max-width: 560px) {
          .desktop-break {
            display: none;
          }
          .parto-404__footer {
            flex-direction: column;
            align-items: center;
            gap: 4px;
          }
        }
      `}</style>
    </main>
  );
}
