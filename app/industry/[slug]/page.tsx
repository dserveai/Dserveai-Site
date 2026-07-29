import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/lib/industryData';
import styles from './Industry.module.css';
import Link from 'next/link';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Premium UI Components
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import ScrollRevealText from '@/components/ui/ScrollRevealText';
import TiltCard from '@/components/ui/TiltCard';
import NeuralGlobe from '@/components/ui/NeuralGlobe';
import InteractiveLidar from '@/components/ui/InteractiveLidar';
import TopographyMatrix from '@/components/ui/TopographyMatrix';
import SemanticPolygon from '@/components/ui/SemanticPolygon';
import InteractiveDataStream from '@/components/ui/InteractiveDataStream';
import PrecisionWaveTracker from '@/components/ui/PrecisionWaveTracker';
import InteractiveCanvas from '@/components/ui/InteractiveCanvas';
import { IconDatabase, IconShieldCheck, IconZap } from '@/components/ui/Icons';

// Import StickySteps
import StickySteps from '@/components/ui/StickySteps';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static routes for all industries
export async function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

// Generate unique metadata for each industry page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  
  if (!industry) {
    return {
      title: 'Industry Not Found | Dserve AI'
    };
  }

  return {
    title: `${industry.title} | AI Data Services | Dserve AI`,
    description: industry.heroSubtitle,
    keywords: industry.keywords,
    openGraph: {
      title: `${industry.title} | Dserve AI`,
      description: industry.heroSubtitle,
    }
  };
}

// Helper function to render the correct visualizer component
function renderVisualizer(type: string | undefined) {
  switch (type) {
    case 'NeuralGlobe': return <NeuralGlobe />;
    case 'InteractiveLidar': return <InteractiveLidar />;
    case 'TopographyMatrix': return <TopographyMatrix />;
    case 'SemanticPolygon': return <SemanticPolygon />;
    case 'InteractiveDataStream': return <InteractiveDataStream />;
    case 'PrecisionWaveTracker': return <PrecisionWaveTracker />;
    case 'InteractiveCanvas': return <InteractiveCanvas />;
    default: return <TopographyMatrix />; // Fallback
  }
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  // Map useCases to StickySteps format
  const mappedUseCases = industry.useCases.map((uc, idx) => ({
    num: `0${idx + 1}`,
    title: uc.title,
    desc: uc.description,
    detail: 'Specialized annotation pipeline designed for enterprise scale and accuracy.',
    tags: industry.keywords.split(',').slice(0, 3).map(k => k.trim())
  }));

  return (
    <>
      <Navbar />
      <main className={styles.pageContainer}>
        {/* 1. Interactive Hero Banner */}
      <section className={styles.heroSection}>
        <div className={styles.heroVisualizerContainer}>
          {renderVisualizer(industry.visualizerType)}
        </div>
        <div className={styles.heroContent}>
          <ScrollReveal>
            <h1 className={styles.heroTitle}>{industry.heroTitle}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className={styles.heroSubtitle}>{industry.heroSubtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Bento Grid: Overview, Challenges, Solutions */}
      <section className={styles.bentoSection}>
        <ScrollRevealText text="The Data Landscape" className={styles.sectionHeader} />
        
        <div className={styles.bentoGrid}>
          {/* Top Wide Card: Overview */}
          <ScrollReveal className={styles.bentoCardWide}>
            <div className={styles.bentoIconBox}>
              <IconDatabase size={32} color="var(--accent-cyan)" />
            </div>
            <h3 className={styles.bentoTitle}>Industry Overview</h3>
            <p className={styles.bentoText}>{industry.overview}</p>
          </ScrollReveal>

          {/* Bottom Left Card: Challenges */}
          <ScrollReveal delay={0.2} className={`${styles.bentoCard} ${styles.bentoCardAlert}`}>
            <div className={styles.bentoIconBox} style={{ borderColor: 'rgba(255, 60, 60, 0.2)' }}>
              <IconShieldCheck size={32} color="#ff4b4b" />
            </div>
            <h3 className={styles.bentoTitle}>AI Challenges</h3>
            <p className={styles.bentoText}>{industry.challenges}</p>
          </ScrollReveal>

          {/* Bottom Right Card: Solutions */}
          <ScrollReveal delay={0.4} className={`${styles.bentoCard} ${styles.bentoCardSuccess}`}>
            <div className={styles.bentoIconBox} style={{ borderColor: 'rgba(60, 255, 120, 0.2)' }}>
              <IconZap size={32} color="#3cff78" />
            </div>
            <h3 className={styles.bentoTitle}>Dserve AI Solutions</h3>
            <p className={styles.bentoText}>{industry.solutions}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Core Use Cases (StickySteps) */}
      <div style={{ marginTop: '100px' }}>
        <StickySteps 
          steps={mappedUseCases} 
          color="var(--accent-cyan)" 
          sectionTitle="Core Applications" 
          slug={slug}
        />
      </div>

      {/* 4. Services We Offer (Tilt Cards) */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <ScrollRevealText text="Data Annotation Solutions" className={styles.sectionHeader} />
        <div className={styles.grid}>
          <ScrollReveal delay={0.1}>
            <TiltCard>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Specialized Expertise</h3>
                <ul className={styles.cardList}>
                  {industry.services.map((service, idx) => (
                    <li key={idx} className={styles.cardListItem}>{service}</li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <TiltCard>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Why Choose Us</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{industry.whyChooseUs}</p>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. FAQs */}
      <section className={styles.section}>
        <ScrollRevealText text="Frequently Asked Questions" className={styles.sectionHeader} />
        <div className={styles.faqContainer}>
          {industry.faqs.map((faq, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>{faq.question}</h4>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className={styles.ctaSection}>
        <ScrollReveal>
          <h2 className={styles.ctaTitle}>Ready to Accelerate Your AI?</h2>
          <p className={styles.heroSubtitle} style={{ marginBottom: '32px' }}>
            Talk to our {industry.title} data experts and start your custom pilot project today.
          </p>
          <Link href="/contact" className={styles.ctaBtn}>Talk to an AI Data Expert</Link>
        </ScrollReveal>
      </section>
    </main>
    <Footer />
    </>
  );
}
