"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LogoOrb from "@/components/ui/LogoOrb";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import styles from "./page.module.css";

function RotatingText() {
  const words = ["Foundation", "Future", "Core", "Engine", "Brain"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);
  return <span className={styles.rotatingWord} key={idx}>{words[idx]}</span>;
}

const stats = [
  { value: "50+", label: "Active Clients" },
  { value: "30+", label: "Countries Sourced" },
  { value: "1M+", label: "Units Delivered" },
  { value: "100+", label: "Global Partners" },
];

const pillars = [
  {
    number: "01",
    title: "Collection & Annotation",
    desc: "We engineer data from the ground up. Whether it requires physical field collection, procedural synthetic data creation, or high-fidelity human annotation by domain experts, we manage the entire lifecycle to feed your models perfectly aligned datasets.",
  },
  {
    number: "02",
    title: "Engineered Pipelines",
    desc: "We build custom data pipelines wired directly into your ML workflow. From collection and cleaning to labeling, validation, and delivery, every step is automated, auditable, and scalable from pilot to production.",
  },
  {
    number: "03",
    title: "Multi-Tier QA Protocol",
    desc: "Every dataset passes through three independent validation layers: automated consistency checks, peer review by senior annotators, and a final gold-standard calibration test before it ever reaches your training environment.",
  },
];

const outcomes = [
  {
    title: "AI-Specific Structuring",
    desc: "We build datasets explicitly engineered for the architectural realities of modern AI. From pre-training corpora to RLHF and instruction-tuning, we structure every token and pixel to accelerate model convergence.",
  },
  {
    title: "Domain Calibration",
    desc: "Models trained on our domain-specific datasets outperform generalist benchmarks by learning the exact vocabulary, edge cases, and decision logic of your target solution.",
  },
  {
    title: "Regulatory Compliance",
    desc: "Every dataset we produce ships with a full data provenance report, consent records, and bias audit. Your legal and compliance teams get full visibility.",
  },
];

export default function AboutPage() {
  const [activeOutcome, setActiveOutcome] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  // Auto-cycle outcomes to show interactivity
  useEffect(() => {
    if (userInteracted) return;
    const timer = setInterval(() => {
      setActiveOutcome((prev) => (prev + 1) % outcomes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [userInteracted]);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Fade-in on scroll for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <main>

        {/* ── HERO ────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroNoise} />
          <div className="container">
            <div className={styles.heroInner}>
              <div className={styles.heroText}>
                <div className={styles.eyebrow}>About Us</div>
                <h1 className={styles.heroTitle}>
                  We Build the<br />
                  <span className={styles.rotatingContainerInline}>
                    <RotatingText />
                  </span><br />
                  of Intelligent AI
                </h1>
                <p className={styles.heroSub}>
                  Accelerating the development of foundation models and enterprise AI. We engineer high-fidelity datasets that empower the world's leading technology innovators.
                </p>
                <Link href="/contact" className={styles.heroCta}>
                  Start a conversation <ArrowRight size={18} />
                </Link>
              </div>

              {/* 3D Rotating Logo Orb */}
              <div className={styles.heroOrb}>
                <LogoOrb />
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ───────────────────────────────────── */}
        <section
          className={`${styles.statsSection} ${styles.fadeSection}`}
          ref={setRef(0)}
        >
          <div className="container">
            <div className={styles.statsGrid}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <div className={styles.statContent}>
                    <div className={styles.statValue}>{s.value}</div>
                    <div className={styles.statLabel}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION (SCROLL REVEAL) ──────────────────── */}
        <section className={styles.missionSection}>
          <div className={styles.missionSticky}>
            <div className="container">
              <div className={styles.missionLabel}>Our Mission</div>
              <ScrollRevealText
                className={styles.missionText}
                text="Our mission is to accelerate the development of foundation models and enterprise AI. We engineer high-fidelity, multi-modal datasets that empower the world's leading innovators to build smarter, safer, and more robust systems."
              />
            </div>
          </div>
        </section>

        {/* ── STORY ───────────────────────────────────── */}
        <section
          className={`${styles.storySection} ${styles.fadeSection}`}
          ref={setRef(1)}
        >
          <div className="container">
            <div className={styles.storyGrid}>
              <div className={styles.storyLeft}>
                <div className={styles.eyebrow}>The Origin</div>
                <h2 className={styles.sectionTitle}>
                  Built from<br />Experience
                </h2>
              </div>
              <div className={styles.storyRight}>
                <p className={styles.bodyText}>
                  Dserve AI was founded by a team of AI practitioners with first-hand experience navigating the end-to-end machine learning lifecycle. We spent years dealing with the hidden bottlenecks and complex data challenges that cause even the most sophisticated models to fail in production.
                </p>
                <p className={styles.bodyText}>
                  Recognizing that the root cause almost always traced back to unstructured, inconsistent, or poorly aligned training data, we decided to solve the problem at its source. We built the comprehensive data infrastructure & solution company we always wished we had.
                </p>
                <div className={styles.storyQuote}>
                  <span className={styles.quoteMark}>"</span>
                  You cannot out-compute poor data. True intelligence is engineered at the source.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THREE PILLARS ────────────────────────────── */}
        <section
          className={`${styles.pillarsSection} ${styles.fadeSection}`}
          ref={setRef(2)}
        >
          <div className="container">
            <div className={styles.pillarsHeader}>
              <div className={styles.eyebrow}>Our Approach</div>
              <h2 className={styles.sectionTitle}>
                Quality as<br />Infrastructure
              </h2>
              <p className={styles.pillarsDesc}>
                We don't patch quality onto our process. We engineered it from the ground up across every tool, every workflow, and every hire.
              </p>
            </div>
            <div className={styles.pillarsGrid}>
              {pillars.map((p) => (
                <div key={p.number} className={styles.pillarCard}>
                  <div className={styles.pillarNumber}>{p.number}</div>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  <p className={styles.pillarDesc}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUTCOMES ─────────────────────────────────── */}
        <section
          className={`${styles.outcomesSection} ${styles.fadeSection}`}
          ref={setRef(3)}
        >
          <div className="container">
            <div className={styles.outcomesGrid}>
              <div className={styles.outcomesLeft}>
                <div className={styles.eyebrow}>The Outcome</div>
                <h2 className={styles.sectionTitle}>
                  What quality<br />really means
                </h2>
                <p className={styles.bodyText}>
                  When you build on a Dserve AI dataset, you are not just getting cleaner data. You are getting a measurably better model.
                </p>

                {/* Outcome tabs */}
                <div className={styles.outcomeTabs}>
                  <div className={styles.tabsInstruction}>Select to explore</div>
                  {outcomes.map((o, i) => (
                    <button
                      key={i}
                      className={`${styles.outcomeTab} ${activeOutcome === i ? styles.outcomeTabActive : ""}`}
                      onClick={() => {
                        setActiveOutcome(i);
                        setUserInteracted(true);
                      }}
                    >
                      <span className={styles.outcomeTabNum}>0{i + 1}</span>
                      <span className={styles.outcomeTabTitle}>{o.title}</span>
                      <ArrowRight className={styles.outcomeTabArrow} size={18} />
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.outcomesRight}>
                <div className={styles.outcomeCard}>
                  <div className={styles.outcomeCardNum}>0{activeOutcome + 1}</div>
                  <h3 className={styles.outcomeCardTitle}>{outcomes[activeOutcome].title}</h3>
                  <p className={styles.outcomeCardDesc}>{outcomes[activeOutcome].desc}</p>
                  <div className={styles.outcomeCardLine} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GLOBAL REACH (replacing People section) ─── */}
        <section
          className={`${styles.globalSection} ${styles.fadeSection}`}
          ref={setRef(4)}
        >
          <div className="container">
            <div className={styles.globalInner}>
              <div className={styles.eyebrow}>Global Scale</div>
              <h2 className={styles.sectionTitle}>
                Deployed across<br />every frontier
              </h2>
              <p className={styles.globalDesc}>
                From San Francisco to Singapore, our comprehensive data solutions and engineering operations span 50+ languages and 30+ countries. We deploy highly specialized teams to curate, synthesize, and structure the world's most complex datasets, driving innovation across every major AI domain.
              </p>
              <div className={styles.globalTags}>
                {["Data Annotation", "Computer Vision", "NLP & LLMs", "Healthcare AI", "Autonomous Systems", "Legal AI", "E-Commerce", "Generative AI", "Speech Recognition", "RLHF & Alignment"].map(tag => (
                  <span key={tag} className={styles.globalTag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────── */}
        <section
          className={`${styles.ctaSection} ${styles.fadeSection}`}
          ref={setRef(5)}
        >
          <div className="container">
            <div className={styles.ctaInner}>
              <div className={styles.ctaGlow} />
              <h2 className={styles.ctaTitle}>
                Let's bring your<br />idea to reality
              </h2>
              <p className={styles.ctaDesc}>
                Tell us about your model and we'll design a custom data pipeline from scratch.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/contact" className={styles.ctaBtn}>
                  <span>Get in touch</span>
                  <div className={styles.ctaBtnArrow}><ArrowRight size={18} /></div>
                </Link>
                <Link href="/services" className={styles.ctaBtnGhost}>
                  Explore services
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
