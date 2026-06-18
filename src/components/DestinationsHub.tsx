import * as React from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { destinations } from "../data";

interface DestinationsHubProps {
  onSelectCity: (id: string) => void;
}

export default function DestinationsHub({ onSelectCity }: DestinationsHubProps) {
  // Map cities with custom travel tags for the Hub cards
  const cityTags: Record<string, string> = {
    tokyo: "Cyberpunk & Futurisme",
    kyoto: "Temples & Tradition",
    osaka: "Gastronomie & Néons",
    nara: "Faune sauvage & Sacré",
  };

  const handleScrollToSection = (id: string) => {
    onSelectCity(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const cardVariants = {
    hidden: (idx: number) => {
      // Sur desktop, on place toutes les cartes sous la première (décalage de 100% + gap par index)
      // Sur mobile, on fait un simple slide-in de la gauche pour ne pas casser la grille verticale
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
      return {
        x: isDesktop ? `calc(-${idx * 100}% - ${idx * 1.5}rem)` : -50,
        opacity: isDesktop ? 1 : 0,
        y: isDesktop ? 0 : 20,
        zIndex: 10 - idx,
      };
    },
    visible: (idx: number) => ({
      x: "0px",
      y: "0px",
      opacity: 1,
      transition: {
        type: "tween",
        ease: "linear", // Supprime l'effet d'accélération
        duration: 0.35, // Vitesse beaucoup plus rapide
        delay: idx * 0.06, // Délai très court entre chaque carte
      },
    }),
  };

  return (
    <section 
      id="destinations" 
      className="relative z-20 py-24 px-6 lg:px-12 bg-neutral-950 font-sans border-t border-white/[0.02]"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-900 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase block">
              探索 — Exploration
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-white font-medium">
              Destinations phares
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-light leading-relaxed">
            Un quartet exceptionnel d'étapes d'une vie, reliant la frénésie ultra-rapide des centres cybernétiques à la calme vénération des forêts impériales.
          </p>
        </div>

        {/* Dense Grid matching Brief */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => {
            const labelTag = cityTags[dest.id] || "Découverte";
            
            return (
              <motion.div
                key={dest.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                onClick={() => handleScrollToSection(dest.id)}
                className="group relative h-[480px] rounded-2xl overflow-hidden border border-white/5 bg-neutral-900 cursor-pointer shadow-xl transition-all duration-500 hover:border-white/20 block focus:outline-none"
                style={{ 
                  "--card-accent": dest.color,
                } as React.CSSProperties}
              >
                {/* Background image component */}
                <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
                  <img
                    src={dest.image}
                    alt={dest.cityLabel}
                    loading="lazy"
                    className="w-full h-full object-cover object-center scale-102 group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.7] group-hover:brightness-[0.75] saturate-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle color glow over core brand shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
                </div>

                {/* City color indicator line (gorgeous dynamic top gradient) */}
                <span 
                  className={`absolute top-0 left-0 w-full h-1 bg-neutral-700 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:${dest.gradientBg}`}
                />

                {/* Content Layout inside Card */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  {/* Top: mini index */}
                  <div className="flex justify-between items-center text-white/50">
                    <span className="font-mono text-[10px] tracking-wider font-bold" style={{ color: dest.color }}>0{idx + 1}</span>
                  </div>

                  {/* Bottom: Title, tagline description & Action Indicator */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      {/* Gorgeous city title always styled with gradient */}
                      <h3 className={`text-2xl sm:text-3xl font-display font-bold tracking-wide uppercase bg-gradient-to-r ${dest.gradientBg} bg-clip-text text-transparent transition-all duration-300 group-hover:scale-[1.02] origin-left`}>
                        {dest.cityLabel}
                      </h3>
                      <p 
                        className="text-[11px] font-mono tracking-wider font-bold transition-colors duration-300"
                        style={{ color: dest.color }}
                      >
                        {labelTag}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light group-hover:text-neutral-300 transition-colors">
                      {dest.tagline}
                    </p>

                    {/* Arrow action indicator displayed on hover */}
                    <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 tracking-widest uppercase transition-all duration-500 group-hover:translate-x-1">
                      <span className="group-hover:text-white transition-colors">VOIR LE GUIDE</span>
                      <ArrowDown className="w-3.5 h-3.5 transition-colors group-hover:animate-bounce" style={{ color: dest.color }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
