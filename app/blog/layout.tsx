import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Machine Learning Insights | Dserve AI Blog",
  description: "Explore the latest trends in AI data collection, annotation strategies, and machine learning breakthroughs with Dserve AI's expert insights.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
