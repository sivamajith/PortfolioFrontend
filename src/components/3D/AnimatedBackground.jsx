import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';
import * as THREE from 'three';

function AnimatedBackgroundContent() {
  const { isDark } = useTheme();
  const groupRef = useRef();
  const particlesRef = useRef([]);

  useEffect(() => {
    // Create particles
    const particles = [];
    for (let i = 0; i < 50; i++) {
      const particle = {
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ],
        velocity: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ],
      };
      particles.push(particle);
    }
    particlesRef.current = particles;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    particlesRef.current.forEach((particle) => {
      particle.position[0] += particle.velocity[0];
      particle.position[1] += particle.velocity[1];
      particle.position[2] += particle.velocity[2];

      // Bounce off boundaries
      [-10, 10].forEach((bound) => {
        ['0', '1', '2'].forEach((axis) => {
          if (Math.abs(particle.position[axis]) > 10) {
            particle.velocity[axis] *= -1;
          }
        });
      });
    });

    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0001;
      groupRef.current.rotation.y += 0.0002;
    }
  });

  const particleColor = isDark ? '#FF4757' : '#FF4757';

  return (
    <group ref={groupRef}>
      {particlesRef.current.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color={particleColor}
            emissive={particleColor}
            emissiveIntensity={0.5}
            wireframe={false}
          />
        </mesh>
      ))}

      {/* Central rotating cube */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial
          color={isDark ? '#1a1a1a' : '#f0f0f0'}
          emissive={isDark ? '#FF4757' : '#FF6473'}
          emissiveIntensity={0.2}
          wireframe={true}
          wireframeLinewidth={2}
        />
      </mesh>

      {/* Floating spheres */}
      <mesh position={[5, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color={isDark ? '#4ECDC4' : '#4ECDC4'}
          emissive={isDark ? '#4ECDC4' : '#5FD9D1'}
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[-5, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={isDark ? '#FFD166' : '#FFD166'}
          emissive={isDark ? '#FFD166' : '#FFE47A'}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

export default function AnimatedBackground() {
  const { isDark } = useTheme();

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: true,
        }}
      >
        <fog attach="fog" args={[isDark ? '#0b0b0b' : '#f5f5f5', 10, 50]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#FF4757" />
        <AnimatedBackgroundContent />
      </Canvas>
    </div>
  );
}
