import { ChevronLeft, ChevronRight, Sparkles, BookOpen, ExternalLink } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Destination } from "../../types";
import { destinations } from "../../data";

interface HeroSectionProps {
  currentDest: Destination;
  activeIndex: number;
  setActiveIndex: (index: number | ((prev: number) => number)) => void;
  isFirstLoad: boolean;
  setDrawerOpen: (open: boolean) => void;
  setQuickTipsOpen: (open: boolean) => void;
}

export default function HeroSection({
  currentDest,
  activeIndex,
  setActiveIndex,
  isFirstLoad,
  setDrawerOpen,
  setQuickTipsOpen,
}: HeroSectionProps) {
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1));
  };

  // Parallax effect for the hero background
  const { scrollY } = useScroll();
  
  // Spring configuration for smooth scrolling (removes stutter/saccades)
  const springConfig = { stiffness: 120, damping: 25, mass: 0.2, restDelta: 0.01 };

  const rawImageY = useTransform(scrollY, [0, 1000], [0, -100]);
  const imageY = useSpring(rawImageY, springConfig);
  
  const rawContentY = useTransform(scrollY, [0, 1000], [0, -250]);
  const contentY = useSpring(rawContentY, springConfig);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Immersive Dynamic Background with cross-fade transitions */}
      <div id="jp-bg-container" className="absolute inset-0 z-0 overflow-hidden select-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentDest.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <motion.img
              src={currentDest.image}
              alt={currentDest.cityLabel}
              style={{ y: imageY }}
              className="w-full h-full object-cover object-center brightness-[0.92] saturate-[1.02] scale-[1.15]"
              referrerPolicy="no-referrer"
              fetchPriority="high"
              loading="eager"
            />
            {/* Soft vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-neutral-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/15 via-transparent to-neutral-950/15" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Grid Pattern overlay for tech-traditional texture feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />

      {/* Slots for top navigation will sit as sibling in layout, or inside. Since Navbar is sibling, we keep this flex container aligned. */}
      {/* Spacer to push body content down matching header height */}
      <div className="h-20 w-full" />

      <div className="w-full flex flex-col items-center">
        {/* 3. Main Hero Area containing Japanese Red Sun background element and the block big fonts */}
        <motion.main style={{ y: contentY }} id="jp-hero-body" className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center pt-20 md:pt-28 pb-12 text-center select-none w-full will-change-transform">
          {/* Large red circle sun that scales up dynamically from 0 strictly on arrival/first load */}
          <motion.div
            key="rising-sun-once"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }} // Spring-like beautiful easing
            className="absolute top-[4%] md:top-[12%] w-[280px] h-[280px] md:w-[410px] md:h-[410px] rounded-full overflow-hidden blur-[1px] pointer-events-none -z-10 bg-red-600 shadow-[0_0_120px_rgba(220,38,38,0.25)] flex items-center justify-center will-change-transform"
          >
            {/* Subtle slow sunburst dynamic rotation effect inside the red sun */}
            <div className="absolute inset-0 bg-radial from-red-500 via-red-600 to-rose-700 opacity-95" />
            <div className="w-full h-full bg-gradient-to-b from-white/10 to-transparent absolute top-0 left-0" />
          </motion.div>

          {/* Floating title block with custom key frames */}
          <div className="relative mt-4 space-y-4 max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentDest.id}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: isFirstLoad ? 0.5 : 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }} // Chained delay on arrival, rapid transition on card changes
                className="text-7xl sm:text-8xl md:text-[10rem] font-display uppercase tracking-tight text-white select-none pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] leading-[0.95] text-glow"
                style={{
                  fontFamily: "'Dela Gothic One', sans-serif"
                }}
              >
                {currentDest.title}
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle / Tagline description */}
            <div className="space-y-6 pt-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentDest.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm sm:text-base md:text-lg tracking-wider text-neutral-100 font-medium max-w-lg mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                >
                  {currentDest.tagline}
                </motion.p>
              </AnimatePresence>

              {/* Glowing CTA Button as seen in the image mockup */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-block"
              >
                <button
                  id="btn-explore-destination"
                  onClick={() => setDrawerOpen(true)}
                  className="px-10 py-3.5 bg-neutral-900 border border-red-600/35 hover:border-red-600 text-white rounded-full font-bold text-xs uppercase tracking-[0.3em] shadow-lg hover:shadow-red-600/20 active:bg-neutral-950 cursor-pointer transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Shiny reflex hover outline */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-red-500 font-bold font-display text-base leading-none group-hover:scale-110 transition-transform duration-300">本</span>
                    EXPLORER
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.main>

        {/* 4. Interactive Bottom Miniatures Navigation Slider Section */}
        <footer id="jp-footer-slider" className="relative z-20 max-w-7xl mx-auto px-0 sm:px-6 lg:px-12 pb-16 pt-8 w-full">
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 flex-wrap lg:flex-nowrap">
            
            {/* Prev Arrow Button */}
            <button
              id="btn-prev-slider"
              onClick={handlePrev}
              className="hidden sm:flex w-12 h-12 rounded-full bg-black/60 hover:bg-neutral-900 text-white border border-white/10 hover:border-red-600/50 items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
              aria-label="Previous destination"
            >
              <ChevronLeft className="w-5 h-5 text-red-500" />
            </button>

            {/* The mini cards reflecting: Tokyo, Kyoto, Osaka, Nara */}
            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-4 px-4 sm:px-2 select-none justify-start sm:justify-center w-full sm:w-auto">
              {destinations.map((dest, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <div
                    key={dest.id}
                    id={`dest-card-${dest.id}`}
                    onClick={() => setActiveIndex(idx)}
                    className="group relative flex flex-col items-center cursor-pointer transition-all duration-500 flex-shrink-0"
                  >
                    {/* High Quality Circle thumbnail container */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[3px] transition-all duration-500">
                      
                      {/* Ring selection indicator path */}
                      <span 
                        className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                          isSelected 
                            ? "ring-4 ring-red-600/30 border-red-500 scale-105" 
                            : "border-white/15 group-hover:border-white/40"
                        }`} 
                      />

                      {/* Image Circle */}
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src={dest.image}
                          alt={dest.cityLabel}
                          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                            isSelected ? "brightness-100 saturate-[1.25]" : "brightness-[0.6] grayscale-[20%]"
                          }`}
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Simple overlay pulse dots indicator */}
                      {isSelected && (
                        <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-red-600 border border-white flex items-center justify-center shadow-md animate-bounce">
                          <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        </span>
                      )}
                    </div>

                    {/* Destination Information Label text below circles */}
                    <div className="text-center mt-3 max-w-[130px]">
                      <div className="text-xs font-bold tracking-widest text-white uppercase group-hover:text-red-500 transition-colors">
                        {dest.cityLabel}:
                      </div>
                      <div className="text-[10px] text-neutral-400 tracking-wide mt-0.5 line-clamp-1 group-hover:text-neutral-200 transition-colors">
                        {dest.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Arrow Button */}
            <button
              id="btn-next-slider"
              onClick={handleNext}
              className="hidden sm:flex w-12 h-12 rounded-full bg-black/60 hover:bg-neutral-900 text-white border border-white/10 hover:border-red-600/50 items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
              aria-label="Next destination"
            >
              <ChevronRight className="w-5 h-5 text-red-500" />
            </button>

          </div>

          {/* Travel quick utilities bar for traditional craftsmanship feeling */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
              <span>PORTAIL DÉCOUVERTE NIPPON — DESTINATION SÉLECTIONNÉE :</span>
              <span className="text-white hover:text-red-500 transition-colors uppercase font-bold">{currentDest.cityLabel}</span>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setQuickTipsOpen(true)}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" /> Guide du Voyageur
              </button>
              <span>•</span>
              <a href="https://www.japan.travel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                Aller sur JNTO <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
