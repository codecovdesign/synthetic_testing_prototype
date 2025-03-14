import React, { useEffect, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface MouseCursorProps {
  isVisible: boolean;
  targetElement?: HTMLElement | null;
  onComplete?: () => void;
}

const MouseCursor: React.FC<MouseCursorProps> = ({ isVisible, targetElement, onComplete }) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible && targetElement && !isAnimating) {
      setIsAnimating(true);
      const rect = targetElement.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;

      // Start from a natural position (top-left of the preview)
      setPosition({ x: rect.left - 100, y: rect.top - 50 });

      // Animate to target
      setTimeout(() => {
        setPosition({ x: targetX, y: targetY });
        
        // Simulate click after reaching target
        setTimeout(() => {
          setPosition(prev => ({ x: prev.x + 2, y: prev.y + 2 })); // Small movement for click effect
          setTimeout(() => {
            setPosition(prev => ({ x: prev.x - 2, y: prev.y - 2 }));
            setIsAnimating(false);
            if (onComplete) onComplete();
          }, 200);
        }, 500);
      }, 100);
    }
  }, [isVisible, targetElement, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-500 ease-in-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -15,
        top: -15,
      }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <path
          d="M8.5 3.5L20.5 15.5L15.5 15.5L8.5 22.5V3.5Z"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default MouseCursor; 