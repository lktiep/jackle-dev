'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import GlowOrb from './GlowOrb';
import ParticleField from './ParticleField';
import FloatingGeometry from './FloatingGeometry';

function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    if (groupRef.current) {
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
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00ff88" />
      <pointLight position={[-5, -3, 3]} intensity={1} color="#8855ff" />
      <pointLight position={[0, 3, -5]} intensity={0.8} color="#00ddff" />

      <MouseParallax>
        {/* Centerpiece: Morphing Glow Orb */}
        <Float speed={1.5} floatIntensity={0.5} rotationIntensity={0.3}>
          <GlowOrb />
        </Float>

        {/* Particle Field Background */}
        <ParticleField count={2500} />

        {/* Accent wireframe geometries */}
        <FloatingGeometry
          position={[-5, 2.5, -3]}
          geometry="torus"
          color="#00ddff"
          scale={0.6}
          rotationSpeed={0.3}
        />
        <FloatingGeometry
          position={[5.5, -1.5, -4]}
          geometry="octahedron"
          color="#8855ff"
          scale={0.5}
          rotationSpeed={0.4}
        />
        <FloatingGeometry
          position={[-4, -3, -2]}
          geometry="dodecahedron"
          color="#ff44aa"
          scale={0.4}
          rotationSpeed={0.25}
        />
        <FloatingGeometry
          position={[4, 3, -5]}
          geometry="icosahedron"
          color="#ffaa00"
          scale={0.35}
          rotationSpeed={0.35}
        />

        {/* Deep star field */}
        <Stars
          radius={50}
          depth={60}
          count={3000}
          factor={4}
          saturation={0.8}
          fade
          speed={0.8}
        />
      </MouseParallax>

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0005, 0.0005)}
          radialModulation={true}
          modulationOffset={0.5}
        />
      </EffectComposer>
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
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
