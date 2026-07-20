# Analytics Event Dictionary & Documentation

This document serves as the source of truth for the production analytics tracking architecture (GA4, Vercel Analytics, Microsoft Clarity) across the Dserve AI website.

## 1. Environment Variables

The analytics architecture requires the following variables in `.env.local` or your production environment settings:

- `NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"` (Google Analytics 4 Measurement ID)
- `NEXT_PUBLIC_CLARITY_ID="XXXXXXXXXX"` (Microsoft Clarity Project ID)

*Note: Vercel Analytics connects automatically via the Vercel Dashboard; no ID is required in the environment variables.*

## 2. Event Names & Payload Structure

The `trackEvent` wrapper function expects events defined in `components/analytics/events.ts`.

| Event Name | Trigger | Payload Structure |
| :--- | :--- | :--- |
| `cta_click` | Clicking a primary button or element with `data-track="cta_click"` | `{ label: string }` or `{ text: string }` |
| `form_submission` | Successful 200 OK response from the `/api/contact` endpoint | `{ form_name: "Contact Request", company: string, country: string }` |
| `outbound_link_click` | Automatically tracks clicks on anchor tags pointing to external domains | `{ url: string, text: string }` |
| `scroll_depth` | Automatically triggers at exactly 25%, 50%, 75%, and 90% page depth | `{ depth: number }` |
| `file_download` | Automatically tracks clicks on links ending in `.pdf`, `.zip`, `.csv`, `.json` | `{ file: string }` |

## 3. Data Attribute Tracking

For highly specific elements, avoid generic button tracking by applying explicit `data-track` attributes to the HTML element. The global listener in `AnalyticsTracker.tsx` will automatically intercept these.

```tsx
<button data-track="hero_cta" data-label="Get Started">Get Started</button>
```

## 4. How to Add Future Providers

The `components/analytics/track.ts` file utilizes a single fan-out architecture. To add a new provider (e.g., Meta Pixel or LinkedIn Insight Tag):

1. Install the relevant package or inject the script into `AnalyticsProvider.tsx`.
2. Open `track.ts`.
3. Inside the `try` block, add the provider's specific tracking invocation:
   
```typescript
// Example: Meta Pixel
if (typeof window !== 'undefined' && window.fbq) {
  window.fbq('trackCustom', eventName, payload);
}
```

## 5. Verification Process

**Development Mode:**
When `NODE_ENV === "development"`, the `trackEvent` function intercepts the call and outputs a structured log to the browser console. Open Chrome DevTools and look for logs starting with `[ANALYTICS DEV]`.

**Production Mode:**
- **GA4:** Open Network Tab -> Filter `collect?v=2`.
- **Vercel Analytics:** Open Network Tab -> Filter `/track`.
- **Clarity:** Open Network Tab -> Filter `clarity.ms`.
