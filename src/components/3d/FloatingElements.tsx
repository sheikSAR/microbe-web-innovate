import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  shape: 'sphere' | 'box' | 'torus' | 'octahedron';
  size?: number;
  speed?: number;
}

function FloatingShape({ position, color, shape, size = 0.5, speed = 1 }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed;
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.z = time * 0.1;
    }
  });
  
  const material = (
    <meshPhongMaterial 
      color={color}
      emissive={color}
      emissiveIntensity={0.1}
      transparent
      opacity={0.7}
    />
  );
  
  const renderShape = () => {
    switch (shape) {
      case 'sphere':
        return <Sphere ref={meshRef} args={[size]} position={position}>{material}</Sphere>;
      case 'box':
        return <Box ref={meshRef} args={[size, size, size]} position={position}>{material}</Box>;
      case 'torus':
        return <Torus ref={meshRef} args={[size, size * 0.3]} position={position}>{material}</Torus>;
      case 'octahedron':
        return <Octahedron ref={meshRef} args={[size]} position={position}>{material}</Octahedron>;
      default:
        return <Sphere ref={meshRef} args={[size]} position={position}>{material}</Sphere>;
    }
  };
  
  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.5, 0.5]}
    >
      {renderShape()}
    </Float>
  );
}

interface FloatingElementsProps {
  count?: number;
  theme?: 'biotech' | 'cyber' | 'minimal';
  className?: string;
}

export default function FloatingElements({ 
  count = 8, 
  theme = 'biotech',
  className = '' 
}: FloatingElementsProps) {
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
  
  const shapes: Array<'sphere' | 'box' | 'torus' | 'octahedron'> = ['sphere', 'box', 'torus', 'octahedron'];
  const colors = getThemeColors();
  
  const generateElements = () => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.5 + 0.5
    }));
  };
  
  const elements = generateElements();
  
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        
        {elements.map((element) => (
          <FloatingShape
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

interface InteractiveBlobProps {
  className?: string;
  color?: string;
}

export function InteractiveBlob({ className = '', color = '#00ffff' }: InteractiveBlobProps) {
  const blobRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (blobRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Morphing effect
      const geometry = blobRef.current.geometry as THREE.SphereGeometry;
      const positions = geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        const noise = Math.sin(time * 2 + x * 5) * Math.cos(time * 3 + y * 5) * 0.1;
        positions.setXYZ(i, x + noise, y + noise, z + noise);
      }
      
      positions.needsUpdate = true;
      geometry.computeVertexNormals();
      
      // Rotation
      blobRef.current.rotation.x = time * 0.1;
      blobRef.current.rotation.y = time * 0.15;
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
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <mesh ref={blobRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
            wireframe={false}
          />
        </mesh>
      </Canvas>
    </div>
  );
}
