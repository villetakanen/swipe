---
problem: "mobile-navigation-patterns"
problemTitle: "Mobile Navigation Patterns"
title: "Stripe Mobile Nav"
url: "https://stripe.com"
screenshot: "./stripe-mobile-nav.png"
tags: ["hamburger", "slide-out"]
design:
  summary: "Clean hamburger menu with a slide-out panel featuring clear hierarchy and generous spacing."
  layout: "Fixed top nav bar with hamburger icon on the left, logo centered, and CTA on the right. The slide-out panel uses a full-height overlay with grouped navigation sections."
  color: "White background with Stripe's signature purple (#635BFF) for accent links and CTAs. Text in dark navy (#0A2540) with lighter gray (#425466) for secondary items."
  typography: "System font stack with 16px body text. Navigation items use 15px medium weight. Section headers in 12px uppercase tracking for grouping."
  interaction: "Hamburger icon animates to X on open. Panel slides in from the left with a backdrop overlay. Nested sections expand inline with a smooth accordion animation."
  strengths:
    - "Excellent visual hierarchy in the slide-out menu"
    - "Smooth, performant animations"
    - "Clear grouping of navigation sections"
  weaknesses:
    - "Hamburger menu hides all navigation behind a tap"
    - "No visible indication of current section"
technical:
  summary: "React-based SPA with CSS transforms for the slide-out animation. Accessible markup with proper ARIA attributes."
  approach: "Component-based architecture with React. Navigation state managed via React context. CSS transforms for GPU-accelerated slide animation."
  frameworks: ["React", "Next.js"]
  cssDetails: "transform: translateX() for slide animation. backdrop-filter for the overlay blur. CSS custom properties for theming. Responsive breakpoints at 640px and 1024px."
  a11y: "aria-expanded on hamburger button, focus trap within open panel, ESC key closes menu, aria-label on navigation landmarks."
  performance: "CSS transforms avoid layout thrashing. Navigation component lazy-loaded on mobile viewports. SVG icons inlined to avoid extra requests."
crawledAt: 2026-03-08T12:00:00Z
---

Stripe's mobile navigation is a textbook example of a well-executed hamburger menu pattern. The fixed top bar maintains brand presence with a centered wordmark while keeping the primary call-to-action ("Sign in") always visible in the top-right corner. This is a deliberate trade-off: by hiding the full navigation behind the hamburger icon, Stripe keeps the mobile viewport clean and focused on content, relying on brand recognition and the prominent CTA to drive engagement. The approach works particularly well for Stripe's documentation-heavy site, where the navigation tree is deep enough that a visible tab bar would feel cramped.

The slide-out panel itself demonstrates Stripe's characteristic attention to detail. Navigation items are grouped into clearly labeled sections — Products, Solutions, Developers, and Company — using uppercase, letterspaced headers that create strong visual separation without relying on heavy dividers. Each section can be expanded inline with a smooth accordion animation, revealing nested links without navigating the user away from the panel. The generous vertical spacing (roughly 44px touch targets) ensures comfortable tapping, and the subtle use of Stripe's purple (#635BFF) for active states and CTAs within the panel adds a layer of visual feedback that many hamburger implementations lack.

From a technical standpoint, the implementation is solid. The slide animation uses CSS `transform: translateX()` for GPU-accelerated performance, avoiding the layout thrashing that plagues implementations relying on `left` or `margin` properties. The backdrop overlay uses `backdrop-filter: blur()` for a frosted-glass effect that maintains context without being distracting. Accessibility is handled well, with `aria-expanded` toggling on the hamburger button, a focus trap that keeps keyboard navigation within the open panel, and ESC key support for dismissal. Compare this to patterns like bottom tab bars (see related entries in the `mobile-navigation-patterns` collection) where persistent visibility trades off against vertical screen real estate — Stripe's approach favors content space at the cost of navigation discoverability.

One area for improvement is the lack of a visible indicator for the current section. When navigating deep into Stripe's documentation, the hamburger panel does not highlight or expand to the user's current location, making it harder to orient within the site hierarchy. A subtle active state on the relevant section header, or auto-expanding the current section on panel open, would address this without adding visual clutter. Despite this, the overall pattern is a strong reference for any team considering a hamburger-based mobile navigation, particularly for content-rich sites where the navigation tree exceeds what a tab bar can comfortably hold.
