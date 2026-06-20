import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { caseStudies } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const caseStudy = caseStudies.find((c) => c.slug === params.slug);
  if (!caseStudy) return { title: "Not Found" };
  return {
    title: `${caseStudy.title} | Dserve AI Case Studies`,
    description: caseStudy.description,
  };
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyPage(props: Props) {
  const params = await props.params;
  const caseStudy = caseStudies.find((c) => c.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "120px", paddingBottom: "80px", minHeight: "80vh" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link href="/case-studies" style={{ color: "#0ea5e9", textDecoration: "none", marginBottom: "32px", display: "inline-block", fontWeight: 600 }}>
            ← Back to Case Studies
          </Link>
          <div style={{ marginBottom: "16px" }}>
            <span className="section-label" style={{ color: caseStudy.color, borderColor: `${caseStudy.color}30`, background: `${caseStudy.color}10` }}>
              {caseStudy.industry}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "3rem", fontWeight: 800, color: "white", marginBottom: "24px", lineHeight: 1.2 }}>
            {caseStudy.title}
          </h1>
          <p style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.7)", marginBottom: "48px", lineHeight: 1.6 }}>
            {caseStudy.description}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginBottom: "64px" }}>
            {caseStudy.stats.map((stat, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 700, color: caseStudy.color, marginBottom: "8px" }}>
                  {stat.v}
                </div>
                <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {stat.l}
                </div>
              </div>
            ))}
          </div>

          <article style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", lineHeight: 1.8 }}>
            <h2 style={{ color: "white", fontSize: "1.75rem", marginBottom: "24px", fontFamily: "'Outfit', sans-serif" }}>Challenge & Solution</h2>
            <p style={{ marginBottom: "24px" }}>{caseStudy.fullDescription}</p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
