import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ContactContent from "@/components/sections/Contact/ContactContent";

export default function ContactPage() {
  return (
    <main className="relative w-full bg-[#070707] min-h-screen overflow-x-hidden text-[#f5f2eb]">
      {/* 1. هدر اصلی پروژه */}
      <Header />

      {/* 2. محتوای اصلی صفحه تماس با ما */}
      <ContactContent />

      {/* 3. فوتر اصلی پروژه */}
      <Footer />
    </main>
  );
}