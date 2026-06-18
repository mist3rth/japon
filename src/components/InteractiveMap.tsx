import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface CitySpot {
  name: string;
  nameJp: string;
  description: string;
}

interface ExploreCityNode {
  id: string;
  index: string;
  name: string;
  nameJp: string;
  tagline: string;
  color: string;
  image: string;
  spots: CitySpot[];
}

const cities: ExploreCityNode[] = [
  {
    id: "tokyo",
    index: "01",
    name: "Tokyo",
    nameJp: "東京",
    tagline: "La mégapole qui ne dort jamais. Capitale du contraste entre hypermodernité et tradition urbaine.",
    color: "#df1c2d",
    image: "/shibuya_crossing.webp",
    spots: [
      {
        name: "Shibuya Crossing",
        nameJp: "渋谷スクランブル交差点",
        description: "Le carrefour le plus fréquenté du monde. Jusqu'à 3 000 personnes traversent simultanément à chaque passage au vert. Depuis les étages du Scramble Square ou du Starbucks face au croisement, la vue plongeante sur ce ballet humain est l'image la plus reconnaissable de Tokyo contemporain. L'intensité est maximale en soirée, sous les néons.",
      },
      {
        name: "Senso-ji",
        nameJp: "浅草寺",
        description: "Le plus ancien temple de Tokyo, fondé en 628, niché dans le quartier d'Asakusa. La porte Kaminarimon avec sa lanterne rouge géante de 700 kg est l'entrée vers la Nakamise-dori, un couloir de boutiques de souvenirs vieux de plusieurs siècles. Contraste saisissant entre les fidèles qui brûlent l'encens et les gratte-ciels visibles à l'horizon.",
      },
    ],
  },
  {
    id: "kyoto",
    index: "02",
    name: "Kyoto",
    nameJp: "京都",
    tagline: "L'ancienne capitale impériale. 1 600 temples, 400 sanctuaires, 17 sites classés au patrimoine mondial de l'UNESCO.",
    color: "#b91c1c",
    image: "/fushimi_inari_taisha.webp",
    spots: [
      {
        name: "Fushimi Inari Taisha",
        nameJp: "伏見稲荷大社",
        description: "Des milliers de torii vermillon forment des tunnels continus sur 4 km à flanc de montagne. Chaque portail est offert en donation par une entreprise ou un particulier. Sanctuaire dédié au renard Inari, dieu du riz et du commerce. Départ à l'aube pour éviter la foule et capter la lumière rasante entre les portails.",
      },
      {
        name: "Bambouseraie d'Arashiyama",
        nameJp: "嵯峨野竹林",
        description: "Une forêt de bambous géants de 30 mètres de haut borde un chemin de 500 mètres dans le quartier d'Arashiyama. Le son du vent dans les tiges est classé parmi les 100 sons naturels à préserver au Japon. À deux minutes à pied, le temple Tenryu-ji et ses jardins zen complètent la visite.",
      },
    ],
  },
  {
    id: "osaka",
    index: "03",
    name: "Osaka",
    nameJp: "大阪",
    tagline: "La capitale gourmande du Japon. Moins formelle que Tokyo ou Kyoto, Osaka vit dans la rue et s'assume comme ville de plaisirs et de saveurs.",
    color: "#ea580c",
    image: "/chateau_osaka.webp",
    spots: [
      {
        name: "Dotonbori",
        nameJp: "道頓堀",
        description: "Le canal et la rue piétonne qui le longe forment le cœur vivant d'Osaka. Enseignes géantes en 3D — le crabe de Kani Doraku, le clown Glico au néon — odeurs de takoyaki et okonomiyaki, ponts surplombant le canal illuminé. L'endroit le plus photographié d'Osaka, spectaculaire le soir mais jamais calme.",
      },
      {
        name: "Château d'Osaka",
        nameJp: "大阪城",
        description: "Reconstruit en 1931 sur les fondations du château originel de Toyotomi Hideyoshi (1583), il domine un parc de 106 hectares en plein centre-ville. En avril, les cerisiers du parc en font l'un des spots hanami les plus fréquentés du Kansai.",
      },
    ],
  },
  {
    id: "nara",
    index: "04",
    name: "Nara",
    nameJp: "奈良",
    tagline: "Première capitale permanente du Japon (710-784). Une ville à taille humaine où cerfs sacrés et monuments millénaires coexistent en plein air.",
    color: "#f43f5e",
    image: "/todai_ji.webp",
    spots: [
      {
        name: "Parc de Nara et ses cerfs",
        nameJp: "奈良公園の鹿",
        description: "Plus de 1 200 cerfs sika vivent en liberté totale dans le parc de 660 hectares. Considérés comme des messagers divins shintoïstes depuis le VIIIe siècle, ils sont protégés et habitués à la présence humaine — ils savent s'incliner pour réclamer des crackers (shika senbei).",
      },
      {
        name: "Tōdai-ji",
        nameJp: "東大寺",
        description: "Le Grand Temple de l'Est abrite le plus grand Bouddha en bronze du monde — le Daibutsu, 15 mètres de hauteur, 500 tonnes de métal fondu — dans la plus grande structure en bois du monde. Fondé en 752 sous l'ordre de l'Empereur Shōmu.",
      },
    ],
  },
];

function handleScrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function InteractiveMap() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const PEEK = isMobile ? 48 : 68;
  const STICKY_TOP = isMobile ? 64 : 72;

  // Ref sur le container des cards pour un parallax relatif à la section
  const containerRef = useRef<HTMLDivElement>(null);

  // scrollYProgress va de 0 (section entre dans le bas du viewport)
  // à 1 (section sort par le haut du viewport)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // L'image monte de +50px à -50px pendant le scroll dans la section
  // (le container overflow-hidden + scale-[1.25] masque les bords)
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="carte" className="bg-neutral-950 border-t border-white/[0.02] w-full">



      {/* ── En-tête de section (static, hors ScrollExpandMedia) ── */}
      <div className="bg-neutral-950 px-[clamp(1.5rem,4vw,4rem)] py-16 border-b border-white/[0.04]">
        <div className="space-y-4 text-left">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.4em] text-red-500 uppercase block">
              地図 — Cartographie Alternative
            </span>
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-white font-semibold">
              Où aller?
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            Quatre villes phares, symbolisant la balance sublime entre la modernité et la tradition préservée du Japon.
          </p>
        </div>
      </div>

      {/*
        ── Stacked cards avec CSS position:sticky ──
        
        Chaque card est sticky à une position différente.
        Quand on scroll dans ce conteneur, chaque card monte naturellement
        depuis le bas et se colle à sa position, créant l'empilement.
        La hauteur du conteneur garantit assez d'espace de scroll.
      */}
      <div
        ref={containerRef}
        className="bg-neutral-950 relative w-full"
        style={{ paddingBottom: "10vh", marginBottom: "-100vh" }}
      >
        {cities.map((city, idx) => {
          const top = STICKY_TOP + idx * PEEK;
          const isLast = idx === cities.length - 1;
          
          // Le container sticky DOIT descendre jusqu'en bas de l'écran pour que toutes 
          // les cartes remontent exactement en même temps à la fin de la section.
          const stickyContainerHeight = `calc(100vh - ${top}px)`;
          
          // La carte visuelle garde une taille fixe (celle de Nara - 20px)
          const maxIdx = cities.length - 1;
          const visualCardHeight = `calc(100vh - ${STICKY_TOP + maxIdx * PEEK + (isMobile ? 12 : 20)}px)`;

          return (
            <div
              key={city.id}
              className="w-full"
              style={{
                position: "sticky",
                top: `${top}px`,
                height: stickyContainerHeight,
                zIndex: 10 + idx,
                paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
                paddingRight: "clamp(1.5rem, 4vw, 4rem)",
                // Toutes les cards ont le même margin-bottom pour que la boîte de marge 
                // s'aligne et qu'elles soient toutes repoussées en même temps à la fin.
                marginBottom: "calc(100vh)",
              }}
            >
              {/* Card */}
              <div
                className="w-full flex flex-col rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  height: visualCardHeight,
                  background: `rgb(${14 + idx * 2} ${14 + idx * 2} ${14 + idx * 2})`,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* ── Header (bande visible même sous les autres cards) ── */}
                <div
                  className="flex-shrink-0 flex items-center justify-between px-6 md:px-10"
                  style={{
                    height: `${PEEK}px`,
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className="font-display font-black leading-none"
                      style={{ fontSize: "2rem", color: city.color }}
                    >
                      {city.index}
                    </span>
                    <div className="w-px h-6 bg-white/10" />
                    <div>
                      <p className="text-white font-display font-bold text-xl uppercase tracking-widest leading-none">
                        {city.name}
                      </p>
                      <p className="text-white/35 font-mono text-[11px] tracking-widest mt-0.5">
                        {city.nameJp}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleScrollToSection(city.id)}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer"
                  >
                    <span>Explorer</span>
                    <ArrowRight className="w-3 h-3" style={{ color: city.color }} />
                  </button>
                </div>

                {/* ── Corps ── */}
                <div className="flex-1 overflow-hidden min-h-0 relative">
                  
                  {/* Image d'arrière-plan absolute UNIQUEMENT sur mobile (cachée sur desktop) */}
                  <div className="absolute inset-0 z-0 md:hidden">
                    <img
                      src={city.image}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Overlay sombre pour assurer le contraste du texte sur mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/60" />
                  </div>

                  {/* Flux Flexbox pour Desktop (image à gauche) et Mobile (texte par-dessus le fond) */}
                  <div className="w-full h-full flex flex-col md:flex-row relative z-10">
                    {/* Image latérale visible uniquement sur desktop (md:) */}
                    <div className="hidden md:block md:w-1/3 flex-shrink-0 overflow-hidden relative">
                      <motion.img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover scale-[1.25]"
                        style={{ y: imageParallaxY }}
                        loading="lazy"
                      />
                    </div>

                    {/* Contenu textuel prenant 100% de la largeur sur mobile, 2/3 sur desktop */}
                    <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto md:overflow-hidden flex flex-col justify-center">
                      <p
                        className="text-neutral-200 md:text-neutral-350 text-xs md:text-sm font-light leading-relaxed border-l-2 pl-4 mb-4 line-clamp-3 md:line-clamp-2"
                        style={{ borderColor: city.color }}
                      >
                        {city.tagline}
                      </p>

                      <div className="space-y-4 md:space-y-4 overflow-visible md:overflow-hidden">
                        {city.spots.map((spot, sIdx) => (
                          <div key={sIdx} className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span
                                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-mono font-bold text-white"
                                style={{ backgroundColor: city.color }}
                              >
                                {sIdx + 1}
                              </span>
                              <span className="text-white text-sm font-semibold tracking-wide truncate">
                                {spot.name}
                              </span>
                              <span className="text-white/40 font-mono text-[10px] hidden sm:block truncate">
                                {spot.nameJp}
                              </span>
                            </div>
                            <p className="text-neutral-350 md:text-neutral-400 text-[11px] md:text-xs leading-relaxed pl-8 line-clamp-3 md:line-clamp-3">
                              {spot.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
