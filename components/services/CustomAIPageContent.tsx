"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import InteractiveInfographic from "@/components/ui/InteractiveInfographic";
import { BrainCircuit, Database, Network, Workflow } from "lucide-react";
import custom from "./ServiceLayouts.module.css";
import pageStyles from "@/app/services/[slug]/page.module.css";

export default function CustomAIPageContent({ service, steps, color }: any) {
  return (
    <>
      {/* SECTION 1: THE ENGAGEMENT METHODOLOGY */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// methodology</span>
              <h2 className={pageStyles.overviewTitle}>How We Build Custom AI</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                We don't sell off-the-shelf APIs. Building a custom AI solution that actually drives business value requires a rigorous, phased approach.
              </p>
            </div>
            
            <div className={custom.grid4}>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <div style={{ color, fontFamily: 'monospace', marginBottom: '16px', fontSize: '1.2rem', fontWeight: 'bold' }}>Phase 01</div>
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Discovery & ROI Targeting</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>We embed with your team to map operational workflows, identify data silos, and define the exact ROI metrics the AI must hit to be considered successful.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <div style={{ color, fontFamily: 'monospace', marginBottom: '16px', fontSize: '1.2rem', fontWeight: 'bold' }}>Phase 02</div>
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Data Engineering</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>We unify your structured and unstructured data, cleaning, labeling, and transforming it into a high-quality corpus ready for model training.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <div style={{ color, fontFamily: 'monospace', marginBottom: '16px', fontSize: '1.2rem', fontWeight: 'bold' }}>Phase 03</div>
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Architecture & Training</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>We select the base models (LLMs, CNNs, Transformers), fine-tune them securely in your VPC, and ruthlessly optimize for accuracy and latency.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '24px' }}>
                <div style={{ color, fontFamily: 'monospace', marginBottom: '16px', fontSize: '1.2rem', fontWeight: 'bold' }}>Phase 04</div>
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Integration & MLOps</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>The model is wrapped in custom APIs/microservices, deployed into your tech stack, and monitored via CI/CD pipelines for data drift.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: MULTI-MODEL PIPELINES */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.grid2} style={{ alignItems: 'center' }}>
              <div>
                <span className={pageStyles.codePrefix} style={{ color }}>// architecture</span>
                <h2 className={pageStyles.overviewTitle}>Multi-Model & Hybrid Systems</h2>
                <p className={pageStyles.overviewBody}>
                  Complex business problems are rarely solved by a single model. We design hybrid architectures that chain multiple specialized models together to form a cohesive reasoning engine.
                </p>
                <ul className={custom.featureList} style={{ marginTop: '24px' }}>
                  <li className={custom.featureItem}><Network size={20} color={color} /> RAG (Retrieval-Augmented Generation) on proprietary documents</li>
                  <li className={custom.featureItem}><BrainCircuit size={20} color={color} /> LLM orchestration layers routing to specialized micro-models</li>
                  <li className={custom.featureItem}><Database size={20} color={color} /> Vector database implementation (Pinecone, Milvus, Qdrant)</li>
                  <li className={custom.featureItem}><Workflow size={20} color={color} /> Agentic workflows capable of executing multi-step tasks</li>
                </ul>
              </div>
              <div className={custom.infoCard} style={{ background: `linear-gradient(135deg, rgba(10,15,25,0.9), ${color}15)`, border: `1px solid ${color}40` }}>
                <h3 className={custom.cardTitle}>Proprietary IP Ownership</h3>
                <p className={custom.cardDesc} style={{ marginBottom: '16px' }}>
                  Unlike using public APIs where you rent intelligence, the solutions we build are 100% owned by you.
                </p>
                <p className={custom.cardDesc}>
                  We hand over the trained weights, the inference code, and the data pipelines. You retain the intellectual property, ensuring your competitive advantage is securely locked inside your organization.
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
            <h2 className={pageStyles.overviewTitle}>The Neural Architecture Compiler</h2>
            <p className={pageStyles.overviewBody} style={{ maxWidth: '700px', margin: '16px auto 0' }}>
              Interact with the nodes below to explore how we design, train, and deploy your custom AI solution.
            </p>
          </div>
          <InteractiveInfographic steps={steps} color={color} slug={service.slug} />
        </div>
      </section>

      {/* SECTION 4: ML-OPS LIFECYCLE */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// mlops</span>
              <h2 className={pageStyles.overviewTitle}>CI/CD for Machine Learning</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                AI models decay the moment they hit production. We build robust MLOps infrastructure to ensure your models continuously learn and adapt.
              </p>
            </div>
            
            <table className={custom.matrixTable}>
              <thead>
                <tr>
                  <th>Phase</th>
                  <th>Challenge</th>
                  <th>Dserve MLOps Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data Drift Monitoring</td>
                  <td>Input data distributions shift over time, degrading accuracy.</td>
                  <td>Automated statistical testing compares live inference data against training baselines.</td>
                </tr>
                <tr>
                  <td>Automated Retraining</td>
                  <td>Manually retraining models is slow and expensive.</td>
                  <td>Pipelines automatically trigger retraining when drift thresholds are breached.</td>
                </tr>
                <tr>
                  <td>Shadow Deployment</td>
                  <td>Pushing new models to production risks breaking workflows.</td>
                  <td>New models run in shadow mode (A/B tested) before taking over live traffic.</td>
                </tr>
              </tbody>
            </table>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
