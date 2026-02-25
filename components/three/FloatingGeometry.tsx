'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingGeometryProps {
  geometry: 'torus' | 'icosahedron' | 'octahedron' | 'dodecahedron' | 'torusKnot';
  position: [number, number, number];
  color?: string;
  scale?: number;
  rotationSpeed?: number;
  floatSpeed?: number;
  floatAmplitude?: number;
}

export default function FloatingGeometry({
  geometry,
  position,
  color = '#00ff88',
  scale = 1,
  rotationSpeed = 0.3,
  floatSpeed = 1,
  floatAmplitude = 0.3,
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialY = position[1];

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.1,
        roughness: 0.2,
        transparent: true,
        opacity: 0.5,
        wireframe: true,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.5,
        toneMapped: false,
      }),
    [color]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    meshRef.current.rotation.x += 0.001 * rotationSpeed;
    meshRef.current.rotation.y += 0.002 * rotationSpeed;
    meshRef.current.rotation.z += 0.0005 * rotationSpeed;

    meshRef.current.position.y =
      initialY + Math.sin(t * floatSpeed) * floatAmplitude;
    meshRef.current.position.x =
      position[0] + Math.cos(t * floatSpeed * 0.7) * floatAmplitude * 0.3;
  });

  const geometryNode = useMemo(() => {
    switch (geometry) {
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 1]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[0.8, 0.3, 64, 8]} />;
      default:
        return <icosahedronGeometry args={[1, 1]} />;
    }
  }, [geometry]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      material={material}
    >
      {geometryNode}
    </mesh>
  );
}
