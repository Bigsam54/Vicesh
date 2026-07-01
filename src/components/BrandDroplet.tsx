import React from 'react';

interface BrandDropletProps {
  className?: string;
  size?: number | string;
  color?: string;
  highlightColor?: string;
}

export const BrandDroplet: React.FC<BrandDropletProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  highlightColor = '#FFFFFF'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Golden/Main teardrop shape */}
      <path
        d="M50,5 C50,5 92,44 92,70 A42,42 0 1,1 8,70 C8,44 50,5 50,5 Z"
        fill={color}
      />
      {/* Inner highlight crescent stroke matching the user's brand pattern logo */}
      <path
        d="M30,68 A21,21 0 0,0 54,82"
        stroke={highlightColor}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default BrandDroplet;
