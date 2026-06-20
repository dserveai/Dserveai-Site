import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Zap, Database, Globe } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us | Dserve AI",
  description: "Learn about Dserve AI, our mission to empower enterprise AI with world-class training data, and the engineering team behind our robust data pipelines.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Immersive Mission Hero */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={`container ${styles.heroContent}`}>
            <h1 className={styles.heroTitle}>
              Empowering AI with<br />
              <span className="gradient-text">World-Class Data</span>
            </h1>
            <p className={styles.heroDesc}>
              We engineer custom data pipelines that fuel the world's most advanced AI models. Our focus is precision, scalability, and ethical data sourcing for enterprise teams.
            </p>
          </div>
        </section>

        {/* Bento Stats Grid */}
        <section className={styles.statsSection}>
          <div className="container">
            <div className={styles.statsGrid}>
              {[
                { v: "15+", l: "Years combined ML experience" },
                { v: "50+", l: "Languages Supported globally" },
                { v: ">99%", l: "QA Accuracy Standard achieved" },
              ].map((stat, i) => (
                <div key={i} className={styles.statCard}>
                  <div className={styles.statValue}>{stat.v}</div>
                  <div className={styles.statLabel}>{stat.l}</div>
                </div>
              ))}
            </div>

            {/* Our Story Layout */}
            <div className={styles.storyGrid}>
              <div className={styles.storyContent}>
                <h2>The Data Bottleneck</h2>
                <p>
                  Dserve AI was founded by a team of machine learning engineers and data operations specialists who realized that the biggest bottleneck in AI development wasn't compute or algorithms—it was data.
                </p>
                <p>
                  We've transitioned from offering off-the-shelf samples to building complex, custom data pipelines tailored to the unique architectures of our enterprise clients. We combine domain-specific workforces (like medical annotators) with rigorous automated QA to deliver datasets that actually push models forward.
                </p>
              </div>
              <div className={styles.storyVisual}>
                <div className={styles.storyOrb} />
                <Database size={64} color="rgba(255,255,255,0.8)" style={{ position: 'relative', zIndex: 1 }} />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Bento */}
        <section className={`section ${styles.valuesSection}`}>
          <div className="container">
            <div className={styles.valuesHeader}>
              <h2>Core <span className="gradient-text">Values</span></h2>
            </div>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}><ShieldCheck size={32} /></div>
                <h3>Ethical Sourcing</h3>
                <p>We ensure that all data is ethically collected, properly licensed, and heavily vetted to protect privacy and eliminate harmful biases from our pipelines.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}><Zap size={32} /></div>
                <h3>Uncompromising Quality</h3>
                <p>A model is only as good as its data. We implement multi-tier QA protocols and automated validation to guarantee &gt;99% accuracy on every dataset.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}><Globe size={32} /></div>
                <h3>Global Diversity</h3>
                <p>To prevent localized AI failure, our global crowd network spans over 50 languages and regions, ensuring your models work perfectly worldwide.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}><Database size={32} /></div>
                <h3>Architectural Alignment</h3>
                <p>We don't just supply raw data; we act as an extension of your engineering team, tailoring pipelines specifically to your ML architecture.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" style={{ paddingBottom: 120 }}>
          <div className="container">
            <div style={{ textAlign: "center", padding: "80px 40px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "32px", backdropFilter: "blur(20px)" }}>
              <h2 style={{ color: "white", fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "20px" }}>
                Join the Future of <span className="gradient-text">AI Data</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: "40px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto", fontSize: "1.1rem", lineHeight: 1.7 }}>
                Ready to optimize your ML workflow? Let's discuss building your custom pipeline.
              </p>
              <Link href="/contact" className="btn btn--primary btn--lg">Start Your Pilot Project →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
