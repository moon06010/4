import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, Leaf, Sun, Wind } from 'lucide-react';

const TEAM = [
  {
    id: 'spring',
    season: '春',
    name: '번례인',
    icon: Leaf,
    stats: [
      { label: 'AGE', value: '35' },
      { label: 'HEIGHT', value: '188' },
      { label: 'MBTI', value: 'INTJ' },
      { label: 'BIRTH', value: '07.12' },
      { label: 'TYPE', value: 'RH+B' },
      { label: 'WEAPON', value: 'Smith & Wesson M327 TRR8 (Custom)' }
    ],
    successRate: '99.9%',
    encryptedData: '0x8F3A...E2B1',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%EB%A1%80_2.png',
    appearance: '옅은 갈색 머리, 진청색 눈. 낡은 둥근 안경을 썼어도 날카롭고 예민한 인상을 준다. 번제와 닮은 듯하면서도 안 닮은 외모.',
    chatLink: 'https://share.crack.wrtn.ai/wsedpf'
  },
  {
    id: 'summer',
    season: '夏',
    name: '번제',
    icon: Sun,
    stats: [
      { label: 'AGE', value: '58' },
      { label: 'HEIGHT', value: '198' },
      { label: 'MBTI', value: 'ESTP' },
      { label: 'BIRTH', value: '08.12' },
      { label: 'TYPE', value: 'RH+AB' },
      { label: 'WEAPON', value: 'Nagant M1895 (Custom)' }
    ],
    successRate: '100%',
    encryptedData: '0x4C9D...A7F0',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%EC%A0%9C_2.png',
    appearance: '애쉬 그레이 머리, 파란색 눈. 남자답게 잘 늙었다는 인상을 주는 호쾌한 외모. 굉장한 근육질 거구.',
    chatLink: 'https://share.crack.wrtn.ai/c72jioh'
  },
  {
    id: 'autumn',
    season: '秋',
    name: '구공허',
    icon: Wind,
    stats: [
      { label: 'AGE', value: '57' },
      { label: 'HEIGHT', value: '196' },
      { label: 'MBTI', value: 'ISTP' },
      { label: 'BIRTH', value: '11.13' },
      { label: 'TYPE', value: 'RH+B' },
      { label: 'WEAPON', value: 'Beretta M9A3 (Custom)' }
    ],
    successRate: '100%',
    encryptedData: '0x1B5E...D8C3',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%EA%B3%B5_2.png',
    appearance: '검은 머리, 연갈색 눈. 덩치와는 다르게 처연한 인상이다. 젊었을 때 꽤 잘생겼을 미남.',
    chatLink: 'https://share.crack.wrtn.ai/warypi'
  },
  {
    id: 'winter',
    season: '冬',
    name: '오요사',
    icon: Snowflake,
    stats: [
      { label: 'AGE', value: '25' },
      { label: 'HEIGHT', value: '199' },
      { label: 'MBTI', value: 'INFJ' },
      { label: 'BIRTH', value: '12.20' },
      { label: 'TYPE', value: 'RH-O' },
      { label: 'WEAPON', value: 'H&K Mark 23 (Custom)' }
    ],
    successRate: '99.8%',
    encryptedData: '0x9A2F...C4E5',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%EC%9A%94_3.png',
    appearance: '차분한 검은 머리, 검은 눈. 멀끔한 인상과는 다르게 어딘가 쎄한 느낌. 삼백안이 인상적.',
    chatLink: null
  }
];

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showMemo, setShowMemo] = useState(false);

  const handleWheel = useCallback((e: WheelEvent) => {
    // Ignore wheel events if the user is scrolling inside a scrollable container
    if ((e.target as HTMLElement)?.closest?.('.overflow-y-auto')) {
      return;
    }

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

  // Touch support for mobile swipe (Horizontal)
  const [touchStartX, setTouchStartX] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isScrolling) return;
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
      // Swiped left -> next
      setIsScrolling(true);
      setCurrentIndex((prev) => Math.min(prev + 1, TEAM.length - 1));
      setTimeout(() => setIsScrolling(false), 1000);
    } else if (touchStartX - touchEndX < -50) {
      // Swiped right -> prev
      setIsScrolling(true);
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Reset memo when changing characters
  useEffect(() => {
    setShowMemo(false);
  }, [currentIndex]);

  const currentMember = TEAM[currentIndex];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 1 } }}
      transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
      className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden pt-[140px] sm:pt-20 pb-20 sm:pb-24 px-4 sm:px-6 md:px-0"
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
          className="w-full max-w-6xl h-full flex flex-col md:flex-row"
        >
          {/* Left: Silhouette */}
          <div className="w-full md:w-1/2 h-[45%] md:h-full flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <span className="font-serif text-[120px] sm:text-[150px] md:text-[300px]">{currentMember.season}</span>
            </div>
            <div 
              className="w-32 h-[200px] sm:w-40 sm:h-[280px] md:w-72 md:h-[500px] border border-white/10 bg-black/50 relative flex flex-col items-center justify-end overflow-hidden group cursor-pointer"
              onClick={() => setShowMemo(!showMemo)}
            >
              <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-50 z-20 pointer-events-none"></div>
              <img 
                src={currentMember.image} 
                alt={currentMember.name}
                className="absolute inset-0 w-full h-full object-cover object-top grayscale contrast-125 brightness-75 opacity-80 mix-blend-luminosity z-10 transition-all duration-700 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20 pointer-events-none"></div>
              
              {/* Click hint */}
              <div className="absolute bottom-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[6px] sm:text-[8px] tracking-[0.2em] text-white/70 bg-black/50 px-2 py-1 border border-white/20 backdrop-blur-sm">CLICK TO VIEW DATA</span>
              </div>
            </div>

            {/* Memo Popup */}
            <AnimatePresence>
              {showMemo && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-64 bg-black/90 border border-white/20 p-4 sm:p-6 backdrop-blur-md shadow-2xl"
                >
                  <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-2">
                    <span className="text-[8px] sm:text-[10px] tracking-[0.3em] text-white/50 uppercase">Visual Data</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowMemo(false); }} 
                      className="text-white/50 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light break-keep">
                    {currentMember.appearance}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-1/2 h-[55%] md:h-full flex flex-col justify-start md:justify-center items-center md:items-start text-center md:text-left px-6 sm:px-8 md:pl-20 overflow-y-auto pb-8 pt-4 md:pt-0">
            <div className="space-y-5 sm:space-y-8 md:space-y-12 w-full max-w-md flex flex-col items-center md:items-start">
              <div className="flex flex-col items-center md:items-start">
                <div className="mb-2 md:mb-4 opacity-40">
                  <currentMember.icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1} />
                </div>
                <h4 className="text-white/30 text-[8px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 md:mb-2">NAME</h4>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl tracking-widest text-white/90">{currentMember.name}</h2>
              </div>
              
              <div className="w-full">
                <h4 className="text-white/30 text-[8px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 md:mb-4 text-center md:text-left">PROFILE DATA</h4>
                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-12 gap-y-3 sm:gap-y-6 text-center md:text-left">
                  {currentMember.stats.map((stat, idx) => (
                    <div key={idx} className={`flex flex-col ${stat.label === 'WEAPON' ? 'col-span-2' : ''}`}>
                      <span className="text-[6px] sm:text-[8px] md:text-[10px] text-white/40 tracking-[0.2em] mb-1">{stat.label}</span>
                      <span className="text-[10px] sm:text-sm md:text-lg text-white/80 tracking-widest font-light">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col items-center md:items-start">
                <h4 className="text-white/30 text-[8px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 md:mb-2">Success Rate</h4>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-center md:justify-start gap-1 sm:gap-3 md:gap-4">
                  <span className="font-mono text-2xl sm:text-2xl md:text-3xl text-white/80">{currentMember.successRate}</span>
                  <span className="font-mono text-[8px] sm:text-[10px] md:text-xs text-white/20">{currentMember.encryptedData}</span>
                </div>
              </div>

              {/* Chat Button */}
              <div className="pt-3 sm:pt-6 md:pt-8 border-t border-white/10 w-full">
                {currentMember.chatLink ? (
                  <a 
                    href={currentMember.chatLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center justify-between w-full bg-white/5 hover:bg-white/10 border border-white/10 p-3 sm:p-4 transition-all duration-300"
                  >
                    <span className="text-[8px] sm:text-[10px] md:text-xs tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">PRIVATE CONSULTATION</span>
                    <span className="text-white/40 group-hover:text-white transition-colors">→</span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between w-full bg-white/5 border border-white/10 p-3 sm:p-4 opacity-50 cursor-not-allowed">
                    <span className="text-[8px] sm:text-[10px] md:text-xs tracking-[0.3em] text-white/40 animate-pulse">LOADING...</span>
                    <span className="text-white/20">→</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Navigation Arrows */}
      <div className="absolute inset-x-2 top-[30%] -translate-y-1/2 flex justify-between z-30 md:hidden pointer-events-none">
        <button 
          onClick={() => {
            if (isScrolling) return;
            setIsScrolling(true);
            setCurrentIndex((prev) => Math.max(prev - 1, 0));
            setTimeout(() => setIsScrolling(false), 1000);
          }}
          disabled={currentIndex === 0}
          className={`p-4 pointer-events-auto transition-opacity ${currentIndex === 0 ? 'opacity-0' : 'opacity-50 hover:opacity-100'}`}
          aria-label="Previous member"
        >
          <div className="w-4 h-4 border-t border-l border-white transform -rotate-45"></div>
        </button>
        <button 
          onClick={() => {
            if (isScrolling) return;
            setIsScrolling(true);
            setCurrentIndex((prev) => Math.min(prev + 1, TEAM.length - 1));
            setTimeout(() => setIsScrolling(false), 1000);
          }}
          disabled={currentIndex === TEAM.length - 1}
          className={`p-4 pointer-events-auto transition-opacity ${currentIndex === TEAM.length - 1 ? 'opacity-0' : 'opacity-50 hover:opacity-100'}`}
          aria-label="Next member"
        >
          <div className="w-4 h-4 border-t border-r border-white transform rotate-45"></div>
        </button>
      </div>

      {/* Navigation Indicator */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 z-20">
        {TEAM.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentIndex(idx)}
            className="p-2 -m-2 flex justify-center"
            aria-label={`Go to team member ${idx + 1}`}
          >
            <div className={`w-1 transition-all duration-500 ${idx === currentIndex ? 'h-8 md:h-10 bg-white' : 'h-3 bg-white/30 hover:bg-white/50'}`} />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
