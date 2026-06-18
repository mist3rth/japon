import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface ExperienceItem {
  id: string;
  kanji: string;
  title: string;
  description: string;
  cities: { name: string; id: string }[];
}

export default function ExperiencesSection() {
  const experiences: ExperienceItem[] = [
    {
      id: "gastronomy",
      kanji: "食",
      title: "Gastronomie",
      description: "Des étals de takoyaki crépitant sous les néons d'Osaka au raffinement ancestral du kaiseki de Kyoto.",
      cities: [
        { name: "Osaka", id: "osaka" },
        { name: "Tokyo", id: "tokyo" }
      ]
    },
    {
      id: "spirituality",
      kanji: "祈",
      title: "Spiritualité & Temples",
      description: "L'atmosphère enveloppante des prières matinales sous les toits dorés et les forêts de torii s'étendant à perte de vue.",
      cities: [
        { name: "Kyoto", id: "kyoto" },
        { name: "Nara", id: "nara" }
      ]
    },
    {
      id: "nature",
      kanji: "花",
      title: "Nature & Saisons",
      description: "La contemplation du temps qui passe à travers les sakura printaniers ou la mélancolie dorée des érables d'automne.",
      cities: [
        { name: "Nara", id: "nara" },
        { name: "Kyoto", id: "kyoto" }
      ]
    },
    {
      id: "mobility",
      kanji: "鉄",
      title: "Mobilité & Shinkansen",
      description: "Une expérience fluide à vitesse supersonique à bord du train de légende traversant les plaines du Mont Fuji.",
      cities: [
        { name: "Tokyo", id: "tokyo" },
        { name: "Osaka", id: "osaka" }
      ]
    },
    {
      id: "popculture",
      kanji: "遊",
      title: "Culture Pop & Tradition",
      description: "Le contraste saisissant entre les cafés mécas rutilants d'Akihabara et la sérénité des maisons thé en bois de geishas.",
      cities: [
        { name: "Tokyo", id: "tokyo" },
        { name: "Kyoto", id: "kyoto" }
      ]
    },
    {
      id: "nightlife",
      kanji: "夜",
      title: "Vie Nocturne",
      description: "L'exploration nocturne des barres horizontales et des ruelles clandestines pleines de secrets bien gardés.",
      cities: [
        { name: "Tokyo", id: "tokyo" },
        { name: "Osaka", id: "osaka" }
      ]
    }
  ];

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section 
      id="experiences" 
      className="relative z-20 py-24 md:py-32 px-6 lg:px-12 bg-neutral-950 border-t border-white/[0.02]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Title Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-red-500 block">
            体験 — Expériences
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white uppercase tracking-tight">
            Voyager autrement au japon
          </h2>
          <div className="w-12 h-1 bg-red-600/80 mx-auto rounded-full" />
          <p className="text-neutral-400 font-light max-w-lg mx-auto" style={{ fontSize: '20px', lineHeight: '24px' }}>
            Découvrez l'archipel à travers ses thématiques majeures, reliant l'ensemble des cités phares dans un ballet sensoriel inoubliable.
          </p>
        </div>

        {/* 3 Columns Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={exp.id} exp={exp} idx={idx} handleScrollToSection={handleScrollToSection} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ExperienceCard({ exp, idx, handleScrollToSection }: { key?: string, exp: ExperienceItem, idx: number, handleScrollToSection: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // La zone active commence à 60% de la hauteur (soit 40% du bas) et se termine à 20% du haut.
  const isInView = useInView(ref, { margin: "-20% 0px -40% 0px" });

  return (
    <motion.div
      ref={ref}
      data-active={isInView}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
      className={`group relative bg-neutral-900/45 border rounded-xl p-6 transition-all duration-500 flex flex-col justify-between shadow-lg ${isInView ? "border-red-600/40" : "border-white/5"}`}
    >
      {/* Micro accent visual color strip */}
      <div className={`absolute top-0 left-6 right-6 h-[2px] bg-red-600 origin-center transition-transform duration-500 ${isInView ? "scale-x-100" : "scale-x-0"}`} />

      <div className="space-y-4">
        {/* Kanji Icon Block */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 shadow-md ${isInView ? "text-white bg-red-600" : "text-red-500 bg-neutral-800"}`}>
          <span className={`text-lg leading-none font-bold transition-transform duration-500 inline-block ${isInView ? "scale-110" : ""}`}>{exp.kanji}</span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className={`text-lg font-bold tracking-wide transition-colors duration-500 ${isInView ? "text-red-400" : "text-white"}`}>
            {exp.title}
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            {exp.description}
          </p>
        </div>
      </div>

      {/* City Tags list linking cleanly to sections */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-neutral-500 font-mono tracking-widest font-semibold">CIBLE :</span>
        <div className="flex gap-2">
          {exp.cities.map((city) => (
            <button
              key={city.id}
              onClick={() => handleScrollToSection(city.id)}
              className="text-[10px] font-bold text-neutral-400 bg-neutral-800/80 border border-white/5 hover:border-red-500 hover:text-white px-2 py-1 rounded transition-all cursor-pointer font-mono"
            >
              {city.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
