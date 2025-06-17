
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface LabEquipment {
  name: string;
  description: string;
  publications?: string[];
}

const VirtualLabScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<LabEquipment | null>(null);
  const animationIdRef = useRef<number>();

  const equipmentData: { [key: string]: LabEquipment } = {
    microscope: {
      name: "Digital Microscope",
      description: "Used for high-resolution imaging of actinomycetes and bacterial morphology studies.",
      publications: ["Actinomycetes in Agricultural Soil: Diversity and Applications"]
    },
    petriDish: {
      name: "Petri Dish Cultures",
      description: "Isolation and cultivation of soil microorganisms for taxonomic identification.",
      publications: ["16S rRNA Gene Sequencing for Microbial Identification"]
    },
    centrifuge: {
      name: "Centrifuge",
      description: "Sample preparation for DNA extraction and protein analysis.",
      publications: ["DST-SEED Project on Microbial Diversity"]
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(800, 600);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Lab bench
    const benchGeometry = new THREE.BoxGeometry(8, 0.2, 4);
    const benchMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const bench = new THREE.Mesh(benchGeometry, benchMaterial);
    bench.position.y = -1;
    bench.receiveShadow = true;
    scene.add(bench);

    // Equipment objects
    const equipment: { [key: string]: THREE.Object3D } = {};

    // Microscope
    const microscopeGroup = new THREE.Group();
    const baseGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 16);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x2C3E50 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.7;
    microscopeGroup.add(base);

    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 8);
    const arm = new THREE.Mesh(armGeometry, baseMaterial);
    arm.position.y = 0;
    microscopeGroup.add(arm);

    const lensGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 8);
    const lensMaterial = new THREE.MeshLambertMaterial({ color: 0x34495E });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.position.y = -0.5;
    lens.position.z = 0.3;
    microscopeGroup.add(lens);

    microscopeGroup.position.set(-2, 0, 0);
    microscopeGroup.castShadow = true;
    equipment.microscope = microscopeGroup;
    scene.add(microscopeGroup);

    // Petri dishes
    const petriGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const dishGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 16);
      const dishMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xE8F5E8,
        transparent: true,
        opacity: 0.8
      });
      const dish = new THREE.Mesh(dishGeometry, dishMaterial);
      dish.position.set(i * 0.9, -0.8, 1);
      dish.castShadow = true;
      petriGroup.add(dish);

      // Culture medium
      const mediumGeometry = new THREE.CylinderGeometry(0.38, 0.38, 0.02, 16);
      const mediumMaterial = new THREE.MeshLambertMaterial({ color: 0x90EE90 });
      const medium = new THREE.Mesh(mediumGeometry, mediumMaterial);
      medium.position.set(i * 0.9, -0.79, 1);
      petriGroup.add(medium);
    }
    equipment.petriDish = petriGroup;
    scene.add(petriGroup);

    // Centrifuge
    const centrifugeGroup = new THREE.Group();
    const centrifugeBodyGeometry = new THREE.BoxGeometry(1, 0.8, 1);
    const centrifugeBodyMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
    const centrifugeBody = new THREE.Mesh(centrifugeBodyGeometry, centrifugeBodyMaterial);
    centrifugeBody.position.y = -0.5;
    centrifugeGroup.add(centrifugeBody);

    const lidGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
    const lidMaterial = new THREE.MeshLambertMaterial({ color: 0xDDDDDD });
    const lid = new THREE.Mesh(lidGeometry, lidMaterial);
    lid.position.y = -0.05;
    centrifugeGroup.add(lid);

    centrifugeGroup.position.set(2, 0, -1);
    centrifugeGroup.castShadow = true;
    equipment.centrifuge = centrifugeGroup;
    scene.add(centrifugeGroup);

    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    // Raycasting for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      Object.entries(equipment).forEach(([key, obj]) => {
        const intersects = raycaster.intersectObject(obj, true);
        if (intersects.length > 0) {
          setSelectedEquipment(equipmentData[key]);
        }
      });
    };

    renderer.domElement.addEventListener('click', onMouseClick);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Gentle rotation for visual interest
      Object.values(equipment).forEach((obj, index) => {
        obj.rotation.y += 0.001 * (index + 1);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.domElement.removeEventListener('click', onMouseClick);
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
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-4 text-center">Virtual Laboratory</h3>
      <p className="text-slate-300 text-center mb-6">Click on equipment to learn more</p>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div ref={mountRef} className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-900/20 to-teal-900/20" />
        
        {selectedEquipment && (
          <div className="lg:w-80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-white mb-3">{selectedEquipment.name}</h4>
            <p className="text-slate-200 mb-4 leading-relaxed">{selectedEquipment.description}</p>
            
            {selectedEquipment.publications && (
              <div>
                <h5 className="text-teal-300 font-medium mb-2">Related Publications:</h5>
                <ul className="space-y-1">
                  {selectedEquipment.publications.map((pub, index) => (
                    <li key={index} className="text-sm text-slate-300">• {pub}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualLabScene;
