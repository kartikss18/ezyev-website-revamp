"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useSearchParams } from "next/navigation";
import { StudioStage } from "@/components/three/StudioStage";
import { BatteryPackMesh } from "@/components/three/BatteryPackMesh";
import { SwapAssembly } from "@/components/three/SwapAssembly";

function ShotCamera({
  pos,
  target = [0, 0, 0],
  onReady,
}: {
  pos: [number, number, number];
  target?: [number, number, number];
  onReady: () => void;
}) {
  const { camera } = useThree();
  const frames = useRef(0);
  const notified = useRef(false);

  useEffect(() => {
    frames.current = 0;
    notified.current = false;
    camera.position.set(...pos);
    camera.lookAt(...target);
    camera.updateProjectionMatrix();
  }, [camera, pos, target]);

  useFrame(() => {
    frames.current += 1;
    if (!notified.current && frames.current >= 6) {
      notified.current = true;
      onReady();
    }
  });
  return null;
}

function KioskBay({ variant }: { variant: 1 | 2 | 3 }) {
  const glow = variant === 2 ? "#24c768" : "#18a956";
  return (
    <group position={[0, -0.35, 0]}>
      <mesh position={[0, 0.25, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 3.6, 1.5]} />
        <meshStandardMaterial color="#131715" metalness={0.45} roughness={0.55} />
      </mesh>
      <mesh position={[0, -1.62, -0.25]} receiveShadow>
        <boxGeometry args={[4.8, 0.16, 1.9]} />
        <meshStandardMaterial color="#0d100f" roughness={0.8} />
      </mesh>
      {[-1.35, 0, 1.35].map((bx, ci) =>
        [0.95, -0.35].map((by, ri) => (
          <group key={`${ci}-${ri}`} position={[bx, by, 0.36]}>
            <mesh>
              <boxGeometry args={[1.08, 1.08, 0.08]} />
              <meshStandardMaterial color="#090b0a" roughness={0.75} />
            </mesh>
            <mesh position={[0, 0.45, 0.045]}>
              <boxGeometry args={[0.72, 0.03, 0.02]} />
              <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={variant === 3 && ci === 1 ? 0.4 : 2.1} />
            </mesh>
            {!(ci === 1 && ri === 0) && (
              <mesh position={[0, -0.04, 0.02]}>
                <boxGeometry args={[0.88, 0.86, 0.05]} />
                <meshStandardMaterial color="#0f7d3f" metalness={0.55} roughness={0.38} />
              </mesh>
            )}
          </group>
        ))
      )}
    </group>
  );
}

function RenderViewport() {
  const params = useSearchParams();
  const shot = params.get("shot") || "hero";
  const w = Number(params.get("w") || 1280);
  const h = Number(params.get("h") || 720);
  const [ready, setReady] = useState(false);

  const presets: Record<
    string,
    {
      cam: [number, number, number];
      target?: [number, number, number];
      fov?: number;
      explode?: number;
      rot?: [number, number, number];
      kind: "pack" | "swap" | "lineup" | "kiosk1" | "kiosk2" | "kiosk3";
      transparent?: boolean;
    }
  > = {
    hero: { cam: [3.35, 1.95, 4.65], target: [0, 0.25, 0], fov: 34, explode: 0, rot: [0, -0.35, 0], kind: "pack" },
    heroMobile: { cam: [3.1, 1.8, 4.95], target: [0, 0.25, 0], fov: 36, explode: 0, rot: [0, -0.3, 0], kind: "pack" },
    front: { cam: [0, 0.25, 5.45], target: [0, 0.25, 0], fov: 32, explode: 0, rot: [0, 0, 0], kind: "pack" },
    top: { cam: [0.01, 3.85, 0.8], target: [0, 1.32, 0], fov: 34, explode: 0, rot: [0, 0, 0], kind: "pack" },
    exploded: { cam: [3.9, 2.6, 5.45], target: [0.45, 0.65, 0], fov: 35, explode: 1, rot: [0, -0.32, 0], kind: "pack" },
    macroRibs: { cam: [1.55, -0.1, 1.45], target: [0.68, -0.15, 0.45], fov: 28, explode: 0, rot: [0, 0, 0], kind: "pack" },
    macroConnector: { cam: [1.05, 2.25, 1.15], target: [0.35, 1.38, 0.25], fov: 26, explode: 0, rot: [0, 0, 0], kind: "pack" },
    macroKey: { cam: [-0.85, 2.25, 1.15], target: [-0.45, 1.38, 0.22], fov: 26, explode: 0, rot: [0, 0, 0], kind: "pack" },
    macroBms: { cam: [1.35, 2.55, 1.65], target: [0, 1.64, 0], fov: 28, explode: 1, rot: [0, -0.25, 0], kind: "pack" },
    macroCells: { cam: [1.65, 0.9, 1.85], target: [0, 0.15, 0], fov: 28, explode: 1, rot: [0, -0.3, 0], kind: "pack" },
    swap: { cam: [4.35, 2.25, 5.75], target: [0, 0.15, 0], fov: 34, kind: "swap" },
    lineup: { cam: [0.6, 1.85, 6.2], target: [0, 0.25, 0], fov: 32, kind: "lineup" },
    og: { cam: [3.1, 1.85, 4.9], target: [-1.05, 0.25, 0], fov: 34, explode: 0, rot: [0, -0.35, 0], kind: "pack" },
    handsPack: { cam: [0.18, 0.95, 5.6], target: [0, 0.18, 0], fov: 34, explode: 0, rot: [0, -0.12, 0], kind: "pack", transparent: true },
    kiosk1: { cam: [3.6, 1.4, 5.8], target: [0, 0.1, 0], fov: 36, kind: "kiosk1" },
    kiosk2: { cam: [-3.4, 1.2, 5.6], target: [0, 0.1, 0], fov: 36, kind: "kiosk2" },
    kiosk3: { cam: [1.2, 1.6, 6.4], target: [0, 0.2, 0], fov: 34, kind: "kiosk3" },
  };

  const cfg = presets[shot] ?? presets.hero;

  return (
    <div style={{ width: w, height: h }} data-render-ready={ready ? "1" : "0"} className="bg-[#0b0d0c]">
      <Canvas
        shadows
        dpr={1}
        camera={{ position: cfg.cam, fov: cfg.fov ?? 34, near: 0.1, far: 50 }}
        gl={{ antialias: true, preserveDrawingBuffer: true, alpha: !!cfg.transparent }}
      >
        <Suspense fallback={null}>
          <ShotCamera pos={cfg.cam} target={cfg.target ?? [0, 0, 0]} onReady={() => setReady(true)} />
          <StudioStage showShadow={!cfg.transparent} transparentBg={!!cfg.transparent} />
          {cfg.kind === "pack" && (
            <BatteryPackMesh explode={cfg.explode ?? 0} rotation={cfg.rot ?? [0, 0, 0]} scale={0.95} />
          )}
          {cfg.kind === "swap" && <SwapAssembly progress={0.62} />}
          {cfg.kind === "lineup" && (
            <group>
              <BatteryPackMesh position={[-1.95, 0, -0.9]} rotation={[0, 0.2, 0]} scale={0.9} />
              <BatteryPackMesh position={[0, 0, 0.25]} rotation={[0, -0.1, 0]} scale={0.95} />
              <BatteryPackMesh position={[1.95, 0, -0.65]} rotation={[0, -0.35, 0]} scale={0.9} />
            </group>
          )}
          {cfg.kind === "kiosk1" && <KioskBay variant={1} />}
          {cfg.kind === "kiosk2" && <KioskBay variant={2} />}
          {cfg.kind === "kiosk3" && <KioskBay variant={3} />}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function RenderLabPage() {
  return (
    <div className="min-h-screen bg-[#0b0d0c]">
      <Suspense fallback={null}>
        <RenderViewport />
      </Suspense>
    </div>
  );
}
