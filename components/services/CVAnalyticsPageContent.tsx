"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import InteractiveInfographic from "@/components/ui/InteractiveInfographic";
import { Cpu, Eye, CloudLightning, Activity } from "lucide-react";
import custom from "./ServiceLayouts.module.css";
import pageStyles from "@/app/services/[slug]/page.module.css";

export default function CVAnalyticsPageContent({ service, steps, color }: any) {
  return (
    <>
      {/* SECTION 1: AUTOMATING OPERATIONS */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.grid2} style={{ alignItems: 'center' }}>
              <div>
                <span className={pageStyles.codePrefix} style={{ color }}>// efficiency multiplied</span>
                <h2 className={pageStyles.overviewTitle}>Automating Operations with AI</h2>
                <p className={pageStyles.overviewBody}>
                  Human monitoring is expensive, error-prone, and doesn't scale. We deploy custom computer vision systems that watch your factory floor, retail space, or logistics hub 24/7. By automating visual inspections and safety checks, we drastically reduce manual labor costs and eliminate human error.
                </p>
                <ul className={custom.featureList} style={{ marginTop: '24px' }}>
                  <li className={custom.featureItem}><Activity size={20} color={color} /> 24/7 Automated Defect Detection</li>
                  <li className={custom.featureItem}><Eye size={20} color={color} /> Real-time Safety & Compliance Monitoring</li>
                  <li className={custom.featureItem}><Cpu size={20} color={color} /> Superhuman Consistency & Scalability</li>
                </ul>
              </div>
              <div className={custom.infoCard} style={{ background: `linear-gradient(135deg, rgba(10,15,25,0.9), ${color}15)`, border: `1px solid ${color}40` }}>
                <h3 className={custom.cardTitle}>Immediate Labor Savings</h3>
                <p className={custom.cardDesc} style={{ marginBottom: '16px' }}>
                  Replace manual QA inspectors and security monitoring with tireless AI. Our systems catch defects that human eyes miss, operating at speeds that allow your production lines to run faster, resulting in immediate cost savings.
                </p>
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>$1.2M</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Avg. Annual Savings</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>-45%</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Defect Reduction</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: ACTIONABLE INSIGHTS */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader} style={{ textAlign: 'center' }}>
              <span className={pageStyles.codePrefix} style={{ color }}>// data to dollars</span>
              <h2 className={pageStyles.overviewTitle}>From Pixels to Actionable Insights</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px', margin: '0 auto' }}>
                We don't just provide bounding boxes; we provide business telemetry. Raw video feeds are instantly converted into structured data that drives immediate operational decisions.
              </p>
            </div>
            
            <div className={custom.grid3}>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '32px' }}>
                <CloudLightning size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Predictive Maintenance</h3>
                <p className={custom.cardDesc}>Identify wear and tear on machinery before it breaks. Prevent costly downtime by letting computer vision flag anomalies in real-time.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '32px' }}>
                <Activity size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Workflow Optimization</h3>
                <p className={custom.cardDesc}>Track employee movements and assembly line bottlenecks. Restructure your floor plan based on empirical data to boost throughput.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '32px' }}>
                <Eye size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Inventory Automation</h3>
                <p className={custom.cardDesc}>Automate stock counts and shelf-audits. Eliminate stockouts and manual counting errors with continuous visual scanning.</p>
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
            <h2 className={pageStyles.overviewTitle}>The AI ROI Engine</h2>
            <p className={pageStyles.overviewBody} style={{ maxWidth: '700px', margin: '16px auto 0' }}>
              Interact with the nodes below to see how our pipelines convert raw camera streams into direct business value.
            </p>
          </div>
          <InteractiveInfographic steps={steps} color={color} slug={service.slug} />
        </div>
      </section>

      {/* SECTION 4: ROI & DASHBOARDS */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// bottom line</span>
              <h2 className={pageStyles.overviewTitle}>Tracking Efficiency & Higher ROI</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                If you can't measure it, you can't improve it. We build custom dashboards that pipe AI-driven metrics directly to your stakeholders, proving the exact ROI of your automation initiatives.
              </p>
            </div>
            
            <div className={custom.grid2}>
              <div className={custom.infoCard} style={{ borderColor: `${color}40` }}>
                <h3 className={custom.cardTitle}>Live KPI Dashboards</h3>
                <p className={custom.cardDesc}>Watch your efficiency metrics improve in real-time. We build secure web dashboards that display defect rates, cycle times, and labor savings, driven by live computer vision telemetry.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40` }}>
                <h3 className={custom.cardTitle}>Direct BI Integration</h3>
                <p className={custom.cardDesc}>We seamlessly integrate our AI endpoints with your existing Tableau, PowerBI, or ERP systems. Your executives get a unified view of how automation is driving higher ROI across the enterprise.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
