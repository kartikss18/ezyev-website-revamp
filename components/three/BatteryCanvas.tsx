"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { StudioStage } from "./StudioStage";
import { BatteryPackMesh, type BatteryPartsMask } from "./BatteryPackMesh";
import { SwapAssembly } from "./SwapAssembly";

export type BatterySceneConfig = {
  mode: "pack" | "swap";
  explode?: number;
  parts?: BatteryPartsMask;
  ledState?: "charged" | "depleted";
  autoRotate?: boolean;
  swapProgress?: number;
  swapAutoPlay?: boolean;
  orbit?: boolean;
  cameraPos?: [number, number, number];
  fov?: number;
  packRotation?: [number, number, number];
};

export function BatteryCanvas({
  config,
  className = "h-full w-full",
  ariaLabel = "Interactive 3D EzyEV battery pack",
}: {
  config: BatterySceneConfig;
  className?: string;
  ariaLabel?: string;
}) {
  const camPos = config.cameraPos ?? (config.mode === "swap" ? [3.6, 1.8, 4.6] : [2.85, 1.65, 3.65]);
  const fov = config.fov ?? 34;

  return (
    <div className={className} role="img" aria-label={ariaLabel}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: camPos, fov, near: 0.1, far: 40 }}
        gl={{ antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <StudioStage shadowY={config.mode === "swap" ? -1.52 : -1.35} />
          {config.mode === "pack" ? (
            <BatteryPackMesh
              explode={config.explode ?? 0}
              parts={config.parts}
              ledState={config.ledState ?? "charged"}
              autoRotate={config.autoRotate ?? false}
              rotation={config.packRotation ?? [0, -0.35, 0]}
              scale={0.95}
            />
          ) : (
            <SwapAssembly
              progress={config.swapProgress ?? 0.5}
              autoPlay={config.swapAutoPlay ?? false}
            />
          )}
          {config.orbit && (
            <OrbitControls
              target={[0, 0.22, 0]}
              enablePan={false}
              enableZoom={true}
              minDistance={3.2}
              maxDistance={9}
              maxPolarAngle={Math.PI / 1.85}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
