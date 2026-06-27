"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import InteractiveInfographic from "@/components/ui/InteractiveInfographic";
import { Search, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react";
import custom from "./ServiceLayouts.module.css";
import pageStyles from "@/app/services/[slug]/page.module.css";

export default function QAPageContent({ service, steps, color }: any) {
  return (
    <>
      {/* SECTION 1: THE AUDIT TRAIL */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// audit</span>
              <h2 className={pageStyles.overviewTitle}>The Rescue Operation</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                If your model is hallucinating or underperforming, 90% of the time, the dataset is to blame. We audit failing datasets delivered by other vendors, pinpoint the exact taxonomy failures, and execute a rescue operation.
              </p>
            </div>
            
            <div className={custom.grid4}>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <Search size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Ingestion Scan</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>We run automated heuristics to instantly flag corrupt files, duplicate assets, and egregiously out-of-bounds annotations.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <AlertTriangle size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Taxonomy Stress Test</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>We review the original labeling guidelines. If the rules allow for subjective interpretation, we rewrite them to be deterministic.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <CheckCircle size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Surgical Corrections</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>Instead of relabeling everything, our senior QA staff isolate and correct only the classes/frames that failed the audit.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <BarChart3 size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Final Certification</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>The repaired dataset is returned with a cryptographic QA certificate proving it meets the 99% IAA production standard.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: BIAS & DEMOGRAPHICS SCAN */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.grid2} style={{ alignItems: 'center' }}>
              <div>
                <span className={pageStyles.codePrefix} style={{ color }}>// metrics</span>
                <h2 className={pageStyles.overviewTitle}>Measuring Inter-Annotator Agreement (IAA)</h2>
                <p className={pageStyles.overviewBody}>
                  We don't rely on gut feelings. Quality is measured purely through rigorous statistical formulas. If two annotators look at the same asset, they must output the exact same label.
                </p>
                <ul className={custom.featureList} style={{ marginTop: '24px' }}>
                  <li className={custom.featureItem}><span style={{ color, fontWeight: 'bold' }}>Cohen's Kappa:</span> Used for measuring agreement between two independent QA reviewers.</li>
                  <li className={custom.featureItem}><span style={{ color, fontWeight: 'bold' }}>Fleiss' Kappa:</span> Used to measure reliability across the entire labeling workforce.</li>
                  <li className={custom.featureItem}><span style={{ color, fontWeight: 'bold' }}>Intersection over Union (IoU):</span> Strict thresholding for spatial accuracy on bounding boxes.</li>
                </ul>
              </div>
              <div className={custom.infoCard} style={{ background: `linear-gradient(135deg, rgba(10,15,25,0.9), ${color}15)`, border: `1px solid ${color}40` }}>
                <h3 className={custom.cardTitle}>Eliminating Model Bias</h3>
                <p className={custom.cardDesc} style={{ marginBottom: '16px' }}>
                  A perfectly annotated dataset can still be useless if it's biased.
                </p>
                <p className={custom.cardDesc}>
                  Before delivery, we run distribution scans to verify the dataset meets your demographic, geographic, and class-balance targets. If the data skews heavily towards one category, we flag it immediately before you waste compute cycles training on it.
                </p>
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
            <h2 className={pageStyles.overviewTitle}>The Quality Assurance Map</h2>
            <p className={pageStyles.overviewBody} style={{ maxWidth: '700px', margin: '16px auto 0' }}>
              Interact with the nodes below to see how raw datasets pass through our automated and human QA gates.
            </p>
          </div>
          <InteractiveInfographic steps={steps} color={color} slug={service.slug} />
        </div>
      </section>

      {/* SECTION 4: THE AUDIT REPORT */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// deliverables</span>
              <h2 className={pageStyles.overviewTitle}>The Final QA Report</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                We don't just hand back the dataset. We deliver a comprehensive, boardroom-ready QA report that details exactly how the data was evaluated.
              </p>
            </div>
            
            <table className={custom.matrixTable}>
              <thead>
                <tr>
                  <th>Report Section</th>
                  <th>What It Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Per-Class Accuracy Breakdown</td>
                  <td>Shows exactly which object classes/labels had the highest and lowest error rates.</td>
                </tr>
                <tr>
                  <td>Edge Case Log</td>
                  <td>A visual appendix of ambiguous assets and the deterministic logic used to resolve them.</td>
                </tr>
                <tr>
                  <td>Distribution Heatmap</td>
                  <td>Visualizes the balance of classes to prove the dataset is not skewed or biased.</td>
                </tr>
                <tr>
                  <td>Taxonomy Improvement Recommendations</td>
                  <td>Strategic advice on how to tweak your ontology for the next round of collection.</td>
                </tr>
              </tbody>
            </table>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
