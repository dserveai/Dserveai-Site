import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { caseStudies } from "@/lib/data";
import SchemaScript from "@/components/seo/SchemaScript";
import { generateArticle, generateBreadcrumbList } from "@/lib/schema";
import styles from "./page.module.css";
import * as motion from "framer-motion/client";

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
    alternates: { canonical: `https://dserveai.com/case-studies/${params.slug}` },
    openGraph: {
      title: `${caseStudy.title} | Dserve AI Case Studies`,
      description: caseStudy.description,
      type: "article",
      url: `https://dserveai.com/case-studies/${params.slug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: caseStudy.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} | Dserve AI Case Studies`,
      description: caseStudy.description,
      images: ["/og-image.jpg"],
    },
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

  const relatedCaseStudies = caseStudies
    .filter(c => c.slug !== caseStudy.slug)
    .slice(0, 3);

  return (
    <>
      <SchemaScript 
        schema={[
          generateArticle({
            title: caseStudy.title,
            date: new Date().toISOString(),
            image: `/case-studies/${caseStudy.slug}.png`,
            path: `/case-studies/${caseStudy.slug}`,
            isTech: true
          }),
          generateBreadcrumbList([
            { name: "Case Studies", path: "/case-studies" },
            { name: caseStudy.title, path: `/case-studies/${caseStudy.slug}` }
          ])
        ]}
      />
      <div className={styles.pageWrapper}>
        <Navbar />
      
      <main id="main">
      {/* Immersive Hero */}
      <section className={styles.hero}>
        <Image 
          src={`/case-studies/${caseStudy.slug}.png`}
          alt={caseStudy.title}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        
        <div className={`container ${styles.heroContent}`}>
          <Link href="/case-studies" className={styles.backLink}>
            <ArrowLeft size={20} /> Back to Case Studies
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className={styles.tag}
              style={{ "--c": caseStudy.color } as React.CSSProperties}
            >
              {caseStudy.solution}
            </div>
            <h1 className={styles.title}>{caseStudy.title}</h1>
            <p className={styles.description}>{caseStudy.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Floating Stats */}
      <section className={`container ${styles.statsContainer}`}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.statsGrid}
        >
          {caseStudy.stats.map((stat, i) => (
            <div key={i} className={styles.statBox}>
              <div 
                className={styles.statValue}
                style={{ "--c": caseStudy.color } as React.CSSProperties}
              >
                {stat.v}
              </div>
              <div className={styles.statLabel}>{stat.l}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Editorial Content */}
      <section className={`container ${styles.contentSection}`}>
        {/* Challenge */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={styles.editorialGrid}
        >
          <h2 className={styles.sectionTitle}>The Challenge</h2>
          <p className={styles.sectionBody}>
            {caseStudy.details.challenge}
          </p>
        </motion.div>

        {/* Solution */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={styles.editorialGrid}
        >
          <h2 className={styles.sectionTitle}>Our Solution</h2>
          <p className={styles.sectionBody}>
            {caseStudy.details.solution}
          </p>
        </motion.div>

        {/* Impact */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={styles.impactSection}
          style={{ "--c": caseStudy.color } as React.CSSProperties}
        >
          <h2 className="sr-only">The Impact</h2>
          <p className={styles.impactBody}>
            "{caseStudy.details.impact}"
          </p>
        </motion.div>

        {/* Deep Dive Dynamic Content */}
        {caseStudy.deepDive && caseStudy.deepDive.map((block, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={styles.deepDiveSection}
          >
            <h2 className={styles.deepDiveTitle}>{block.title}</h2>
            
            {block.type === 'insight' && block.content && (
              <div 
                className={styles.insightBox}
                style={{ "--c": caseStudy.color } as React.CSSProperties}
              >
                <p className={styles.insightContent}>{block.content}</p>
              </div>
            )}
            
            {block.type === 'workflow' && block.steps && (
              <div className={styles.workflowGrid}>
                {block.steps.map((step, stepIdx) => (
                  <div 
                    key={stepIdx} 
                    className={styles.workflowStep}
                    style={{ "--c": caseStudy.color } as React.CSSProperties}
                  >
                    <h3 className={styles.workflowStepTitle}>0{stepIdx + 1}. {step.title}</h3>
                    <p className={styles.workflowStepDesc}>{step.desc}</p>
                  </div>
                ))}
              </div>
            )}
            
            {block.type === 'tech-specs' && block.specs && (
              <div className={styles.techGrid}>
                {block.specs.map((spec, specIdx) => (
                  <div key={specIdx} className={styles.techSpec}>
                    <span className={styles.techLabel}>{spec.label}</span>
                    <span className={styles.techValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </section>

      {/* Related Case Studies */}
      <section className={styles.relatedSection}>
        <div className="container">
          <h2 className={styles.relatedTitle}>Explore More Success Stories</h2>
          <div className={styles.relatedGrid}>
            {relatedCaseStudies.map((related, i) => (
              <motion.div
                key={related.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link 
                  href={`/case-studies/${related.slug}`} 
                  className={styles.relatedCard}
                  style={{ "--c": related.color } as React.CSSProperties}
                >
                  <span className={styles.relatedTag}>{related.solution}</span>
                  <h3 className={styles.relatedCardTitle}>{related.title}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      </main>

      <Footer />
    </div>
    </>
  );
}
