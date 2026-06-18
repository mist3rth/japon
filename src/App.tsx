import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { destinations } from "./data";
import Navbar from "./components/Navbar";
import HeroSection from "./components/sections/HeroSection";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Lazy-loaded components for code-splitting (reduces initial JS bundle size dramatically)
const ExploreDrawer = lazy(() => import("./components/ExploreDrawer"));
const KeyInformationPage = lazy(() => import("./components/KeyInformationPage"));
const EditorialIntro = lazy(() => import("./components/EditorialIntro"));
const DestinationsHub = lazy(() => import("./components/DestinationsHub"));
const DestinationDetail = lazy(() => import("./components/DestinationDetail"));
const ExperiencesSection = lazy(() => import("./components/ExperiencesSection"));
const InteractiveMap = lazy(() => import("./components/InteractiveMap"));
const PracticalInfo = lazy(() => import("./components/PracticalInfo"));
const Footer = lazy(() => import("./components/Footer"));
const QuickTipsModal = lazy(() => import("./components/QuickTipsModal"));

type SectionType = 'destinations' | 'experiences' | 'key-info';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quickTipsOpen, setQuickTipsOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [currentSection, setCurrentSection] = useState<SectionType>('destinations');
  
  const currentDest = destinations[activeIndex];

  useEffect(() => {
    // Preload background images for optimized responsive transition
    destinations.forEach((dest) => {
      const img = new Image();
      img.src = dest.image;
    });
    
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Mémorisation des fonctions pour éviter les re-renders inutiles des composants enfants
  const handleScrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleSelectCity = useCallback((id: string) => {
    const idx = destinations.findIndex(d => d.id === id);
    if (idx !== -1) setActiveIndex(idx);
  }, []);

  const handleExplore = useCallback((dest: { id: string }) => {
    const idx = destinations.findIndex(d => d.id === dest.id);
    if (idx !== -1) setActiveIndex(idx);
    setDrawerOpen(true);
  }, []);

  return (
    <div id="jp-hero-app" className="relative min-h-screen bg-neutral-950 font-sans text-neutral-100 selection:bg-red-600 selection:text-white overflow-x-clip">
      
      <ErrorBoundary sectionName="Navbar">
        <div className="absolute top-0 left-0 w-full z-30">
          <Navbar 
            currentSection={currentSection} 
            setCurrentSection={setCurrentSection} 
            onScrollToSection={handleScrollToSection} 
          />
        </div>
      </ErrorBoundary>

      <AnimatePresence mode="wait">
        {currentSection === "destinations" ? (
          <motion.div
            key="destinations-group"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* Main Homepage Flow */}
            <ErrorBoundary sectionName="HeroSection">
              <HeroSection
                currentDest={currentDest}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                isFirstLoad={isFirstLoad}
                setDrawerOpen={setDrawerOpen}
                setQuickTipsOpen={setQuickTipsOpen}
              />
            </ErrorBoundary>

            <Suspense fallback={<div className="h-40 bg-neutral-950 animate-pulse" />}>
              <ErrorBoundary sectionName="EditorialIntro">
                <EditorialIntro />
              </ErrorBoundary>

              <ErrorBoundary sectionName="DestinationsHub">
                <DestinationsHub onSelectCity={handleSelectCity} />
              </ErrorBoundary>

              <ErrorBoundary sectionName="DestinationDetail">
                <DestinationDetail onExplore={handleExplore} />
              </ErrorBoundary>

              <ErrorBoundary sectionName="ExperiencesSection">
                <ExperiencesSection />
              </ErrorBoundary>

              <ErrorBoundary sectionName="InteractiveMap">
                <InteractiveMap />
              </ErrorBoundary>

              <ErrorBoundary sectionName="PracticalInfo">
                <PracticalInfo />
              </ErrorBoundary>
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="key-info-group"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="w-full font-sans text-neutral-100"
          >
            <Suspense fallback={<div className="min-h-screen bg-neutral-950 animate-pulse" />}>
              <ErrorBoundary sectionName="KeyInformationPage">
                <KeyInformationPage />
              </ErrorBoundary>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <ErrorBoundary sectionName="Footer">
          <Footer />
        </ErrorBoundary>

        {/* --- OVERLAYS & MODALS --- */}
        <ExploreDrawer
          destination={currentDest}
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />

        <QuickTipsModal isOpen={quickTipsOpen} onClose={() => setQuickTipsOpen(false)} />
      </Suspense>
    </div>
  );
}
