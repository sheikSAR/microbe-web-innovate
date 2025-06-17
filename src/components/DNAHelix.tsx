
import React from 'react';

const DNAHelix = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        width="200"
        height="400"
        viewBox="0 0 200 400"
        className="animate-spin"
        style={{ animationDuration: '20s' }}
      >
        {/* DNA Helix Structure */}
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 0.6 }} />
            <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>
        
        {/* Helix Spiral */}
        <path
          d="M50 50 Q100 100 50 150 T50 250 T50 350"
          stroke="url(#dnaGradient)"
          strokeWidth="3"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M150 50 Q100 100 150 150 T150 250 T150 350"
          stroke="url(#dnaGradient)"
          strokeWidth="3"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        
        {/* Base Pairs */}
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={i}
            x1={50 + (i % 2) * 100}
            y1={70 + i * 40}
            x2={150 - (i % 2) * 100}
            y2={70 + i * 40}
            stroke="url(#dnaGradient)"
            strokeWidth="2"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

export default DNAHelix;
