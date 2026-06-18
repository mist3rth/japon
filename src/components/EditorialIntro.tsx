import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { AnimatedText } from "@/src/components/ui/animated-underline-text-one";

export default function EditorialIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full py-24 md:py-36 bg-neutral-950 flex flex-col items-center justify-center overflow-hidden px-6 lg:px-12 border-t border-white/[0.03]"
    >
      {/* Soft grid overlay inside intro to frame the animation beautifully */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Decorative vertical line */}
      <motion.div 
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent mb-8 z-20 origin-top" 
      />

      <div className="max-w-3xl space-y-6 z-20 relative text-center">
        {/* Japanese + English Label Subtitle */}
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -10 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-bold uppercase tracking-[0.4em] text-red-500 block"
        >
          JAPON — 日本
        </motion.span>

        {/* Dynamic Underlined H2 Headline using AnimatedText controlled by isInView state */}
        <div className="flex flex-col items-center justify-center pt-2 pb-4">
          <AnimatedText 
            text="Quatre villes."
            textClassName="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight text-white leading-tight uppercase font-glow"
            underlineClassName="text-red-500"
            triggerPlay={isInView}
          />
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl font-display font-light tracking-widest text-neutral-400 mt-5"
          >
            Un archipel de contrastes.
          </motion.h2>
        </div>

        {/* Subtle decorative separators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-4 py-1"
        >
          <div className="w-8 h-[1px] bg-neutral-800" />
          <span className="text-[10px] text-neutral-600 font-mono tracking-widest">和風</span>
          <div className="w-8 h-[1px] bg-neutral-800" />
        </motion.div>

        {/* Editorial Body Text — deux calques superposés via grid */}
        <div
          className="relative font-sans max-w-2xl mx-auto py-4 select-none grid grid-cols-1 grid-rows-1"
          style={{ fontSize: '20px', lineHeight: '24px', fontWeight: 300 }}
        >
          {/* Calque gris (bas) */}
          <p className="col-start-1 row-start-1 text-neutral-600 text-center">
            Du balayage permanent des néons électrisants de Tokyo aux rituels silencieux des sanctuaires
            de Kyoto, découvrez un voyage sculpté par des millénaires d'histoire, des rues parfumées par
            la gastronomie de rue d'Osaka et la sérénité des forêts sacrées de Nara.
          </p>

          {/* Calque blanc (haut) — révélé gauche → droite */}
          <motion.p
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: isInView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="col-start-1 row-start-1 text-white text-center pointer-events-none"
          >
            Du balayage permanent des néons électrisants de Tokyo aux rituels silencieux des sanctuaires
            de Kyoto, découvrez un voyage sculpté par des millénaires d'histoire, des rues parfumées par
            la gastronomie de rue d'Osaka et la sérénité des forêts sacrées de Nara.
          </motion.p>
        </div>

        {/* Minimal elegant separator scaling based on state */}
        <div className="pt-6 flex justify-center">
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-16 h-[2.5px] bg-red-600/75 mx-auto rounded-full origin-center shadow-[0_0_8px_rgba(220,38,38,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
