import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, Leaf, Sun, Wind } from 'lucide-react';
import Home from './components/Home';
import Services from './components/Services';
import Team from './components/Team';
import Contact from './components/Contact';

type Page = 'HOME' | 'SERVICES' | 'TEAM' | 'CONTACT';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden font-sans selection:bg-white/20">
      {/* Global Effects */}
      <div className="bg-noise absolute inset-0 z-0 mix-blend-overlay opacity-40"></div>
      <div className="vignette"></div>
      <div className="monitor-glare"></div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        className="absolute top-0 w-full z-30 flex flex-col items-center justify-center pt-6 sm:pt-8 md:pt-12 pb-3 sm:pb-4 md:pb-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none"
      >
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-2 sm:mb-3 md:mb-4 opacity-60">
          <Leaf className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" strokeWidth={1} />
          <Sun className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" strokeWidth={1} />
          <Wind className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" strokeWidth={1} />
          <Snowflake className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" strokeWidth={1} />
        </div>
        <h1 className="font-serif text-base sm:text-xl md:text-3xl lg:text-4xl tracking-[0.3em] sm:tracking-[0.4em] font-light text-white/90 ml-[0.3em] sm:ml-[0.4em]">
          四季 CONSULTING
        </h1>
        <div className="h-[1px] w-6 sm:w-8 md:w-12 bg-white/20 mt-4 sm:mt-6 md:mt-8"></div>
      </motion.header>

      {/* Main Content Area */}
      <div className="absolute inset-0 z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'HOME' && <Home key="home" />}
          {currentPage === 'SERVICES' && <Services key="services" />}
          {currentPage === 'TEAM' && <Team key="team" />}
          {currentPage === 'CONTACT' && <Contact key="contact" />}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
        className="absolute bottom-0 w-full z-30 flex justify-center pb-4 sm:pb-6 md:pb-8 pt-6 sm:pt-8 md:pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
      >
        <nav className="flex gap-4 sm:gap-6 md:gap-12 text-[9px] sm:text-[10px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-white/40">
          {(['HOME', 'SERVICES', 'TEAM', 'CONTACT'] as Page[]).map((item) => (
            <button 
              key={item} 
              onClick={() => setCurrentPage(item)}
              className={`transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:bg-white after:transition-all after:duration-300 ${
                currentPage === item 
                  ? 'text-white after:w-full' 
                  : 'hover:text-white after:w-0 hover:after:w-full'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </motion.footer>
    </div>
  );
}
