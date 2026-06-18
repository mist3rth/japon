import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, Utensils, Landmark, Trees, Flame, Compass, Check } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  category: "all" | "heritage" | "modern" | "food" | "nature";
  location: string;
  description: string;
  image: string;
  duration: string;
  highlights: string[];
}

export default function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "heritage" | "modern" | "food" | "nature">("all");
  const [likedList, setLikedList] = useState<string[]>([]);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const categories = [
    { id: "all", label: "TOUS ACCÈS", icon: Compass },
    { id: "heritage", label: "TRADITION & TEMPLES", icon: Landmark },
    { id: "modern", label: "POP & HIGH-TECH", icon: Flame },
    { id: "food", label: "GASTRONOMIE", icon: Utensils },
    { id: "nature", label: "NATURE SACRÉE", icon: Trees },
  ] as const;

  const experiencesData: Experience[] = [
    {
      id: "shinto-tea",
      title: "Cérémonie du Thé Chado dans un Temple Zen",
      category: "heritage",
      location: "Kyoto (Gion)",
      description: "Découvrez l'harmonie et le respect spirituel à travers la préparation méticuleuse du thé vert matcha traditionnel, guidée par un maître de thé certifié dans un temple datant du XVIe siècle.",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
      duration: "2 Heures",
      highlights: ["Dégustation de Matcha de haute qualité", "Explications philosophiques", "Authentique gâteau Wagashi traditionnel"],
    },
    {
      id: "akihabara-cyber",
      title: "Exploration Cyberpunk & Arcade Retro",
      category: "modern",
      location: "Tokyo (Akihabara)",
      description: "Plongez au cœur de l'excitation électrique du quartier geek légendaire d'Akihabara. Visite guidée des plus anciennes salles d'arcade, des magasins de retro-gaming, et des néons emblématiques de la nuit.",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=600",
      duration: "3.5 Heures",
      highlights: ["Session guidée rétro-gaming", "Visite collector shops secrets", "Dîner street-food typique"],
    },
    {
      id: "ramen-masterclass",
      title: "Masterclass Secrète de Ramen artisanal",
      category: "food",
      location: "Tokyo (Meguro)",
      description: "Entrez dans les coulisses fermées d'un maître de cuisine réputé et apprenez l'art exigeant de la préparation du bouillon de ramen mijoté pendant 48 heures, des nouilles froides faites à la main y composes.",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600",
      duration: "3 Heures",
      highlights: ["Création de nouilles à la main", "Dégustation de sakés accordés", "Livre de recettes secret"],
    },
    {
      id: "arashiyama-bamboo",
      title: "Randonnée Matinale de la Forêt de Bambous",
      category: "nature",
      location: "Kyoto (Arashiyama)",
      description: "Vivez le murmure apaisant du vent dans la célèbre forêt d'émeraude d'Arashiyama aux premières lueurs du jour, sans la foule, suivi d'une marche méditative à travers les jardins cachés du temple Tenryu-ji.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600",
      duration: "2.5 Heures",
      highlights: ["Méditation matinale", "Accompagnement par des prêtres locaux", "Thé vert offert"],
    },
    {
      id: "onsen-mt-fuji",
      title: "Source Chaude Onsen sacrée face au Mont Fuji",
      category: "nature",
      location: "Hakone (Lakeside)",
      description: "Une pause thermale hors du temps. Prélassez-vous dans des eaux volcaniques riches en minéraux avec une vue dégagée sur le majestueux Mont Fuji couronné de neige.",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600",
      duration: "Journée Complète",
      highlights: ["Bain extérieur Ryokan privé", "Repas gastronomique Kaiseki inclus", "Traversée en bateau sur le lac Ashi"],
    },
    {
      id: "sushi-perfection",
      title: "Art Culinaire Supérieur de l'Edomae Sushi",
      category: "food",
      location: "Tokyo (Ginza)",
      description: "Obtenez un accès convoité auprès d'un comptoir de sushi classé. Admirez l'habileté chirurgicale du chef préparant chaque élément saisonnier sélectionné au marché matinal à la perfection ultime.",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600",
      duration: "1.5 Heure",
      highlights: ["Sushis d'exception préparés sous vos yeux", "Guide de dégustation rituelle", "Rencontre exclusive"],
    },
  ];

  const filteredData = experiencesData.filter(
    (exp) => activeCategory === "all" || exp.category === activeCategory
  );

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div id="experiences-section" className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-20 select-none animate-fadeIn">
      
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-2 p-1.5 px-3 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 font-mono text-[10px] tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> EXPÉRIENCES AUTHENTIQUES
        </div>
        <h2 
          className="text-4xl md:text-5xl font-display uppercase tracking-wider text-white mb-4"
          style={{ fontFamily: "'Dela Gothic One', sans-serif" }}
        >
          IMMERSION CULTURELLE
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-mono">
          Des moments soigneusement planifiés pour découvrir l'âme authentique du Japon, des secrets antiques de Kyoto aux nuits vibrantes de Shibuya.
        </p>
      </div>

      {/* Categories Horizontal Scroller / Filters */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-white/5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 pointer-events-auto border cursor-pointer shrink-0 ${
                isActive
                  ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20"
                  : "bg-neutral-900/60 border-white/10 text-neutral-450 hover:text-white hover:border-white/20"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredData.map((exp, i) => {
            const isLiked = likedList.includes(exp.id);
            return (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setSelectedExp(exp)}
                className="group relative bg-neutral-900/50 border border-white/5 hover:border-red-600/30 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/60 transition-all duration-300 pointer-events-auto cursor-pointer flex flex-col justify-between"
              >
                {/* Image background area */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                  
                  {/* Category badget */}
                  <div className="absolute top-4 left-4 p-1 px-2.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono uppercase tracking-widest text-red-500 border border-red-600/20">
                    {exp.location}
                  </div>

                  {/* Like button absolute */}
                  <button
                    onClick={(e) => toggleLike(exp.id, e)}
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-white/10 hover:border-red-500 transition-colors pointer-events-auto"
                  >
                    <Heart className={`w-3.5 h-3.5 transition-colors ${isLiked ? "fill-red-600 text-red-600" : "text-white"}`} />
                  </button>
                </div>

                {/* Info Text */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">
                      DURÉE: {exp.duration}
                    </span>
                    <h3 className="text-base font-bold text-neutral-100 group-hover:text-red-500 transition-colors line-clamp-1 mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List preview */}
                  <div className="mt-4 pt-4 border-t border-white/[0.03] space-y-1.5">
                    {exp.highlights.slice(0, 2).map((hl, j) => (
                      <div key={j} className="flex items-center gap-2 text-[10px] font-mono text-neutral-450">
                        <Check className="w-3 h-3 text-red-500 flex-shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-5 pb-5 pt-1">
                  <div className="w-full py-2.5 bg-white/[0.02] group-hover:bg-red-600/10 border border-white/5 group-hover:border-red-650 transition-colors text-center text-[10px] font-mono tracking-widest text-neutral-400 group-hover:text-white uppercase font-bold rounded-lg mb-1">
                    EN SAVOIR PLUS
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Details Dialog Modal */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-black/90 pointer-events-auto"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 p-1"
            >
              {/* Image banner */}
              <div className="relative h-56">
                <img
                  src={selectedExp.image}
                  alt={selectedExp.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                <button
                  onClick={() => setSelectedExp(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/80 flex items-center justify-center text-white border border-white/10 hover:border-red-500 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Text context inside details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-red-500">
                  <span>📍 {selectedExp.location}</span>
                  <span>⏱️ {selectedExp.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-white uppercase">{selectedExp.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  {selectedExp.description}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold">Inclus & Points Forts :</h4>
                  <div className="space-y-1.5">
                    {selectedExp.highlights.map((item, index) => (
                      <div key={index} className="flex items-center gap-2.5 text-xs text-neutral-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => setSelectedExp(null)}
                    className="flex-1 py-3 text-center bg-white/[0.05] hover:bg-white/[0.1] rounded-xl text-xs font-bold font-mono tracking-widest uppercase transition-colors text-white cursor-pointer"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={() => {
                      alert(`Votre intérêt pour l'expérience "${selectedExp.title}" a bien été enregistré. Un conseiller spécialisé vous contactera.`);
                      setSelectedExp(null);
                    }}
                    className="flex-1 py-3 text-center bg-red-600 hover:bg-red-500 rounded-xl text-xs font-bold font-mono tracking-widest uppercase transition-all text-white cursor-pointer shadow-lg shadow-red-605/20"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
