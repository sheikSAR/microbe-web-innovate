import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SimpleHelix() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });
  
  // Create helix points
  const helixPoints1: JSX.Element[] = [];
  const helixPoints2: JSX.Element[] = [];
  const connections: JSX.Element[] = [];
  
  const segments = 30;
  const height = 6;
  const radius = 1.2;
  
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 3;
    const y = (i / segments) * height - height / 2;
    
    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    const x2 = Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;
    
    // Helix point 1
    helixPoints1.push(
      <mesh key={`p1-${i}`} position={[x1, y, z1]}>
        <sphereGeometry args={[0.08]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </mesh>
    );
    
    // Helix point 2
    helixPoints2.push(
      <mesh key={`p2-${i}`} position={[x2, y, z2]}>
        <sphereGeometry args={[0.08]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.8} />
      </mesh>
    );
    
    // Connection every few segments
    if (i % 4 === 0) {
      const distance = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
      const midX = (x1 + x2) / 2;
      const midZ = (z1 + z2) / 2;
      
      connections.push(
        <mesh key={`conn-${i}`} position={[midX, y, midZ]}>
          <cylinderGeometry args={[0.02, 0.02, distance, 8]} />
          <meshBasicMaterial color="#8a2be2" transparent opacity={0.6} />
        </mesh>
      );
    }
  }
  
  return (
    <group ref={groupRef}>
      {helixPoints1}
      {helixPoints2}
      {connections}
    </group>
  );
}

function FloatingMolecules() {
  const molecules: JSX.Element[] = [];
  
  for (let i = 0; i < 10; i++) {
    const x = (Math.random() - 0.5) * 15;
    const y = (Math.random() - 0.5) * 8;
    const z = (Math.random() - 0.5) * 15;
    const scale = Math.random() * 0.3 + 0.2;
    const hue = 180 + Math.random() * 60;
    
    molecules.push(
      <FloatingMolecule
        key={i}
        position={[x, y, z]}
        scale={scale}
        color={`hsl(${hue}, 70%, 60%)`}
      />
    );
  }
  
  return <>{molecules}</>;
}

function FloatingMolecule({ 
  position, 
  scale, 
  color 
}: { 
  position: [number, number, number]; 
  scale: number; 
  color: string; 
}) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.position.y += Math.sin(time + position[0]) * 0.005;
      ref.current.rotation.x = time * 0.5;
      ref.current.rotation.y = time * 0.3;
    }
  });
  
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.4, 0, 0]}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.4, 0, 0]}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

export default function DNAHelixSimple({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [4, 2, 4], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <SimpleHelix />
        <FloatingMolecules />
      </Canvas>
    </div>
  );
}
