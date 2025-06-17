
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FloatingMicrobes = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create different microbe shapes
    const createActinomycete = () => {
      const group = new THREE.Group();
      
      // Main body (elongated)
      const bodyGeometry = new THREE.CapsuleGeometry(0.1, 0.4, 4, 8);
      const bodyMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x10b981,
        transparent: true,
        opacity: 0.3
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      group.add(body);
      
      // Branching filaments
      for (let i = 0; i < 3; i++) {
        const filamentGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 4);
        const filament = new THREE.Mesh(filamentGeometry, bodyMaterial.clone());
        filament.position.set(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.3
        );
        filament.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        group.add(filament);
      }
      
      return group;
    };

    const createBacteria = () => {
      const geometry = new THREE.CapsuleGeometry(0.08, 0.3, 4, 8);
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.25
      });
      return new THREE.Mesh(geometry, material);
    };

    const createVirus = () => {
      const geometry = new THREE.IcosahedronGeometry(0.12, 1);
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x14b8a6,
        transparent: true,
        opacity: 0.2,
        wireframe: true
      });
      return new THREE.Mesh(geometry, material);
    };

    // Create microbe instances
    const microbes: THREE.Object3D[] = [];
    const microbeData: Array<{
      mesh: THREE.Object3D;
      velocity: THREE.Vector3;
      rotationSpeed: THREE.Vector3;
    }> = [];

    for (let i = 0; i < 15; i++) {
      let microbe: THREE.Object3D;
      const rand = Math.random();
      
      if (rand < 0.4) {
        microbe = createActinomycete();
      } else if (rand < 0.7) {
        microbe = createBacteria();
      } else {
        microbe = createVirus();
      }

      microbe.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01
      );

      const rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );

      microbes.push(microbe);
      microbeData.push({ mesh: microbe, velocity, rotationSpeed });
      scene.add(microbe);
    }

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      microbeData.forEach((data, index) => {
        const { mesh, velocity, rotationSpeed } = data;
        
        // Move microbes
        mesh.position.add(velocity);
        
        // Rotate microbes
        mesh.rotation.x += rotationSpeed.x;
        mesh.rotation.y += rotationSpeed.y;
        mesh.rotation.z += rotationSpeed.z;
        
        // Brownian motion effect
        const time = Date.now() * 0.001;
        mesh.position.x += Math.sin(time + index) * 0.001;
        mesh.position.y += Math.cos(time + index * 0.7) * 0.001;
        
        // Boundary checking
        if (Math.abs(mesh.position.x) > 15) velocity.x *= -1;
        if (Math.abs(mesh.position.y) > 10) velocity.y *= -1;
        if (Math.abs(mesh.position.z) > 5) velocity.z *= -1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default FloatingMicrobes;
