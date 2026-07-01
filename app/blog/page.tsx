"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Pagination from "@/components/ui/Pagination";
import SchemaScript from "@/components/seo/SchemaScript";
import { generateCollectionPage, generateBreadcrumbList } from "@/lib/schema";
import styles from "./page.module.css";
import postsData from "@/lib/posts_data.json";

const POSTS_PER_PAGE = 12;
const allCategories = ["All", ...Array.from(new Set(postsData.map(post => post.category)))];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const filteredPosts = postsData.filter((post) => {
    return activeCategory === "All" || post.category === activeCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SchemaScript 
        schema={[
          generateCollectionPage({
            title: "Blog | Dserve AI",
            description: "Read our latest articles and insights on AI data.",
            path: "/blog"
          }),
          generateBreadcrumbList([
            { name: "Blog", path: "/blog" }
          ])
        ]}
      />
      <div className={styles.pageWrapper}>
      <Navbar />
      
      <main id="main" className={styles.main}>
        {/* Enterprise Minimalist Header */}
        <header className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Knowledge & Development</h1>
            <p className={styles.subtitle}>
              Explore deep technical learnings, development methodologies, and the foundational knowledge driving the next generation of AI systems.
            </p>
            
            {/* Minimalist Category Track */}
            <div className={styles.categoryTrack}>
              {allCategories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.catBtn} ${activeCategory === cat ? styles.active : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Enterprise Feed */}
        <section className={styles.feed}>
          <div className="container">
            
            {filteredPosts.length === 0 ? (
              <div className={styles.emptyState}>No publications available in this category.</div>
            ) : (
              <div className={styles.grid}>
                {currentPosts.map((post) => (
                  <article key={post.slug} className={styles.card}>
                    <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                      <div className={styles.cardMeta}>
                        <span className={styles.date}>
                          {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className={styles.category}>{post.category}</span>
                      </div>
                      
                      <h3 className={styles.cardTitle}>{post.title}</h3>
                      <p className={styles.cardExcerpt}>{post.excerpt}</p>

                      <div className={styles.cardFooter}>
                        <span className={styles.readLabel}>Read publication</span>
                        <ArrowUpRight className={styles.arrow} size={18} />
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

          </div>
        </section>
      </main>
      <Footer />
    </div>
    </>
  );
}
