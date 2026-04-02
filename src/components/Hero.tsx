'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const values = [
  { label: 'Resilience', color: '#c0180b', image: '/child-red.png' },
  { label: 'Curiosity', color: '#ebae1b', image: '/child-yellow.png' },
  { label: 'Kindness', color: '#4a6428', image: '/child-green.png' },
  { label: 'Honesty', color: '#84b7c8', image: '/child-blue.png' },
  { label: 'Respect', color: '#483454', image: '/child-purple.png' },
];

export default function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden font-serif">
      {/* Background Images Row (horizontal on desktop, vertical on mobile) */}
      <div className="absolute inset-0 flex flex-col md:flex-row">
        {/* Mobile: "Realise your potential" card as first item */}
        <div className="relative flex-1 flex items-center justify-center md:hidden" style={{background:"#fff"}}>
          <div className="text-center px-6">
            <span className="block font-bold" style={{fontSize:"clamp(1.4rem, 5vw, 2rem)", lineHeight:1.15, color:"#213558"}}>Realise your</span>
            <span className="block font-bold" style={{fontSize:"clamp(1.8rem, 7vw, 2.6rem)", lineHeight:1.15, marginTop:"0.15em", color:"#213558"}}>potential</span>
          </div>
        </div>
        {values.map((value, index) => {
          return (
            <div
              key={`bg-${index}`}
              className="relative overflow-hidden flex-1"
            >
              <Image
                src={value.image}
                alt={value.label}
                fill
                className="object-cover transition-transform duration-500 ease-out"
                style={{
                  transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                  objectPosition: 'center 30%',
                }}
                priority
              />
              {/* Dark Tint Overlay */}
              <div
                className="absolute inset-0 transition-colors duration-300"
                style={{
                  backgroundColor:
                    hoveredIndex === index
                      ? `${value.color}40`
                      : 'rgba(0,0,0,0.45)',
                }}
              ></div>
              {/* Mobile: centered label on each image */}
              <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
                <span
                  className="text-white font-bold text-lg drop-shadow-lg px-4 py-1.5 rounded"
                  style={{ backgroundColor: value.color }}
                >
                  {value.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Header Container - Logo and Hamburger aligned horizontally */}
      <div className="absolute top-0 left-0 right-0 z-40 flex justify-between items-start pt-3 pb-2 pl-4 md:pt-4 md:pb-3 md:pl-6 pr-4 md:pr-6" >
        {/* Logo — g-school on mobile (white bg), g-school-dark on desktop (dark bg) */}
        <Image
            src="/g-school.svg"
            alt="Granada School"
            width={110}
            height={44}
            className="md:hidden"
            style={{height:"auto",width:"clamp(50px,8vw,110px)"}}
            priority
          />
        <Image
            src="/g-school-dark.svg"
            alt="Granada School"
            width={110}
            height={44}
            className="hidden md:block"
            style={{height:"auto",width:"clamp(50px,8vw,110px)"}}
            priority
          />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex flex-col justify-center items-center gap-1 hover:opacity-80 transition-opacity"
          aria-label="Toggle Menu"
        >
          <span className="w-5 h-0.5 bg-[#213558] md:bg-white transition-transform duration-300"></span>
          <span className="w-5 h-0.5 bg-[#213558] md:bg-white transition-transform duration-300"></span>
          <span className="w-5 h-0.5 bg-[#213558] md:bg-white transition-transform duration-300"></span>
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
        className={`absolute top-0 right-0 h-full w-full sm:w-80 md:w-96 bg-[#213558] z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
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
                className="block text-base sm:text-lg font-bold text-white hover:text-[#aac20c] transition-colors duration-300 leading-tight"
              >
                Granada School
              </Link>
              <p className="text-xs text-white/60 mt-2 font-sans font-bold">Local CBE Curriculum</p>
            </div>
            <div>
              <Link
                href="/granada-international"
                onClick={() => setMenuOpen(false)}
                className="block text-base sm:text-lg font-bold text-white hover:text-[#aac20c] transition-colors duration-300 leading-tight"
              >
                Granada International
              </Link>
              <p className="text-xs text-white/60 mt-2 font-sans font-bold">Edexcel Curriculum</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-white/20 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <p className="text-xs sm:text-sm text-white/80 font-serif font-bold">
            Forward Thinking
          </p>
        </div>
      </nav>

      {/* Interactive Value Columns */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        {/* Column Overlays (desktop only) */}
        <div className="absolute inset-0 hidden md:flex h-full pointer-events-auto">
          {values.map((value, index) => {
            return (
              <div
                key={`overlay-${index}`}
                className="relative cursor-pointer transition-all duration-300 flex-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              ></div>
            );
          })}
        </div>

        {/* "Realise your potential" text (desktop) — spans first 3 columns */}
        <div className="absolute left-0 hidden md:flex items-end pointer-events-none" style={{bottom: "80px", width: "60%"}}>
          <div style={{paddingLeft: "clamp(4.7rem,6.2vw, 5.7rem)", paddingBottom: "0.25rem"}}>
            <span className="block text-white font-bold drop-shadow-lg" style={{fontSize: "clamp(2rem, 6vw, 6.1rem)", lineHeight: 0.001}}>Realise your</span>
            <span className="block text-white font-bold drop-shadow-lg" style={{fontSize: "clamp(5.7rem, 9vw, 9rem)", lineHeight: 1.5, marginTop: "0.01em"}}>potential</span>
          </div>
        </div>

        {/* Text Labels at Bottom (desktop only) */}
        <div className="absolute bottom-0 left-0 right-0 hidden md:flex pointer-events-auto" style={{height: "60px"}}>
          {values.map((value, index) => {
            return (
              <div
                key={`label-${index}`}
                className="flex-1 flex items-center justify-center transition-all duration-300 cursor-pointer hover:shadow-inner"
                style={{
                  backgroundColor: value.color,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h2 className="text-white font-bold text-center px-1 sm:px-2 drop-shadow-lg" style={{fontSize: "20px"}}>
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
