'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const values = [
  { label: 'Resilience', color: '#c0180b' },
  { label: 'Curiosity', color: '#ebae1b' },
  { label: 'Kindness', color: '#4a6428' },
  { label: 'Honesty', color: '#84b7c8' },
  { label: 'Respect', color: '#483454' },
];

export default function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden font-serif">
      {/* Background Image with Dark Tint */}
      <div className="absolute inset-0">
        <Image
          src="/granada-hero2.jpg"
          alt="Granada Hero"
          fill
          className="object-cover"
          priority
          onError={(e) => {
            console.warn('Hero image not found. Please add /public/granada-hero2.jpg');
          }}
        />
        {/* Dark Tint Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Header Container - Logo and Hamburger aligned horizontally */}
      <div className="absolute top-0 left-0 right-0 z-40 flex justify-between items-start pt-3 pb-2 pl-4 md:pt-4 md:pb-3 md:pl-6 pr-4 md:pr-6" >
        {/* Logo */}
        <Image
            src="/Schools-dark.svg"
            alt="Granada Logo"
            width={730}
            height={105}
            style={{height:"auto",width:"clamp(120px,18vw,250px)"}}
            priority
          />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex flex-col justify-center items-center gap-1 hover:opacity-80 transition-opacity"
          aria-label="Toggle Menu"
        >
          <span className="w-5 h-0.5 bg-white transition-transform duration-300"></span>
          <span className="w-5 h-0.5 bg-white transition-transform duration-300"></span>
          <span className="w-5 h-0.5 bg-white transition-transform duration-300"></span>
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="absolute inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Side Navigation - Responsive */}
      <nav
        className={`absolute top-0 right-0 h-full w-full sm:w-80 md:w-96 bg-[#346988] z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Decorative Top Bar */}
        <div className="h-1 bg-[#aac20c]"></div>

        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-white hover:opacity-70 transition-opacity"
          aria-label="Close Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Menu Content */}
        <div className="flex-1 flex flex-col justify-start px-4 sm:px-6 md:px-8 pt-20 sm:pt-24">
          <div className="space-y-6 sm:space-y-8">
            <div className="border-b border-white/20 pb-4 sm:pb-6">
              <Link
                href="/granada-school"
                onClick={() => setMenuOpen(false)}
                className="block text-base sm:text-lg font-light text-white hover:text-[#aac20c] transition-colors duration-300 leading-tight"
              >
                Granada School
              </Link>
              <p className="text-xs text-white/60 mt-2 font-sans">Local CBE Curriculum</p>
            </div>
            <div>
              <Link
                href="/granada-international"
                onClick={() => setMenuOpen(false)}
                className="block text-base sm:text-lg font-light text-white hover:text-[#aac20c] transition-colors duration-300 leading-tight"
              >
                Granada International
              </Link>
              <p className="text-xs text-white/60 mt-2 font-sans">Edexcel Curriculum</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-white/20 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <p className="text-xs sm:text-sm text-white/80 font-serif italic">
            Forward Thinking
          </p>
        </div>
      </nav>

      {/* Interactive Value Columns */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        {/* Column Overlays */}
        <div className="absolute inset-0 flex h-full pointer-events-auto">
          {values.map((value, index) => {
            let widthStyle = '0 0 calc(20% - 14px)';
            if (index === 3) {
              widthStyle = '0 0 calc(20% + 5px)';
            } else if (index === 4) {
              widthStyle = '1 1 auto';
            }
            return (
              <div
                key={`overlay-${index}`}
                className="relative cursor-pointer transition-all duration-300"
                style={{
                  flex: widthStyle,
                  backgroundColor:
                    hoveredIndex === index
                      ? `${value.color}40`
                      : 'transparent',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              ></div>
            );
          })}
        </div>

        {/* Text Labels at Bottom - Responsive */}
        <div className="absolute bottom-0 left-0 right-0 flex pointer-events-auto" style={{height: "clamp(1.375rem, 1rem + 2vw, 1.875rem)"}}>
          {values.map((value, index) => {
            let widthStyle = '0 0 calc(20% - 14px)';
            if (index === 3) {
              widthStyle = '0 0 calc(20% + 5px)';
            } else if (index === 4) {
              widthStyle = '1 1 auto';
            }
            return (
              <div
                key={`label-${index}`}
                className="flex items-center justify-center transition-all duration-300 cursor-pointer hover:shadow-inner"
                style={{
                  flex: widthStyle,
                  backgroundColor: value.color,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h2 className="text-white text-xs sm:text-sm font-bold text-center px-1 sm:px-2 drop-shadow-lg">
                  {value.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
