import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./DefenseSlideshow.module.css";

export default function DefenseSlideshow({ active }: { active: boolean }) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      setSlideIndex(0);
      return;
    }
    
    // Switch slides every 3.5 seconds
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 3);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className={`${styles.slideshowContainer} ${active ? styles.active : ''}`}>
      {/* Slide 1: Missile */}
      <div className={`${styles.slide} ${slideIndex === 0 ? styles.slideVisible : ''}`}>
        <Image src="/videos/def1.png" alt="Defense Missile tracking" fill className={styles.slideImage} />
        <div className={styles.overlay}>
          <div className={styles.hudBox} style={{ top: '20%', left: '30%', width: '150px', height: '100px' }} />
          <div className={styles.hudText} style={{ top: '15%', left: '30%' }}>TARGET ACQUIRED // M-7X</div>
        </div>
      </div>
      
      {/* Slide 2: Dashboard */}
      <div className={`${styles.slide} ${slideIndex === 1 ? styles.slideVisible : ''}`}>
        <Image src="/videos/def2.png" alt="Multi-modal dashboard" fill className={styles.slideImage} />
        <div className={styles.overlay}>
          <div className={styles.hudText} style={{ top: '10%', right: '10%', color: '#0ea5e9' }}>MULTI-MODAL INGESTION ACTIVE</div>
          <div className={styles.hudScanline} />
        </div>
      </div>

      {/* Slide 3: Dserve AI */}
      <div className={`${styles.slide} ${slideIndex === 2 ? styles.slideVisible : ''}`}>
        <Image src="/videos/def3.png" alt="Dserve AI Core" fill className={styles.slideImage} />
        <div className={styles.overlay}>
          <div className={styles.logoOverlay}>
            <Image src="/logo.png" alt="Logo" width={60} height={60} />
            <h2>DSERVE<span style={{color: '#0ea5e9'}}>AI</span></h2>
          </div>
        </div>
      </div>
    </div>
  );
}
