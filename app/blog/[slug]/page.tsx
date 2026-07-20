import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import postsData from "@/lib/posts_data.json";
import SchemaScript from "@/components/seo/SchemaScript";
import { generateArticle, generateBreadcrumbList } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = postsData.find((p) => p.slug === params.slug);
  if (!post) return { title: "Not Found" };
  // Strip HTML for the description
  const description = post.excerpt.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';
  
  return {
    title: `${post.title} | Dserve AI Blog`,
    description,
    alternates: { canonical: `https://dserveai.com/blog/${params.slug}` },
    openGraph: {
      title: `${post.title} | Dserve AI Blog`,
      description,
      type: "article",
      url: `https://dserveai.com/blog/${params.slug}`,
      images: [{ url: ((post as any).image as string) || "/og-image.jpg", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Dserve AI Blog`,
      description,
      images: [((post as any).image as string) || "/og-image.jpg"],
    },
  };
}

export async function generateStaticParams() {
  return postsData.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const post = postsData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SchemaScript 
        schema={[
          generateArticle({
            title: post.title,
            date: post.date,
            image: (post as any).image,
            path: `/blog/${post.slug}`
          }),
          generateBreadcrumbList([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` }
          ])
        ]}
      />
      <Navbar />
      <main id="main" style={{ paddingTop: "140px", paddingBottom: "80px", minHeight: "80vh" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link href="/blog" style={{ color: "#0ea5e9", textDecoration: "none", marginBottom: "32px", display: "inline-block", fontWeight: 600 }}>
            ← Back to Blog
          </Link>
          
          <div style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <span className="tag" style={{ background: "rgba(14,165,233,0.1)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,0.2)" }}>
              {post.category}
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>{post.readTime}</span>
          </div>

          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "white", marginBottom: "48px", lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: post.title }} />

          <article 
            style={{ 
              color: "rgba(255,255,255,0.8)", 
              fontSize: "1.1rem", 
              lineHeight: 1.8,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "48px"
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div style={{ marginTop: "64px", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <h3 style={{ color: "white", fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", marginBottom: "24px" }}>Related Posts</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", marginBottom: "48px" }}>
              {postsData
                .filter(p => p.slug !== post.slug)
                .slice(0, 3)
                .map(related => (
                  <Link key={related.slug} href={`/blog/${related.slug}`} style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", transition: "all 0.3s" }} className="relatedCard">
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>{related.category}</div>
                    <h4 style={{ color: "white", fontSize: "1.1rem", marginBottom: "0", lineHeight: 1.4 }}>{related.title}</h4>
                  </Link>
              ))}
            </div>
            
            <div style={{ textAlign: "center", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 style={{ color: "white", fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", marginBottom: "16px" }}>Ready to Build Smarter AI?</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "32px" }}>
                Our expert engineers are ready to design your custom data pipeline.
              </p>
              <Link href="/contact" className="btn btn--primary btn--lg">
                Discuss Your Project →
              </Link>
            </div>
          </div>
        </div>
      </main>
      {/* Basic styles for the blog content rendering */}
      <style dangerouslySetInnerHTML={{__html: `
        article h2 { color: white; font-family: 'Outfit', sans-serif; font-size: 2rem; margin: 48px 0 24px; font-weight: 700; }
        article h3 { color: white; font-family: 'Outfit', sans-serif; font-size: 1.5rem; margin: 32px 0 16px; font-weight: 600; }
        article p { margin-bottom: 24px; }
        article a { color: #0ea5e9; text-decoration: none; }
        article a:hover { text-decoration: underline; }
        article ul, article ol { margin-bottom: 24px; padding-left: 24px; }
        article li { margin-bottom: 8px; }
        article img { max-width: 100%; height: auto; border-radius: 12px; margin: 32px 0; border: 1px solid rgba(255,255,255,0.1); }
        article blockquote { border-left: 4px solid #0ea5e9; padding-left: 20px; font-style: italic; color: rgba(255,255,255,0.6); margin: 32px 0; background: rgba(255,255,255,0.02); padding: 24px; border-radius: 0 12px 12px 0; }
        article pre { background: #0f172a; padding: 24px; border-radius: 12px; overflow-x: auto; margin: 32px 0; border: 1px solid rgba(255,255,255,0.1); }
        article code { font-family: monospace; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
        article pre code { background: transparent; padding: 0; }
        .relatedCard:hover { background: rgba(255,255,255,0.05) !important; border-color: rgba(99,179,255,0.3) !important; transform: translateY(-4px); }
      `}} />
      <Footer />
    </>
  );
}
