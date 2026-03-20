import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SERVICES = [
  {
    id: 'planning',
    title: '기획 컨설팅',
    subtitle: '전략 / 설계',
    description: '치밀한 수싸움. 완벽한 시나리오를 위한 첫 걸음.',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%EC%B6%98.jpg'
  },
  {
    id: 'risk',
    title: '리스크 매니지먼트',
    subtitle: '실행 / 타격',
    description: '찰나의 순간. 변수 없는 압도적인 무력.',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%ED%95%98.jpg'
  },
  {
    id: 'asset',
    title: '자산 정리',
    subtitle: '수거 / 청소',
    description: '흔적 없는 마무리. 모든 것을 씻어내는 비.',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%EC%B6%94.jpg'
  },
  {
    id: 'security',
    title: '보안 솔루션',
    subtitle: '은폐 / 잠적',
    description: '완벽한 소멸. 존재하지 않았던 것처럼.',
    image: 'https://raw.githubusercontent.com/moon06010/A/refs/heads/main/%EB%8F%99.jpg'
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState(SERVICES[0]);

  return (
    <motion.div 
      initial={{ opacity: 0, backgroundColor: '#000' }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      transition={{ duration: 1.5 }}
      className="relative z-10 w-full h-full flex flex-row pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-8 md:px-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 0.8, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={activeService.image} 
              alt={activeService.title}
              className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity grayscale brightness-75 contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/80 md:via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-t from-black via-transparent to-black"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left: List */}
      <div className="relative z-20 w-1/2 md:w-1/3 h-full flex flex-col justify-center pl-2 sm:pl-0">
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="cursor-pointer group"
              onMouseEnter={() => setActiveService(service)}
              onClick={() => setActiveService(service)}
            >
              <h3 className={`font-serif text-sm sm:text-xl md:text-2xl tracking-widest transition-colors duration-500 ${activeService.id === service.id ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                {service.title}
              </h3>
              <p className={`text-[8px] sm:text-[10px] md:text-xs tracking-[0.1em] sm:tracking-[0.2em] mt-1 md:mt-2 transition-colors duration-500 ${activeService.id === service.id ? 'text-white/70' : 'text-white/20 group-hover:text-white/40'}`}>
                {service.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Description */}
      <div className="relative z-20 w-1/2 md:w-2/3 h-full flex items-center justify-end pr-2 sm:pr-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`desc-${activeService.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-right max-w-[150px] sm:max-w-xs md:max-w-md"
          >
            <p className="font-serif text-[10px] sm:text-sm md:text-lg text-white/80 tracking-widest leading-relaxed">
              {activeService.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
