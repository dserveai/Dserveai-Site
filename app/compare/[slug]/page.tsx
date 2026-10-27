import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Layers, 
  Users,
  Award
} from 'lucide-react';

import { comparisons } from '@/lib/compareData';
import styles from './Compare.module.css';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return comparisons.map((comp) => ({
    slug: comp.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  
  if (!comparison) {
    return {
      title: 'Comparison Not Found | Dserve AI'
    };
  }

  return {
    title: `${comparison.title} | Enterprise Comparison`,
    description: comparison.heroSubtitle,
    alternates: { canonical: `https://dserveai.com/compare/${comparison.slug}` },
    openGraph: {
      title: `${comparison.title} | Dserve AI`,
      description: comparison.heroSubtitle,
      url: `https://dserveai.com/compare/${comparison.slug}`,
    }
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!comparison) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main className={styles.pageContainer}>
        <div className={styles.backgroundGlow} />
        <div className={styles.gridPattern} />

        {/* 1. HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span>Enterprise Vendor Evaluation · 2026 Benchmark</span>
            </div>

            <h1 className={styles.heroTitle}>
              {comparison.heroTitle.split(' ').slice(0, -3).join(' ')}{' '}
              <span className={styles.gradientText}>
                {comparison.heroTitle.split(' ').slice(-3).join(' ')}
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              {comparison.heroSubtitle}
            </p>

            {/* Key Metrics Strip */}
            <div className={styles.metricsStrip}>
              <div className={styles.metricItem}>
                <Award size={18} color="#38bdf8" />
                <span>99.8% Ground Truth SLA</span>
              </div>
              <div className={styles.metricItem}>
                <Lock size={18} color="#10b981" />
                <span>SOC 2 & HIPAA Clean Rooms</span>
              </div>
              <div className={styles.metricItem}>
                <Layers size={18} color="#a855f7" />
                <span>Zero Platform Minimums</span>
              </div>
              <div className={styles.metricItem}>
                <Zap size={18} color="#f59e0b" />
                <span>48h Pilot Turnaround</span>
              </div>
            </div>

            {/* Hero CTA Buttons */}
            <div className={styles.heroButtons}>
              <Link href="/contact?type=pilot" className={styles.btnPrimary}>
                <span>Request Free 50-Item Pilot</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className={styles.btnSecondary}>
                <span>Book Technical Scoping Call</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. EXECUTIVE SUMMARY BENTO */}
        <section className={styles.overviewSection}>
          <div className={styles.container}>
            <div className={styles.overviewCard}>
              <div className={styles.cardTag}>Executive Architectural Summary</div>
              <h2 className={styles.overviewTitle}>The Fundamental Divergence</h2>
              <p className={styles.overviewText}>
                {comparison.overview}
              </p>
            </div>
          </div>
        </section>

        {/* 3. HEAD-TO-HEAD COMPARISON MATRIX */}
        <section className={styles.matrixSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Direct Feature & Capability Breakdown
              </h2>
              <p className={styles.sectionDesc}>
                How Dserve AI structurally compares against {comparison.competitorName} across workforce, tooling, compliance, and contractual agility.
              </p>
            </div>

            <div className={styles.matrixTableWrapper}>
              <table className={styles.matrixTable}>
                <thead className={styles.matrixHeader}>
                  <tr>
                    <th style={{ width: '28%' }}>Capability & Framework</th>
                    <th style={{ width: '38%' }}>
                      Dserve AI
                      <span className={styles.dserveColBadge}>Winner</span>
                    </th>
                    <th style={{ width: '34%' }}>{comparison.competitorName}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.comparisonMatrix.map((row, idx) => (
                    <tr key={idx} className={styles.matrixRow}>
                      <td>
                        <div className={styles.categoryTitle}>{row.category}</div>
                        {row.notes && <div className={styles.categoryNote}>{row.notes}</div>}
                      </td>
                      <td className={styles.dserveCell}>
                        <div className={styles.cellWithIcon}>
                          <CheckCircle2 size={18} className={styles.iconWin} />
                          <span>{row.dserveFeature}</span>
                        </div>
                      </td>
                      <td className={styles.competitorCell}>
                        <div className={styles.cellWithIcon}>
                          <XCircle size={18} className={styles.iconLoss} />
                          <span>{row.competitorFeature}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. DETAILED STRENGTHS & WEAKNESSES */}
        <section className={styles.cardsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Side-by-Side Deep Dive</h2>
              <p className={styles.sectionDesc}>
                Understanding the trade-offs: why enterprise teams migrate away from {comparison.competitorName}.
              </p>
            </div>

            <div className={styles.cardsGrid}>
              {/* Competitor Weaknesses */}
              <div className={`${styles.card} ${styles.cardDanger}`}>
                <div className={styles.cardHeader}>
                  <XCircle size={26} color="#ef4444" />
                  <h3 className={styles.cardTitle} style={{ color: "#ef4444" }}>
                    {comparison.competitorName} Limitations
                  </h3>
                </div>
                <ul className={styles.cardList}>
                  {comparison.competitorWeaknesses.map((weakness, idx) => (
                    <li key={idx} className={styles.cardItem}>
                      <span style={{ color: "#ef4444", fontWeight: 700 }}>✕</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dserve AI Advantages */}
              <div className={`${styles.card} ${styles.cardSuccess}`}>
                <div className={styles.cardHeader}>
                  <CheckCircle2 size={26} color="#10b981" />
                  <h3 className={styles.cardTitle} style={{ color: "#10b981" }}>
                    The Dserve AI Advantage
                  </h3>
                </div>
                <ul className={styles.cardList}>
                  {comparison.dserveAdvantages.map((adv, idx) => (
                    <li key={idx} className={styles.cardItem}>
                      <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ENTERPRISE USE CASES */}
        <section className={styles.useCasesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Where Dserve AI Radically Outperforms</h2>
              <p className={styles.sectionDesc}>
                High-stakes AI domains where generic crowdsourcing fails clinical and physical safety benchmarks.
              </p>
            </div>

            <div className={styles.useCasesGrid}>
              {comparison.useCases.map((uc, idx) => (
                <div key={idx} className={styles.useCaseCard}>
                  <div style={{ display: 'inline-flex', padding: '6px 12px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '6px', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, marginBottom: '16px' }}>
                    VERTICAL 0{idx + 1}
                  </div>
                  <h3 className={styles.useCaseTitle}>{uc.title}</h3>
                  <p className={styles.useCaseDesc}>{uc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQS */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
              <p className={styles.sectionDesc}>
                Common vendor evaluation questions regarding migration, SLAs, and security.
              </p>
            </div>

            <div className={styles.faqList}>
              {comparison.faqs.map((faq, idx) => (
                <div key={idx} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. SHOWSTOPPING BOTTOM CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>
                Ready to Upgrade Your Ground-Truth Pipeline?
              </h2>
              <p className={styles.ctaDesc}>
                Experience the precision of certified domain experts on your actual raw data. Get 50 annotated samples returned with a comprehensive multi-tier QA audit in 48 hours.
              </p>

              <div className={styles.heroButtons}>
                <Link href="/contact?type=pilot" className={styles.btnPrimary}>
                  <span>Claim Your Free 50-Item Pilot</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className={styles.btnSecondary}>
                  <span>Schedule Technical Discovery</span>
                </Link>
              </div>

              <div className={styles.trustBadges}>
                <div className={styles.trustItem}>
                  <ShieldCheck size={16} color="#10b981" />
                  <span>99.8% Precision SLA Guarantee</span>
                </div>
                <div className={styles.trustItem}>
                  <Lock size={16} color="#38bdf8" />
                  <span>SOC 2 Type II & HIPAA Clean Rooms</span>
                </div>
                <div className={styles.trustItem}>
                  <Zap size={16} color="#f59e0b" />
                  <span>Mutual NDA Executed in &lt; 2 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
