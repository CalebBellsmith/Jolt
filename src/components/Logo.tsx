import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <img 
      src="https://ais-pre-q7mmrybvxlggmoidnacz7t-209942537220.us-west2.run.app/logo.png" 
      alt="JOLT Logo" 
      className={`object-contain ${className}`}
      referrerPolicy="no-referrer"
      onError={(e) => {
        // Fallback if the image fails to load
        e.currentTarget.src = "https://picsum.photos/seed/jolt-logo/200/80";
      }}
    />
  );
};
