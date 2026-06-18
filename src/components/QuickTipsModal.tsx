import { useEffect } from "react";
import { Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QuickTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickTipsModal({ isOpen, onClose }: QuickTipsModalProps) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 pointer-events-auto"
            aria-hidden="true"
          />
          {/* Modal dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-2xl z-10"
          >
            <h3 id="modal-title" className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Compass className="text-red-600 w-5 h-5 animate-spin" aria-hidden="true" /> Guide Pratique du Japon
            </h3>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-mono">
              Bienvenue dans votre guide interactif. Voici quelques astuces essentielles pour réussir votre séjour au Japon :
            </p>
            <div className="space-y-3 text-xs leading-normal">
              <div className="p-2.5 rounded bg-white/[0.03] border-l-2 border-red-600">
                <span className="font-bold text-white block">🚅 JR Pass & Transports :</span>
                Planifiez l'achat d'un pass IC (Suica/Pasmo) dès votre arrivée à Tokyo ou Osaka.
              </div>
              <div className="p-2.5 rounded bg-white/[0.03] border-l-2 border-red-600">
                <span className="font-bold text-white block">💼 Politesse & Coutumes :</span>
                Ne parlez pas fort au téléphone dans les trains, et saluez poliment avec une légère inclinaison.
              </div>
              <div className="p-2.5 rounded bg-white/[0.03] border-l-2 border-red-600">
                <span className="font-bold text-white block">💵 Espèces / Cash :</span>
                Prévoyez toujours des yens liquides, car de nombreux temples anciens et restaurants ne prennent pas la carte.
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Fermer le guide pratique"
              className="mt-6 w-full py-2.5 bg-red-600 hover:bg-red-500 rounded-xl text-white font-bold transition-all text-xs cursor-pointer"
            >
              J'ai compris !
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
