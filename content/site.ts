/*
  Single source of truth for company facts.
  Everything here was taken from the live ezyev.in site (October 2026).
  Copy rule: no hyphens inside sentences, so "Battery as a Service", "2W", "last mile".
*/

export const site = {
  name: "EzyEV",
  legalName: "EzyEV Technologies",
  tagline: "Clean. Connected. Charged.",
  url: "https://ezyev.in",
  description:
    "Battery as a Service for electric 2W and 3W fleets in India. 60 second battery swaps, fixed monthly plans and live battery tracking in Pune, Mumbai and Nagpur.",
  email: "info@ezyev.in",
  phone: "+91 97667 66576",
  phoneHref: "tel:+919766766576",
  primaryCta: { label: "Get your fleet battery plan", href: "/contact" },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ezy-ev-technologies/" },
    { label: "X", href: "https://x.com/ezy_ev/" },
    { label: "Facebook", href: "https://www.facebook.com/ezyevtechnologies/" },
    { label: "GitHub", href: "https://github.com/EzyEV-Technologies/" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "What we do", href: "/what-we-do" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const offices = [
  {
    city: "Pune",
    tag: "Headquarters",
    address: ["Office No. 210, The Latitude Core", "Off NIBM Road, Kondhwa", "Pune 411048"],
    summary:
      "Swap stations across Pune's key commercial corridors, serving last mile delivery, electric rickshaw and 2W courier fleets.",
  },
  {
    city: "Mumbai",
    tag: "Live",
    address: ["Office No. 6 and 7, Blue Diamond", "Juhu Tara Road, opposite SNDT College", "Santacruz West, Mumbai 400049"],
    summary:
      "A swap network built for Mumbai's high density urban delivery corridors.",
  },
  {
    city: "Nagpur",
    tag: "Live",
    address: ["Plot No. 81 to 84, Village Mahsada", "Near Uppalwadi MIDC, Kamptee Road", "Nagpur 440026"],
    summary:
      "Swap stations positioned across Nagpur's key transit and commercial zones.",
  },
] as const;

/*
  Impact counter inputs, copied from the formula on the current site.
  Review these with ops before launch: they drive the live numbers on the home page.
*/
export const impact = {
  startDate: "2026-01-01T00:00:00+05:30",
  totalBatteries: 150,
  kmPerBatteryPerDay: 70,
  swapsPerBatteryPerDay: 1,
  // kg CO2 avoided per km, matching the current site's (km / 40) * 2.3 factor
  co2KgPerKm: 2.3 / 40,
} as const;

export const faqs = [
  {
    q: "What is Battery as a Service?",
    a: "Battery as a Service (BaaS) lets you lease the EV battery separately from the vehicle instead of buying it upfront. You pay a fixed monthly subscription, and when a battery runs low your rider swaps it for a fully charged one at an EzyEV station instead of waiting hours to charge.",
  },
  {
    q: "How much does an EzyEV plan cost?",
    a: "Plans are priced around your fleet size and daily mileage, so every quote is tailored. Share your fleet details on the contact page and our operations team will come back with a fixed monthly plan. Because the battery is not part of the vehicle price, operators typically pay up to 40% less for each vehicle.",
  },
  {
    q: "How does a battery swap work for my riders?",
    a: "The rider gets a low battery alert in the app, which guides them to the nearest EzyEV station. They scan a QR code or tap an RFID card, a slot opens, they drop in the drained battery and pull out a charged one. The swap itself takes about 60 seconds and the rider is back on the road in under two minutes.",
  },
  {
    q: "Do stations need staff?",
    a: "No. Stations are automated and IoT connected. The app handles booking and authentication, the station unlocks the door and validates the battery on its own, and it runs 24x7.",
  },
  {
    q: "Which vehicles do you support?",
    a: "Electric two wheelers and three wheelers used for last mile delivery, courier routes and electric rickshaw services. If you run vehicles that are not electric yet, our retrofit kit helps you convert part of your existing fleet. Tell us your models and we will confirm the fit.",
  },
  {
    q: "Which cities does EzyEV operate in?",
    a: "We are headquartered in Pune and live in Mumbai and Nagpur, with more Indian cities planned. If you run a fleet somewhere else, write to info@ezyev.in to talk about a regional launch.",
  },
  {
    q: "Who looks after battery health and maintenance?",
    a: "We do. EzyEV owns the full battery lifecycle: charging, swapping, health monitoring and preventive maintenance. You never deal with a degraded battery or a replacement bill.",
  },
  {
    q: "Can I track my fleet's batteries?",
    a: "Yes. The EzyEV partner dashboard shows swap history, state of charge, battery health, energy use and routes for every vehicle, so you can see uptime and cost per kilometre at a glance.",
  },
  {
    q: "How do I get started?",
    a: "Send us your fleet size, vehicle types and daily routes through the contact page or at info@ezyev.in. We will map your mileage, propose a plan, and onboard your team onto the partner app once you sign.",
  },
] as const;
