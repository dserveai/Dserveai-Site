import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | AI Success Stories - Dserve AI",
  description: "Explore how Dserve AI has transformed data pipelines and AI capabilities for leading global enterprises through high-precision data annotation and collection.",
  alternates: { canonical: "https://dserveai.com/case-studies" },
  openGraph: {
    title: "Case Studies | Dserve AI",
    description: "Explore how Dserve AI has transformed data pipelines and AI capabilities for leading global enterprises.",
    type: "website",
    url: "https://dserveai.com/case-studies",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dserve AI Case Studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | AI Success Stories - Dserve AI",
    description: "Explore how Dserve AI has transformed data pipelines and AI capabilities for leading global enterprises through high-precision data annotation and collection.",
    images: ["/og-image.jpg"],
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
