import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Line } from '@react-three/drei';
import * as THREE from 'three';

function HelixStructure() {
  const groupRef = useRef<THREE.Group>(null);
  
  const helixData = useMemo(() => {
    const segments = 60;
    const height = 8;
    const radius = 1.5;
    const points1: THREE.Vector3[] = [];
    const points2: THREE.Vector3[] = [];
    const connections: Array<[THREE.Vector3, THREE.Vector3]> = [];
    
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 4; // 2 full rotations
      const y = (i / segments) * height - height / 2;
      
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      
      const point1 = new THREE.Vector3(x1, y, z1);
      const point2 = new THREE.Vector3(x2, y, z2);
      
      points1.push(point1);
      points2.push(point2);
      
      // Add connections every few segments
      if (i % 3 === 0) {
        connections.push([point1, point2]);
      }
    }
    
    return { points1, points2, connections };
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.3;
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.3;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* DNA Base Pairs (spheres) */}
      {helixData.points1.map((point, index) => (
        <group key={`helix1-${index}`}>
          <Sphere position={[point.x, point.y, point.z]} args={[0.08]}>
            <meshPhongMaterial 
              color="#00ffff" 
              emissive="#004444"
              transparent
              opacity={0.8}
            />
          </Sphere>
        </group>
      ))}
      
      {helixData.points2.map((point, index) => (
        <group key={`helix2-${index}`}>
          <Sphere position={[point.x, point.y, point.z]} args={[0.08]}>
            <meshPhongMaterial 
              color="#00ff88" 
              emissive="#004422"
              transparent
              opacity={0.8}
            />
          </Sphere>
        </group>
      ))}
      
      {/* Connection bonds */}
      {helixData.connections.map((connection, index) => {
        const midPoint = new THREE.Vector3()
          .addVectors(connection[0], connection[1])
          .multiplyScalar(0.5);
        const distance = connection[0].distanceTo(connection[1]);
        
        return (
          <group key={`connection-${index}`}>
            <Cylinder
              position={[midPoint.x, midPoint.y, midPoint.z]}
              args={[0.02, 0.02, distance]}
              rotation={[
                0,
                0,
                Math.atan2(
                  connection[1].z - connection[0].z,
                  connection[1].x - connection[0].x
                )
              ]}
            >
              <meshPhongMaterial 
                color="#8a2be2" 
                emissive="#2a0a3a"
                transparent
                opacity={0.6}
              />
            </Cylinder>
          </group>
        );
      })}
    </group>
  );
}

function FloatingMolecules() {
  const molecules = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.02 + 0.01,
      color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`
    }));
  }, []);
  
  return (
    <>
      {molecules.map((molecule) => (
        <FloatingMolecule key={molecule.id} {...molecule} />
      ))}
    </>
  );
}

function FloatingMolecule({ 
  position, 
  scale, 
  speed, 
  color 
}: { 
  position: [number, number, number]; 
  scale: number; 
  speed: number; 
  color: string; 
}) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.position.y += Math.sin(time * speed) * 0.01;
      ref.current.position.x += Math.cos(time * speed * 0.7) * 0.005;
      ref.current.rotation.x = time * speed;
      ref.current.rotation.y = time * speed * 0.8;
    }
  });
  
  return (
    <group ref={ref} position={position} scale={scale}>
      <Sphere args={[0.2]}>
        <meshPhongMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </Sphere>
      {/* Electrons */}
      <Sphere position={[0.4, 0, 0]} args={[0.05]}>
        <meshPhongMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere position={[-0.4, 0, 0]} args={[0.05]}>
        <meshPhongMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </Sphere>
    </group>
  );
}

export default function DNAHelix3D({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [5, 2, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <spotLight 
          position={[0, 10, 0]} 
          intensity={1} 
          color="#00ff88"
          angle={Math.PI / 4}
          penumbra={0.5}
        />
        
        <HelixStructure />
        <FloatingMolecules />
      </Canvas>
    </div>
  );
}
