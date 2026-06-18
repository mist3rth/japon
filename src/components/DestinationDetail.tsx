import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Destination } from "../types";
import { destinations } from "../data";

interface DestinationDetailProps {
  onExplore: (dest: Destination) => void;
}

// ── Sous-composant isolé : chaque card gère son propre scroll parallax ──
function DestCard({
  dest,
  idx,
  onExplore,
  frenchTagline,
  kanji,
  story,
}: {
  key?: string;
  dest: Destination;
  idx: number;
  onExplore: (dest: Destination) => void;
  frenchTagline: string;
  kanji: string;
  story: string;
}) {
  const isAlignedRight = idx % 2 === 0;

  // Ref sur la section pour tracker son propre scroll progress
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax : l'image monte de +60px à -60px pendant que la card traverse le viewport
  // scale-[1.15] sur l'image garantit qu'on ne voit pas les bords blancs
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      key={dest.id}
      id={dest.id}
      className="relative py-28 md:py-36 px-6 lg:px-12 border-b border-white/[0.02] overflow-hidden scroll-mt-20"
    >
      {/* Watermark Japanese Kanji */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 text-neutral-900/10 font-bold text-[18rem] md:text-[28rem] pointer-events-none select-none z-0 tracking-widest leading-none ${
          isAlignedRight ? "left-6 md:left-12" : "right-6 md:right-12"
        }`}
      >
        {kanji}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
            isAlignedRight ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* ── Bloc texte ── */}
          <motion.div
            initial={{ opacity: 0, x: isAlignedRight ? -120 : 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className={`space-y-8 lg:col-span-5 ${
              isAlignedRight ? "lg:order-1" : "lg:order-2"
            }`}
          >
            {/* Étape header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] font-bold">
                <span
                  className={`bg-gradient-to-r ${dest.gradientBg} bg-clip-text text-transparent`}
                >
                  Étape 0{idx + 1}
                </span>
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: dest.color }}
                />
                <span style={{ color: dest.color }}>{kanji}</span>
              </div>

              <h3
                className={`text-4xl sm:text-5xl font-display font-bold tracking-tight uppercase leading-none ${dest.gradientText}`}
              >
                {dest.cityLabel}
              </h3>

              <p className="text-lg md:text-xl font-medium tracking-wide text-neutral-300">
                {frenchTagline}
              </p>
            </div>

            {/* Facts */}
            <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4 my-2">
              {dest.facts.slice(0, 4).map((fact, fIdx) => (
                <div key={fIdx} className="space-y-1">
                  <span className="block text-[9px] uppercase tracking-widest text-neutral-500 font-mono font-medium">
                    {fact.label}
                  </span>
                  <span className="block text-xs font-bold text-white tracking-wide">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Story */}
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light text-justify">
              {story}
            </p>

            {/* Attractions */}
            <div className="space-y-3.5 pt-2">
              <span className="block text-[10px] tracking-widest text-red-500 uppercase font-mono font-bold">
                Points d'intérêt incontournables
              </span>
              <ul className="space-y-2.5">
                {dest.attractions.map((attr, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-3 text-xs text-neutral-300">
                    <span className="mt-1 flex items-center justify-center w-4 h-4 rounded-full bg-neutral-900 border border-white/10 text-rose-500 font-mono text-[9px]">
                      {aIdx + 1}
                    </span>
                    <div>
                      <span className="font-bold text-white block">{attr.name}</span>
                      <span className="text-neutral-400 font-light mt-0.5 block">{attr.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-4 flex items-center">
              <button
                onClick={() => onExplore(dest)}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white text-neutral-950 font-bold text-[11px] uppercase tracking-[0.2em] rounded-full hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/10 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <span>Consulter l'itinéraire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* ── Bloc image avec parallax ── */}
          <motion.div
            initial={{ opacity: 0, x: isAlignedRight ? 120 : -120, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-7 ${
              isAlignedRight ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {/* Container overflow-hidden : masque le dépassement du parallax */}
            <div className="relative aspect-4/5 md:aspect-16/10 lg:aspect-4/5 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/[0.06] group">
              {/* Cadre brillant au survol */}
              <div className="absolute inset-0 z-10 border border-white/5 group-hover:border-red-600/40 rounded-2xl transition-all duration-500 pointer-events-none" />

              {/* Image avec effet parallax vertical */}
              <motion.img
                src={dest.image}
                alt={dest.cityLabel}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-[1.15] brightness-90 group-hover:brightness-100 transition-[filter] duration-700"
                style={{ y: imageY }}
              />

              {/* Dégradé bas */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/35 to-transparent z-10 pointer-events-none" />

              {/* Badge ville */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-mono text-xs font-bold text-white border border-white/10">
                  {kanji}
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400 font-mono tracking-widest">
                    NIPPON DISCOVERY
                  </span>
                  <span className="block text-sm font-bold text-white uppercase tracking-wider">
                    {dest.cityLabel} SIGHTSEEING
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Composant principal ──
export default function DestinationDetail({ onExplore }: DestinationDetailProps) {
  const cityFrenchTaglines: Record<string, string> = {
    tokyo: "L'avenir à plein régime",
    kyoto: "Le temps suspendu",
    osaka: "La ville qui se mange",
    nara: "Le sanctuaire oublié",
  };

  const cityKanjis: Record<string, string> = {
    tokyo: "東京",
    kyoto: "京都",
    osaka: "大阪",
    nara: "奈良",
  };

  const cityStories: Record<string, string> = {
    tokyo:
      "Métropole hyperactive baignée sous des océans de néons fluorescents, Tokyo symbolise la collision harmonieuse entre le cyber-futurisme effréné et la retenue traditionnelle japonaise. Dans les ruelles brumeuses de Shinjuku ou au milieu des traversées tumultueuses de Shibuya, des sanctuaires Shinto centenaires apportent un abri de fraîcheur silencieux. C'est une invitation fascinante à vivre l'inédit, un carrefour vibrant où les automates de haute technologie cohabitent paisiblement avec la poésie intemporelle des cerisiers en fleurs.",
    kyoto:
      "Berceau culturel de l'Empire nippon pendant plus de mille ans, Kyoto recèle l'âme indomptée des traditions spirituelles japonaises. Les forêts murmurent au pied de temples recouverts d'or et les mystérieuses ruelles boisées du quartier de Gion vous transporteront au temps des shoguns et des rituels secrets d'apprentissage des Geiko. Un lieu pacifique et suspendu où le clapotis de l'eau claire des jardins Zen dessine une voie pure et contemplative vers le sacré.",
    osaka:
      "Surnommée affectueusement la cuisine de la nation, Osaka fascine par sa spontanéité exubérante, son sens légendaire de la camaraderie et sa culture culinaire profondément enracinée. Le long des canaux électriques du quartier de Dotonbori aux enseignes géantes suspendues, les vapeurs chaudes des Takoyaki et des Okonomiyaki éveillent les sens dans une ambiance festive indescriptible. C'est une cité au grand cœur, impatiente de faire vibrer chaque voyageur de passage.",
    nara:
      "Première capitale permanente historique de l'archipel impérial, Nara est un sanctuaire de légende enveloppé d'écorce de cèdre et de brumes sacrées. Entre les colonnades en séquoia géantes hébergeant le Grand Bouddha de bronze au Todai-ji, plus de mille cerfs Shika apprivoisés et reconnus historiques messagers des dieux déambulent librement au contact des humains. Une expérience profondément singulière au goût d'éternité mystique.",
  };

  return (
    <div id="destinations-detailed-list" className="relative z-20 bg-neutral-950">
      {destinations.map((dest, idx) => (
        <DestCard
          key={dest.id}
          dest={dest}
          idx={idx}
          onExplore={onExplore}
          frenchTagline={cityFrenchTaglines[dest.id] || dest.subtitle}
          kanji={cityKanjis[dest.id] || "日本"}
          story={cityStories[dest.id] || dest.quickDescription}
        />
      ))}
    </div>
  );
}
