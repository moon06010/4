import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TEAM = [
  {
    id: 'spring',
    season: '春',
    codename: 'TBD',
    specialty: 'Intelligence & Planning',
    successRate: '99.9%',
    encryptedData: '0x8F3A...E2B1'
  },
  {
    id: 'summer',
    season: '夏',
    codename: 'TBD',
    specialty: 'Assault & Elimination',
    successRate: '100%',
    encryptedData: '0x4C9D...A7F0'
  },
  {
    id: 'autumn',
    season: '秋',
    codename: 'TBD',
    specialty: 'Retrieval & Disposal',
    successRate: '99.8%',
    encryptedData: '0x1B5E...D8C3'
  },
  {
    id: 'winter',
    season: '冬',
    codename: 'TBD',
    specialty: 'Infiltration & Erasure',
    successRate: '100%',
    encryptedData: '0x9A2F...C4E5'
  }
];

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isScrolling) return;
    
    if (e.deltaY > 50) {
      setIsScrolling(true);
      setCurrentIndex((prev) => Math.min(prev + 1, TEAM.length - 1));
      setTimeout(() => setIsScrolling(false), 1500);
    } else if (e.deltaY < -50) {
      setIsScrolling(true);
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      setTimeout(() => setIsScrolling(false), 1500);
    }
  }, [isScrolling]);

  // Touch support for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientY);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isScrolling) return;
    const touchEnd = e.changedTouches[0].clientY;
    if (touchStart - touchEnd > 50) {
      setIsScrolling(true);
      setCurrentIndex((prev) => Math.min(prev + 1, TEAM.length - 1));
      setTimeout(() => setIsScrolling(false), 1000);
    } else if (touchStart - touchEnd < -50) {
      setIsScrolling(true);
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const currentMember = TEAM[currentIndex];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 1 } }}
      transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
      className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-20 sm:pb-24 px-4 sm:px-6 md:px-0"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMember.id}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="w-full max-w-6xl h-full flex flex-row"
        >
          {/* Left: Silhouette */}
          <div className="w-1/2 h-full flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <span className="font-serif text-[80px] sm:text-[150px] md:text-[300px]">{currentMember.season}</span>
            </div>
            <div className="w-20 h-[120px] sm:w-32 sm:h-[200px] md:w-64 md:h-[500px] border border-white/10 bg-gradient-to-t from-white/5 to-transparent relative flex flex-col items-center justify-end pb-4 sm:pb-6 md:pb-10">
              <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-50"></div>
              <span className="text-white/20 tracking-[0.3em] sm:tracking-[0.5em] text-[5px] sm:text-[8px] md:text-sm uppercase">Silhouette</span>
              <span className="text-white/10 tracking-[0.1em] sm:tracking-[0.2em] text-[4px] sm:text-[6px] md:text-[10px] uppercase mt-1 md:mt-2 text-center">Prop Placeholder</span>
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-1/2 h-full flex flex-col justify-center items-start text-left pl-4 sm:pl-8 md:pl-20">
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              <div>
                <h4 className="text-white/30 text-[8px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 md:mb-2">Codename</h4>
                <h2 className="font-serif text-xl sm:text-3xl md:text-5xl tracking-widest text-white/90">{currentMember.codename}</h2>
              </div>
              
              <div>
                <h4 className="text-white/30 text-[8px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 md:mb-2">Specialty</h4>
                <p className="text-xs sm:text-lg md:text-xl tracking-widest text-white/70 font-light">{currentMember.specialty}</p>
              </div>

              <div>
                <h4 className="text-white/30 text-[8px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 md:mb-2">Success Rate</h4>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-start gap-1 sm:gap-3 md:gap-4">
                  <span className="font-mono text-lg sm:text-2xl md:text-3xl text-white/80">{currentMember.successRate}</span>
                  <span className="font-mono text-[8px] sm:text-[10px] md:text-xs text-white/20">{currentMember.encryptedData}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Scroll Indicator */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4">
        {TEAM.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-1 transition-all duration-500 ${idx === currentIndex ? 'h-6 md:h-8 bg-white/60' : 'h-2 bg-white/20'}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
