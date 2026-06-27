import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Factory, Drone, Radio, HardDrive } from "lucide-react";

export default function PhysicalPageContent({ solution, color }: { solution: any, color: string }) {
  return (
    <section style={{ padding: "100px 0", background: "#040810", position: "relative" }}>
      <div className="container">
        
        <ScrollReveal>
          <div style={{ borderLeft: `4px solid ${color}`, paddingLeft: "32px", marginBottom: "80px", maxWidth: "800px" }}>
            <h2 style={{ fontSize: "3rem", color: "white", marginBottom: "24px" }}>
              Data for the <span style={{ color }}>Physical World.</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
              Training AI to operate safely in the physical world requires specialized data. We provide the complex sensory datasets needed for robotics, IoT networks, and edge computing to function with perfect reliability.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
          
          <ScrollReveal delay={0}>
            <div style={{ display: "flex", gap: "32px", background: "rgba(255,255,255,0.03)", padding: "40px", borderRadius: "20px", alignItems: "center" }}>
              <div style={{ padding: "24px", background: `${color}15`, borderRadius: "50%" }}>
                <Factory size={48} color={color} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.8rem", color: "white", marginBottom: "12px" }}>Robotic Manipulation Data</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  We capture and annotate teleoperation trajectories, kinesthetic demonstrations, and spatial bounding boxes to train robotic arms and autonomous warehouse bots in object manipulation.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div style={{ display: "flex", gap: "32px", background: "rgba(255,255,255,0.03)", padding: "40px", borderRadius: "20px", alignItems: "center" }}>
              <div style={{ padding: "24px", background: `${color}15`, borderRadius: "50%" }}>
                <Drone size={48} color={color} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.8rem", color: "white", marginBottom: "12px" }}>UAV & Drone Navigation</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  Annotating massive datasets of aerial imagery, thermal scans, and LiDAR point clouds to ensure autonomous drones navigate complex terrain safely and efficiently.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div style={{ display: "flex", gap: "32px", background: "rgba(255,255,255,0.03)", padding: "40px", borderRadius: "20px", alignItems: "center" }}>
              <div style={{ padding: "24px", background: `${color}15`, borderRadius: "50%" }}>
                <Radio size={48} color={color} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.8rem", color: "white", marginBottom: "12px" }}>IoT Sensor Data Logging</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  We structure and label time-series data from thousands of IoT endpoints, including vibration sensors, temperature gauges, and telemetry streams, to build predictive maintenance models.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div style={{ display: "flex", gap: "32px", background: "rgba(255,255,255,0.03)", padding: "40px", borderRadius: "20px", alignItems: "center" }}>
              <div style={{ padding: "24px", background: `${color}15`, borderRadius: "50%" }}>
                <HardDrive size={48} color={color} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.8rem", color: "white", marginBottom: "12px" }}>Edge Computing Optimization</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  Physical AI requires models to run locally. We curate extremely dense, high-quality datasets that allow you to train highly accurate models that are small enough to deploy directly onto edge hardware.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
