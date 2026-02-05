'use client';

import { useState } from 'react';
import OfficeCard from './OfficeCard';

const offices = [
  { id: 1, name: 'Boston' },
  { id: 2, name: 'New York' },
  { id: 3, name: 'San Francisco' },
  { id: 4, name: 'Chicago' },
  { id: 5, name: 'Toronto' },
  { id: 6, name: 'London' },
  { id: 7, name: 'Tokyo' },
  { id: 8, name: 'Singapore' },
  { id: 9, name: 'New Delhi' },
  { id: 10, name: 'Dubai' },
];

export default function OfficeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0); // Start with Boston

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : offices.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < offices.length - 1 ? prev + 1 : 0));
  };

  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;

    // Only render exactly 3 cards: active and one on each side
    if (Math.abs(offset) > 1) {
      return {
        transform: '',
        opacity: 0,
        zIndex: -999,
        visible: false,
      };
    }

    // Ring configuration
    const ANGLE_STEP = 35; // degrees between each card
    const RADIUS = 950; // radius of the ring

    const angle = offset * ANGLE_STEP;
    const angleRad = (angle * Math.PI) / 180;

    // Calculate position on the arc
    const x = Math.sin(angleRad) * RADIUS;
    const z = Math.cos(angleRad) * RADIUS * -1;

    // Scale based on distance from center
    const distanceFactor = Math.abs(offset);
    let scale = 1 - distanceFactor * 0.22;
    scale = Math.max(scale, 0.45); // minimum scale

    // Opacity based on distance
    const opacity = offset === 0 ? 1 : 0.7;

    // Z-index: active card always on top
    const zIndex = offset === 0 ? 1000 : Math.round(z * -1);

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      visible: true,
    };
  };

  return (
    <div className="h-[85vh] w-full flex flex-col items-center justify-between pb-6 box-border">
      {/* Carousel Area - Takes available space */}
      <div
        className="relative w-full flex-1 flex items-center justify-center min-h-0"
        style={{
          perspective: '1600px',
          perspectiveOrigin: 'center center'
        }}
      >
        <div
          className="relative scale-[0.35] xs:scale-[0.4] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.85] xl:scale-100 transition-transform duration-300 origin-center"
          style={{
            width: '100%',
            maxWidth: '1200px',
            height: '600px',
            transformStyle: 'preserve-3d',
          }}
        >
          {offices.map((office, index) => {
            const offset = index - activeIndex;
            const style = getCardStyle(index);
            const isActive = index === activeIndex;

            // ONLY render active card and immediate neighbors (offset -1, 0, 1)
            if (Math.abs(offset) > 1 || !style.visible) return null;

            return (
              <OfficeCard
                key={office.id}
                name={office.name}
                isActive={isActive}
                style={style}
              />
            );
          })}
        </div>
      </div>

      {/* Controls Container */}
      <div className="flex flex-col items-center gap-6 z-[100] flex-shrink-0 w-full mb-2">
        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`
              w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#1a1a1a] border-2 border-gray-800 flex items-center justify-center 
              transition-all duration-300 group
              ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed border-gray-900' : 'hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] hover:scale-110'}
            `}
            aria-label="Previous office"
          >
            <svg
              className="w-4 h-4 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={activeIndex === offices.length - 1}
            className={`
              w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#1a1a1a] border-2 border-gray-800 flex items-center justify-center 
              transition-all duration-300 group
              ${activeIndex === offices.length - 1 ? 'opacity-50 cursor-not-allowed border-gray-900' : 'hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] hover:scale-110'}
            `}
            aria-label="Next office"
          >
            <svg
              className="w-4 h-4 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Office Indicator Dots */}
        <div className="flex justify-center gap-3 w-full">
          {offices.map((office, index) => (
            <button
              key={office.id}
              onClick={() => setActiveIndex(index)}
              className={`
                w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300
                ${index === activeIndex
                  ? 'bg-red-600 w-8 md:w-10 shadow-[0_0_12px_rgba(220,38,38,0.6)]'
                  : 'bg-gray-600 hover:bg-gray-500'
                }
              `}
              aria-label={`Go to ${office.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
