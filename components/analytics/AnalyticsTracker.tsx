"use client";

import { useEffect } from "react";
import { trackEvent } from "./track";
import { EventNames } from "./events";

export default function AnalyticsTracker() {
  useEffect(() => {
    // 1. Global Click Tracking (Event Delegation)
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for explicit data-track attribute first
      const explicitTrackNode = target.closest("[data-track]");
      if (explicitTrackNode) {
        const eventName = explicitTrackNode.getAttribute("data-track") || EventNames.CTA_CLICK;
        const eventLabel = explicitTrackNode.getAttribute("data-label") || explicitTrackNode.textContent?.trim();
        trackEvent(eventName, { label: eventLabel });
        return; // Prioritize explicit tracking
      }

      // Check for outbound links
      const anchorNode = target.closest("a");
      if (anchorNode && anchorNode.href) {
        const isOutbound = anchorNode.href.startsWith("http") && !anchorNode.href.includes(window.location.hostname);
        if (isOutbound) {
          trackEvent(EventNames.OUTBOUND_LINK, { url: anchorNode.href, text: anchorNode.textContent?.trim() });
          return;
        }

        // Check for file downloads
        const isDownload = anchorNode.href.match(/\.(pdf|zip|csv|json)$/i);
        if (isDownload) {
          trackEvent(EventNames.FILE_DOWNLOAD, { file: anchorNode.href });
          return;
        }
      }

      // Fallback: Check for generic CTA buttons (if no data-track was provided)
      const isButton = target.closest("button") || target.closest(".btn");
      if (isButton && !isButton.closest("form")) {
        // Exclude form buttons as they are usually handled by form submission events
        trackEvent(EventNames.CTA_CLICK, { text: isButton.textContent?.trim() });
      }
    };

    document.addEventListener("click", handleGlobalClick);

    // 2. Scroll Depth Tracking
    let thresholds = { 25: false, 50: false, 75: false, 90: false };
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollPosition / documentHeight) * 100;

      Object.keys(thresholds).forEach((key) => {
        const threshold = parseInt(key);
        if (scrollPercentage >= threshold && !thresholds[threshold as keyof typeof thresholds]) {
          thresholds[threshold as keyof typeof thresholds] = true;
          trackEvent(EventNames.SCROLL_DEPTH, { depth: threshold });
        }
      });
    };

    // Throttle scroll listener slightly for performance
    let isScrolling = false;
    const throttledScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          handleScroll();
          isScrolling = false;
        });
        isScrolling = true;
      }
    };

    window.addEventListener("scroll", throttledScroll);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  return null; // This component strictly handles side effects
}
