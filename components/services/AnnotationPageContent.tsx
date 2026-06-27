"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import InteractiveInfographic from "@/components/ui/InteractiveInfographic";
import { CheckCircle2, Shield, Lock, Server } from "lucide-react";
import custom from "./ServiceLayouts.module.css";
import pageStyles from "@/app/services/[slug]/page.module.css";

export default function AnnotationPageContent({ service, steps, color }: any) {
  return (
    <>
      {/* SECTION 1: THE TOOLING ECOSYSTEM */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// integration</span>
              <h2 className={pageStyles.overviewTitle}>Agnostic Tooling Ecosystem</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                We don't force you into proprietary black-box software. Dserve AI integrates directly into your existing ML infrastructure, whether you use industry-standard platforms or custom internal labeling tools.
              </p>
            </div>
            
            <div className={custom.grid3}>
              <div className={custom.infoCard} style={{ borderColor: `${color}40` }}>
                <h3 className={custom.cardTitle}>CVAT & Labelbox</h3>
                <p className={custom.cardDesc}>Native API integrations allowing our workforce to annotate directly within your active projects, ensuring real-time sync with your cloud storage.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40` }}>
                <h3 className={custom.cardTitle}>Custom Internal Tools</h3>
                <p className={custom.cardDesc}>Have a proprietary labeling UI? We deploy our trained workforce via secure VPNs to operate exclusively within your firewall-protected environments.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40` }}>
                <h3 className={custom.cardTitle}>Dserve Annotation Engine</h3>
                <p className={custom.cardDesc}>For teams without existing tools, we provide our proprietary annotation workspace, equipped with auto-segmentation and edge-snapping ML assists.</p>
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
            <h2 className={pageStyles.overviewTitle}>The Labeling Matrix Engine</h2>
            <p className={pageStyles.overviewBody} style={{ maxWidth: '700px', margin: '16px auto 0' }}>
              Interact with the nodes below to see how raw unstructured data transforms into a perfectly verified, 99%+ IAA dataset.
            </p>
          </div>
          <InteractiveInfographic steps={steps} color={color} slug={service.slug} />
        </div>
      </section>

      {/* SECTION 3: SECURITY & COMPLIANCE */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.grid2}>
              <div>
                <span className={pageStyles.codePrefix} style={{ color }}>// security</span>
                <h2 className={pageStyles.overviewTitle}>Enterprise-Grade Data Security</h2>
                <p className={pageStyles.overviewBody}>
                  Your raw data is your competitive advantage. We enforce strict physical and digital security protocols to ensure zero data leakage, IP theft, or compliance violations.
                </p>
                <ul className={custom.featureList} style={{ marginTop: '24px' }}>
                  <li className={custom.featureItem}><Shield size={20} color={color} /> SOC2 Type II & GDPR Compliant Infrastructure</li>
                  <li className={custom.featureItem}><Lock size={20} color={color} /> Automated PII/PHI Blurring Before Human Review</li>
                  <li className={custom.featureItem}><Server size={20} color={color} /> Isolated VPCs with No Internet Access for Annotators</li>
                  <li className={custom.featureItem}><CheckCircle2 size={20} color={color} /> Clean-Room Facilities with Biometric Access Control</li>
                </ul>
              </div>
              <div className={custom.infoCard} style={{ background: `linear-gradient(135deg, rgba(10,15,25,0.9), ${color}15)` }}>
                <h3 className={custom.cardTitle}>Zero-Retention Policy</h3>
                <p className={custom.cardDesc} style={{ marginBottom: '16px' }}>
                  Upon project completion and secure delivery of the annotated dataset, all raw and processed data is cryptographically wiped from our servers within 72 hours.
                </p>
                <p className={custom.cardDesc}>
                  We provide cryptographic certificates of destruction to satisfy your internal compliance audits.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* SECTION 4: EDGE CASE TAXONOMY */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// ontology</span>
              <h2 className={pageStyles.overviewTitle}>Handling Ambiguity & Edge Cases</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                Models fail on edge cases. Our project managers build living taxonomy documents that evolve as annotators encounter ambiguous data, ensuring perfect consistency across the entire workforce.
              </p>
            </div>
            
            <table className={custom.matrixTable}>
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Amateur Approach</th>
                  <th>Dserve AI Protocol</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Heavy Occlusion</td>
                  <td>Guess the bounding box size</td>
                  <td>Strict 15% visibility rule; tag as 'occluded_heavy' and use interpolation.</td>
                </tr>
                <tr>
                  <td>Undefined Class</td>
                  <td>Force-fit into nearest category</td>
                  <td>Halt labeling; escalate to PM for immediate taxonomy update and team re-training.</td>
                </tr>
                <tr>
                  <td>Blurry / Low Light</td>
                  <td>Skip or guess label</td>
                  <td>Route to specialized image-enhancement pipeline before secondary review.</td>
                </tr>
              </tbody>
            </table>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
