"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import ClarityScript from "./ClarityScript";
import AnalyticsTracker from "./AnalyticsTracker";

export default function AnalyticsProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {/* 1. Google Analytics 4 */}
      {gaId && <GoogleAnalytics gaId={gaId} />}

      {/* 2. Vercel Analytics */}
      <VercelAnalytics />

      {/* 3. Microsoft Clarity */}
      <ClarityScript />

      {/* 4. Custom Event & Behavior Tracker */}
      <AnalyticsTracker />
    </>
  );
}
