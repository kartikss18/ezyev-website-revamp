/*
  2D SVG line-art battery pack for engineering diagrams, specs, and icons.
  Proportions derived directly from the 1 : 1.6 : 2.4 physical enclosure.
*/

export function BatteryLineArt({ className = "w-full max-w-[220px] h-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 340" fill="none" aria-hidden className={className}>
      {/* Arched handle & rubber grip */}
      <path
        d="M78 58 L84 24 Q86 16 96 16 H144 Q154 16 156 24 L162 58"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.85"
      />
      <rect x="92" y="12" width="56" height="14" rx="4" stroke="#F8C812" strokeWidth="1.5" />
      {/* Ribbed grip notches */}
      <path d="M104 12 V26 M114 12 V26 M126 12 V26 M136 12 V26" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />

      {/* Top cap + raised display deck */}
      <rect x="44" y="58" width="152" height="24" rx="4" stroke="#F8C812" strokeWidth="1.5" />
      <rect x="74" y="46" width="92" height="12" rx="2" stroke="#F8C812" strokeOpacity="0.7" strokeWidth="1.2" />
      {/* Key switch & Anderson connector silhouettes */}
      <circle cx="62" cy="70" r="5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="148" y="64" width="32" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />

      {/* Silver gasket line */}
      <line x1="46" y1="84" x2="194" y2="84" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 3" />

      {/* Extruded green aluminium body with chamfered corners & vertical ribs */}
      <path
        d="M52 86 H188 L194 92 V304 L188 310 H52 L46 304 V92 Z"
        stroke="#24C768"
        strokeWidth="1.6"
      />
      {/* 6 vertical ribs along front face */}
      {[64, 86, 108, 132, 154, 176].map((x) => (
        <line
          key={x}
          x1={x}
          y1="88"
          x2={x}
          y2="308"
          stroke="#24C768"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      ))}

      {/* Internal BMS & cell stack dashed blueprint lines + animated scan beam */}
      <rect x="58" y="96" width="124" height="20" rx="2" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="4 3" />
      <rect x="58" y="126" width="124" height="164" rx="2" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="4 3" />
      <line
        x1="60"
        y1="130"
        x2="180"
        y2="130"
        stroke="#24C768"
        strokeWidth="1.8"
        className="animate-scan-beam"
      />
      <circle cx="170" cy="106" r="3" fill="#24C768" />
      <circle cx="170" cy="106" r="6" stroke="#24C768" strokeWidth="1" className="animate-pulse-ring" />

      {/* Dimension callouts */}
      <line x1="28" y1="86" x2="28" y2="310" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="23" y1="86" x2="33" y2="86" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="23" y1="310" x2="33" y2="310" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      <text x="16" y="202" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace" transform="rotate(-90 16 202)">
        2.4H
      </text>

      <line x1="46" y1="328" x2="194" y2="328" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="46" y1="323" x2="46" y2="333" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="194" y1="323" x2="194" y2="333" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      <text x="108" y="338" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">
        1.6W
      </text>
    </svg>
  );
}
