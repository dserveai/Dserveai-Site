import Link from "next/link";
import { services } from "@/lib/data";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={`page-wrapper ${styles.container}`}>
      <div className={`section-header ${styles.header}`}>
        <h1 className="section-title">
          <span className="text-gradient">404</span> - Page Not Found
        </h1>
        <p className={`section-subtitle ${styles.subtitle}`}>
          We've recently upgraded to a new platform. The page you are looking for has moved or no longer exists.
        </p>
      </div>

      <div className={styles.actions}>
        <Link href="/" className="btn btn--primary">
          Return Home
        </Link>
        <Link href="/services" className="btn btn--secondary">
          View All Services
        </Link>
      </div>

      <div className={styles.solutionsWrapper}>
        <h2 className={styles.solutionsTitle}>
          Explore Our Solutions
        </h2>
        <div className={styles.solutionsGrid}>
          {services.slice(0, 6).map((service) => (
            <Link 
              key={service.slug} 
              href={`/services/${service.slug}`}
              className={styles.serviceCard}
            >
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
