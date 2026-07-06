import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';
import * as THREE from 'three';

function FloatingCard({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#FF4757', hoverScale = 1.2 }) {
  const { isDark } = useTheme();
  const meshRef = useRef();
  const initialScale = useRef(1);
  const targetScale = useRef(1);
  const yPosition = useRef(0);

  useFrame(({ mouse }) => {
    if (!meshRef.current) return;

    // Floating animation
    yPosition.current += 0.01;
    meshRef.current.position.y = position[1] + Math.sin(yPosition.current) * 0.5;

    // Rotation
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.z += 0.001;

    // Smooth scale animation based on hover
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current), 0.1);
  });

  const handlePointerEnter = () => {
    targetScale.current = hoverScale;
  };

  const handlePointerLeave = () => {
    targetScale.current = 1;
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={1}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <boxGeometry args={[2, 2.5, 0.1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function FloatingCards({ cards = [], interactive = true }) {
  const { isDark } = useTheme();

  const colors = [
    '#FF4757',
    '#4ECDC4',
    '#FFD166',
    '#95E1D3',
    '#F38181',
    '#AA96DA',
  ];

  return (
    <Canvas
      style={{
        width: '100%',
        height: '100%',
      }}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <fog attach="fog" args={[isDark ? '#0b0b0b' : '#f5f5f5', 10, 30]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[15, 15, 15]} intensity={1} />
      <pointLight position={[-15, -15, 15]} intensity={0.6} color={colors[0]} />
      <pointLight position={[0, 0, 10]} intensity={0.4} color={colors[1]} />

      {/* Create floating cards in a grid */}
      {Array.from({ length: cards.length || 3 }).map((_, i) => (
        <FloatingCard
          key={i}
          position={[
            (i % 3) * 4 - 4,
            Math.floor(i / 3) * -4,
            Math.sin(i) * 2,
          ]}
          rotation={[Math.random() * 0.5, Math.random() * 0.5, 0]}
          color={colors[i % colors.length]}
          hoverScale={1.15}
        />
      ))}
    </Canvas>
  );
}
