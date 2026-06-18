import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useInView } from "motion/react";
import { Calendar, CreditCard, Train, Clock, ShieldCheck, MessageCircle, ArrowDown } from "lucide-react";

export default function PracticalInfo() {
  const containerRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Détecter si la partie gauche (statique) est visible pour déclencher l'animation au premier chargement
  const isLeftInView = useInView(leftPanelRef, { once: false, amount: 0.25 });

  // Détection du mobile pour désactiver le scroll bloqué complexe qui nuit à l'UX sur petit écran
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const infoBlocks = [
    {
      number: "01",
      kanji: "季",
      title: "Meilleure période",
      subtitle: "Saisons & Météo",
      icon: Calendar,
      themeColor: "from-rose-500/20 to-orange-500/20",
      textColor: "text-rose-400",
      gradient: "from-white to-rose-400",
      content: "Le Japon se métamorphose au fil des saisons. Le Printemps (mars à mai) est célèbre pour le *Hanami* (floraison des cerisiers/Sakura), offrant des paysages teintés de rose pastel, bien que très fréquentés. L'Automne (octobre à novembre) dévoile le *Koyo*, une symphonie visuelle où les érables flamboient d'un rouge écarlate sous un climat doux et sec. L'Hiver est idéal pour les amateurs de ski à Hokkaido et les bains chauds extérieurs (*Onsen*), tandis que l'Été accueille de vibrants festivals traditionnels (*Matsuri*) et des feux d'artifice spectaculaires malgré son climat chaud et humide."
    },
    {
      number: "02",
      kanji: "円",
      title: "Budget & Change",
      subtitle: "Monnaie & Paiement",
      icon: CreditCard,
      themeColor: "from-emerald-500/20 to-teal-500/20",
      textColor: "text-emerald-400",
      gradient: "from-white to-emerald-400",
      content: "La monnaie nationale est le Yen (¥). Bien que le Japon s'ouvre rapidement aux paiements par carte de crédit et mobiles dans les grandes enseignes et gares, l'argent liquide reste indispensable. Prévoyez toujours des espèces pour les petits commerces, les marchés, les droits d'entrée des temples historiques et l'achat de tickets de métro individuels. Notez également qu'il n'y a absolument aucun pourboire au Japon : le service d'excellence est inclus dans le prix, et laisser de la monnaie supplémentaire sur la table peut être perçu comme un oubli ou une maladresse."
    },
    {
      number: "03",
      kanji: "道",
      title: "Réseau de Transport",
      subtitle: "Shinkansen & Cartes IC",
      icon: Train,
      themeColor: "from-sky-500/20 to-blue-500/20",
      textColor: "text-sky-400",
      gradient: "from-white to-sky-400",
      content: "Le réseau ferroviaire japonais est un modèle de ponctualité et d'efficacité. Pour vous déplacer sereinement dans les réseaux urbains de Tokyo ou Kyoto, achetez une carte IC rechargeable (Suica, Pasmo ou ICOCA) sur votre smartphone ou en gare. Elle permet de franchir les portillons d'un simple geste. Pour les trajets interurbains rapides, le train à grande vitesse *Shinkansen* offre un confort inégalable. Pensez à réserver vos billets à l'avance pour les périodes de haute affluence. Pour voyager léger, utilisez les services *Takkyubin* pour envoyer vos bagages d'un hôtel à un autre à moindre coût."
    },
    {
      number: "04",
      kanji: "時",
      title: "Décalage horaire",
      subtitle: "Heure & Rythme de Vie",
      icon: Clock,
      themeColor: "from-violet-500/20 to-fuchsia-500/20",
      textColor: "text-violet-400",
      gradient: "from-white to-violet-400",
      content: "Le Japon est à l'heure standard du Japon (JST), soit UTC+9. Il n'y a aucun changement d'heure saisonnier. Par rapport à la France, comptez 7 heures d'avance en été (quand il est 12h à Paris, il est 19h à Tokyo) et 8 heures d'avance en hiver (quand il est 12h à Paris, il est 20h à Tokyo). Pour optimiser votre séjour, commencez vos journées tôt : la lumière du jour apparaît de très bonne heure, et la majorité des temples historiques ainsi que les jardins ferment leurs portes aux alentours de 16h30 ou 17h00. Les grands centres commerciaux ouvrent généralement à 10h00."
    },
    {
      number: "05",
      kanji: "証",
      title: "Visa & Formalités",
      subtitle: "Conditions d'Entrée",
      icon: ShieldCheck,
      themeColor: "from-amber-500/20 to-orange-600/20",
      textColor: "text-amber-400",
      gradient: "from-white to-amber-400",
      content: "Pour les séjours touristiques de moins de 90 jours, les ressortissants français, belges, suisses et canadiens bénéficient d'une exemption de visa. Il vous suffit de présenter un passeport en cours de validité couvrant la durée totale du séjour. Avant le départ, il est fortement conseillé de s'enregistrer sur la plateforme officielle *Visit Japan Web* afin de générer les QR codes requis pour fluidifier les formalités d'immigration et de douane à l'aéroport d'arrivée. Pensez également à souscrire une assurance voyage privée couvrant les frais médicaux locaux, qui peuvent s'avérer extrêmement onéreux."
    },
    {
      number: "06",
      kanji: "礼",
      title: "Langue & Étiquette",
      subtitle: "Savoir-vivre & Respect",
      icon: MessageCircle,
      themeColor: "from-red-500/20 to-rose-600/20",
      textColor: "text-red-400",
      gradient: "from-white to-red-400",
      content: "Quelques mots de japonais simples comme *Arigatou gozaimasu* (Merci beaucoup) et *Sumimasen* (Excusez-moi / S'il vous plaît) ouvriront de nombreuses portes chaleureuses. L'étiquette locale repose sur le respect d'autrui et la discrétion : évitez de téléphoner dans les transports publics, ne mangez pas en marchant dans la rue, et rapportez toujours vos déchets chez vous ou à votre hôtel, car les poubelles publiques sont quasi-inexistantes. Lors des visites dans les temples, parlez à voix basse, et veillez à retirer vos chaussures lorsque des panneaux ou des tatamis l'indiquent."
    }
  ];

  // Configuration du scroll progressif pour lier le layout à droite et à gauche sur Desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Liaison du défilement des cartes à droite
  // Il y a 6 cartes au total. Le décalage max pour afficher la dernière carte est de 5 fois 100vh = 500vh
  const rightPanelY = useTransform(scrollYProgress, [0, 1], ["0vh", "-500vh"]);

  // Mettre à jour l'index actif en fonction de la progression du scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;
    const index = Math.min(Math.floor(latest * 6), 5);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <section
      id="pratique"
      ref={containerRef}
      className={`relative z-20 bg-neutral-950 ${isMobile ? "py-20 px-4" : "h-[600vh]"}`}
      aria-label="Informations pratiques pour voyager au Japon"
    >
      {isMobile ? (
        // --- LAYOUT MOBILE ---
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3 px-4">
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-red-500 block">
              準備 — Préparatifs
            </span>
            <h2 className="text-3xl font-display font-medium text-white uppercase tracking-tight">
              Informations pratiques
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              Tout ce qu'il convient d'anticiper pour garantir la sérénité absolue de votre aventure à travers l'archipel du Soleil Levant.
            </p>
          </div>

          <div className="space-y-6">
            {infoBlocks.map((block, idx) => {
              const IconComponent = block.icon;
              return (
                <div
                  key={idx}
                  className="bg-neutral-900/40 border border-white/5 rounded-2xl p-6 space-y-4 hover:border-white/10 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${block.themeColor} border border-white/5`}>
                        <IconComponent className={`w-5 h-5 ${block.textColor}`} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                          {block.subtitle}
                        </span>
                        <h3 className={`text-base font-bold font-mono uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r ${block.gradient}`}>
                          {block.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-red-500/80">{block.number}</span>
                      <span className="text-2xl font-display text-neutral-700 font-bold">{block.kanji}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {block.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // --- LAYOUT PREMIUM STICKY DESKTOP ---
        <div className="sticky top-0 h-screen w-full flex overflow-hidden">
          {/* Côté Gauche - Partie Fixe (45% de largeur) */}
          <div 
            ref={leftPanelRef}
            className="w-[45%] h-full bg-neutral-950 border-r border-white/[0.03] relative flex flex-col justify-between p-12 lg:p-16 select-none"
          >
            {/* Header / Guide Title */}
            <div className="space-y-2">
              <span className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.4em] text-red-500 block">
                準備 — Guide Pratique
              </span>
              <h2 className="text-2xl lg:text-3xl font-display font-medium text-white uppercase tracking-wider">
                INFOS PRATIQUES
              </h2>
            </div>

            {/* Zone centrale : Kanji géant avec animation vectorielle (contour + gradient) */}
            <div className="relative flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial="initial"
                  animate={isLeftInView ? "animate" : "initial"}
                  exit="exit"
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                  {/* SVG Container pour l'animation du Kanji géant */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg 
                      className="w-[85%] h-[85%] select-none overflow-visible" 
                      viewBox="0 0 100 100"
                      aria-hidden="true"
                    >
                      <defs>
                        {/* Dégradé vertical pour le remplissage du Kanji (rouge vermillon nippon) */}
                        <linearGradient id={`kanji-gradient-${activeIndex}`} x1="0%" y1="100%" x2="0%" y2="0%">
                          <stop offset="0%" stopColor="rgba(223, 28, 45, 0.38)" />
                          <stop offset="70%" stopColor="rgba(223, 28, 45, 0.12)" />
                          <stop offset="100%" stopColor="rgba(223, 28, 45, 0.0)" />
                        </linearGradient>
                      </defs>

                      {/* 1. Remplissage par le gradient de bas en haut (déclenché après le tracé du contour) */}
                      <motion.text
                        x="50%"
                        y="50%"
                        dominantBaseline="central"
                        textAnchor="middle"
                        className="font-display font-black"
                        style={{ fontSize: "78px" }}
                        variants={{
                          initial: { fillOpacity: 0 },
                          animate: { 
                            fillOpacity: 1,
                            transition: { duration: 0.8, delay: 0.45, ease: "easeOut" }
                          },
                          exit: { 
                            fillOpacity: 0,
                            transition: { duration: 0.2, ease: "easeIn" }
                          }
                        }}
                        fill={`url(#kanji-gradient-${activeIndex})`}
                      >
                        {infoBlocks[activeIndex].kanji}
                      </motion.text>

                      {/* 2. Contour filaire avec effet de dessin (stroke-dasharray / stroke-dashoffset) */}
                      <motion.text
                        x="50%"
                        y="50%"
                        dominantBaseline="central"
                        textAnchor="middle"
                        className="font-display font-black"
                        style={{ fontSize: "78px" }}
                        variants={{
                          initial: { 
                            strokeDasharray: 300, 
                            strokeDashoffset: 300,
                            stroke: "rgba(255, 255, 255, 0.0)",
                            scale: 0.88,
                            y: 10
                          },
                          animate: { 
                            strokeDashoffset: 0,
                            stroke: "rgba(255, 255, 255, 0.22)",
                            scale: 1,
                            y: 0,
                            transition: { 
                              strokeDashoffset: { duration: 0.8, ease: "easeOut" },
                              stroke: { duration: 0.3 },
                              scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                              y: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                            }
                          },
                          exit: { 
                            scale: 1.05,
                            y: -15,
                            stroke: "rgba(255, 255, 255, 0.0)",
                            transition: { duration: 0.35, ease: "easeIn" }
                          }
                        }}
                        fill="none"
                        strokeWidth="0.65"
                      >
                        {infoBlocks[activeIndex].kanji}
                      </motion.text>
                    </svg>
                  </div>

                  {/* Numéro géant au premier plan */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.span 
                      variants={{
                        initial: { opacity: 0, scale: 0.8, y: 15 },
                        animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
                        exit: { opacity: 0, scale: 1.1, y: -15, transition: { duration: 0.25 } }
                      }}
                      className="text-8xl lg:text-9xl font-display font-bold text-neutral-800 tracking-tighter"
                    >
                      {infoBlocks[activeIndex].number}
                    </motion.span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer de la partie gauche : Indicateur de scroll */}
            <div className="flex items-center gap-3 text-neutral-500">
              <ArrowDown className="w-4 h-4 animate-bounce text-red-500/80" />
              <span className="text-[10px] font-mono uppercase tracking-widest">
                Scrollez pour découvrir les préparatifs
              </span>
            </div>
          </div>

          {/* Côté Droit - Partie Défilante au Scroll (55% de largeur) */}
          <div className="w-[55%] h-full bg-neutral-900/20 overflow-hidden relative">
            <motion.div style={{ y: rightPanelY }} className="w-full flex flex-col">
              {infoBlocks.map((block, idx) => {
                const IconComponent = block.icon;
                return (
                  <div
                    key={idx}
                    className="h-screen w-full flex items-center justify-center p-12 lg:p-20 relative"
                  >
                    {/* Fond décoratif pour chaque bloc */}
                    <div className="absolute inset-0 bg-radial from-white/[0.01] to-transparent pointer-events-none" />

                    <div className="max-w-xl w-full space-y-6 lg:space-y-8 relative z-10">
                      {/* En-tête de la carte */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-2xl bg-gradient-to-br ${block.themeColor} border border-white/5 shadow-inner`}>
                            <IconComponent className={`w-6 h-6 ${block.textColor}`} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block">
                              {block.subtitle}
                            </span>
                            <h3 className={`text-xl lg:text-2xl font-bold tracking-wide uppercase font-mono bg-clip-text text-transparent bg-gradient-to-r ${block.gradient}`}>
                              {block.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Séparateur stylisé */}
                      <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                      {/* Contenu principal */}
                      <p className="text-sm lg:text-base text-neutral-300 leading-relaxed font-light text-justify">
                        {block.content}
                      </p>

                      {/* Tag décoratif de bas de carte */}
                      <div className="flex items-center gap-2 select-none">
                        <span className="text-[10px] font-mono text-neutral-600">JAPON PRATIQUE</span>
                        <span className="text-xs text-red-500/30 font-bold">{block.kanji}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
