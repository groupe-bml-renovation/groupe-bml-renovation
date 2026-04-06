# Website Speed & Performance Audit

**Date:** March 31, 2026
**Target:** Groupe BML Rénovation
**Objective:** Evaluate current performance metrics, identify bottlenecks, and validate recent architectural optimizations.

---

## 1. Executive Summary

The website has a solid foundation for high performance, utilizing modern frameworks (Vite, React) and advanced optimization techniques (PWA, SPA navigation, Progressive Lazy Loading). However, a few critical bottlenecks—primarily large media assets and third-party script execution—prevent it from reaching an "instant" feel on slower connections.

| Optimization Area | Status | Impact |
| :--- | :--- | :--- |
| **Critical Rendering Path** | 🟢 Optimized | Progressive component loading is well-implemented. |
| **Bundle Management** | 🟢 Good | Granular code-splitting (vendor/route chunks) is active. |
| **Asset Delivery** | 🟡 Needs Improvement | 15MB Hero video and large unoptimized images are current "lability". |
| **Runtime Performance** | 🟡 Fair | Framer Motion and Voiceflow add considerable main-thread load. |
| **Caching & Persistence** | 🔵 Recently implemented | Service Worker caching should significantly improve repeat visits. |

---

## 2. Technical Audit Details

### 2.1 Critical Path Analysis
- **Above-the-fold content:** Essential components (Hero, Nav, CTA) are bundled in the main chunk.
- **Resource Hints:** `preconnect` and `dns-prefetch` are implemented for Google Fonts and GTM, reducing TTFB for external assets.
- **Progressive Loading:** Below-the-fold components (Reviews, FAQ, Forms) are correctly deferred with `LazyLoadingBoundary`.

### 2.2 Bundle Analysis (Vite/Rollup)
- **Vendor Splitting:** 
  - `react-vendor`: ~660KB (Critical)
  - `motion-vendor`: ~110KB (Critical)
  - `supabase-vendor`: ~165KB (Route-specific)
- **Bottleneck:** `framer-motion` is a critical dependency, meaning its 110KB must be parsed before the first animation can fire.

### 2.3 Asset Management Audit
- **Hero Video (`public/videos/hero-video.mp4`):** **15.0 MB**. 
  - *Current Issue:* This video is not streamed or lazy-loaded with a poster, potentially blocking LCP/FCP if not handled by the browser's preload priority.
- **Images:** Most assets are served from `r2.dev` (Cloudflare R2).
  - *Current Issue:* Many components still use hardcoded paths instead of utilizing the `getImageSrcSet` utility, missing out on responsive image resolution.

### 2.4 Third-Party Scripts
1. **Google Tag Manager:** Deferred by 3.5s in `index.html`. (Excellent)
2. **Voiceflow SDK:** Deferred by 4s via `useVoiceflow` hook. (Excellent)
3. **ContentSquare:** Loaded immediately via `<script src="...">`. 
  - *Recommendation:* Evaluate if this can be deferred to after the `DOMContentLoaded` event.

---

## 3. Web Vitals (Estimated)

Based on current configuration and asset sizes:

- **LCP (Largest Contentful Paint):** ~1.8s - 2.5s (Dependent on Hero Video load)
- **FID (First Input Delay):** <100ms (Low main thread blocking initially)
- **CLS (Cumulative Layout Shift):** 🔵 Improved (Use of `LazyLoadingBoundary` with pulses reduces shift)
- **TTI (Time to Interactive):** ~2.0s - 3.5s (Blocked by Voiceflow/GTM initialization)

---

## 4. Architectural Recommendations (Non-Coding)

> [!IMPORTANT]
> To achieve "True Instant Loading," the following infrastructure-level changes are recommended:

1. **Video Streaming:** Transcode the 15MB hero video into HLS/Dash or at least a highly compressed H.265/AV1 format. Add a lightweight **Poster Image** to allow the browser to paint the hero before the video downloads.
2. **Edge Caching Header:** Ensure the `.r2.dev` CDN is configured with `max-age=31536000` (1 year) for all hashed assets.
3. **Font Subseting:** Only load the specific weights of "Inter" or "Outfit" that are used (e.g., 400, 500, 700). Current implementation might be loading full families.
4. **Image Component Standardization:** Ensure every `<img>` tag in the project uses `loading="lazy"` and `decoding="async"` (except for the Hero and Logo).

---

## 5. Summary of Recent Optimizations
Recent changes (PWA, SPA Navigation, Prefetching) have addressed the **Perceived Performance** bottleneck. The site now transitions instantly between pages. The next step is to address the **Actual Asset Weight**.

---
*Audit completed by Antigravity AI.*
