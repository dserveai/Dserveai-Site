import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proven AI Data Case Studies & Results | Dserve AI",
  description: "Read how Dserve AI helped enterprise clients scale computer vision, NLP, and healthcare AI models with highly accurate, bespoke datasets.",
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
