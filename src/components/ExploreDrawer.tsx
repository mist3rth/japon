import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { X, Calendar, MapPin, Users, Heart, Share2, Compass, ArrowRight, CheckCircle2 } from "lucide-react";
import { Destination } from "../types";

interface ExploreDrawerProps {
  destination: Destination;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExploreDrawer({ destination, isOpen, onClose }: ExploreDrawerProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="explore-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            id="explore-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed top-0 right-0 h-full w-full md:w-[650px] bg-neutral-950 text-neutral-100 z-50 shadow-2xl border-l border-white/10 flex flex-col overflow-y-auto"
          >
            {/* Red accent line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-red-600 to-rose-500" />

            {/* Custom Toast Notification inside Drawer */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-4 left-4 right-4 z-50 p-4 bg-neutral-900 border border-emerald-500/30 rounded-xl flex items-center gap-3 shadow-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-bounce" />
                  <span className="text-xs font-mono font-medium text-neutral-200">{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header portion */}
            <div className="relative h-64 flex-shrink-0">
              <img
                src={destination.image}
                alt={destination.cityLabel}
                className="w-full h-full object-cover brightness-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              {/* Close button */}
              <button
                id="btn-close-drawer"
                onClick={onClose}
                className="absolute top-6 left-6 p-2 rounded-full bg-black/60 hover:bg-neutral-800/80 text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                id="btn-share-destination"
                className="absolute top-6 right-6 p-2 rounded-full bg-black/60 hover:bg-neutral-800/80 text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast(`Lien d'itinéraire pour ${destination.cityLabel} copié avec succès !`);
                }}
              >
                <Share2 className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: destination.color }} />
                  <span className="text-xs uppercase tracking-widest font-mono font-bold" style={{ color: destination.color }}>{destination.subtitle}</span>
                </div>
                <h2 className={`text-4xl font-display font-extrabold uppercase tracking-wider ${destination.gradientText}`}>{destination.cityLabel}</h2>
              </div>
            </div>

            {/* Content main */}
            <div className="p-8 space-y-8 flex-grow">
              
              {/* Tagline / Intro */}
              <div className="space-y-4">
                <p className="text-neutral-400 text-sm leading-relaxed font-mono">
                  {destination.quickDescription}
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 italic text-sm text-neutral-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                  "{destination.tagline}"
                </div>
              </div>

              {/* Fast Facts Grid */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-widest font-bold text-neutral-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" /> Statistiques &amp; Infos Clés
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {destination.facts.map((fact, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 p-3.5 rounded-lg flex items-center gap-3">
                      {i === 0 && <Users className="w-5 h-5 text-red-500 flex-shrink-0" />}
                      {i === 1 && <Heart className="w-5 h-5 text-red-500 flex-shrink-0" />}
                      {i === 2 && <Calendar className="w-5 h-5 text-red-500 flex-shrink-0" />}
                      {i === 3 && <Compass className="w-5 h-5 text-red-500 flex-shrink-0" />}
                      <div>
                        <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">{fact.label}</div>
                        <div className="text-sm font-semibold text-neutral-200">{fact.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Classic Attractions Row */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-bold text-neutral-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" /> Attractions Majeures
                </h3>
                <div className="space-y-3">
                  {destination.attractions.map((attr, idx) => (
                    <div 
                      key={idx} 
                      className="group flex gap-4 p-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-xl transition-all duration-300"
                    >
                      <img 
                        src={attr.image} 
                        alt={attr.name} 
                        className="w-20 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow flex flex-col justify-center">
                        <h4 className="text-sm font-semibold text-neutral-100 group-hover:text-red-500 transition-colors flex items-center gap-1.5">
                          {attr.name} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </h4>
                        <p className="text-xs text-neutral-400 leading-normal mt-1">{attr.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="p-6 bg-neutral-900/60 border-t border-white/5 sticky bottom-0 backdrop-blur-md flex gap-4">
              <button 
                onClick={onClose}
                className="flex-1 py-3 text-center rounded-xl bg-white/10 hover:bg-white/20 transition-all font-semibold text-sm cursor-pointer"
              >
                Fermer
              </button>
              <button 
                onClick={() => showToast(`Votre demande de réservation exclusive pour un voyage à ${destination.cityLabel} a bien été enregistrée !`)}
                className="flex-1 py-3 text-center rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 transition-all font-semibold text-sm text-white cursor-pointer shadow-lg shadow-red-600/20"
              >
                Planifier un Voyage
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
