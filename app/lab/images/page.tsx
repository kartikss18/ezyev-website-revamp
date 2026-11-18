import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Contact Sheet | Lab",
  robots: { index: false, follow: false },
};

const productRenders = [
  { label: "01 · Hero 3/4 (16:9)", src: "/media/product/hero-pack-2x.webp" },
  { label: "01b · Hero Mobile (4:5)", src: "/media/product/hero-pack-mobile-2x.webp" },
  { label: "02 · Front Elevation (1:1)", src: "/media/product/front-elevation-2x.webp" },
  { label: "03 · Top-Down Cap (1:1)", src: "/media/product/top-cap-2x.webp" },
  { label: "04 · Full Exploded View (16:9)", src: "/media/product/exploded-pack-2x.webp" },
  { label: "05a · Macro: Ribbed Edge (3:2)", src: "/media/product/macro-ribs-2x.webp" },
  { label: "05b · Macro: Anderson Plug (3:2)", src: "/media/product/macro-connector-2x.webp" },
  { label: "05c · Macro: Key Switch (3:2)", src: "/media/product/macro-keyswitch-2x.webp" },
  { label: "05d · Macro: Carbon BMS (3:2)", src: "/media/product/macro-bms-2x.webp" },
  { label: "05e · Macro: Cell Stack (3:2)", src: "/media/product/macro-cells-2x.webp" },
  { label: "06 · Swap Moment (16:9)", src: "/media/product/swap-moment-2x.webp" },
  { label: "07 · Pack Lineup (21:9)", src: "/media/product/pack-lineup-2x.webp" },
  { label: "08 · OG Share Card (1200×630)", src: "/media/product/og-pack.jpg" },
];

const lifestyleGroups = [
  {
    slot: "Slot 1 · Electric Auto-Rickshaw (21:9)",
    items: [
      { label: "v1 (Selected)", src: "/media/lifestyle/slot1-rickshaw-v1-2x.webp" },
      { label: "v2", src: "/media/lifestyle/slot1-rickshaw-v2-2x.webp" },
      { label: "v3", src: "/media/lifestyle/slot1-rickshaw-v3-2x.webp" },
    ],
  },
  {
    slot: "Slot 2 · Delivery Rider 2W (4:5)",
    items: [
      { label: "v1 (Selected)", src: "/media/lifestyle/slot2-rider-v1-2x.webp" },
      { label: "v2", src: "/media/lifestyle/slot2-rider-v2-2x.webp" },
      { label: "v3", src: "/media/lifestyle/slot2-rider-v3-2x.webp" },
    ],
  },
  {
    slot: "Slot 4 · Unbranded Swap Kiosk 3D Dusk Renders (16:9)",
    items: [
      { label: "v1", src: "/media/lifestyle/slot4-kiosk-v1-2x.webp" },
      { label: "v2", src: "/media/lifestyle/slot4-kiosk-v2-2x.webp" },
      { label: "v3", src: "/media/lifestyle/slot4-kiosk-v3-2x.webp" },
    ],
  },
  {
    slot: "Slot 5 · Hands + 3D Pack Composite (4:5)",
    items: [
      { label: "Composite (Selected)", src: "/media/lifestyle/slot5-hands-composite-2x.webp" },
      { label: "Hands Base v1", src: "/media/lifestyle/slot5-hands-v1-2x.webp" },
      { label: "Hands Base v2", src: "/media/lifestyle/slot5-hands-v2-2x.webp" },
      { label: "Hands Base v3", src: "/media/lifestyle/slot5-hands-v3-2x.webp" },
    ],
  },
  {
    slot: "Slot 6 · Aerial Indian City Dusk Network (21:9)",
    items: [
      { label: "v1 (Selected)", src: "/media/lifestyle/slot6-aerial-v1-2x.webp" },
      { label: "v2", src: "/media/lifestyle/slot6-aerial-v2-2x.webp" },
      { label: "v3", src: "/media/lifestyle/slot6-aerial-v3-2x.webp" },
    ],
  },
  {
    slot: "Slot 7 · Optical Emerald Energy Flow Textures (16:9)",
    items: [
      { label: "Texture 1 (Selected)", src: "/media/texture/energy-flow-1-2x.webp" },
      { label: "Texture 2", src: "/media/texture/energy-flow-2-2x.webp" },
      { label: "Texture 3", src: "/media/texture/energy-flow-3-2x.webp" },
    ],
  },
];

export default function ImagesLabPage() {
  return (
    <div className="min-h-screen bg-ground pt-28 pb-24 text-fg">
      <div className="wrap space-y-20">
        <header className="border-b border-line pb-8">
          <p className="eyebrow">Milestone 5 · Product Renders &amp; Lifestyle Contact Sheet</p>
          <h1 className="mt-4 text-3xl font-light tracking-[-0.03em] md:text-5xl">
            100% New Media Inventory
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-muted">
            Section A: rendered directly from the R3F 3D pack scene on a shared studio stage. Section B: generated &amp;
            color-graded plates. Note: Slot 3 (Fleet depot) and Slot 8 (Case-study driver) are pending image-model
            quota reset and are clearly noted.
          </p>
        </header>

        <section aria-label="Product renders" className="space-y-8">
          <h2 className="border-b border-line pb-4 text-2xl font-light">A · 3D Product Stills</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productRenders.map((item) => (
              <figure key={item.label} className="panel overflow-hidden">
                <img
                  src={item.src}
                  alt={item.label}
                  className="h-56 w-full bg-[#0b0d0c] object-contain"
                />
                <figcaption className="border-t border-line px-4 py-3 font-mono text-xs text-muted">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section aria-label="Lifestyle and texture variations" className="space-y-12">
          <h2 className="border-b border-line pb-4 text-2xl font-light">B · Lifestyle &amp; Texture Contact Sheet</h2>
          {lifestyleGroups.map((group) => (
            <div key={group.slot} className="space-y-4">
              <h3 className="font-mono text-xs tracking-wider text-accent uppercase">{group.slot}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <figure key={item.src} className="panel overflow-hidden">
                    <img
                      src={item.src}
                      alt={`${group.slot} ${item.label}`}
                      className="h-56 w-full bg-[#0b0d0c] object-cover"
                    />
                    <figcaption className="border-t border-line px-4 py-2.5 font-mono text-xs text-muted">
                      {item.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
