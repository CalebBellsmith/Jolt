import React from 'react';

interface HumanOutlineProps {
  selectedPart: string;
  className?: string;
}

export const HumanOutline: React.FC<HumanOutlineProps> = ({ selectedPart, className }) => {
  // Simple SVG stick figure human outline
  const isSelected = (part: string) => selectedPart === part;

  return (
    <svg 
      viewBox="0 0 100 200" 
      className={className}
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      {/* Head */}
      <circle cx="50" cy="20" r="10" className="text-[#000066]/20" />
      
      {/* Torso */}
      <path d="M50 30 L50 100" className="text-[#000066]/20" />
      <path d="M30 45 L70 45" className="text-[#000066]/20" />
      
      {/* Arms */}
      {/* Left Arm */}
      <path 
        d="M30 45 L20 70" 
        className={isSelected('bicep') ? 'text-blue-500 stroke-[4px]' : 'text-[#000066]/20'} 
      />
      <path 
        d="M20 70 L15 95" 
        className={isSelected('forearm') ? 'text-blue-500 stroke-[4px]' : 'text-[#000066]/20'} 
      />
      
      {/* Right Arm */}
      <path d="M70 45 L80 70" className="text-[#000066]/20" />
      <path d="M80 70 L85 95" className="text-[#000066]/20" />
      
      {/* Legs */}
      {/* Left Leg */}
      <path 
        d="M50 100 L40 140" 
        className={isSelected('thigh') ? 'text-blue-500 stroke-[4px]' : 'text-[#000066]/20'} 
      />
      <path 
        d="M40 140 L40 180" 
        className={isSelected('calf') ? 'text-blue-500 stroke-[4px]' : 'text-[#000066]/20'} 
      />
      
      {/* Right Leg */}
      <path d="M50 100 L60 140" className="text-[#000066]/20" />
      <path d="M60 140 L60 180" className="text-[#000066]/20" />

      {/* Highlight Indicator (The blue band) */}
      {selectedPart === 'bicep' && (
        <rect x="18" y="55" width="4" height="10" fill="#3b82f6" rx="1" />
      )}
      {selectedPart === 'forearm' && (
        <rect x="14" y="80" width="4" height="10" fill="#3b82f6" rx="1" />
      )}
      {selectedPart === 'thigh' && (
        <rect x="42" y="115" width="6" height="4" fill="#3b82f6" rx="1" transform="rotate(-15 45 117)" />
      )}
      {selectedPart === 'calf' && (
        <rect x="38" y="155" width="4" height="10" fill="#3b82f6" rx="1" />
      )}
    </svg>
  );
};
