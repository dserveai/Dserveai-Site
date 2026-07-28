"use client";

import { useState } from "react";
import styles from "./StickyLeadMagnet.module.css";

export default function StickyLeadMagnet() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, requestType: "Pilot Project" }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => setIsOpen(false), 3000);
      } else {
        setStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("idle");
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3 className={styles.title}>Request a Free Data Pilot</h3>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          {status === "success" ? (
            <div className={styles.successMsg}>
              Request received! Our AI experts will contact you within 24 hours.
            </div>
          ) : (
            <>
              <p className={styles.desc}>
                Get a custom 1,000-sample dataset annotated to your exact specifications, completely free.
              </p>
              <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className={styles.input} 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="Work Email" 
                  className={styles.input} 
                  required 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Company Name" 
                  className={styles.input} 
                  required 
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                />
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Processing..." : "Get My Free Pilot"}
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {!isOpen && (
        <button className={styles.triggerBtn} onClick={() => setIsOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          Request Pilot
        </button>
      )}
    </div>
  );
}
