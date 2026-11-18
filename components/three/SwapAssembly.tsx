"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BatteryPackMesh } from "./BatteryPackMesh";

export function SwapAssembly({
  /** 0..1 animation progress of the full swap cycle */
  progress = 0.5,
  /** Optional continuous loop when previewing without scroll */
  autoPlay = false,
}: {
  progress?: number;
  autoPlay?: boolean;
}) {
  const depletedRef = useRef<THREE.Group>(null);
  const chargedRef = useRef<THREE.Group>(null);
  const slotGlowRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const t = autoPlay ? (state.clock.elapsedTime * 0.22) % 1 : THREE.MathUtils.clamp(progress, 0, 1);

    // Phase 1 (0.00 -> 0.45): depleted pack (amber) slides forward & up out of the dock
    // Phase 2 (0.45 -> 0.90): charged pack (green) glides in and locks flush into the bay
    const pOut = THREE.MathUtils.smoothstep(t, 0.04, 0.46);
    const pIn = THREE.MathUtils.smoothstep(t, 0.44, 0.9);

    if (depletedRef.current) {
      depletedRef.current.position.set(
        -pOut * 2.15,
        pOut * 0.45,
        pOut * 1.45
      );
      depletedRef.current.rotation.y = -0.25 * pOut;
      depletedRef.current.visible = pOut < 0.98;
    }

    if (chargedRef.current) {
      const inv = 1 - pIn;
      chargedRef.current.position.set(
        inv * 2.15,
        inv * 0.42,
        inv * 1.45
      );
      chargedRef.current.rotation.y = 0.22 * inv;
      chargedRef.current.visible = t > 0.35;
    }

    if (slotGlowRef.current) {
      const locked = pIn > 0.92;
      slotGlowRef.current.color.set(locked ? "#24c768" : pOut > 0.1 && pIn < 0.9 ? "#f8c812" : "#f59e0b");
      slotGlowRef.current.emissive.set(locked ? "#24c768" : pOut > 0.1 && pIn < 0.9 ? "#f8c812" : "#f59e0b");
      slotGlowRef.current.emissiveIntensity = locked ? 2.2 : 1.1;
    }
  });

  return (
    <group position={[0, -0.15, 0]}>
      {/* Minimal unbranded graphite dock slot */}
      <group position={[0, -0.08, -0.35]}>
        {/* Outer matte anodized dock bay housing */}
        <mesh position={[0, 0, -0.12]} receiveShadow castShadow>
          <boxGeometry args={[2.16, 2.75, 1.38]} />
          <meshStandardMaterial color="#141816" metalness={0.5} roughness={0.55} />
        </mesh>
        {/* Recessed dark interior bay cavity */}
        <mesh position={[0, 0.04, 0.08]}>
          <boxGeometry args={[1.78, 2.48, 1.16]} />
          <meshStandardMaterial color="#090b0a" roughness={0.8} />
        </mesh>
        {/* Bay floor rail guides */}
        {[-0.65, 0.65].map((rx) => (
          <mesh key={rx} position={[rx, -1.16, 0.14]}>
            <boxGeometry args={[0.08, 0.04, 1.15]} />
            <meshStandardMaterial color="#2a312d" metalness={0.75} roughness={0.35} />
          </mesh>
        ))}
        {/* Minimal dock top status bar */}
        <mesh position={[0, 1.29, 0.575]}>
          <boxGeometry args={[1.42, 0.032, 0.02]} />
          <meshStandardMaterial
            ref={slotGlowRef}
            color="#24c768"
            emissive="#24c768"
            emissiveIntensity={1.6}
          />
        </mesh>
        {/* Architectural dock plinth */}
        <mesh position={[0, -1.42, 0.15]} receiveShadow>
          <boxGeometry args={[2.55, 0.12, 1.9]} />
          <meshStandardMaterial color="#101412" metalness={0.4} roughness={0.65} />
        </mesh>
      </group>

      {/* Depleted pack sliding out (amber state light) */}
      <group ref={depletedRef}>
        <BatteryPackMesh scale={0.92} ledState="depleted" explode={0} />
      </group>

      {/* Charged pack sliding in (green glow) */}
      <group ref={chargedRef}>
        <BatteryPackMesh scale={0.92} ledState="charged" explode={0} />
      </group>
    </group>
  );
}
