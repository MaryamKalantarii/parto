/**
 * این فایل باید در این مسیر قرار بگیرد:  app/blog/[slug]/page.tsx
 * (پوشه‌ی [slug] با براکت واقعی؛ اینجا فقط برای ارسال، اسمش slug است)
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { BlogPost } from "@/components/blog/BlogPost";
import { posts, getPost } from "@/data/blog";

type Props = { params: { slug: string } | Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | مجله پرتو`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: post.img ? [post.img] : undefined },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.img,
    inLanguage: "fa-IR",
    publisher: { "@type": "Organization", name: "پرتو" },
  };

  return (
    <main
      className="relative w-full overflow-x-hidden text-[#3a2418]"
      style={{
        background:
          "radial-gradient(70% 30% at 15% 12%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(60% 25% at 90% 55%, rgba(255,255,255,0.4), transparent 70%), linear-gradient(180deg,#f0e1d3 0%,#f6ebe0 35%,#ecd9c7 70%,#f2e4d6 100%)",
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SmoothScroll />
      <Header />
      <BlogPost post={post} />
      <Footer />
    </main>
  );
}
