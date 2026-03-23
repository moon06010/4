import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function Contact() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'contrast(200%) brightness(200%) grayscale(100%)' }}
      animate={{ opacity: 1, filter: 'contrast(100%) brightness(100%) grayscale(0%)' }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-black pt-[140px] sm:pt-20 pb-20 sm:pb-24"
    >
      {/* Glitch overlay on mount */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute inset-0 bg-white mix-blend-difference pointer-events-none z-50"
        style={{ clipPath: 'polygon(0 20%, 100% 20%, 100% 21%, 0 21%, 0 40%, 100% 40%, 100% 42%, 0 42%, 0 80%, 100% 80%, 100% 83%, 0 83%)' }}
      />

      <div className="w-full max-w-2xl px-6 md:px-8 flex flex-col items-center">
        <p className="text-[9px] sm:text-[10px] md:text-[10px] text-white/30 tracking-[0.1em] sm:tracking-[0.2em] mb-12 sm:mb-16 md:mb-24 text-center font-light leading-relaxed">
          모든 계약은 철저한 기밀로 유지되며,<br className="block sm:hidden" /> 체결된 계약은 번복할 수 없습니다.
        </p>

        <form className="w-full space-y-8 sm:space-y-10 md:space-y-16" onSubmit={(e) => e.preventDefault()}>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="TARGET INFO" 
              className="w-full bg-transparent border-b border-white/20 py-2 text-sm tracking-widest text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/60 transition-colors"
            />
          </div>
          
          <div className="relative group">
            <input 
              type="text" 
              placeholder="DEADLINE" 
              className="w-full bg-transparent border-b border-white/20 py-2 text-sm tracking-widest text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/60 transition-colors"
            />
          </div>

          <div className="relative group">
            <input 
              type="password" 
              placeholder="CLIENT PASSWORD" 
              className="w-full bg-transparent border-b border-white/20 py-2 text-sm tracking-widest text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/60 transition-colors"
            />
          </div>

          <div className="w-full flex justify-end pt-6 sm:pt-8">
            <button 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-white/40 hover:text-white transition-colors duration-300 relative"
            >
              <span className={`${isHovered ? 'animate-pulse' : ''}`}>SUBMIT</span>
              <div className={`absolute -bottom-2 right-0 h-[1px] bg-white transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}></div>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
