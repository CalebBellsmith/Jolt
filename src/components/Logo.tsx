import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <img 
      src="/JOLT_logo.png" 
      alt="JOLT Logo" 
      className={`object-contain ${className}`}
    />
  );
};
