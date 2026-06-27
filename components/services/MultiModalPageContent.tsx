"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import InteractiveInfographic from "@/components/ui/InteractiveInfographic";
import { Globe2, FileAudio, Video, FileText, ScanLine } from "lucide-react";
import custom from "./ServiceLayouts.module.css";
import pageStyles from "@/app/services/[slug]/page.module.css";

export default function MultiModalPageContent({ service, steps, color }: any) {
  return (
    <>
      {/* SECTION 1: THE MODALITIES MATRIX */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// multi-modal</span>
              <h2 className={pageStyles.overviewTitle}>Comprehensive Modality Coverage</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                Modern foundation models require vast, diverse, and perfectly aligned multi-modal inputs. We capture synchronized data streams across all major sensor types.
              </p>
            </div>
            
            <div className={custom.grid4}>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <FileAudio size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Audio & Speech</h3>
                <p className={custom.cardDesc}>Wake words, conversational corpora, and acoustic environments recorded across 100+ native dialects and languages.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <Video size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Video & Image</h3>
                <p className={custom.cardDesc}>In-cabin driver monitoring, retail shelf scanning, and diverse facial datasets captured in varying lighting conditions.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <ScanLine size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>LiDAR & 3D</h3>
                <p className={custom.cardDesc}>Point cloud capture, sensor fusion (Camera + LiDAR), and spatial mapping for autonomous vehicles and robotics.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <FileText size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Text & NLP</h3>
                <p className={custom.cardDesc}>Domain-specific document curation, handwriting collection, and multilingual parallel corpora for LLM pre-training.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: PIPELINE WORKFLOW (Interactive) */}
      <section className={pageStyles.howSection} id="how-it-works">
        <div className="container">
          <div className={pageStyles.stickyHeader} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className={pageStyles.codePrefix} style={{ color }}>// workflow</span>
            <h2 className={pageStyles.overviewTitle}>The Omni-Sensor Fusion Rig</h2>
            <p className={pageStyles.overviewBody} style={{ maxWidth: '700px', margin: '16px auto 0' }}>
              Interact with the nodes below to explore our end-to-end data collection and fusion pipeline.
            </p>
          </div>
          <InteractiveInfographic steps={steps} color={color} slug={service.slug} />
        </div>
      </section>

      {/* SECTION 3: ETHICAL SOURCING PROTOCOL */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.grid2} style={{ alignItems: 'center' }}>
              <div>
                <span className={pageStyles.codePrefix} style={{ color }}>// ethics</span>
                <h2 className={pageStyles.overviewTitle}>Ethical Sourcing & Fair Pay</h2>
                <p className={pageStyles.overviewBody}>
                  Dataset provenance and consent are non-negotiable. Our collection campaigns operate under a strict ethical protocol ensuring every contributor is informed, compensated fairly, and legally protected.
                </p>
                <ul className={custom.featureList} style={{ marginTop: '24px' }}>
                  <li className={custom.featureItem}><span style={{ color }}>→</span> Explicit, auditable opt-in consent for all PII data.</li>
                  <li className={custom.featureItem}><span style={{ color }}>→</span> Above-market compensation for specialized field contributors.</li>
                  <li className={custom.featureItem}><span style={{ color }}>→</span> Full legal provenance tracking and copyright clearance.</li>
                  <li className={custom.featureItem}><span style={{ color }}>→</span> Transparent demographic reporting to prevent model bias.</li>
                </ul>
              </div>
              <div style={{ position: 'relative', height: '300px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,15,25,0.6)' }}>
                {/* Simulated visual or stat block */}
                <div style={{ textAlign: 'center' }}>
                  <Globe2 size={64} color={color} style={{ marginBottom: '16px', opacity: 0.8 }} />
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>100% Opt-In</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Fully auditable contributor consent</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: GLOBAL FIELD OPERATIONS */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// coverage</span>
              <h2 className={pageStyles.overviewTitle}>Global Field Operations</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                We deploy trained collection teams and crowdsourced channels across the globe, ensuring your dataset reflects the true geographic and environmental diversity of your end-users.
              </p>
            </div>
            
            <table className={custom.matrixTable}>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Primary Modalities Collected</th>
                  <th>Key Specialties</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>North America</td>
                  <td>Video, LiDAR, Speech</td>
                  <td>Autonomous driving (urban/highway), retail shelf, smart home.</td>
                </tr>
                <tr>
                  <td>Europe (EU)</td>
                  <td>Speech, Text, Image</td>
                  <td>GDPR-compliant facial datasets, multilingual NLP corpora.</td>
                </tr>
                <tr>
                  <td>APAC</td>
                  <td>Video, Speech, Text</td>
                  <td>High-density pedestrian tracking, tonal dialect voice collection.</td>
                </tr>
                <tr>
                  <td>LATAM / MENA</td>
                  <td>Image, Speech</td>
                  <td>Diverse demographic capture, low-resource language corpora.</td>
                </tr>
              </tbody>
            </table>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
