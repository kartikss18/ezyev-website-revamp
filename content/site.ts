/*
  Single source of truth for EzyEV company facts, preserved live ezyev.in content,
  and clearly marked static [TODO] placeholders where specs/metrics are pending.
*/

export const site = {
  name: "EzyEV",
  legalName: "EzyEV Technologies",
  tagline: "Clean. Connected. Charged.",
  url: "https://ezyev.in",
  description:
    "India’s Battery-as-a-Service platform for electric 2W and 3W fleets. 60-second battery swaps, fixed monthly plans, IoT swap stations, and live battery telemetry across Pune, Mumbai, and Nagpur.",
  email: "info@ezyev.in",
  phone: "+91 97667 66576",
  phoneRaw: "+91 9766766576",
  phoneHref: "tel:+919766766576",
  primaryCta: { label: "Partner with us", href: "/contact" },
  secondaryCta: { label: "Explore the pack", href: "#inside-pack" },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ezy-ev-technologies/" },
    { label: "X", href: "https://x.com/ezy_ev/" },
    { label: "Facebook", href: "https://www.facebook.com/ezyevtechnologies/" },
    { label: "GitHub", href: "https://github.com/EzyEV-Technologies/" },
  ],
} as const;

export const nav = [
  { label: "Product", href: "/product" },
  { label: "What we do", href: "/what-we-do" },
  { label: "Cities", href: "/cities" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const offices = [
  {
    city: "Pune",
    slug: "pune",
    state: "Maharashtra",
    tag: "Headquarters",
    address: ["Office No. 210, The Latitude Core", "Off-NIBM Road, Kondhwa", "Pune 411048"],
    summary:
      "Swap stations strategically located across Pune's key commercial corridors, serving last-mile delivery, electric rickshaw, and 2W courier fleets.",
    heroTitle: "EV Battery-as-a-Service for Fleets in Pune",
    heroLead:
      "EzyEV powers Pune's electric 2-wheeler and 3-wheeler fleet operators with managed battery swapping, real-time monitoring, and zero upfront battery cost.",
    points: [
      "Swap stations strategically located across Pune's key commercial corridors",
      "Serving last-mile deliveries, e-rickshaw, and 2-wheeler courier fleets in Pune",
      "Entire battery lifecycle management — charge, swap, and maintain batteries",
    ],
  },
  {
    city: "Mumbai",
    slug: "mumbai",
    state: "Maharashtra",
    tag: "Live",
    address: [
      "Office No 6 & 7, Blue Diamond",
      "Juhu Tara Road, opposite SNDT College",
      "Juhu, Santacruz West, Mumbai 400049",
    ],
    summary:
      "A swap network built for Mumbai's high-density urban delivery corridors, serving last-mile delivery, e-rickshaw, and 2W courier fleets.",
    heroTitle: "EV Battery-as-a-Service for Fleets in Mumbai",
    heroLead:
      "EzyEV brings seamless battery swapping and fleet battery management to Mumbai's electric 2-wheeler and 3-wheeler operators — keeping vehicles running and operations moving.",
    points: [
      "Swap network built for Mumbai's high-density urban delivery corridors",
      "Serving last-mile delivery, e-rickshaw, and 2W courier fleets in Mumbai",
      "Full battery lifecycle management — charge, swap, and maintain batteries",
    ],
  },
  {
    city: "Nagpur",
    slug: "nagpur",
    state: "Maharashtra",
    tag: "Live",
    address: ["Plot No. 81 to 84, Village Mahsada", "Near Uppalwadi MIDC, Kamptee Road", "Nagpur 440026"],
    summary:
      "Swap stations positioned across Nagpur's key transit and commercial zones, serving last-mile delivery, e-rickshaw, and 2W courier fleets.",
    heroTitle: "EV Battery-as-a-Service for Fleets in Nagpur",
    heroLead:
      "EzyEV is live in Nagpur, providing electric 2-wheeler and 3-wheeler fleet operators with managed battery swapping, real-time monitoring, and subscription-based battery access.",
    points: [
      "Swap stations positioned across Nagpur's key transit and commercial zones",
      "Serving last-mile delivery, e-rickshaw, and 2-wheeler courier fleets in Nagpur",
      "Full battery lifecycle management — charge, swap, and maintain batteries",
    ],
  },
] as const;

/*
  Static hardcoded pack specifications — [BRACKETED] values ready to swap
  once final engineering datasheet numbers are confirmed.
*/
export const packSpecs = [
  { key: "CHEMISTRY", label: "Cell chemistry", value: "[CHEMISTRY]", unit: "TODO · LFP / NMC spec" },
  { key: "VOLTAGE", label: "Nominal voltage", value: "[VOLTAGE]", unit: "TODO · Pack V" },
  { key: "CAPACITY", label: "Usable capacity", value: "[CAPACITY]", unit: "TODO · kWh / Ah" },
  { key: "CYCLE LIFE", label: "Rated cycle life", value: "[CYCLE LIFE]", unit: "TODO · Cycles @ 80% DoD" },
  { key: "WEIGHT", label: "Pack mass", value: "[WEIGHT]", unit: "TODO · kg portable" },
  { key: "IP RATING", label: "Ingress protection", value: "[IP RATING]", unit: "TODO · Dust & monsoon seal" },
  { key: "WARRANTY", label: "Lifecycle coverage", value: "[WARRANTY]", unit: "100% EzyEV managed" },
] as const;

/*
  Static hardcoded network & impact counters — preserves real formula baseline
  from site.ts (150 batteries, 70 km/day, 1 swap/day since 1 Jan 2026) alongside
  explicit [BRACKETED] placeholders for exact city/station counts pending ops input.
*/
export const networkMetrics = [
  { key: "CITIES", label: "Active cities", value: "03", sub: "Pune · Mumbai · Nagpur [CITIES]" },
  { key: "STATIONS", label: "Automated swap stations", value: "[STATIONS]", sub: "24x7 urban corridor hubs" },
  { key: "PACKS DEPLOYED", label: "Swappable packs in circulation", value: "[PACKS DEPLOYED]", sub: "Active fleet & station buffer" },
  { key: "SWAPS", label: "Completed battery swaps", value: "[SWAPS]", sub: "~60s swap · <2 min turnaround" },
  { key: "KM", label: "Clean kilometres travelled", value: "[KM]", sub: "Zero tailpipe emissions" },
  { key: "CO₂ AVOIDED", label: "Tailpipe CO₂ avoided", value: "[CO₂ AVOIDED]", sub: "Against petrol 2W/3W baselines" },
] as const;

export const impactFormula = {
  startDate: "2026-01-01T00:00:00+05:30",
  totalBatteries: 150,
  kmPerBatteryPerDay: 70,
  swapsPerBatteryPerDay: 1,
  co2KgPerKm: 2.3 / 40,
} as const;

export const threePillars = [
  {
    id: "packs",
    num: "01",
    title: "Battery Packs & Leasing",
    headline: "Own the vehicle while leasing power",
    summary:
      "Decouple the battery from vehicle purchase. Operators save up to 40% upfront vehicle cost, pay a predictable fixed monthly subscription, and hand lifecycle maintenance back to EzyEV.",
    specs: ["Up to 40% lower vehicle CapEx", "Fixed monthly OPEX plans", "Preventive BMS health monitoring"],
    href: "/product#leasing",
  },
  {
    id: "network",
    num: "02",
    title: "Automated Swap Network",
    headline: "Sixty-second swaps with zero waiting",
    summary:
      "Unattended 24x7 IoT-connected swap stations placed along urban delivery corridors. Riders scan QR or tap RFID, drop a depleted pack, and pull a charged one in under two minutes.",
    specs: ["Automated bay release & pack validation", "App-based slot booking & finder", "Zero station staff required"],
    href: "/product#swapping",
  },
  {
    id: "fleet",
    num: "03",
    title: "Fleet, Retrofit & Energy Solutions",
    headline: "Electrify and manage every route.",
    summary:
      "Real-time cloud telemetry across every vehicle and pack, predictive maintenance alerts, geofencing security, and a retrofit kit to convert existing 2W and 3W fleets onto the EzyEV network.",
    specs: ["Live SoC, route & swap analytics", "Geofencing & anti-theft telemetry", "2W/3W retrofit kit compatible"],
    href: "/product#retrofit",
  },
] as const;

export const insidePackLayers = [
  {
    id: "enclosure",
    tag: "01 / ENCLOSURE",
    title: "Extruded ribbed aluminium chassis",
    body: "Factory-anodized green AL-6063 shell with 6 cooling ribs per long face and yellow top seal.",
    highlight: "1 : 1.6 : 2.4 AL-6063",
  },
  {
    id: "bms",
    tag: "02 / INTELLIGENCE",
    title: "Telemetry-connected smart BMS",
    body: "Carbon BMS board with white sense-wire harness syncing cell health live at every swap.",
    highlight: "MQTT / Kafka sync",
  },
  {
    id: "cells",
    tag: "03 / CORE",
    title: "High-density modular cell stack",
    body: "Compressed cell matrix with copper busbars, positive boot, and active cycle sensors.",
    highlight: "[CHEMISTRY] · [VOLTAGE]",
  },
  {
    id: "safety",
    tag: "04 / INTERFACE & SAFETY",
    title: "Key-locked high-current interface",
    body: "Ribbed carry handle, sealed key lock, dual glands, readout display, and Anderson bus plug.",
    highlight: "Anderson · [IP RATING]",
  },
] as const;

export const applications = [
  {
    id: "last-mile",
    title: "Last-mile delivery",
    vehicles: "2W electric scooters",
    body: "Food and hyperlocal riders running continuous shifts with sub-minute swaps.",
  },
  {
    id: "e-rickshaw",
    title: "L3–L5 electric rickshaws",
    vehicles: "Passenger & cargo 3W",
    body: "Commercial 3-wheelers saving up to 40% upfront vehicle cost via BaaS.",
  },
  {
    id: "courier",
    title: "2W courier & logistics",
    vehicles: "Express & B2B fleets",
    body: "Scheduled urban parcel fleets monitored live per swap and kilometre.",
  },
  {
    id: "shared-oem",
    title: "Shared mobility & EV OEMs",
    vehicles: "Rental fleets & retrofit",
    body: "Turnkey fleet retrofit kits and OEM battery partnerships.",
  },
] as const;

export const caseStudyPlaceholder = {
  eyebrow: "Field deployment · Case study [TODO]",
  city: "Pune Commercial Corridor",
  title: "Eliminating mid-shift charging queues for urban delivery fleets",
  story:
    "Pune 2W and 3W operators trade multi-hour plug-in queues for automated 60-second swaps across busy hubs.",
  stats: [
    { label: "Average swap time", value: "~60s", note: "Total bay turnaround" },
    { label: "Vehicle CapEx reduction", value: "Up to 40%", note: "Decoupled via BaaS" },
    { label: "Active fleet uptime", value: "[UPTIME %]", note: "TODO · Partner metric" },
  ],
  ctaLabel: "See case study",
  ctaHref: "/contact",
} as const;

export const certifications = [
  { code: "[CERT-01]", title: "Battery Safety & Thermal Compliance", status: "TODO · Pending AIS / BIS certificate numbers" },
  { code: "[CERT-02]", title: "Ingress & Mechanical Vibration Rating", status: "TODO · Pending [IP RATING] lab test ref" },
  { code: "[CERT-03]", title: "Automated Station Validation Protocol", status: "In-house IoT hardware interlock before pack release" },
  { code: "[CERT-04]", title: "Geofencing & Anti-Theft Telemetry", status: "Real-time cloud tracking, alerts, and remote lock" },
] as const;

export const faqs = [
  {
    q: "What is Battery-as-a-Service (BaaS)?",
    a: "Battery-as-a-Service lets operators lease the EV battery separately from the vehicle. By decoupling battery cost from vehicle purchase, fleets reduce upfront vehicle CapEx by up to 40%, pay a predictable monthly rate, and swap depleted packs in about 60 seconds.",
  },
  {
    q: "What services does the EzyEV platform provide?",
    a: "EzyEV delivers an end-to-end ecosystem: automated 24x7 battery swapping stations, flexible monthly battery leasing subscriptions, a retrofit kit for existing 2W/3W vehicles, smart battery health analytics, lifecycle maintenance, and a cloud fleet management dashboard.",
  },
  {
    q: "How does a battery swap work for riders?",
    a: "When a battery runs low, the EzyEV app sends a low-battery alert and navigates the rider to the nearest available station slot. The rider authenticates via QR code or RFID card, an empty bay opens automatically, they insert the drained pack and pull out a validated, fully charged pack to return to route in under two minutes.",
  },
  {
    q: "Do EzyEV swap stations require on-site staff?",
    a: "No. Stations are fully automated and IoT-connected. App authentication, door latching, pack validation, charge monitoring, and thermal safety checks run autonomously 24x7.",
  },
  {
    q: "How much does an EzyEV BaaS subscription cost?",
    a: "Plans are tailored to your vehicle category, daily kilometre requirement, and fleet size for predictable monthly billing. Share your fleet profile on our Contact page or write to info@ezyev.in for a fixed monthly quote.",
  },
  {
    q: "Which vehicles do you support?",
    a: "We support electric two-wheelers and three-wheelers (including passenger e-rickshaws and cargo L3–L5 fleets). For operators still running ICE or non-compatible vehicles, our retrofit kit converts suitable models onto the EzyEV battery ecosystem.",
  },
  {
    q: "Which cities does EzyEV operate in?",
    a: "EzyEV is headquartered in Pune and live in Mumbai and Nagpur, expanding to additional tier-1 and tier-2 Indian cities. Reach out to info@ezyev.in to discuss regional fleet deployment.",
  },
  {
    q: "Who manages battery health, security, and maintenance?",
    a: "EzyEV owns and maintains the entire battery lifecycle: charging, thermal balancing, preventive servicing, geofencing, and anti-theft telemetry. Operators never absorb battery degradation or replacement bills.",
  },
  {
    q: "How do I get started with EzyEV?",
    a: "Send your fleet size, vehicle types, and daily routes via the Work With Us form on this site or email info@ezyev.in. Our operations team maps your routes to station coverage, prepares a fixed monthly plan, and onboards your team to the EzyEV Partner dashboard.",
  },
] as const;

export const companyStory = {
  eyebrow: "About EzyEV",
  title: "We run the batteries so your fleet runs the routes.",
  intro:
    "EzyEV Technologies is India’s Battery-as-a-Service platform for electric 2-wheeler and 3-wheeler fleet operators—building our own IoT swap stations, rider app, and cloud telemetry stack in-house.",
  values: [
    {
      title: "Vision",
      body: "Become the leading provider of EV energy solutions in a world where electric vehicles are the norm.",
    },
    {
      title: "Mission",
      body: "Reduce the environmental impact of transportation while enhancing the convenience and efficiency of EV operations.",
    },
    {
      title: "Transparency",
      body: "Build trust with customers, partners, and employees through honest communication and ethical practices.",
    },
  ],
  principles: [
    { title: "Customers first", body: "We start from what operators and riders need on the road and build the service around uptime." },
    { title: "In-house engineering", body: "Our mobile app, IoT-connected stations, and telemetry backend are engineered in-house for continuous iteration." },
    { title: "Cleaner urban energy", body: "We accelerate clean, renewable mobility through automated, eco-friendly EzySwap stations." },
  ],
  founder: {
    name: "Faizan Ahmed",
    role: "Founder & CEO",
    image: "/media/team/faizan-ahmed.png",
    bio: [
      "Faizan Ahmed is a visionary entrepreneur and the founder of EzyEV Technologies. With nearly two decades of experience in Sales and Business Development across global technology leaders including Oracle, Slack, and SAP, he brings deep strategic insight and executional discipline to India’s EV ecosystem.",
      "He started EzyEV to deliver sustainable, cost-effective energy solutions that help fleet businesses achieve their environmental commitments while maximizing daily vehicle uptime.",
    ],
  },
} as const;

export const platformCapabilities = [
  {
    title: "Enhanced Security",
    body: "Real-time telemetry alerts, geofencing, and anti-theft protections across batteries and fleet deployments.",
  },
  {
    title: "Cost-Effective Management",
    body: "Fixed monthly OPEX, up to 40% lower vehicle CapEx, and elimination of battery replacement risk.",
  },
  {
    title: "Detailed Reporting & Analytics",
    body: "AI-assisted operational reports on KPIs, swap frequency, energy consumption, and cost per kilometre.",
  },
  {
    title: "Real-Time Fleet Monitoring",
    body: "Live dashboard visibility into vehicle locations, pack state of charge, and swap history.",
  },
  {
    title: "Efficient Resource Allocation",
    body: "Data-driven station load balancing and route-aware smart station finder for minimal rider detour.",
  },
  {
    title: "Predictive Maintenance",
    body: "Cell-level health tracking catches thermal or capacity drift early before a pack ever stalls a shift.",
  },
] as const;

export const hardcodedNewsPlaceholders = [
  {
    slug: "pune-mumbai-nagpur-corridor-expansion",
    tag: "NETWORK [TODO]",
    date: "2026 [TODO]",
    title: "Expanding automated 60-second swap coverage across Pune, Mumbai, and Nagpur",
    excerpt:
      "Hardcoded placeholder entry: replace with verified EzyEV station deployment milestones and corridor launch notes.",
  },
  {
    slug: "baas-fleet-economics-two-three-wheelers",
    tag: "ECONOMICS [TODO]",
    date: "2026 [TODO]",
    title: "Why decoupling battery CapEx cuts electric 2W and 3W fleet entry costs by up to 40%",
    excerpt:
      "Hardcoded placeholder entry: replace with verified EzyEV operator TCO breakdown and case metrics.",
  },
  {
    slug: "iot-bms-telemetry-architecture",
    tag: "ENGINEERING [TODO]",
    date: "2026 [TODO]",
    title: "Inside EzyEV's real-time MQTT & cloud telemetry pipeline for automated swap bays",
    excerpt:
      "Hardcoded placeholder entry: replace with engineering write-up from the Pune hardware & cloud team.",
  },
] as const;
