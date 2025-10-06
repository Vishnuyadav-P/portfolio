
import React, { useEffect, useRef, useState } from 'react';

const MouseTracker = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      
      // Use requestAnimationFrame for smooth cursor tracking
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        transform: 'translate3d(0, 0, 0)', // Enable hardware acceleration
      }}
    >
      {/* Main cursor dot */}
      <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg">
        {/* Inner glow */}
        <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1 opacity-60"></div>
      </div>
      
      {/* Trailing ring */}
      <div 
        className="absolute -inset-2 border border-orange-400 rounded-full animate-ping"
        style={{ animationDuration: '1.5s' }}
      ></div>
    </div>
  );
};

export default MouseTracker;
