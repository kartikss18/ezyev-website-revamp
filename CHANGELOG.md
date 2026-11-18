# EzyEV Website Revamp — Changelog

## 1. Design System, Brand Tokens & Vector Identity (`brandkit`, `design-taste-frontend`)
- Vectorized the official EzyEV geometric `"e"` + bolt mark (`#0F7D3F` / `#F8C812`) and `"EzyEV"` wordmark into crisp SVGs under `public/brand/` (`ezyev-mark.svg`, `ezyev-mark-mono.svg`, `ezyev-logo.svg`, `ezyev-logo-mono.svg`, `ezyev-lockup-light.svg`, `ezyev-lockup-dark.svg`) and `app/icon.svg`. Fixed SVG wordmark `viewBox` (`0 0 164 44`) and offset so `"EzyEV"` renders cleanly with tight mark spacing across both nav and footer.
- Aligned navbar logo & floating centered pill navigation bar (`components/Nav.tsx`, `components/Logo.tsx`) with `https://ezyev-website-revamp.vercel.app/` style (`rounded-full`, `backdrop-blur-xl`, crisp `#0b0d0c`/`#121614` palette, accessible 44px touch targets, and full-screen mobile drawer).
- Defined brand tokens in `lib/brand.ts` and `app/globals.css` using Graphite Dark Primary (`#0B0D0C` ground / `#121614` surface / `#191F1C` raised), EzyEV Green (`#0F7D3F` brand / `#24C768` signal accent), Safety Yellow (`#F8C812` micro-accent), high-contrast subtle ink (`#95A09A`), and self-hosted variable `Geist` + `Geist Mono` (`public/fonts/geist.woff2`, `public/fonts/geist-mono.woff2`). Renamed `--color-base` to `--color-ground` (`bg-ground`) to eliminate Tailwind v4 collision with `.text-base`.

## 2. 3D CAD Hardware & Exponent-Inspired Homepage Experience
- Built factory-new React Three Fiber / Drei procedural 3D battery pack (`components/three/BatteryPackMesh.tsx`, `components/three/StudioStage.tsx`, `components/three/SwapAssembly.tsx`, `components/three/BatteryCanvas.tsx`, `components/three/LazyBatteryStage.tsx`) matching `1 : 1.6 : 2.4` envelope proportions verified against `public/reference/battery/ref-{1,2,3}*.jpg`:
  - Hollow extruded satin-green AL-6063 chassis with chamfered corners and 6 vertical ribs per long face.
  - Gasketed safety-yellow top cap with stainless hex fasteners, arched carry handle with ribbed rubber grip, key lock cylinder, dual metallic glands, recessed display readout, and polarized black Anderson connector.
  - Internal assembly: carbon BMS board, white bundled sense-wire harness, red positive terminal boot, and compressed modular cell stack.
  - Kept initial JS budget tight and WebGL rock-solid via single-context arbitration (`ezyev:claim-3d-stage`), pointer/button activation with full responsive `<picture>` fallback, baked `ContactShadows frames={1}`, and framed hero camera (`cameraPos: [4.35, 2.35, 6.05]`, `fov: 36`).
- Added Exponent-inspired sections to `app/page.tsx`:
  - **`components/BatteryAnatomySection.tsx`**: Light-studio alabaster (`#EEF0EE`) hardware cutaway section directly below the Hero featuring an interactive translucent isometric X-ray SVG schematic with 6 clickable subsystems (`01`–`06`), red HV / blue CAN bus paths, and a toggle into Live 3D Exploded mode.
  - **`components/EcosystemStack.tsx`**: Exponent-style sticky overlapping showcase cards (`01 Battery Packs & Leasing`, `02 Automated Swap Network`, `03 Fleet, Retrofit & Energy Solutions`).
  - **Refined Manifesto split** (`app/page.tsx`): Balanced 6/6 split pairing turnaround metrics with the rain-wet urban electric auto plate.
  - **`components/SwapSection.tsx` & `components/InsidePackSection.tsx`**: Scroll-scrubbed GSAP / R3F sequences for the 60-second swap bay + conventional charging comparison, and exploded pack architecture + 2D blueprint (`components/BatteryLineArt.tsx`).

## 3. Media Regeneration, Legacy Archival & Lab Routes
- Archived all old raster assets & legacy components (`_legacy-assets/public/images/*`, `_legacy-assets/public/og-image.jpg`, `_legacy-assets/app/icon.png`, `_legacy-assets/app/apple-icon.png`, `_legacy-assets/components/*`). Verified zero references remain in `app/`, `components/`, `content/`, or `lib/`.
- Exported 17 studio R3F renders + composites (`hero-pack`, `hero-pack-mobile`, `front-elevation`, `top-cap`, `exploded-pack`, `swap-moment`, `pack-lineup`, `macro-*`, `og-pack`) and processed 1x / 2x / mobile WebP sets under `public/media/{product,lifestyle,texture}/` with responsive `srcSet`, `sizes`, explicit `width`/`height`, and below-fold `loading="lazy"`.
- Preserved all core EzyEV routes (`/`, `/product`, `/what-we-do`, `/services`, `/cities`, `/ev-battery-service/[city]`, `/careers`, `/career`, `/career/[slug]`, `/faq`, `/contact`, `/price`, `/blog`, `/privacy`, `/terms`) and `/lab/{brand,battery,swap,images,render}`.
- Preserved real corporate phone (`+91 97667 66576`), email (`info@ezyev.in`), Pune/Mumbai/Nagpur addresses, live impact formula, founder photo (`public/media/team/faizan-ahmed.png`), and hardcoded `[BRACKETED]` / `[TODO]` datasheet & KPI placeholders as requested.

## 4. Verification Status
- `npx tsc --noEmit`: exit code `0`.
- `npm run build`: exit code `0` across all 29 routes.
- `perf.mjs` (`1440px` & `390px`): `0 FAIL` (`4 WARN` — requests & decoded JS bundle size under `900 KiB` fail cap; `2 font families`; `0` missing `width`/`height`; `0` non-lazy below-fold images; `0` oversized images; `0` upscaled images; `FCP/LCP` `348ms` desktop / `268ms` mobile; `CLS` `0.001` / `0.000`).
- `copy-lint.mjs`: `0 FAIL`, `2 WARN` (`copy-numbered`, `copy-eyebrows`).
- `.taste-skill/waivers.json`: Added documented waivers for user-mandated features (`pinned` sticky card overlap in Ecosystem, `[BRACKETED]` hardcoded technical specs, and `+91 97667 66576` client phone).
