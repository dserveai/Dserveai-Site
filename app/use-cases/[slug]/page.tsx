import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  ShieldCheck, 
  Zap, 
  Award, 
  Layers,
  FileCheck
} from 'lucide-react';

import { useCases } from '@/lib/useCaseData';
import styles from './UseCases.module.css';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return useCases.map((uc) => ({
    slug: uc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const useCase = useCases.find((uc) => uc.slug === slug);
  
  if (!useCase) {
    return {
      title: 'Use Case Not Found | Dserve AI'
    };
  }

  return {
    title: `${useCase.title} | Enterprise AI Data Pipeline`,
    description: useCase.heroSubtitle,
    alternates: { canonical: `https://dserveai.com/use-cases/${useCase.slug}` },
    openGraph: {
      title: `${useCase.title} | Dserve AI`,
      description: useCase.heroSubtitle,
      url: `https://dserveai.com/use-cases/${useCase.slug}`,
    }
  };
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const useCase = useCases.find((uc) => uc.slug === slug);

  if (!useCase) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: useCase.faqs.map(faq => ({
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
              <span>Specialized Enterprise Pipeline · Ground Truth SLA</span>
            </div>

            <h1 className={styles.heroTitle}>
              {useCase.heroTitle.split(' ').slice(0, -3).join(' ')}{' '}
              <span className={styles.gradientText}>
                {useCase.heroTitle.split(' ').slice(-3).join(' ')}
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              {useCase.heroSubtitle}
            </p>

            {/* Key Metrics Grid */}
            <div className={styles.metricsGrid}>
              {useCase.keyMetrics.map((km, idx) => (
                <div key={idx} className={styles.metricCard}>
                  <div className={styles.metricVal}>{km.value}</div>
                  <div className={styles.metricLabel}>{km.label}</div>
                </div>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className={styles.heroButtons}>
              <Link href="/contact?type=pilot" className={styles.btnPrimary}>
                <span>Request Sample Pilot Dataset</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className={styles.btnSecondary}>
                <span>Speak with an ML Specialist</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. CHALLENGE VS SOLUTION BENTO */}
        <section className={styles.bentoSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>The Industry Bottleneck vs The Dserve Architecture</h2>
              <p className={styles.sectionDesc}>
                Why standard crowdsourcing approaches fail to meet the rigorous demands of production {useCase.title} models.
              </p>
            </div>

            <div className={styles.bentoGrid}>
              {/* Problem Card */}
              <div className={`${styles.bentoCard} ${styles.bentoCardProblem}`}>
                <div className={styles.bentoHeader}>
                  <ShieldAlert size={28} color="#ef4444" />
                  <h3 className={styles.bentoCardTitle} style={{ color: "#ef4444" }}>
                    The Production Bottleneck
                  </h3>
                </div>
                <p className={styles.bentoCardText}>
                  {useCase.challenges}
                </p>
              </div>

              {/* Solution Card */}
              <div className={`${styles.bentoCard} ${styles.bentoCardSolution}`}>
                <div className={styles.bentoHeader}>
                  <CheckCircle2 size={28} color="#10b981" />
                  <h3 className={styles.bentoCardTitle} style={{ color: "#10b981" }}>
                    The Dserve Solution
                  </h3>
                </div>
                <p className={styles.bentoCardText}>
                  {useCase.solutions}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 4-STEP PIPELINE ARCHITECTURE */}
        <section className={styles.pipelineSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Deterministic Pipeline Architecture</h2>
              <p className={styles.sectionDesc}>
                Our multi-tier verification process guaranteeing verified precision and zero data leakage.
              </p>
            </div>

            <div className={styles.pipelineGrid}>
              {useCase.pipelineSteps.map((step, idx) => (
                <div key={idx} className={styles.pipelineCard}>
                  <div className={styles.stepNumber}>{step.step}</div>
                  <div className={styles.stepTag}>{step.tag}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. TECHNICAL SPECIFICATIONS */}
        <section className={styles.specsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Technical & Compliance Specifications</h2>
              <p className={styles.sectionDesc}>
                Enterprise-grade technical parameters supporting native ingest, strict compliance, and high-throughput pipelines.
              </p>
            </div>

            <div className={styles.specsCard}>
              <table className={styles.specsTable}>
                <tbody>
                  {useCase.technicalSpecs.map((spec, idx) => (
                    <tr key={idx} className={styles.specRow}>
                      <td className={styles.specLabel}>{spec.label}</td>
                      <td className={styles.specValue}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. CAPABILITIES GRID */}
        <section className={styles.capabilitiesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Core Technical Capabilities</h2>
              <p className={styles.sectionDesc}>
                Deep domain specialization engineered specifically for {useCase.title} workflows.
              </p>
            </div>

            <div className={styles.capabilitiesGrid}>
              {useCase.capabilities.map((cap, idx) => (
                <div key={idx} className={styles.capabilityCard}>
                  <div style={{ display: 'inline-flex', padding: '6px 12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '6px', color: '#34d399', fontSize: '0.8rem', fontWeight: 700, marginBottom: '16px' }}>
                    CAPABILITY 0{idx + 1}
                  </div>
                  <h3 className={styles.capTitle}>{cap.title}</h3>
                  <p className={styles.capDesc}>{cap.description}</p>
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
                Answers to common technical, compliance, and integration questions.
              </p>
            </div>

            <div className={styles.faqList}>
              {useCase.faqs.map((faq, idx) => (
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
                Accelerate Your Model Training with Clinical-Grade Data
              </h2>
              <p className={styles.ctaDesc}>
                Test our specialized workforce on your actual proprietary datasets. Request a free 50-sample pilot dataset delivered within 48 hours with full consensus verification.
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
