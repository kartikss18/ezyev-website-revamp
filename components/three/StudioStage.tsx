"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";

export function StudioStage({
  shadowY = -1.35,
  showShadow = true,
  transparentBg = false,
}: {
  shadowY?: number;
  showShadow?: boolean;
  transparentBg?: boolean;
}) {
  return (
    <>
      {!transparentBg && <color attach="background" args={["#0b0d0c"]} />}

      {/* Soft studio key + cool rim lighting */}
      <ambientLight intensity={0.28} />
      <directionalLight
        position={[4.2, 6.5, 4.8]}
        intensity={2.1}
        color="#f7f9f7"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      {/* Cool architectural rim light from rear-left */}
      <directionalLight position={[-4.5, 3.2, -3.8]} intensity={1.35} color="#bcead1" />
      {/* Subtle bottom bounce fill */}
      <directionalLight position={[0, -3.5, 2.5]} intensity={0.35} color="#9bb5a6" />

      {/* Procedural HDRI studio reflections — zero external network fetch */}
      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 3, 0, 0.2]}>
          <Lightformer
            form="rect"
            intensity={2.8}
            position={[0, 5, -2]}
            scale={[10, 4, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            position={[-6, 1.5, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[8, 3, 1]}
            color="#d8f5e3"
          />
          <Lightformer
            form="rect"
            intensity={1.2}
            position={[6, 2, 1]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[8, 2.5, 1]}
            color="#eef2f0"
          />
          <Lightformer
            form="ring"
            intensity={0.7}
            position={[0, 1, -6]}
            scale={[6, 6, 1]}
            color="#9ee8be"
          />
        </group>
      </Environment>

      {showShadow && (
        <ContactShadows
          position={[0, shadowY, 0]}
          opacity={0.48}
          scale={5.2}
          blur={2.8}
          far={3.5}
          frames={1}
          resolution={256}
          color="#040504"
        />
      )}
    </>
  );
}
