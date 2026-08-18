"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import WoodLog from "./WoodLog";

interface SceneProps {
  scrollProgress: React.MutableRefObject<number>;
}

export default function Scene({ scrollProgress }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0.6, 0.3, 9.2], fov: 27 }}
      className="!touch-auto"
    >
      <ambientLight intensity={0.85} color="#f2ede3" />
      <directionalLight position={[4, 5, 3]} intensity={1.5} color="#ffe6c2" />
      <directionalLight position={[-4, -1.5, -3]} intensity={0.75} color="#d8c9a8" />
      <pointLight position={[0, -2.5, 3]} intensity={0.55} color="#b3875a" />
      <Suspense fallback={null}>
        <group position={[1.9, -0.35, 0]} scale={0.78}>
          <WoodLog scrollProgress={scrollProgress} />
        </group>
      </Suspense>
    </Canvas>
  );
}
