import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  rotateX?: number;
  rotateY?: number;
}

const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  intensity = 15,
  scale = 1.05,
  rotateX = 10,
  rotateY = 10
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotateXValue, setRotateXValue] = useState(0);
  const [rotateYValue, setRotateYValue] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXVal = ((e.clientY - centerY) / (rect.height / 2)) * -rotateX;
    const rotateYVal = ((e.clientX - centerX) / (rect.width / 2)) * rotateY;

    setRotateXValue(rotateXVal);
    setRotateYValue(rotateYVal);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateXValue(0);
    setRotateYValue(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateXValue,
        rotateY: rotateYValue,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Interactive3DCard;
