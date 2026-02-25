'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import FloatingGeometry from './FloatingGeometry';

function MouseParallax() {
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.15,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.1,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <FloatingGeometry
        geometry="torusKnot"
        position={[0, 0, -2]}
        color="#00ff88"
        scale={1.2}
        rotationSpeed={0.5}
        floatSpeed={0.8}
        floatAmplitude={0.2}
      />
      <FloatingGeometry
        geometry="icosahedron"
        position={[-3.5, 1.5, -3]}
        color="#00d4ff"
        scale={0.7}
        rotationSpeed={0.8}
        floatSpeed={1.2}
        floatAmplitude={0.4}
      />
      <FloatingGeometry
        geometry="octahedron"
        position={[3.5, -1, -4]}
        color="#8855ff"
        scale={0.6}
        rotationSpeed={0.6}
        floatSpeed={0.9}
        floatAmplitude={0.35}
      />
      <FloatingGeometry
        geometry="torus"
        position={[-2, -2, -5]}
        color="#ff5588"
        scale={0.5}
        rotationSpeed={0.4}
        floatSpeed={1.1}
        floatAmplitude={0.25}
      />
      <FloatingGeometry
        geometry="dodecahedron"
        position={[2.5, 2, -6]}
        color="#00ff88"
        scale={0.4}
        rotationSpeed={0.7}
        floatSpeed={1.3}
        floatAmplitude={0.3}
      />
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00ff88" />
      <pointLight position={[-5, -5, 3]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[0, 3, -5]} intensity={0.3} color="#8855ff" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'auto' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <MouseParallax />
          <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <Stars
              radius={50}
              depth={80}
              count={1500}
              factor={3}
              saturation={0}
              fade
              speed={0.5}
            />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
