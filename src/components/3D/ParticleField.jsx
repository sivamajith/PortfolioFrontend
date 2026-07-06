import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';
import * as THREE from 'three';

function ParticleSystem({ particleCount = 1000 }) {
  const { isDark } = useTheme();
  const meshRef = useRef();
  const positionArray = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 40;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    positionArray.current = positions;
    return geo;
  }, [particleCount]);

  useFrame(() => {
    if (!meshRef.current) return;

    const positions = positionArray.current;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.1;
      positions[i + 1] += (Math.random() - 0.5) * 0.1;
      positions[i + 2] += (Math.random() - 0.5) * 0.1;

      // Wrap around
      if (positions[i] > 20) positions[i] = -20;
      if (positions[i + 1] > 20) positions[i + 1] = -20;
      if (positions[i + 2] > 20) positions[i + 2] = -20;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.x += 0.0001;
    meshRef.current.rotation.y += 0.0002;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.3}
        color={isDark ? '#FF4757' : '#FF6473'}
        emissive={isDark ? '#FF4757' : '#FF6473'}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </points>
  );
}

export default function ParticleField({ particleCount = 1000 }) {
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
        camera={{ position: [0, 0, 20], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <fog attach="fog" args={[isDark ? '#0b0b0b' : '#f5f5f5', 10, 50]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <ParticleSystem particleCount={particleCount} />
      </Canvas>
    </div>
  );
}
