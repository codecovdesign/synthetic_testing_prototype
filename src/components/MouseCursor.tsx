import React, { useEffect, useState } from 'react';

interface MouseCursorProps {
  position: {
    x: number;
    y: number;
  };
  className?: string;
}

const MouseCursor: React.FC<MouseCursorProps> = ({ position, className = '' }) => {
  if (!position) return null;
  
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '20px',
        height: '20px',
        zIndex: 50,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.07107 14.9289L14.9289 5.07107L16.3431 6.48528L6.48528 16.3431L5.07107 14.9289Z"
          fill="black"
        />
        <path
          d="M1 1L1 10.4142L2.41421 11.8284L2.41421 2.41421L11.8284 2.41421L10.4142 1L1 1Z"
          fill="black"
        />
      </svg>
    </div>
  );
};

export default MouseCursor; 