import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SimpleShapeProps {
  position: [number, number, number];
  color: string;
  shape: 'sphere' | 'box';
  size?: number;
  speed?: number;
}

function SimpleShape({ position, color, shape, size = 0.5, speed = 1 }: SimpleShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed;
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.5;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      {shape === 'sphere' ? (
        <sphereGeometry args={[size]} />
      ) : (
        <boxGeometry args={[size, size, size]} />
      )}
      <meshBasicMaterial 
        color={color}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

interface FloatingElementsSimpleProps {
  count?: number;
  theme?: 'biotech' | 'cyber' | 'minimal';
  className?: string;
}

export default function FloatingElementsSimple({ 
  count = 6, 
  theme = 'biotech',
  className = '' 
}: FloatingElementsSimpleProps) {
  const getThemeColors = () => {
    switch (theme) {
      case 'biotech':
        return ['#00ffff', '#00ff88', '#8a2be2', '#ff6b9d', '#4ecdc4'];
      case 'cyber':
        return ['#00ff00', '#ff0080', '#0080ff', '#ffff00', '#ff8000'];
      case 'minimal':
        return ['#ffffff', '#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080'];
      default:
        return ['#00ffff', '#00ff88', '#8a2be2', '#ff6b9d', '#4ecdc4'];
    }
  };
  
  const shapes: Array<'sphere' | 'box'> = ['sphere', 'box'];
  const colors = getThemeColors();
  
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8
    ] as [number, number, number],
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    size: Math.random() * 0.3 + 0.2,
    speed: Math.random() * 0.5 + 0.5
  }));
  
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        
        {elements.map((element) => (
          <SimpleShape
            key={element.id}
            position={element.position}
            color={element.color}
            shape={element.shape}
            size={element.size}
            speed={element.speed}
          />
        ))}
      </Canvas>
    </div>
  );
}

interface InteractiveBlobSimpleProps {
  className?: string;
  color?: string;
}

export function InteractiveBlobSimple({ className = '', color = '#00ffff' }: InteractiveBlobSimpleProps) {
  const blobRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (blobRef.current) {
      const time = state.clock.getElapsedTime();
      blobRef.current.rotation.x = time * 0.1;
      blobRef.current.rotation.y = time * 0.15;
      blobRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }
  });
  
  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        
        <mesh ref={blobRef}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial 
            color={color}
            transparent
            opacity={0.6}
            wireframe={false}
          />
        </mesh>
      </Canvas>
    </div>
  );
}
