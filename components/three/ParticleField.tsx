'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Animated particle field with noise-driven motion
export default function ParticleField({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null!);

  const { positions, colors, sizes, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#00ff88'),  // accent green
      new THREE.Color('#00ddff'),  // cyan
      new THREE.Color('#8855ff'),  // purple
      new THREE.Color('#ff44aa'),  // magenta
      new THREE.Color('#ffaa00'),  // gold
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute in a sphere-like volume
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 8;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Random color from palette
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Varying sizes
      sizes[i] = Math.random() * 3 + 0.5;

      // Drift velocities
      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.003;
    }

    return { positions, colors, sizes, velocities };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Gentle drift + breathing motion
      pos[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.01) * 0.001;
      pos[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.01) * 0.001;
      pos[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.25 + i * 0.005) * 0.001;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
