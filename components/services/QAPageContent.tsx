"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import InteractiveInfographic from "@/components/ui/InteractiveInfographic";
import { Search, AlertTriangle, CheckCircle, BarChart3, Users, BookOpen, Layers } from "lucide-react";
import custom from "./ServiceLayouts.module.css";
import pageStyles from "@/app/services/[slug]/page.module.css";

export default function QAPageContent({ service, steps, color }: any) {
  return (
    <>
      {/* SECTION 1: MANAGING CHAOS */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.grid2} style={{ alignItems: 'center' }}>
              <div>
                <span className={pageStyles.codePrefix} style={{ color }}>// the vendor problem</span>
                <h2 className={pageStyles.overviewTitle}>Managing the Chaos of Multi-Vendor Sourcing</h2>
                <p className={pageStyles.overviewBody}>
                  Sourcing data from multiple freelancers, crowdsourcing platforms, and external agencies inevitably leads to inconsistent quality and mismatched formats. We step in as your centralized QA partner, managing this chaos so you don't have to.
                </p>
                <ul className={custom.featureList} style={{ marginTop: '24px' }}>
                  <li className={custom.featureItem}><Users size={20} color={color} /> Single Point of Contact for All Vendors</li>
                  <li className={custom.featureItem}><AlertTriangle size={20} color={color} /> Strict Rejection of Sub-Par Batches</li>
                  <li className={custom.featureItem}><CheckCircle size={20} color={color} /> Unified Quality Standards Enforced</li>
                </ul>
              </div>
              <div className={custom.infoCard} style={{ background: `linear-gradient(135deg, rgba(10,15,25,0.9), ${color}15)`, border: `1px solid ${color}40` }}>
                <h3 className={custom.cardTitle}>Your Data Command Center</h3>
                <p className={custom.cardDesc} style={{ marginBottom: '16px' }}>
                  Stop chasing down independent contractors for revisions. We consolidate the workflow, act as the arbiter of quality, and ensure that every piece of data entering your system is fully compliant with your requirements.
                </p>
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>Unlimited</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Vendors Managed</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>0</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Format Errors Delivered</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: MASTERING GUIDELINES */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader} style={{ textAlign: 'center' }}>
              <span className={pageStyles.codePrefix} style={{ color }}>// precision</span>
              <h2 className={pageStyles.overviewTitle}>Mastering Your ML Guidelines</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px', margin: '0 auto' }}>
                We don't apply generic QA checks. We embed with your core ML team to internalize your exact edge cases, taxonomy, and model requirements before reviewing a single asset.
              </p>
            </div>
            
            <div className={custom.grid3}>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '32px' }}>
                <BookOpen size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Taxonomy Alignment</h3>
                <p className={custom.cardDesc}>We work directly with your data scientists to understand exactly how your model processes information and what constitutes a valid label.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '32px' }}>
                <AlertTriangle size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Edge Case Rulebooks</h3>
                <p className={custom.cardDesc}>We document how to handle ambiguous data, building a comprehensive rulebook that we then distribute and enforce across all your vendors.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '32px' }}>
                <Search size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Feedback Loops</h3>
                <p className={custom.cardDesc}>If we catch recurring errors, we don't just fix them. We update the rulebook and retrain the external vendors to prevent future mistakes.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: PIPELINE WORKFLOW (Interactive) */}
      <section className={pageStyles.howSection} id="how-it-works">
        <div className="container">
          <div className={pageStyles.stickyHeader} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className={pageStyles.codePrefix} style={{ color }}>// workflow</span>
            <h2 className={pageStyles.overviewTitle}>The Centralized QA Gateway</h2>
            <p className={pageStyles.overviewBody} style={{ maxWidth: '700px', margin: '16px auto 0' }}>
              Interact with the nodes below to see how we filter, consolidate, and normalize data from multiple sources.
            </p>
          </div>
          <InteractiveInfographic steps={steps} color={color} slug={service.slug} />
        </div>
      </section>

      {/* SECTION 4: UNIFORM DELIVERY */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// deliverables</span>
              <h2 className={pageStyles.overviewTitle}>Uniform Data Delivery</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                Different vendors provide different formats. We ingest the chaos and output a single, unified dataset ready for immediate training.
              </p>
            </div>
            
            <table className={custom.matrixTable}>
              <thead>
                <tr>
                  <th>Deliverable</th>
                  <th>Value to Your Pipeline</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Unified JSON/CSV Schema</td>
                  <td>Every asset from every vendor is normalized into your required schema (e.g., COCO JSON), saving your engineers hours of data wrangling.</td>
                </tr>
                <tr>
                  <td>Vendor Performance Report</td>
                  <td>Detailed metrics showing which of your external sources are providing the highest and lowest quality data, helping you optimize your spend.</td>
                </tr>
                <tr>
                  <td>Edge Case Arbitration Log</td>
                  <td>A visual appendix of ambiguous assets we encountered, showing exactly how we resolved them based on your guidelines.</td>
                </tr>
                <tr>
                  <td>Cleaned & Consolidated Batches</td>
                  <td>We bundle the approved data into large, optimized batches and push them directly to your secure cloud bucket (S3/GCP).</td>
                </tr>
              </tbody>
            </table>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
