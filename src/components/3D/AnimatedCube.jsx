import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, OrbitControls } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';

function RotatingCube({ scale = 1 }) {
  const { isDark } = useTheme();
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });

  const colors = [
    isDark ? '#FF4757' : '#FF6473',
    isDark ? '#4ECDC4' : '#5FD9D1',
    isDark ? '#FFD166' : '#FFE47A',
    isDark ? '#95E1D3' : '#A8E6CC',
    isDark ? '#F38181' : '#FF9999',
    isDark ? '#AA96DA' : '#C9B1FF',
  ];

  return (
    <group>
      <mesh ref={meshRef} scale={scale}>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial color={colors[0]} emissive={colors[0]} emissiveIntensity={0.3} />
        <Edges linewidth={2} color={isDark ? '#ffffff' : '#000000'} />
      </mesh>
    </group>
  );
}

export default function AnimatedCube({ scale = 1, interactive = true }) {
  const { isDark } = useTheme();

  return (
    <Canvas
      style={{
        width: '100%',
        height: '100%',
      }}
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <fog attach="fog" args={[isDark ? '#0b0b0b' : '#f5f5f5', 5, 15]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color={isDark ? '#FF4757' : '#FF6473'} />
      
      <RotatingCube scale={scale} />
      
      {interactive && <OrbitControls autoRotate autoRotateSpeed={4} />}
    </Canvas>
  );
}
