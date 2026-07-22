import type { Metadata } from "next";
import HomeClient from "@/components/ui/HomeClient";

export function generateMetadata(): Metadata {
  return {
    title: "Dserve AI | High-Quality AI Data Collection & Annotation",
    description: "Fuel your AI models with precision data. Dserve AI specializes in multi-modal collection, pixel-perfect annotation, and custom AI data solutions.",
    openGraph: {
      title: "Dserve AI | High-Quality AI Data",
      description: "Fuel your AI models with precision data.",
      url: "https://dserveai.com",
    },
  };
}

export default function Page() {
  return <HomeClient />;
}
