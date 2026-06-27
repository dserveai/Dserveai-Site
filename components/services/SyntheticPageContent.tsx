"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import InteractiveInfographic from "@/components/ui/InteractiveInfographic";
import { Box, Sliders, ShieldCheck, Zap } from "lucide-react";
import custom from "./ServiceLayouts.module.css";
import pageStyles from "@/app/services/[slug]/page.module.css";

export default function SyntheticPageContent({ service, steps, color }: any) {
  return (
    <>
      {/* SECTION 1: PROCEDURAL ENGINE */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.grid2} style={{ alignItems: 'center' }}>
              <div>
                <span className={pageStyles.codePrefix} style={{ color }}>// graphics engine</span>
                <h2 className={pageStyles.overviewTitle}>Unreal & Unity 3D Rendering</h2>
                <p className={pageStyles.overviewBody}>
                  We leverage advanced game engines to build photorealistic digital twins of your target environments. From complex factory floors to dynamic street intersections, we simulate the physics and lighting perfectly.
                </p>
                <ul className={custom.featureList} style={{ marginTop: '24px' }}>
                  <li className={custom.featureItem}><Box size={20} color={color} /> High-fidelity 3D asset creation and scanning</li>
                  <li className={custom.featureItem}><Zap size={20} color={color} /> Ray-traced lighting and accurate material physics</li>
                  <li className={custom.featureItem}><ShieldCheck size={20} color={color} /> Mathematically perfect pixel-level segmentation masks</li>
                </ul>
              </div>
              <div style={{ position: 'relative', height: '320px', borderRadius: '16px', overflow: 'hidden', background: `radial-gradient(circle at center, ${color}20, rgba(10,15,25,1))` }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <div style={{ width: '100px', height: '100px', border: `2px solid ${color}`, transform: 'rotateX(60deg) rotateZ(45deg)', margin: '0 auto 20px', boxShadow: `0 0 30px ${color}50` }}></div>
                  <div style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.8)' }}>ENGINE_RUNNING: TRUE</div>
                  <div style={{ fontFamily: 'monospace', color: color }}>FPS: 144 | BBOX_ERR: 0.00</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: DOMAIN RANDOMIZATION */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader} style={{ textAlign: 'center' }}>
              <span className={pageStyles.codePrefix} style={{ color }}>// variance</span>
              <h2 className={pageStyles.overviewTitle}>Infinite Domain Randomization</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px', margin: '0 auto' }}>
                Models trained on static data fail in the real world. We use procedural logic to infinitely randomize every variable in the scene, ensuring your model learns true generalized features, not specific backgrounds.
              </p>
            </div>
            
            <div className={custom.grid4}>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, textAlign: 'center', padding: '24px' }}>
                <Sliders size={32} color={color} style={{ margin: '0 auto 16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Lighting & Weather</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>Simulate dawn, dusk, harsh sun, rain, fog, and dynamic shadows.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, textAlign: 'center', padding: '24px' }}>
                <Sliders size={32} color={color} style={{ margin: '0 auto 16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Camera Intrinsics</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>Focal length, distortion, ISO noise, and motion blur variations.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, textAlign: 'center', padding: '24px' }}>
                <Sliders size={32} color={color} style={{ margin: '0 auto 16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Material Physics</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>Randomized textures, reflectivity, roughness, and object dirt.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, textAlign: 'center', padding: '24px' }}>
                <Sliders size={32} color={color} style={{ margin: '0 auto 16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.1rem' }}>Crowd & Occlusion</h3>
                <p className={custom.cardDesc} style={{ fontSize: '0.85rem' }}>Procedurally generated crowds, overlapping objects, and edge-cases.</p>
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
            <h2 className={pageStyles.overviewTitle}>The Procedural Geometry Engine</h2>
            <p className={pageStyles.overviewBody} style={{ maxWidth: '700px', margin: '16px auto 0' }}>
              Interact with the nodes below to see how we seed parameters, render 3D meshes, and output validated synthetic datasets.
            </p>
          </div>
          <InteractiveInfographic steps={steps} color={color} slug={service.slug} />
        </div>
      </section>

      {/* SECTION 4: ROI & PRIVACY */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// ROI</span>
              <h2 className={pageStyles.overviewTitle}>The Synthetic Advantage</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                Synthetic data isn't just a fallback. It's a massive competitive advantage. It completely eliminates the privacy risks associated with PII collection while dropping the cost-per-asset dramatically.
              </p>
            </div>
            
            <table className={custom.matrixTable}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Manual Real-World Collection</th>
                  <th>Synthetic Generation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Speed to 1M Assets</td>
                  <td>Months</td>
                  <td>Days (via Cloud GPU rendering)</td>
                </tr>
                <tr>
                  <td>Edge Case Coverage</td>
                  <td>Hope to encounter rare events naturally</td>
                  <td>Force rare events to happen procedurally</td>
                </tr>
                <tr>
                  <td>Privacy / GDPR Risk</td>
                  <td>High (Requires strict blurring & consent)</td>
                  <td>Zero (Fully artificial assets)</td>
                </tr>
                <tr>
                  <td>Ground Truth Accuracy</td>
                  <td>95-99% (Subject to human error)</td>
                  <td>100% (Mathematically extracted from engine)</td>
                </tr>
              </tbody>
            </table>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
