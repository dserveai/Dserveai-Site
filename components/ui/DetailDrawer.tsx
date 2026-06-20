"use client";
import { useEffect } from "react";
import Link from "next/link";
import { IconX, IconCheck, IconArrowRight } from "./Icons";
import styles from "./DetailDrawer.module.css";

interface ServiceDetail {
  overview: string;
  what: string[];
  how: string;
  formats: string[];
}

interface IndustryDetail {
  overview: string;
  capabilities: string[];
  stat: string;
}

interface CaseStudyStat {
  v: string;
  l: string;
}

type DrawerData =
  | { type: "service"; title: string; description: string; color: string; details: ServiceDetail; iconName: string }
  | { type: "industry"; name: string; desc: string; color: string; details: IndustryDetail; iconName: string }
  | { type: "caseStudy"; title: string; description: string; fullDescription: string; industry: string; result: string; tags: string[]; color: string; stats: CaseStudyStat[] };

interface DetailDrawerProps {
  data: DrawerData | null;
  onClose: () => void;
}

export default function DetailDrawer({ data, onClose }: DetailDrawerProps) {
  useEffect(() => {
    if (data) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [data]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!data) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} />

      {/* Drawer Panel */}
      <aside className={styles.drawer} role="dialog" aria-modal="true">
        {/* Top accent line */}
        <div className={styles.accentLine} style={{ background: data.type === "caseStudy" ? data.color : (data as any).color }} />

        {/* Header */}
        <div className={styles.header}>
          <div>
            {data.type === "caseStudy" ? (
              <>
                <span className={styles.tag} style={{ background: `${data.color}20`, color: data.color, border: `1px solid ${data.color}40` }}>
                  {data.industry}
                </span>
                <h2 className={styles.title}>{data.title}</h2>
                <p className={styles.result} style={{ color: data.color }}>{data.result}</p>
              </>
            ) : data.type === "service" ? (
              <>
                <span className={styles.tag} style={{ background: `${data.color}20`, color: data.color, border: `1px solid ${data.color}40` }}>
                  Service
                </span>
                <h2 className={styles.title}>{data.title}</h2>
                <p className={styles.subtitle}>{data.description}</p>
              </>
            ) : (
              <>
                <span className={styles.tag} style={{ background: `${data.color}20`, color: data.color, border: `1px solid ${data.color}40` }}>
                  Industry
                </span>
                <h2 className={styles.title}>{data.name}</h2>
                <p className={styles.subtitle}>{data.desc}</p>
              </>
            )}
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close panel">
            <IconX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {data.type === "caseStudy" ? (
            <>
              {/* Stats Row */}
              <div className={styles.statsRow}>
                {data.stats.map(s => (
                  <div key={s.l} className={styles.statBox}>
                    <div className={styles.statVal} style={{ color: data.color }}>{s.v}</div>
                    <div className={styles.statLabel}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className={styles.tags}>
                {data.tags.map(t => (
                  <span key={t} className={styles.tagPill}>{t}</span>
                ))}
              </div>

              {/* Full story */}
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>The Full Story</h3>
                <p className={styles.blockText}>{data.fullDescription}</p>
              </div>
            </>
          ) : data.type === "service" ? (
            <>
              {/* Overview */}
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Overview</h3>
                <p className={styles.blockText}>{data.details.overview}</p>
              </div>

              {/* What we deliver */}
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>What We Deliver</h3>
                <ul className={styles.list}>
                  {data.details.what.map(w => (
                    <li key={w} className={styles.listItem}>
                      <IconCheck size={16} color={data.color} />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How we work */}
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>How We Work</h3>
                <p className={styles.blockText}>{data.details.how}</p>
              </div>

              {/* Formats */}
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Supported Formats</h3>
                <div className={styles.pills}>
                  {data.details.formats.map(f => (
                    <span key={f} className={styles.pill}>{f}</span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Stat highlight */}
              <div className={styles.statHighlight} style={{ borderColor: `${data.color}30`, background: `${data.color}08` }}>
                <span style={{ color: data.color, fontWeight: 700 }}>📈 </span>
                {data.details.stat}
              </div>

              {/* Overview */}
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Overview</h3>
                <p className={styles.blockText}>{data.details.overview}</p>
              </div>

              {/* Capabilities */}
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>What We Provide</h3>
                <ul className={styles.list}>
                  {data.details.capabilities.map(c => (
                    <li key={c} className={styles.listItem}>
                      <IconCheck size={16} color={data.color} />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Footer CTA */}
        <div className={styles.footer}>
          <Link href="/contact" className="btn btn--primary" onClick={onClose}>
            Request Samples for This <IconArrowRight size={16} />
          </Link>
          <Link href="/datasets" className="btn btn--secondary" onClick={onClose}>
            Explore Datasets
          </Link>
        </div>
      </aside>
    </>
  );
}
