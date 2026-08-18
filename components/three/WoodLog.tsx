"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { createBarkMaterial, createMillMaterial, createRingMaterial } from "./materials";

const RADIUS = 1.05;
const HEIGHT = 3.4;
const MILL_ARC = Math.PI * 0.4;
const LOGO_ASPECT = 463 / 1106;
const DECAL_WIDTH = RADIUS * 1.5;
const DECAL_HEIGHT = DECAL_WIDTH * LOGO_ASPECT;

interface WoodLogProps {
  scrollProgress: React.MutableRefObject<number>;
}

export default function WoodLog({ scrollProgress }: WoodLogProps) {
  const dynamicGroup = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const barkMaterial = useMemo(
    () => createBarkMaterial("#2c1a11", "#5a3d24"),
    []
  );
  const millMaterial = useMemo(
    () => createMillMaterial("#c9a06b", "#8c6239"),
    []
  );
  const ringMaterial = useMemo(
    () => createRingMaterial(RADIUS, "#3a2416", "#8c6239", "#e3c99a"),
    []
  );

  const logoTexture = useTexture("/golden-timbers-logo.png");
  logoTexture.colorSpace = THREE.SRGBColorSpace;
  logoTexture.anisotropy = 8;

  const spin = useRef(0);

  useFrame((_state, delta) => {
    const group = dynamicGroup.current;
    if (!group) return;

    spin.current += delta * 0.16;
    const progress = scrollProgress.current;

    const targetTiltX = pointer.current.y * 0.16 + progress * 1.05;
    const targetTiltZ = -pointer.current.x * 0.16;

    group.rotation.y = spin.current;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetTiltX, 0.055);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetTiltZ, 0.055);

    const targetScale = THREE.MathUtils.lerp(1, 0.58, progress);
    const nextScale = THREE.MathUtils.lerp(group.scale.x, targetScale, 0.09);
    group.scale.setScalar(nextScale);

    group.position.x = THREE.MathUtils.lerp(group.position.x, progress * 1.6, 0.08);
    group.position.y = THREE.MathUtils.lerp(group.position.y, -progress * 0.9, 0.08);
  });

  return (
    <group rotation={[0.36, 0.42, -0.14]}>
      <group ref={dynamicGroup}>
        <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.55} floatingRange={[-0.09, 0.09]}>
          <group>
            <mesh material={barkMaterial} castShadow receiveShadow>
              <cylinderGeometry
                args={[RADIUS, RADIUS, HEIGHT, 72, 1, true, 0, Math.PI * 2 - MILL_ARC]}
              />
            </mesh>
            <mesh material={millMaterial} castShadow receiveShadow>
              <cylinderGeometry
                args={[RADIUS * 0.985, RADIUS * 0.985, HEIGHT, 28, 1, true, Math.PI * 2 - MILL_ARC, MILL_ARC]}
              />
            </mesh>
            <mesh position={[0, HEIGHT / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={ringMaterial} castShadow receiveShadow>
              <circleGeometry args={[RADIUS, 72]} />
            </mesh>
            <mesh position={[0, -HEIGHT / 2, 0]} rotation={[Math.PI / 2, 0, 0]} material={ringMaterial} receiveShadow>
              <circleGeometry args={[RADIUS, 72]} />
            </mesh>
            <mesh position={[0, HEIGHT / 2 + 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[DECAL_WIDTH, DECAL_HEIGHT]} />
              <meshBasicMaterial
                map={logoTexture}
                transparent
                alphaTest={0.4}
                toneMapped={false}
                polygonOffset
                polygonOffsetFactor={-1}
              />
            </mesh>
          </group>
        </Float>
      </group>
    </group>
  );
}
