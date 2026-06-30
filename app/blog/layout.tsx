import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Machine Learning Insights | Dserve AI Blog",
  description: "Explore the latest trends in AI data collection, annotation strategies, and machine learning breakthroughs with Dserve AI's expert insights.",
  alternates: { canonical: "https://dserveai.com/blog" },
  openGraph: {
    title: "AI & Machine Learning Insights | Dserve AI Blog",
    description: "Explore the latest trends in AI data collection, annotation strategies, and machine learning breakthroughs with Dserve AI's expert insights.",
    type: "website",
    url: "https://dserveai.com/blog",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dserve AI Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Machine Learning Insights | Dserve AI Blog",
    description: "Explore the latest trends in AI data collection, annotation strategies, and machine learning breakthroughs with Dserve AI's expert insights.",
    images: ["/og-image.jpg"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
