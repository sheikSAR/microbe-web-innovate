import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const particleCount = 2000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 3;
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, [viewport]);
  
  const colors = useMemo(() => {
    const colors = new Float32Array(particleCount * 3);
    const colorPalette = [
      [0, 1, 1],      // Cyan
      [0, 1, 0.5],    // Green-cyan
      [0.5, 0, 1],    // Purple
      [0, 0.8, 1],    // Light blue
      [0.2, 1, 0.8],  // Mint
    ];
    
    for (let i = 0; i < particleCount; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
    }
    
    return colors;
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the entire particle system slowly
      ref.current.rotation.y = time * 0.05;
      ref.current.rotation.x = Math.sin(time * 0.1) * 0.1;
      
      // Animate particles individually
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Create floating motion
        positions[i3 + 1] += Math.sin(time * 0.5 + i * 0.01) * 0.002;
        positions[i3] += Math.cos(time * 0.3 + i * 0.02) * 0.001;
        positions[i3 + 2] += Math.sin(time * 0.8 + i * 0.015) * 0.001;
        
        // Wrap particles that go too far
        if (positions[i3 + 1] > viewport.height * 1.5) {
          positions[i3 + 1] = -viewport.height * 1.5;
        }
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function ConnectionLines() {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  const lines = useMemo(() => {
    const lines = [];
    const lineCount = 50;
    
    for (let i = 0; i < lineCount; i++) {
      const points = [];
      const segmentCount = Math.floor(Math.random() * 5) + 3;
      
      for (let j = 0; j < segmentCount; j++) {
        points.push(new THREE.Vector3(
          (Math.random() - 0.5) * viewport.width * 2,
          (Math.random() - 0.5) * viewport.height * 2,
          (Math.random() - 0.5) * 10
        ));
      }
      
      lines.push(points);
    }
    
    return lines;
  }, [viewport]);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.z = time * 0.02;
    }
  });
  
  return (
    <group ref={ref}>
      {lines.map((points, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={`hsl(${180 + Math.random() * 60}, 70%, 60%)`}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
}

export default function ParticleSystem() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleField />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
