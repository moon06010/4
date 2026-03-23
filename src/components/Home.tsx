import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Snowflake, Leaf, Sun, Wind } from 'lucide-react';

const SEASONS = [
  {
    id: 'spring',
    kanji: '春',
    name: 'SPRING',
    subtitle: 'Planning & Strategy',
    icon: Leaf,
    description: 'The seed is planted. Meticulous planning and intelligence gathering to ensure a flawless execution.',
    color: 'from-zinc-900 to-black',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%EB%A1%80_1.png'
  },
  {
    id: 'summer',
    kanji: '夏',
    name: 'SUMMER',
    subtitle: 'Execution & Action',
    icon: Sun,
    description: 'The heat of the moment. Swift, precise, and overwhelming force when necessary.',
    color: 'from-zinc-950 to-black',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%EC%A0%9C_1.png'
  },
  {
    id: 'autumn',
    kanji: '秋',
    name: 'AUTUMN',
    subtitle: 'Collection & Cleanup',
    icon: Wind,
    description: 'The harvest. Gathering what is owed and ensuring no loose ends remain.',
    color: 'from-zinc-900 to-black',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%EA%B3%B5_1.png'
  },
  {
    id: 'winter',
    kanji: '冬',
    name: 'WINTER',
    subtitle: 'Concealment & Disappearance',
    icon: Snowflake,
    description: 'The cold silence. Erasing all traces, leaving nothing but the chilling void.',
    color: 'from-zinc-950 to-black',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%EC%9A%94_2.png'
  }
];

export default function Home() {
  const [hoveredSeason, setHoveredSeason] = useState<string | null>(null);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      transition={{ duration: 1.5 }}
      className="relative z-10 w-full h-full flex flex-col md:flex-row"
    >
      {SEASONS.map((season, index) => (
        <motion.div
          key={season.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: index * 0.2 }}
          className={`group relative flex-1 h-full border-b md:border-b-0 md:border-r border-white/5 last:border-b-0 md:last:border-r-0 flex flex-col justify-center items-center cursor-pointer overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            hoveredSeason === season.id ? 'flex-[1.5]' : hoveredSeason ? 'flex-[0.8] opacity-30' : 'flex-1'
          }`}
          onMouseEnter={() => setHoveredSeason(season.id)}
          onMouseLeave={() => setHoveredSeason(null)}
          onClick={() => setHoveredSeason(hoveredSeason === season.id ? null : season.id)}
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-b ${season.color} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}></div>
          
          {/* Subtle blue tint overlay on hover */}
          <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen"></div>

          {/* Content Container */}
          <div className="relative z-20 flex flex-col items-center text-center px-1 sm:px-4 md:px-6 w-full">
            {/* Kanji */}
            <motion.div 
              className="font-serif text-4xl sm:text-5xl md:text-8xl lg:text-9xl text-white/5 mb-1 md:mb-8 font-light tracking-tighter select-none"
              animate={{ 
                scale: hoveredSeason === season.id ? 1.05 : 1,
                color: hoveredSeason === season.id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {season.kanji}
            </motion.div>

            {/* English Name */}
            <h2 className="font-serif text-[10px] sm:text-sm md:text-xl tracking-[0.2em] sm:tracking-[0.4em] mb-1 md:mb-2 text-white/60 group-hover:text-white transition-colors duration-500 ml-[0.2em] sm:ml-[0.4em]">
              {season.name}
            </h2>

            {/* Subtitle */}
            <h3 className="text-[8px] sm:text-[8px] md:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white/30 mb-1 md:mb-8 group-hover:text-white/70 transition-colors duration-500 text-center">
              {season.subtitle}
            </h3>

            {/* Hidden Description & Character Placeholder (Reveals on hover) */}
            <motion.div 
              className="overflow-hidden flex flex-col items-center"
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: hoveredSeason === season.id ? 'auto' : 0,
                opacity: hoveredSeason === season.id ? 1 : 0,
                marginTop: hoveredSeason === season.id ? '0.5rem' : '0'
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <p className="text-[9px] sm:text-[10px] md:text-xs text-white/50 leading-relaxed max-w-[160px] sm:max-w-[180px] md:max-w-[220px] font-light mb-2 sm:mb-4 md:mb-8 block">
                {season.description}
              </p>
              
              {/* Character Image Box */}
              <div className="w-16 h-16 sm:w-24 sm:h-32 md:w-40 md:h-56 lg:w-48 lg:h-64 border border-white/10 bg-black/50 flex flex-col items-center justify-center relative overflow-hidden group/box backdrop-blur-sm">
                {/* Tint and Gradient Overlays for blending */}
                <div className="absolute inset-0 bg-blue-900/20 opacity-60 group-hover/box:opacity-20 transition-opacity duration-700 z-10 mix-blend-color"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                
                {/* Character Image */}
                <img 
                  src={season.image} 
                  alt={`${season.name} Agent`}
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-75 opacity-60 group-hover/box:opacity-100 group-hover/box:grayscale-[30%] group-hover/box:scale-105 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Icon */}
                <div className="absolute top-1 right-1 sm:top-3 sm:right-3 z-20 opacity-30 group-hover/box:opacity-70 transition-opacity duration-500">
                  <season.icon className="w-2 h-2 sm:w-3 sm:h-3" strokeWidth={1} />
                </div>
                
                {/* Label */}
                <div className="absolute bottom-2 sm:bottom-4 left-0 w-full text-center z-20">
                  <span className="text-[5px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.4em] text-white/50 uppercase drop-shadow-md group-hover/box:text-white/90 transition-colors duration-500">
                    Agent Data
                  </span>
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 z-20"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 z-20"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 z-20"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 z-20"></div>
              </div>
            </motion.div>
          </div>

          {/* Vertical Line Accent */}
          <div className="absolute bottom-0 w-[1px] h-0 bg-gradient-to-t from-white/20 to-transparent group-hover:h-1/3 transition-all duration-1000 ease-out"></div>
        </motion.div>
      ))}
    </motion.main>
  );
}
