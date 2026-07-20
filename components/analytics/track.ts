import { sendGAEvent } from "@next/third-parties/google";
import { track as vercelTrack } from "@vercel/analytics/react";
import { EventName } from "./events";

export function trackEvent(eventName: EventName | string, payload?: Record<string, any>) {
  // Developer Debug Mode
  if (process.env.NODE_ENV === "development") {
    console.log(`[ANALYTICS DEV] Event: ${eventName}`, payload || {});
  }

  try {
    // 1. Google Analytics 4
    sendGAEvent("event", eventName, payload);

    // 2. Vercel Analytics
    vercelTrack(eventName, payload);

    // 3. Microsoft Clarity (Automatic via recording, but can explicitly add tags)
    if (typeof window !== "undefined" && (window as any).clarity) {
      (window as any).clarity("set", eventName, JSON.stringify(payload || {}));
    }

    // Future integrators (Meta Pixel, LinkedIn, HubSpot) can be added here.
  } catch (err) {
    console.error("Failed to track event:", err);
  }
}
