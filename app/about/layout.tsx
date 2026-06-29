import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Dserve AI - The Intelligence Behind AI",
  description: "Learn about Dserve AI, our mission, and our global capabilities in building world-class AI data pipelines and solutions.",
  openGraph: {
    title: "About Us | Dserve AI",
    description: "Learn about Dserve AI, our mission, and our global capabilities in building world-class AI data pipelines.",
    type: "website",
    url: "https://dserveai.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
