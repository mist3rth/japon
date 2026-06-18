import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../japan-logo.webp";

interface NavbarProps {
  currentSection: "destinations" | "experiences" | "key-info";
  setCurrentSection: (section: "destinations" | "experiences" | "key-info") => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ currentSection, setCurrentSection, onScrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<string>(currentSection);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveSection(currentSection);
  }, [currentSection]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Activer le style scrolled après 20px
      setIsScrolled(currentScrollY > 20);

      // Cacher la nav au scroll vers le bas, l'afficher au scroll vers le haut
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Fermer le menu mobile en faisant défiler vers le bas
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Scroll Spy logic for homepage sections based on absolute positions (offsetTop)
  useEffect(() => {
    if (currentSection !== "destinations") return;

    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4; // Seuil d'activation à 40% de l'écran

      const pratiqueEl = document.getElementById("pratique");
      const carteEl = document.getElementById("carte");
      const experiencesEl = document.getElementById("experiences");
      const destinationsEl = document.getElementById("destinations");

      if (pratiqueEl && scrollPos >= pratiqueEl.offsetTop) {
        setActiveSection("pratique");
      } else if (carteEl && scrollPos >= carteEl.offsetTop) {
        setActiveSection("carte");
      } else if (experiencesEl && scrollPos >= experiencesEl.offsetTop) {
        setActiveSection("experiences");
      } else if (destinationsEl && scrollPos >= destinationsEl.offsetTop) {
        setActiveSection("destinations");
      } else {
        setActiveSection("destinations");
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy(); // Appel initial

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [currentSection]);

  return (
    <>
      <header 
        id="jp-header" 
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 ease-in-out py-4 px-6 lg:px-12 flex items-center justify-between ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled || isMobileMenuOpen
            ? "bg-neutral-950/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Stylized custom Japanese logo */}
          <div 
            id="jp-logo" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setCurrentSection("destinations");
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center justify-center group cursor-pointer"
          >
            <div className="relative h-10 flex items-center justify-center group-hover:scale-105 active:scale-95 transition-all duration-300">
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

          {/* Central Menu Links */}
          <nav id="jp-nav-menu" className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#a3a3a3" }}>
            <button 
              onClick={() => {
                setCurrentSection("destinations");
                onScrollToSection("hero");
              }} 
              className={`transition-colors py-2 relative group cursor-pointer hover:text-white ${
                activeSection === "destinations" ? "text-white font-extrabold" : ""
              }`}
            >
              Destinations
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform origin-left duration-300 ${
                activeSection === "destinations" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </button>
            <button 
              onClick={() => {
                setCurrentSection("destinations");
                setTimeout(() => onScrollToSection("experiences"), 50);
              }} 
              className={`transition-colors py-2 relative group cursor-pointer hover:text-white ${
                activeSection === "experiences" ? "text-white font-extrabold" : ""
              }`}
            >
              Expériences
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform origin-left duration-300 ${
                activeSection === "experiences" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </button>
            <button 
              onClick={() => {
                setCurrentSection("destinations");
                setTimeout(() => onScrollToSection("carte"), 50);
              }} 
              className={`transition-colors py-2 relative group cursor-pointer hover:text-white ${
                activeSection === "carte" ? "text-white font-extrabold" : ""
              }`}
            >
              Où aller
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform origin-left duration-300 ${
                activeSection === "carte" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </button>
            <button 
              onClick={() => {
                setCurrentSection("destinations");
                setTimeout(() => onScrollToSection("pratique"), 50);
              }} 
              className={`transition-colors py-2 relative group cursor-pointer hover:text-white ${
                activeSection === "pratique" ? "text-white font-extrabold" : ""
              }`}
            >
              Infos pratiques
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform origin-left duration-300 ${
                activeSection === "pratique" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </button>
          </nav>

          {/* Burger Button for Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-600/50 rounded-lg cursor-pointer"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            role="navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] bg-neutral-950/95 backdrop-blur-lg border-b border-white/5 shadow-2xl z-40 py-6 px-6 md:hidden flex flex-col gap-5 text-center text-sm font-bold uppercase tracking-[0.2em]"
          >
            <button
              onClick={() => {
                setCurrentSection("destinations");
                onScrollToSection("hero");
                setIsMobileMenuOpen(false);
              }}
              className={`py-3 hover:text-white transition-colors cursor-pointer border-b border-white/[0.02] ${
                activeSection === "destinations" ? "text-red-500 font-extrabold" : "text-neutral-400"
              }`}
            >
              Destinations
            </button>
            <button
              onClick={() => {
                setCurrentSection("destinations");
                setTimeout(() => onScrollToSection("experiences"), 50);
                setIsMobileMenuOpen(false);
              }}
              className={`py-3 hover:text-white transition-colors cursor-pointer border-b border-white/[0.02] ${
                activeSection === "experiences" ? "text-red-500 font-extrabold" : "text-neutral-400"
              }`}
            >
              Expériences
            </button>
            <button
              onClick={() => {
                setCurrentSection("destinations");
                setTimeout(() => onScrollToSection("carte"), 50);
                setIsMobileMenuOpen(false);
              }}
              className={`py-3 hover:text-white transition-colors cursor-pointer border-b border-white/[0.02] ${
                activeSection === "carte" ? "text-red-500 font-extrabold" : "text-neutral-400"
              }`}
            >
              Où aller
            </button>
            <button
              onClick={() => {
                setCurrentSection("destinations");
                setTimeout(() => onScrollToSection("pratique"), 50);
                setIsMobileMenuOpen(false);
              }}
              className={`py-3 hover:text-white transition-colors cursor-pointer ${
                activeSection === "pratique" ? "text-red-500 font-extrabold" : "text-neutral-400"
              }`}
            >
              Infos pratiques
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
