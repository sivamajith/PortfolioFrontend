import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';
import * as THREE from 'three';

function MorphingSphere() {
  const { isDark } = useTheme();
  const meshRef = useRef();
  const timeRef = useRef(0);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 6);
    return geo;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    timeRef.current += 0.005;
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.z += 0.0005;

    // Morph effect
    const positions = geometry.attributes.position.array;
    const length = positions.length;

    for (let i = 0; i < length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      const scale = 1 + 0.2 * Math.sin(timeRef.current + (x + y + z) * 5);

      positions[i] = x * scale;
      positions[i + 1] = y * scale;
      positions[i + 2] = z * scale;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhongMaterial
        color={isDark ? '#4ECDC4' : '#5FD9D1'}
        emissive={isDark ? '#4ECDC4' : '#5FD9D1'}
        emissiveIntensity={0.5}
        wireframe={true}
        wireframeLinewidth={1}
      />
    </mesh>
  );
}

export default function MorphingSphereComponent() {
  const { isDark } = useTheme();

  return (
    <Canvas
      style={{
        width: '100%',
        height: '100%',
      }}
      camera={{ position: [0, 0, 2.5], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <fog attach="fog" args={[isDark ? '#0b0b0b' : '#f5f5f5', 3, 8]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#FFD166" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color={isDark ? '#FF4757' : '#FF6473'} />
      
      <MorphingSphere />
    </Canvas>
  );
}
