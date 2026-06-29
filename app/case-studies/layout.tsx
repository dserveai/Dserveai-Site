import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | AI Success Stories - Dserve AI",
  description: "Explore how Dserve AI has transformed data pipelines and AI capabilities for leading global enterprises through high-precision data annotation and collection.",
  openGraph: {
    title: "Case Studies | Dserve AI",
    description: "Explore how Dserve AI has transformed data pipelines and AI capabilities for leading global enterprises.",
    type: "website",
    url: "https://dserveai.com/case-studies",
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
