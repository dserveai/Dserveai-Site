"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from "./page.module.css";
import postsData from "@/lib/posts_data.json";

// We extract unique categories from the data, but hardcode "All" first.
const allCategories = ["All", ...Array.from(new Set(postsData.map(post => post.category)))];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on category and search query
  const filteredPosts = postsData.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.slice(1);

  return (
    <>
      <Navbar />
      <main>
        {/* Immersive Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={`container ${styles.heroContent}`}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} /> Knowledge Hub
            </div>
            <h1 className={styles.heroTitle}>
              AI Data Insights <br /><span className={styles.gradient}>& Resources</span>
            </h1>
            <p className={styles.heroDesc}>
              Expert guides, industry analysis, and practical resources for AI teams building the future with high-quality data.
            </p>

            {/* Search and Filter Toolbar */}
            <div className={styles.toolbar}>
              <div className={styles.searchBox}>
                <Search size={20} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search articles, guides, and insights..." 
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Apple-style Category Track */}
              <div className={styles.categoryTrackWrapper}>
                <div className={styles.categoryTrack}>
                  {allCategories.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)}
                      className={`${styles.catBtn} ${activeCategory === cat ? styles.active : ""}`}
                    >
                      {activeCategory === cat && <div className={styles.catActiveBg} />}
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className={`section ${styles.blogSection}`}>
          <div className="container">
            <div className={styles.grid}>
              
              {/* No Results State */}
              {filteredPosts.length === 0 && (
                <div className={styles.noResults}>
                  No articles found matching your search criteria.
                </div>
              )}

              {/* Massive Featured Post */}
              {featuredPost && (
                <Link href={`/blog/${featuredPost.slug}`} className={styles.featured}>
                  <div className={styles.featuredContent}>
                    <div className={styles.featuredMeta}>
                      <span className={styles.tag}>{featuredPost.category}</span>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
                        {new Date(featuredPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h2 className={styles.featuredTitle} dangerouslySetInnerHTML={{ __html: featuredPost.title }} />
                    <p className={styles.featuredExcerpt} dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }} />
                    <div className={styles.featuredDetails}>
                      <span>{featuredPost.readTime} read</span>
                      <span className="btn btn--primary" style={{ padding: "10px 24px" }}>Read Article</span>
                    </div>
                  </div>
                  <div className={styles.featuredVisual}>
                    <div className={styles.orbContainer}>
                      <div className={styles.glowingOrb} />
                      <div className={styles.abstractShape}>
                        {/* Abstract visual representation inside the orb */}
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Standard Bento Grid Posts */}
              {gridPosts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.slug}`} 
                  className={styles.blogCard}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.blogMeta}>
                      <span className={styles.tag} style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}>
                        {post.category}
                      </span>
                      <span className={styles.blogDate}>{post.readTime}</span>
                    </div>
                    
                    <h3 className={styles.blogTitle} dangerouslySetInnerHTML={{ __html: post.title }} />
                    
                    <div className={styles.blogFooter}>
                      <span className={styles.blogDate}>
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <div className={styles.blogArrow}>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Integrated Newsletter CTA */}
        <section className={styles.newsletterSection}>
          <div className="container">
            <div className={styles.newsletterCard}>
              <div className={styles.newsletterContent}>
                <h2>Stay Ahead in <span className="gradient-text">AI & Data</span></h2>
                <p>Get weekly insights on AI training data, annotation best practices, and industry trends delivered directly to your inbox.</p>
              </div>
              <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                <input type="email" className={styles.input} placeholder="Enter your work email" required />
                <button type="submit" className="btn btn--primary">Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
