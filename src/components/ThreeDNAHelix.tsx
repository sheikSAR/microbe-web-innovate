
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDNAHelix = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x14b8a6, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // DNA Helix
    const helixGroup = new THREE.Group();
    const radius = 2;
    const height = 8;
    const segments = 100;

    // Create helix strands
    const strand1Points: THREE.Vector3[] = [];
    const strand2Points: THREE.Vector3[] = [];
    
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 4;
      const y = (i / segments) * height - height / 2;
      
      strand1Points.push(new THREE.Vector3(
        radius * Math.cos(t),
        y,
        radius * Math.sin(t)
      ));
      
      strand2Points.push(new THREE.Vector3(
        radius * Math.cos(t + Math.PI),
        y,
        radius * Math.sin(t + Math.PI)
      ));
    }

    // Create strand geometries
    const strand1Geometry = new THREE.BufferGeometry().setFromPoints(strand1Points);
    const strand2Geometry = new THREE.BufferGeometry().setFromPoints(strand2Points);
    
    const strandMaterial = new THREE.LineBasicMaterial({ 
      color: 0x14b8a6,
      linewidth: 3
    });
    
    const strand1 = new THREE.Line(strand1Geometry, strandMaterial);
    const strand2 = new THREE.Line(strand2Geometry, strandMaterial.clone());
    strand2.material.color.setHex(0x3b82f6);
    
    helixGroup.add(strand1, strand2);

    // Base pairs (rungs)
    for (let i = 0; i < segments; i += 5) {
      const t = (i / segments) * Math.PI * 4;
      const y = (i / segments) * height - height / 2;
      
      const rungGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(radius * Math.cos(t), y, radius * Math.sin(t)),
        new THREE.Vector3(radius * Math.cos(t + Math.PI), y, radius * Math.sin(t + Math.PI))
      ]);
      
      const rungMaterial = new THREE.LineBasicMaterial({ color: 0x10b981, opacity: 0.7, transparent: true });
      const rung = new THREE.Line(rungGeometry, rungMaterial);
      helixGroup.add(rung);
    }

    scene.add(helixGroup);

    // Floating particles
    const particleGeometry = new THREE.SphereGeometry(0.02, 8, 6);
    const particleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.6
    });

    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < 50; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
      particle.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      particles.push(particle);
      scene.add(particle);
    }

    // Position camera
    camera.position.set(0, 0, 10);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Rotate helix
      helixGroup.rotation.y += 0.005;
      
      // Mouse parallax
      helixGroup.rotation.x = mouse.y * 0.1;
      helixGroup.rotation.z = mouse.x * 0.1;

      // Animate particles
      particles.forEach((particle, index) => {
        const time = Date.now() * 0.001;
        particle.position.y += Math.sin(time + index) * 0.002;
        particle.position.x += Math.cos(time + index * 0.5) * 0.001;
        
        // Glow effect
        if (particle.material instanceof THREE.MeshBasicMaterial) {
          particle.material.opacity = 0.3 + Math.sin(time + index) * 0.3;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
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
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ThreeDNAHelix;
