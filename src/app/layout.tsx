import type { Metadata } from "next";
import { Cormorant_Garamond, Vazirmatn } from "next/font/google";
import "./globals.css";

// ۱. تنظیم فونت Serif انگلیسی برای اعداد و برند
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-serif",
  display: "swap",
});

// ۲. تنظیم فونت فارسی لوکس، نرم و مدرن (وزیرمتن)
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AUREL — Objects of Light",
  description: "A luxury jewelry brand featuring sculptural and cinematic designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${cormorant.variable} ${vazirmatn.variable}`}
    >
      <body className="font-sans bg-[#0a0a0a] text-[#F7F5F0] antialiased selection:bg-[#D8C2A8] selection:text-[#060605]">
        {children}
      </body>
    </html>
  );
}