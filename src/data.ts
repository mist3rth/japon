import { Destination } from "./types";

export const destinations: Destination[] = [
  {
    id: "tokyo",
    title: "TOKYO",
    cityLabel: "TOKYO",
    subtitle: "Le Futur en Mouvement",
    tagline: "Explorez le futur en mouvement : néons cyberpunk, merveilles technologiques et ruelles cybernétiques.",
    image: "/tokyo.webp",
    color: "#df1c2d",
    bgGlow: "from-rose-600/80 to-pink-700/50",
    borderGlow: "border-rose-500 shadow-rose-500/50",
    gradientText: "bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent",
    gradientBg: "from-pink-500 via-rose-500 to-red-500",
    quickDescription: "Tokyo est la mégapole technologique trépidante du Japon. Mêlant des gratte-ciels de néons vertigineux à de paisibles sanctuaires historiques, c'est une ville en mouvement perpétuel aux découvertes sensorielles infinies.",
    facts: [
      { label: "Population", value: "14 millions" },
      { label: "Plat incontournable", value: "Tsukiji Ramen & Tsukemen" },
      { label: "Meilleure saison", value: "Printemps (Cerisiers en fleurs)" },
      { label: "Altitude estimée", value: "40m (Centre-ville)" }
    ],
    attractions: [
      {
        name: "Carrefour de Shibuya",
        desc: "L'intersection piétonne la plus fréquentée au monde, vibrant d'une énergie électrique avec ses écrans géants et son mouvement infini.",
        image: "/tokyo.webp"
      },
      {
        name: "Temple Senso-ji",
        desc: "Le plus ancien et le plus emblématique temple bouddhiste de Tokyo situé à Asakusa, doté de la magnifique porte Kaminarimon.",
        image: "/images/senso_ji.png"
      },
      {
        name: "Quartier électrique d'Akihabara",
        desc: "Le légendaire quartier des néons et capitale mondiale des animés, mangas, jeux rétro et culture tech.",
        image: "/images/akihabara.png"
      }
    ]
  },
  {
    id: "kyoto",
    title: "KYOTO",
    cityLabel: "KYOTO",
    subtitle: "Tradition Éternelle",
    tagline: "Découvrez l'âme du Soleil Levant : temples ancestraux, paysages poétiques et culture préservée.",
    image: "/kyoto.webp",
    color: "#b91c1c",
    bgGlow: "from-red-600/80 to-rose-700/40",
    borderGlow: "border-red-600 shadow-red-500/50",
    gradientText: "bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 bg-clip-text text-transparent",
    gradientBg: "from-red-600 via-rose-600 to-orange-500",
    quickDescription: "Kyoto est le cœur culturel du Japon. Elle abrite des thousands de temples bouddhistes classiques, des jardins zen sublimes, des palais impériaux majestueux, des sanctuaires shinto et des maisons traditionnelles en bois (machiya).",
    facts: [
      { label: "Population", value: "1,4 million" },
      { label: "Plat incontournable", value: "Matcha Kaiseki & Udon" },
      { label: "Meilleure saison", value: "Automne (Feuillage rouge et or)" },
      { label: "Tradition", value: "Quartier des Geishas (Gion)" }
    ],
    attractions: [
      {
        name: "Pagode Yasaka (Higashiyama)",
        desc: "Une majestueuse tour à cinq étages surplombant fièrement les ruelles pavées historiques de l'ancienne capitale de Kyoto.",
        image: "/kyoto.webp"
      },
      {
        name: "Fushimi Inari-Taisha",
        desc: "Le chemin de montagne mystique bordé de plus de 10 000 torii vermillon sacrés serpentant à travers les bois Shinto.",
        image: "/images/fushimi_inari.png"
      },
      {
        name: "Bambouseraie d'Arashiyama",
        desc: "Un sentier serein et envoûtant entre de gigantesques tiges de bambou émeraude qui se balancent au gré du vent doux de Kyoto.",
        image: "/images/arashiyama_bamboo.png"
      }
    ]
  },
  {
    id: "osaka",
    title: "OSAKA",
    cityLabel: "OSAKA",
    subtitle: "Cœur Culinaire",
    tagline: "Succombez au cœur de la gastronomie : marchés de nuit vibrants, cuisine de rue et canaux illuminés.",
    image: "/dotonbori.webp",
    color: "#ea580c",
    bgGlow: "from-orange-600/80 to-amber-700/50",
    borderGlow: "border-orange-500 shadow-orange-500/50",
    gradientText: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent",
    gradientBg: "from-orange-500 via-red-500 to-pink-500",
    quickDescription: "Osaka est un pôle commercial vaste et coloré sur l'île de Honshu. Elle est célèbre pour son architecture moderne, sa scène culinaire exubérante, ses panneaux publicitaires géants et la convivialité légendaire de ses habitants.",
    facts: [
      { label: "Population", value: "2,7 millions" },
      { label: "Plat incontournable", value: "Takoyaki & Okonomiyaki" },
      { label: "Meilleure saison", value: "Fin d'automne / Festivals d'été" },
      { label: "Culture locale", value: "Dialecte du Kansai & Humour" }
    ],
    attractions: [
      {
        name: "Quartier de Dotonbori",
        desc: "Le canal emblématique d'Osaka entouré d'enseignes lumineuses animées, dont le célèbre coureur Glico.",
        image: "/images/dotonbori.png"
      },
      {
        name: "Château d'Osaka (Osaka-jo)",
        desc: "Un splendide palais de samouraïs entouré de douves de pierre massives et de cerisiers en fleurs, érigé au XVIe siècle.",
        image: "/images/osaka_castle.png"
      },
      {
        name: "Quartier rétro de Shinsekai",
        desc: "Un quartier nostalgique inspiré des parcs d'attractions vintage d'avant-guerre, dominé par la tour Tsutenkaku.",
        image: "/images/shinsekai.png"
      }
    ]
  },
  {
    id: "nara",
    title: "NARA",
    cityLabel: "NARA",
    subtitle: "Rencontres Sacrées",
    tagline: "Vivez des rencontres sacrées : temples séculaires en bois, forêts de brume et cerfs en liberté.",
    image: "/nara.webp",
    color: "#f43f5e",
    bgGlow: "from-rose-550 to-orange-600/50",
    borderGlow: "border-rose-500 shadow-rose-500/50",
    gradientText: "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent",
    gradientBg: "from-amber-500 via-orange-500 to-rose-500",
    quickDescription: "Nara fut la toute première capitale permanente du Japon. Elle abrite certains des plus anciens et grands monuments historiques du pays, au cœur d'un parc boisé où plus de 1 200 cerfs Sika se proviennent en toute liberté.",
    facts: [
      { label: "Population", value: "350 000 habitants" },
      { label: "Plat incontournable", value: "Kaki-no-Ha Zushi & Mochi" },
      { label: "Meilleure saison", value: "Printemps & Début d'été" },
      { label: "Gardiens sacrés", value: "Cerfs Sika (qui saluent)" }
    ],
    attractions: [
      {
        name: "Parc de Nara",
        desc: "Un immense parc public verdoyant où des centaines de cerfs sauvages et amicaux vivent paisiblement et s'inclinent pour obtenir des biscuits.",
        image: "/nara.webp"
      },
      {
        name: "Temple Todai-ji",
        desc: "L'une des plus grandes structures en bois de la planète abritant le monumental Grand Bouddha en bronze de 15 mètres de haut.",
        image: "/images/todai_ji.png"
      },
      {
        name: "Sanctuaire Kasuga Taisha",
        desc: "Le sanctuaire le plus célèbre de Nara, niché dans une forêt de mousse mystique et orné de milliers de lanternes en bronze et en pierre.",
        image: "/images/kasuga_taisha.png"
      }
    ]
  }
];
