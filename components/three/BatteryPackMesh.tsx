"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type BatteryPartsMask = {
  enclosure: boolean;
  cap: boolean;
  handle: boolean;
  bms: boolean;
  cells: boolean;
};

export type BatteryPackProps = {
  /** 0 = factory assembled, 1 = full exploded assembly */
  explode?: number;
  /** Which components to show (for /lab/battery isolation inspection) */
  parts?: BatteryPartsMask;
  /** Pack indicator state light */
  ledState?: "charged" | "depleted";
  /** Optional slow idle turntable */
  autoRotate?: boolean;
  /** Group scale */
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  /** Show glowing BMS/cell pulse traces during explode */
  pulseIntensity?: number;
};

const DEFAULT_PARTS: BatteryPartsMask = {
  enclosure: true,
  cap: true,
  handle: true,
  bms: true,
  cells: true,
};

// Reference proportions: 1 : 1.6 : 2.4 (depth : width : height)
const W = 1.6;
const D = 1.0;
const BODY_H = 2.4;
const WALL = 0.058;
const CHAMFER = 0.068;

function createExtrudedBodyGeometry(): THREE.ExtrudeGeometry {
  const hw = W / 2;
  const hd = D / 2;
  const c = CHAMFER;
  const ribDepth = 0.022;
  const ribHalfW = 0.024;

  // Trace outer boundary clockwise in (x, z) with chamfered corners and 6 vertical ribs on +/-Z faces
  // Leaves a clean 0.56-wide central flat panel for the EzyEV logo (matching ref-2-front.jpg)
  const shape = new THREE.Shape();
  const longRibsX = [-0.68, -0.5, -0.32, 0.32, 0.5, 0.68];
  const shortRibsZ = [-0.22, 0.22];

  // Start top-left after chamfer
  shape.moveTo(-hw + c, hd);

  // Top edge (+Z front face) left -> right with 6 raised ribs
  for (const rx of longRibsX) {
    shape.lineTo(rx - ribHalfW * 1.4, hd);
    shape.lineTo(rx - ribHalfW * 0.7, hd + ribDepth);
    shape.lineTo(rx + ribHalfW * 0.7, hd + ribDepth);
    shape.lineTo(rx + ribHalfW * 1.4, hd);
  }
  shape.lineTo(hw - c, hd);
  shape.lineTo(hw, hd - c);

  // Right edge (+X face) top -> bottom with 2 ribs
  for (let i = shortRibsZ.length - 1; i >= 0; i--) {
    const rz = shortRibsZ[i];
    shape.lineTo(hw, rz + ribHalfW * 1.4);
    shape.lineTo(hw + ribDepth, rz + ribHalfW * 0.7);
    shape.lineTo(hw + ribDepth, rz - ribHalfW * 0.7);
    shape.lineTo(hw, rz - ribHalfW * 1.4);
  }
  shape.lineTo(hw, -hd + c);
  shape.lineTo(hw - c, -hd);

  // Bottom edge (-Z back face) right -> left with 6 raised ribs
  for (let i = longRibsX.length - 1; i >= 0; i--) {
    const rx = longRibsX[i];
    shape.lineTo(rx + ribHalfW * 1.4, -hd);
    shape.lineTo(rx + ribHalfW * 0.7, -hd - ribDepth);
    shape.lineTo(rx - ribHalfW * 0.7, -hd - ribDepth);
    shape.lineTo(rx - ribHalfW * 1.4, -hd);
  }
  shape.lineTo(-hw + c, -hd);
  shape.lineTo(-hw, -hd + c);

  // Left edge (-X face) bottom -> top with 2 ribs
  for (const rz of shortRibsZ) {
    shape.lineTo(-hw, rz - ribHalfW * 1.4);
    shape.lineTo(-hw - ribDepth, rz - ribHalfW * 0.7);
    shape.lineTo(-hw - ribDepth, rz + ribHalfW * 0.7);
    shape.lineTo(-hw, rz + ribHalfW * 1.4);
  }
  shape.lineTo(-hw, hd - c);
  shape.closePath();

  // Inner hollow cavity so top opening exposes real wall thickness when cap lifts
  const hole = new THREE.Path();
  const ihw = hw - WALL;
  const ihd = hd - WALL;
  const ic = 0.03;
  hole.moveTo(-ihw + ic, ihd);
  hole.lineTo(ihw - ic, ihd);
  hole.lineTo(ihw, ihd - ic);
  hole.lineTo(ihw, -ihd + ic);
  hole.lineTo(ihw - ic, -ihd);
  hole.lineTo(-ihw + ic, -ihd);
  hole.lineTo(-ihw, -ihd + ic);
  hole.lineTo(-ihw, ihd - ic);
  hole.closePath();
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: BODY_H,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 2,
    curveSegments: 4,
  });
  // Rotate so extrusion axis (Z) becomes vertical (+Y), centered in Y around 0
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, -BODY_H / 2, 0);
  geo.computeVertexNormals();
  return geo;
}

function createCapCollarGeometry(): THREE.ExtrudeGeometry {
  const hw = W / 2 + 0.032;
  const hd = D / 2 + 0.032;
  const c = 0.072;
  const s = new THREE.Shape();
  s.moveTo(-hw + c, hd);
  s.lineTo(hw - c, hd);
  s.lineTo(hw, hd - c);
  s.lineTo(hw, -hd + c);
  s.lineTo(hw - c, -hd);
  s.lineTo(-hw + c, -hd);
  s.lineTo(-hw, -hd + c);
  s.lineTo(-hw, hd - c);
  s.closePath();

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.135,
    bevelEnabled: true,
    bevelThickness: 0.016,
    bevelSize: 0.014,
    bevelSegments: 3,
  });
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function createHandleArmGeometry(): THREE.ExtrudeGeometry {
  // Arched U-upright profile in XY plane, extruded along Z
  const s = new THREE.Shape();
  s.moveTo(-0.56, 0);
  s.lineTo(-0.42, 0);
  s.lineTo(-0.39, 0.34);
  s.quadraticCurveTo(-0.38, 0.42, -0.3, 0.42);
  s.lineTo(0.3, 0.42);
  s.quadraticCurveTo(0.38, 0.42, 0.39, 0.34);
  s.lineTo(0.42, 0);
  s.lineTo(0.56, 0);
  s.lineTo(0.51, 0.42);
  s.quadraticCurveTo(0.49, 0.54, 0.36, 0.54);
  s.lineTo(-0.36, 0.54);
  s.quadraticCurveTo(-0.49, 0.54, -0.51, 0.42);
  s.closePath();

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  geo.translate(0, 0, -0.06);
  geo.computeVertexNormals();
  return geo;
}

function createLogoDecalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, 512, 512);

  // Subtle brushed silver ink matching ref-2-front.jpg
  const markScale = 0.56;
  ctx.save();
  ctx.translate(136, 60);
  ctx.scale(markScale, markScale);

  const ePath = new Path2D(
    "M411.83,274 A208,208 0 1,1 420.61,237 L84.99,237 A145,145 0 0,0 403.52,274 Z M84.99,174 A145,145 0 0,1 341.01,174 Z"
  );
  const boltPath = new Path2D(
    "M125.99,24.14 A208,208 0 0,1 196.46,5.66 L328.60,237 L200.00,237 L260.00,406 L122.00,174 L221.37,174 Z"
  );
  ctx.fillStyle = "rgba(226, 232, 229, 0.92)";
  ctx.fill(ePath, "evenodd");
  ctx.fillStyle = "rgba(244, 245, 243, 0.96)";
  ctx.fill(boltPath);
  ctx.restore();

  // Exact vectorized wordmark below mark
  ctx.save();
  ctx.translate(-34, -22);
  ctx.scale(1.38, 1.38);
  const wm = new Path2D(
    "M105,281 H136 V292 H118 V302 H135 V314 H118 V325 H136 V335 H105 Z M141,301 H176 L160,327 H174 V336 H139 L154,312 H141 Z M177,301 H191 L199,319 L207,303 H221 L196,353 H183 L194,331 Z M224,282 H256 V294 H238 V303 H256 V315 H238 V326 H256 V337 H224 Z M258,282 H272 L285,317 L299,282 H313 L291,336 H280 Z"
  );
  ctx.fillStyle = "rgba(226, 232, 229, 0.94)";
  ctx.fill(wm);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCarbonTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#141816";
  ctx.fillRect(0, 0, 256, 256);

  const cell = 16;
  for (let y = 0; y < 256; y += cell) {
    for (let x = 0; x < 256; x += cell) {
      const diag = ((x + y) / cell) % 2 === 0;
      ctx.fillStyle = diag ? "#1e2421" : "#111513";
      ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
      ctx.fillStyle = diag ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.22)";
      ctx.fillRect(x + 2, y + 2, cell - 4, 3);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 3);
  return tex;
}

function createDisplayTexture(ledState: "charged" | "depleted"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#080b09";
  ctx.fillRect(0, 0, 256, 128);

  // Subtle green bezel border
  ctx.strokeStyle = "#173324";
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 248, 120);

  // Neutral readout (no supplier brand, no serial/QR)
  ctx.fillStyle = ledState === "charged" ? "#24c768" : "#f59e0b";
  ctx.font = "600 44px monospace";
  ctx.textAlign = "center";
  ctx.fillText(ledState === "charged" ? "98%" : "14%", 128, 66);

  ctx.fillStyle = "#8aa195";
  ctx.font = "500 20px monospace";
  ctx.fillText(ledState === "charged" ? "PACK READY" : "SWAP DUE", 128, 102);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createAnodizedBump(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 128, 256);
  for (let x = 0; x < 128; x += 2) {
    const v = 118 + Math.floor(Math.sin(x * 0.9) * 10 + (x % 4 === 0 ? 6 : -4));
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(x, 0, 1, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 1);
  return tex;
}

export function BatteryPackMesh({
  explode = 0,
  parts = DEFAULT_PARTS,
  ledState = "charged",
  autoRotate = false,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  pulseIntensity = 1,
}: BatteryPackProps) {
  const rootRef = useRef<THREE.Group>(null);
  const pulseMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const geos = useMemo(() => {
    const body = createExtrudedBodyGeometry();
    const capCollar = createCapCollarGeometry();
    const handleArm = createHandleArmGeometry();

    // Bundled white sense-wire harness curves (matching ref-1-internals.jpg)
    const harness1 = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.34, 0.04, 0.18),
        new THREE.Vector3(-0.46, 0.14, 0.14),
        new THREE.Vector3(-0.44, -0.02, -0.1),
        new THREE.Vector3(-0.32, -0.22, -0.18),
      ]),
      24,
      0.018,
      8,
      false
    );
    const harness2 = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.32, 0.04, 0.16),
        new THREE.Vector3(0.44, 0.12, 0.06),
        new THREE.Vector3(0.4, -0.06, -0.14),
        new THREE.Vector3(0.28, -0.24, -0.12),
      ]),
      24,
      0.016,
      8,
      false
    );

    return { body, capCollar, handleArm, harness1, harness2 };
  }, []);

  const textures = useMemo(() => {
    return {
      decal: createLogoDecalTexture(),
      carbon: createCarbonTexture(),
      displayCharged: createDisplayTexture("charged"),
      displayDepleted: createDisplayTexture("depleted"),
      bump: createAnodizedBump(),
    };
  }, []);

  useFrame((state, delta) => {
    if (autoRotate && rootRef.current) {
      rootRef.current.rotation.y += delta * 0.22;
    }
    if (pulseMatRef.current) {
      const wave = 0.55 + 0.45 * Math.sin(state.clock.elapsedTime * 2.6);
      pulseMatRef.current.emissiveIntensity = (0.4 + explode * 1.4 * wave) * pulseIntensity;
    }
  });

  // Smooth exploded offsets
  const e = THREE.MathUtils.clamp(explode, 0, 1);
  const capLift = e * 1.38;
  const bmsLift = e * 0.96;
  const cellsLift = e * 0.68;
  const cellSpread = e * 0.14;

  // Perimeter hex screws coordinates
  const screwPositions = useMemo(() => {
    const list: [number, number][] = [];
    const xs = [-0.66, -0.33, 0, 0.33, 0.66];
    for (const x of xs) {
      list.push([x, D / 2 + 0.008]);
      list.push([x, -D / 2 - 0.008]);
    }
    const zs = [-0.24, 0.24];
    for (const z of zs) {
      list.push([-W / 2 - 0.008, z]);
      list.push([W / 2 + 0.008, z]);
    }
    return list;
  }, []);

  const statusColor = ledState === "charged" ? "#24c768" : "#f59e0b";

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      {/* 1. EXTRUDED GREEN ALUMINIUM ENCLOSURE */}
      {parts.enclosure && (
        <group>
          <mesh geometry={geos.body} castShadow receiveShadow>
            <meshStandardMaterial
              color="#0f7d3f"
              metalness={0.58}
              roughness={0.34}
              bumpMap={textures.bump}
              bumpScale={0.004}
            />
          </mesh>

          {/* Solid aluminium base plate */}
          <mesh position={[0, -BODY_H / 2 + 0.03, 0]} castShadow receiveShadow>
            <boxGeometry args={[W - 0.04, 0.06, D - 0.04]} />
            <meshStandardMaterial color="#0b5c2e" metalness={0.62} roughness={0.38} />
          </mesh>

          {/* Thin hollow silver gasket perimeter seam at top body join */}
          <group position={[0, BODY_H / 2 + 0.006, 0]}>
            <mesh position={[0, 0, D / 2 - 0.02]}>
              <boxGeometry args={[W + 0.018, 0.014, 0.056]} />
              <meshStandardMaterial color="#cfd6d2" metalness={0.78} roughness={0.26} />
            </mesh>
            <mesh position={[0, 0, -D / 2 + 0.02]}>
              <boxGeometry args={[W + 0.018, 0.014, 0.056]} />
              <meshStandardMaterial color="#cfd6d2" metalness={0.78} roughness={0.26} />
            </mesh>
            <mesh position={[-W / 2 + 0.02, 0, 0]}>
              <boxGeometry args={[0.056, 0.014, D - 0.04]} />
              <meshStandardMaterial color="#cfd6d2" metalness={0.78} roughness={0.26} />
            </mesh>
            <mesh position={[W / 2 - 0.02, 0, 0]}>
              <boxGeometry args={[0.056, 0.014, D - 0.04]} />
              <meshStandardMaterial color="#cfd6d2" metalness={0.78} roughness={0.26} />
            </mesh>
          </group>

          {/* EzyEV Logo decal on front face (+Z), centered cleanly inside the flat center bay */}
          <mesh position={[0, -0.14, D / 2 + 0.012]}>
            <planeGeometry args={[0.52, 0.52]} />
            <meshStandardMaterial
              map={textures.decal}
              transparent
              alphaTest={0.05}
              metalness={0.35}
              roughness={0.35}
            />
          </mesh>
        </group>
      )}

      {/* 2. INTERNAL CELL STACK (3x4 grid inside enclosure; rises & separates on explode) */}
      {parts.cells && (
        <group position={[0, -0.1 + cellsLift, 0]}>
          {[-1, 0, 1].map((col) =>
            [-1, 0, 1].map((row) => (
              <group
                key={`${col}-${row}`}
                position={[col * (0.42 + cellSpread * 1.15), 0, row * (0.24 + cellSpread * 0.9)]}
              >
                {/* Insulated cell module */}
                <mesh castShadow>
                  <boxGeometry args={[0.36, 1.48, 0.19]} />
                  <meshStandardMaterial color="#1f2622" metalness={0.35} roughness={0.45} />
                </mesh>
                {/* Safety yellow cell wrap band */}
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[0.366, 0.22, 0.196]} />
                  <meshStandardMaterial color="#d4a710" roughness={0.55} />
                </mesh>
                {/* Copper/silver top busbar bridge */}
                <mesh position={[0, 0.76, 0]}>
                  <boxGeometry args={[0.26, 0.03, 0.12]} />
                  <meshStandardMaterial color="#c8cfd0" metalness={0.85} roughness={0.22} />
                </mesh>
              </group>
            ))
          )}
          {/* Subtle energy pulse frame between cell banks */}
          {e > 0.05 && (
            <mesh position={[0, 0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.42, 0.455, 48]} />
              <meshStandardMaterial
                color="#24c768"
                emissive="#24c768"
                emissiveIntensity={e * 1.4}
                transparent
                opacity={e * 0.75}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      )}

      {/* 3. INTERNAL CARBON-TEXTURE BMS BOARD + WHITE HARNESS + RED BOOT */}
      {parts.bms && (
        <group position={[0, BODY_H / 2 - 0.18 + bmsLift, 0]}>
          {/* Carbon-weave BMS PCB & carrier */}
          <mesh castShadow>
            <boxGeometry args={[1.18, 0.06, 0.72]} />
            <meshStandardMaterial
              map={textures.carbon}
              color="#1c211e"
              metalness={0.28}
              roughness={0.42}
            />
          </mesh>

          {/* MOSFET heatsink block */}
          <mesh position={[0, 0.055, -0.06]} castShadow>
            <boxGeometry args={[0.56, 0.06, 0.3]} />
            <meshStandardMaterial color="#272d2a" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Glowing emerald PCB telemetry traces */}
          <mesh position={[0, 0.034, 0.18]}>
            <boxGeometry args={[0.88, 0.008, 0.025]} />
            <meshStandardMaterial
              ref={pulseMatRef}
              color="#24c768"
              emissive="#24c768"
              emissiveIntensity={0.6 + e * 1.6}
            />
          </mesh>
          <mesh position={[-0.22, 0.034, 0.04]}>
            <boxGeometry args={[0.025, 0.008, 0.34]} />
            <meshStandardMaterial color="#24c768" emissive="#24c768" emissiveIntensity={0.5 + e * 1.5} />
          </mesh>
          <mesh position={[0.24, 0.034, 0.04]}>
            <boxGeometry args={[0.025, 0.008, 0.34]} />
            <meshStandardMaterial color="#24c768" emissive="#24c768" emissiveIntensity={0.5 + e * 1.5} />
          </mesh>

          {/* Red positive terminal boot (matching ref-1-internals.jpg) */}
          <mesh position={[-0.44, 0.075, 0.22]} rotation={[0, 0.25, 0]}>
            <capsuleGeometry args={[0.036, 0.09, 6, 12]} />
            <meshStandardMaterial color="#d92d20" roughness={0.4} metalness={0.05} />
          </mesh>

          {/* White multi-pin sense headers */}
          {[-0.26, 0, 0.26].map((hx) => (
            <mesh key={hx} position={[hx, 0.05, 0.28]}>
              <boxGeometry args={[0.11, 0.04, 0.06]} />
              <meshStandardMaterial color="#eceeed" roughness={0.45} />
            </mesh>
          ))}

          {/* White bundled sense-wire harnesses */}
          <mesh geometry={geos.harness1}>
            <meshStandardMaterial color="#e7eae8" roughness={0.65} />
          </mesh>
          <mesh geometry={geos.harness2}>
            <meshStandardMaterial color="#e7eae8" roughness={0.65} />
          </mesh>
        </group>
      )}

      {/* 4. SAFETY-YELLOW MOLDED TOP CAP + TOP-PANEL HARDWARE */}
      {parts.cap && (
        <group position={[0, BODY_H / 2 + 0.015 + capLift, 0]}>
          {/* Main flanged yellow collar */}
          <mesh geometry={geos.capCollar} castShadow receiveShadow>
            <meshStandardMaterial color="#f8c812" roughness={0.48} metalness={0.06} />
          </mesh>

          {/* Cap underside gasket seal (visible when cap lifts in exploded view) */}
          <mesh position={[0, -0.006, 0]}>
            <boxGeometry args={[W - 0.04, 0.014, D - 0.04]} />
            <meshStandardMaterial color="#1a1d1c" roughness={0.85} />
          </mesh>

          {/* Perimeter socket-head hex screws */}
          {screwPositions.map(([sx, sz], idx) => (
            <group key={idx} position={[sx, 0.15, sz]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.018, 12]} />
                <meshStandardMaterial color="#d7ddda" metalness={0.88} roughness={0.22} />
              </mesh>
            </group>
          ))}

          {/* Raised center-rear deck housing the rectangular display window */}
          <mesh position={[0, 0.19, -0.04]} castShadow receiveShadow>
            <boxGeometry args={[1.08, 0.12, 0.56]} />
            <meshStandardMaterial color="#f8c812" roughness={0.48} metalness={0.06} />
          </mesh>

          {/* Rectangular display window bezel + readout */}
          <mesh position={[0, 0.254, 0.04]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.42, 0.21]} />
            <meshStandardMaterial
              map={ledState === "charged" ? textures.displayCharged : textures.displayDepleted}
              emissiveMap={ledState === "charged" ? textures.displayCharged : textures.displayDepleted}
              emissive="#ffffff"
              emissiveIntensity={0.65}
              roughness={0.18}
              metalness={0.1}
            />
          </mesh>

          {/* Front-left round metal key switch + state LED */}
          <group position={[-0.52, 0.16, 0.28]}>
            <mesh>
              <cylinderGeometry args={[0.068, 0.074, 0.045, 24]} />
              <meshStandardMaterial color="#cfd6d2" metalness={0.88} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.024, 0]}>
              <cylinderGeometry args={[0.042, 0.042, 0.01, 24]} />
              <meshStandardMaterial color="#9aa49e" metalness={0.85} roughness={0.28} />
            </mesh>
            {/* Key slot */}
            <mesh position={[0, 0.03, 0]}>
              <boxGeometry args={[0.045, 0.008, 0.01]} />
              <meshStandardMaterial color="#101211" />
            </mesh>
            {/* Neutral state LED pip beside key switch */}
            <mesh position={[-0.14, 0.01, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.02, 16]} />
              <meshStandardMaterial
                color={statusColor}
                emissive={statusColor}
                emissiveIntensity={1.6}
              />
            </mesh>
          </group>

          {/* Front-right stepped connector deck: two silver cable glands + black Anderson connector */}
          <group position={[0.32, 0.17, 0.27]}>
            {/* Two metallic cable glands */}
            {[-0.06, 0.06].map((gz, gi) => (
              <group key={gi} position={[-0.22, 0.02, gz]} rotation={[0, 0, Math.PI / 2]}>
                <mesh>
                  <cylinderGeometry args={[0.036, 0.036, 0.08, 6]} />
                  <meshStandardMaterial color="#d2d8d5" metalness={0.9} roughness={0.22} />
                </mesh>
                <mesh position={[0, -0.055, 0]}>
                  <cylinderGeometry args={[0.022, 0.026, 0.05, 16]} />
                  <meshStandardMaterial color="#181b1a" roughness={0.75} />
                </mesh>
              </group>
            ))}

            {/* Heavy black leads */}
            {[-0.06, 0.06].map((gz, gi) => (
              <mesh key={`lead-${gi}`} position={[-0.09, 0.02, gz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.022, 0.022, 0.16, 12]} />
                <meshStandardMaterial color="#121413" roughness={0.8} />
              </mesh>
            ))}

            {/* Black high-current Anderson-style connector */}
            <mesh position={[0.14, 0.03, 0]} castShadow>
              <boxGeometry args={[0.32, 0.095, 0.23]} />
              <meshStandardMaterial color="#151817" roughness={0.55} metalness={0.12} />
            </mesh>
            {/* Connector locking ridge */}
            <mesh position={[0.04, 0.082, 0]}>
              <boxGeometry args={[0.09, 0.02, 0.19]} />
              <meshStandardMaterial color="#1f2422" roughness={0.5} />
            </mesh>
          </group>
        </group>
      )}

      {/* 5. ARCHED YELLOW HANDLE WITH BLACK RIBBED RUBBER GRIP */}
      {parts.handle && (
        <group position={[0, BODY_H / 2 + 0.25 + capLift, -0.04]}>
          <mesh geometry={geos.handleArm} castShadow receiveShadow>
            <meshStandardMaterial color="#f8c812" roughness={0.48} metalness={0.06} />
          </mesh>

          {/* Black ribbed rubber grip wrapping the crossbar */}
          <group position={[0, 0.48, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.74, 0.155, 0.165]} />
              <meshStandardMaterial color="#151716" roughness={0.88} metalness={0.04} />
            </mesh>
            {/* Ergonomic rubber grip ribs */}
            {[-0.27, -0.18, -0.09, 0, 0.09, 0.18, 0.27].map((gx) => (
              <mesh key={gx} position={[gx, 0, 0]}>
                <boxGeometry args={[0.028, 0.165, 0.175]} />
                <meshStandardMaterial color="#0d0f0e" roughness={0.92} />
              </mesh>
            ))}
          </group>
        </group>
      )}
    </group>
  );
}
