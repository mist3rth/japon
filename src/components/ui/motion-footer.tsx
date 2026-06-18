"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { cn } from "../../lib/utils";

// @ts-ignore
import sakuraBackground from "../../A_breathtaking_Japanese_sakura_scene,_202606151914.jpeg";
// @ts-ignore
import logoImg from "../../japan-logo.webp";

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES WITH JAPAN COLORS (NIPPON VIBE)
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', var(--font-sans), sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables using standard shadcn/tailwind tokens */
  --pill-bg-1: rgba(255, 255, 255, 0.03);
  --pill-bg-2: rgba(255, 255, 255, 0.01);
  --pill-shadow: rgba(0, 0, 0, 0.5);
  --pill-highlight: rgba(255, 255, 255, 0.08);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.08);
  
  --pill-bg-1-hover: rgba(239, 68, 68, 0.15);
  --pill-bg-2-hover: rgba(239, 68, 68, 0.05);
  --pill-border-hover: rgba(239, 68, 68, 0.35);
  --pill-shadow-hover: rgba(239, 68, 68, 0.1);
  --pill-highlight-hover: rgba(239, 68, 68, 0.25);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background with soft overlay */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow (Red/Crimson and gold shades) */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(223, 28, 45, 0.18) 0%, 
    rgba(234, 88, 12, 0.1) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #ffffff;
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.03);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.15));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Framer Motion Implementation)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const scale = useMotionValue(1);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);
    const springScale = useSpring(scale, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
      const element = localRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const clientX = e.clientX - rect.left - h;
      const clientY = e.clientY - rect.top - w;

      x.set(clientX * 0.35);
      y.set(clientY * 0.35);
      rotateX.set(-clientY * 0.12);
      rotateY.set(clientX * 0.12);
      scale.set(1.04);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    };

    const MotionComponent = motion(Component as any);

    return (
      <MotionComponent
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: springX,
          y: springY,
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          transformStyle: "preserve-3d",
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT (Japan/Nippon Customized Edition)
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Tokyo Neon Metropolis</span> <span className="text-red-500">✦</span>
    <span>Kyoto Classical Temples</span> <span className="text-orange-500">✦</span>
    <span>Osaka Gourmet Capital</span> <span className="text-pink-500">✦</span>
    <span>Nara Sacred Forests</span> <span className="text-red-500">✦</span>
    <span>Tradition Meets Cyberpunk</span> <span className="text-orange-500">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Scroll reveal with Framer Motion scroll hook
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"]
  });

  // Spring physical configurations to match custom inertia
  const springConfig = { stiffness: 90, damping: 20, mass: 0.4 };
  
  // Staggered reveal heights and opacities mapping
  const rawHeadingY = useTransform(scrollYProgress, [0.2, 0.65], [60, 0]);
  const rawHeadingOpacity = useTransform(scrollYProgress, [0.2, 0.65], [0, 1]);
  const rawLinksY = useTransform(scrollYProgress, [0.4, 0.85], [60, 0]);
  const rawLinksOpacity = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);

  const headingY = useSpring(rawHeadingY, springConfig);
  const headingOpacity = useSpring(rawHeadingOpacity, springConfig);
  const linksY = useSpring(rawLinksY, springConfig);
  const linksOpacity = useSpring(rawLinksOpacity, springConfig);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box. 
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full select-none"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything */}
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-neutral-950 text-neutral-100 cinematic-footer-wrapper border-t border-white/5">
          
          {/* Immersive Japanese Sakura Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
            <img 
              src={sakuraBackground} 
              alt="Sakura background" 
              className="w-full h-full object-cover object-center brightness-[0.85] saturate-[1.1] transition-transform duration-[12s] ease-out hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Smooth and premium gradient overlays to integrate with NIPPON branding and dark layout */}
            <div className="absolute inset-0 bg-neutral-950/15 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/25 to-neutral-950/45" />
          </div>

          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none opacity-40" />

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-white/5 bg-neutral-950/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-neutral-400 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <motion.h2
              style={{ y: headingY, opacity: headingOpacity }}
              className="text-4xl md:text-7xl font-display font-black footer-text-glow tracking-tighter mb-12 text-center text-white"
            >
              PRÊT POUR L'AVENTURE?
            </motion.h2>

            {/* Interactive Magnetic Pills Layout */}
            <motion.div 
              style={{ y: linksY, opacity: linksOpacity }} 
              className="flex flex-col items-center gap-6 w-full"
            >
              {/* app destinations explore links */}
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#df1c2d] font-bold">
                Accéder rapidement aux carnets d'itinéraire :
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton 
                  onClick={() => handleScrollToSection("tokyo")} 
                  className="footer-glass-pill px-6 md:px-8 py-4 rounded-full text-white font-bold text-xs md:text-sm flex items-center gap-2 group/btn"
                >
                  <svg className="w-4 h-4 text-[#df1c2d] transform group-hover/btn:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v20M17 5H7M19 12H5M17 19H7" strokeLinecap="round"/>
                  </svg>
                  <span>Tokyo</span>
                </MagneticButton>
                
                <MagneticButton 
                  onClick={() => handleScrollToSection("kyoto")} 
                  className="footer-glass-pill px-6 md:px-8 py-4 rounded-full text-white font-bold text-xs md:text-sm flex items-center gap-2 group/btn"
                >
                  <svg className="w-4 h-4 text-[#b91c1c] transform group-hover/btn:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="8" width="18" height="12" rx="2" strokeLinecap="round"/>
                    <path d="M12 2v6M3 8h18" strokeLinecap="round"/>
                  </svg>
                  <span>Kyoto</span>
                </MagneticButton>

                <MagneticButton 
                  onClick={() => handleScrollToSection("osaka")} 
                  className="footer-glass-pill px-6 md:px-8 py-4 rounded-full text-white font-bold text-xs md:text-sm flex items-center gap-2 group/btn"
                >
                  <svg className="w-4 h-4 text-[#ea580c] transform group-hover/btn:translate-y-[-2px] transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 8v8M8 12h8" strokeLinecap="round"/>
                  </svg>
                  <span>Osaka</span>
                </MagneticButton>

                <MagneticButton 
                  onClick={() => handleScrollToSection("nara")} 
                  className="footer-glass-pill px-6 md:px-8 py-4 rounded-full text-white font-bold text-xs md:text-sm flex items-center gap-2 group/btn"
                >
                  <svg className="w-4 h-4 text-[#f43f5e] transform group-hover/btn:rotate-45 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 3v18M3 12h18M5 5l14 14M5 19L19 5" strokeLinecap="round"/>
                  </svg>
                  <span>Nara</span>
                </MagneticButton>
              </div>

              {/* General Sections Menu */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-4">
                <button 
                  onClick={() => handleScrollToSection("destinations")} 
                  className="text-neutral-400 font-mono text-xs hover:text-red-500 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Destinations
                </button>
                <span className="text-neutral-700 font-mono text-xs">|</span>
                <button 
                  onClick={() => handleScrollToSection("experiences")} 
                  className="text-neutral-400 font-mono text-xs hover:text-red-500 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Expériences
                </button>
                <span className="text-neutral-700 font-mono text-xs">|</span>
                <button 
                  onClick={() => handleScrollToSection("pratique")} 
                  className="text-neutral-400 font-mono text-xs hover:text-red-500 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Informations Pratiques
                </button>
              </div>
            </motion.div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Logo and Copyright on the Left */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-4 text-center md:text-left">
              <div 
                onClick={scrollToTop}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative h-10 flex items-center justify-center group-hover:scale-105 active:scale-95 transition-all duration-300 pt-2.5 md:pt-0">
                  <img
                    src={logoImg}
                    alt="Nippon Logo"
                    width="150"
                    height="40"
                    className="h-full w-auto object-contain z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
              <span className="text-neutral-800 text-xs hidden md:inline">|</span>
              
              <div className="text-neutral-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase flex flex-col md:flex-row items-center gap-2">
                <span>© {new Date().getFullYear()} TOUS DROITS RÉSERVÉS.</span>
                <span className="text-neutral-800 text-xs hidden md:inline">|</span>
                <a
                  href="https://mist3rth.github.io/presentMe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors flex items-center gap-1.5 normal-case font-mono"
                  aria-label="Portfolio de T.THIESSON (ouvre un nouvel onglet)"
                >
                  <span>make by T.THIESSON</span>
                  <svg className="w-3 h-3 text-neutral-500 hover:text-red-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Retourner en haut de la page"
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-neutral-400 hover:text-white group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
