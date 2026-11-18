/*
  EzyEV Brandkit Tokens — built directly around the existing EzyEV mark (#0F7D3F, #F8C812)
  and battery hardware palette. Single graphite dark-first visual system with high-contrast
  EzyEV green accent and strictly rationed safety-yellow micro-accent (max 1 per viewport).
*/

export const brandTokens = {
  palette: [
    {
      token: "--color-bg",
      name: "Graphite Base",
      hex: "#0B0D0C",
      oklch: "oklch(0.155 0.004 155)",
      role: "Primary stage & canvas background",
      contrastOnBg: "1.0:1",
    },
    {
      token: "--color-surface",
      name: "Anodized Slate",
      hex: "#121614",
      oklch: "oklch(0.195 0.006 155)",
      role: "Elevated panels, tech cards & nav drawer",
      contrastOnBg: "1.14:1",
    },
    {
      token: "--color-raised",
      name: "Machined Surface",
      hex: "#191F1C",
      oklch: "oklch(0.238 0.008 155)",
      role: "Interactive wells, spec rows & hover states",
      contrastOnBg: "1.32:1",
    },
    {
      token: "--color-fg",
      name: "Off-White",
      hex: "#F4F5F3",
      oklch: "oklch(0.968 0.003 145)",
      role: "Primary display & body ink (WCAG AAA)",
      contrastOnBg: "17.9:1",
    },
    {
      token: "--color-muted",
      name: "Alloy Grey",
      hex: "#A3ACA7",
      oklch: "oklch(0.736 0.011 155)",
      role: "Supporting prose & technical descriptions",
      contrastOnBg: "8.1:1",
    },
    {
      token: "--color-subtle",
      name: "Graphite Ash",
      hex: "#7A847E",
      oklch: "oklch(0.602 0.012 155)",
      role: "Mono spec keys, indices & metadata labels",
      contrastOnBg: "4.9:1",
    },
    {
      token: "--color-brand-green",
      name: "EzyEV Anodized Green",
      hex: "#0F7D3F",
      oklch: "oklch(0.515 0.132 149)",
      role: "Logo mark, 3D enclosure PBR & primary dark fill",
      contrastOnBg: "3.85:1 (white ink 5.2:1)",
    },
    {
      token: "--color-accent",
      name: "EzyEV Emerald Signal",
      hex: "#24C768",
      oklch: "oklch(0.735 0.172 148)",
      role: "Single primary UI accent, focus ring, primary CTA & BMS traces",
      contrastOnBg: "8.4:1 (ink #0B0D0C 8.4:1)",
    },
    {
      token: "--color-micro-yellow",
      name: "Safety Yellow (Micro)",
      hex: "#F8C812",
      oklch: "oklch(0.848 0.172 91)",
      role: "Logo bolt, battery cap & max 1 micro-highlight per viewport",
      contrastOnBg: "12.6:1",
    },
  ],
  lightSurface: [
    { token: "--light-bg", name: "Paper Off-White", hex: "#F6F7F5", role: "Light surface / legal / logo showcase" },
    { token: "--light-ink", name: "Carbon Ink", hex: "#0B0D0C", role: "Primary ink on light surfaces" },
    { token: "--light-accent", name: "EzyEV Brand Green", hex: "#0F7D3F", role: "Accent on light surfaces (5.1:1)" },
  ],
  typography: {
    display: {
      family: "Geist",
      weights: [300, 400, 500, 600],
      trackingDisplay: "-0.04em",
      trackingHeading: "-0.025em",
      lineHeightDisplay: "0.98",
    },
    mono: {
      family: "Geist Mono",
      weights: [400, 500],
      tracking: "0.08em",
      use: "Spec tables, leader-line callouts, unit labels, telemetry counters",
    },
  },
  spacing: [
    { token: "--s-1", px: "4px" },
    { token: "--s-2", px: "8px" },
    { token: "--s-3", px: "12px" },
    { token: "--s-4", px: "16px" },
    { token: "--s-5", px: "24px" },
    { token: "--s-6", px: "32px" },
    { token: "--s-7", px: "48px" },
    { token: "--s-8", px: "64px" },
    { token: "--s-9", px: "96px" },
    { token: "--s-10", px: "128px" },
  ],
  radius: [
    { token: "--r-sm", value: "4px", use: "Inputs, technical chips" },
    { token: "--r-md", value: "8px", use: "Spec panels, nested wells" },
    { token: "--r-lg", value: "12px", use: "Media plates, 3D stage frames" },
    { token: "--r-pill", value: "9999px", use: "Primary & secondary CTA buttons" },
  ],
  motion: {
    easeBrand: "cubic-bezier(0.22, 1, 0.36, 1)",
    revealDuration: "750ms",
    swapDuration: "1800ms",
    reducedMotion: "All transforms & scrubbed timelines disabled; static renders/stills shown",
  },
  logoRules: {
    clearSpace: "Equal to the cap height of the 'E' in the EzyEV wordmark on all four sides.",
    minHeightMobile: "24px (mark height on mobile nav; 32px desktop nav).",
    darkSurface: "Use mono white/alloy version (ezyev-lockup-dark.svg / ezyev-mark-mono.svg) on graphite #0B0D0C and dark surfaces.",
    lightSurface: "Preserve exact #0F7D3F green + #F8C812 bolt + #040707 wordmark on light backgrounds.",
    favicon: "Use the 'e'-bolt mark alone (app/icon.svg) as favicon and app icon.",
  },
} as const;
