import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Coins, Volume2, BookOpen, Clock, AlertTriangle, CheckCircle, Scale, Copy } from "lucide-react";

interface Phrase {
  japanese: string;
  romaji: string;
  meaning: string;
  category: "survival" | "dining" | "shopping";
}

interface EtiquetteItem {
  id: string;
  category: "do" | "dont";
  title: string;
  concept: string;
  desc: string;
}

export default function KeyInformationPage() {
  const [activeTab, setActiveTab] = useState<"etiquette" | "converter" | "phrases" | "regional">("etiquette");
  const [eurVal, setEurVal] = useState<string>("10");
  const [jpyVal, setJpyVal] = useState<string>("1750");
  const [searchWord, setSearchWord] = useState<string>("");
  const [activePhraseId, setActivePhraseId] = useState<number | null>(null);
  const [toastText, setToastText] = useState<string | null>(null);

  // Conversion rate (approx 1 EUR = 175 JPY)
  const RATE = 175;

  const handleEurChange = (val: string) => {
    setEurVal(val);
    if (isNaN(Number(val)) || val === "") {
      setJpyVal("");
    } else {
      setJpyVal((Number(val) * RATE).toFixed(0));
    }
  };

  const handleJpyChange = (val: string) => {
    setJpyVal(val);
    if (isNaN(Number(val)) || val === "") {
      setEurVal("");
    } else {
      setEurVal((Number(val) / RATE).toFixed(2));
    }
  };

  const showToast = (txt: string) => {
    setToastText(txt);
    setTimeout(() => setToastText(null), 2500);
  };

  // Phrases Data
  const phrases: Phrase[] = [
    { japanese: "こんにちは", romaji: "Konnichiwa", meaning: "Bonjour / Salut", category: "survival" },
    { japanese: "ありがとうございます", romaji: "Arigatou Gozaimasu", meaning: "Merci beaucoup", category: "survival" },
    { japanese: "すみません", romaji: "Sumimasen", meaning: "Excusez-moi / Pardon (essentiel)", category: "survival" },
    { japanese: "これをお願いします", romaji: "Kore wo Onegai Shimasu", meaning: "Ceci s'il vous plaît", category: "dining" },
    { japanese: "お会計をお願いします", romaji: "O-kaikei wo Onegai Shimasu", meaning: "L'addition s'il vous plaît", category: "dining" },
    { japanese: "とても美味しいです", romaji: "Totemo Oishii Desu", meaning: "C'est délicieux", category: "dining" },
    { japanese: "いくらですか？", romaji: "Ikura Desu Ka?", meaning: "Combien ça coûte ?", category: "shopping" },
    { japanese: "クレジットカードは使えますか？", romaji: "Kurejitto kaado wa tsakaemasu ka?", meaning: "Puis-je payer par carte bancaire ?", category: "shopping" },
    { japanese: "英語が話せますか？", romaji: "Eigo ga hanasemasu ka?", meaning: "Parlez-vous anglais ?", category: "survival" },
  ];

  // Etiquette Rules Do's & Don'ts
  const etiquetteRules: EtiquetteItem[] = [
    {
      id: "pay-counter",
      category: "dont",
      title: "Paiements mains à mains",
      concept: "Utilisez toujours la coupelle (Tray) pour poser votre argent/carte au moment de payer.",
      desc: "Au Japon, il est d'usage et poli de poser vos billets de banque ou votre carte de crédit sur le petit plateau en plastique souvent placé devant la caisse. Évitez de le donner de main à main.",
    },
    {
      id: "bowing",
      category: "do",
      title: "Saluer avec le buste",
      concept: "Inclinez légèrement le buste (Ojigi) pour dire bonjour, merci ou au revoir.",
      desc: "Le contact physique comme serrer la main ou s'embrasser est absent des interactions rituelles. Une légère inclinaison de 15 à 30 degrés suffit amplement pour marquer votre reconnaissance soutenue.",
    },
    {
      id: "chopsticks",
      category: "dont",
      title: "Ne plantez pas vos baguettes",
      concept: "Ne plantez jamais vos baguettes à la verticale directement dans votre bol de riz.",
      desc: "Plantez vos baguettes à la verticale rappelle le rituel d'hommage funéraire japonais (Tsukitatebashi). Reposez toujours vos baguettes sur le petit socle prévu à cet effet (Hachoki).",
    },
    {
      id: "trash-city",
      category: "dont",
      title: "Ne jetez rien dehors",
      concept: "Gardez vos petits déchets sur vous. Il n'y a pas ou très peu de poubelles publiques.",
      desc: "Depuis 1995, le réseau public japonais détient extrêmement peu de poubelles urbaines. Les habitants conservent systématiquement leurs déchets dans leurs sacs pour les trier chez eux.",
    },
    {
      id: "onsen-tattoos",
      category: "do",
      title: "Couvrir ses Tatouages",
      concept: "Vérifiez l'accès des sources chaudes (Onsen) si vous possédez des tatouages.",
      desc: "Traditionnellement liés aux yakuzas, de nombreux bains publics interdisent encore l'accès aux peaux encrées. Cherchez des onsens privés (kashikiri) ou prévoyez des patchs adhésifs imperméables pour les recouvrir.",
    },
    {
      id: "train-voice",
      category: "dont",
      title: "Silence dans le transport",
      concept: "Passez votre téléphone en mode silencieux 'Manner Mode' et parlez doucement dans les trains.",
      desc: "Les trains de banlieue et le Shinkansen sont des espaces de silence et de bien-être collectif. Évitez de passer des appels vocaux ou de parler à haute voix par pur respect des passagers endormis.",
    },
  ];

  const handleSimulateVoice = (index: number, text: string) => {
    setActivePhraseId(index);
    showToast(`Simulation audio de : "${text}"`);
    setTimeout(() => {
      setActivePhraseId(null);
    }, 1500);
  };

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    showToast("Texte copié dans votre presse-papiers !");
  };

  // Filter phrases based on search searchQuery
  const filteredPhrases = phrases.filter(
    (p) =>
      p.romaji.toLowerCase().includes(searchWord.toLowerCase()) ||
      p.meaning.toLowerCase().includes(searchWord.toLowerCase()) ||
      p.japanese.includes(searchWord)
  );

  return (
    <div id="key-info-section" className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-20 select-none animate-fadeIn">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastText && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 p-4 bg-neutral-900 border border-red-500/30 rounded-xl flex items-center gap-3 shadow-2xl shadow-red-950/40 text-xs font-mono"
          >
            <CheckCircle className="w-4 h-4 text-emerald-500 animate-bounce" />
            <span className="text-neutral-200">{toastText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-2 p-1.5 px-3 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 font-mono text-[10px] tracking-widest uppercase">
          <Clock className="w-3.5 h-3.5" /> INFORMATIONS DE VOYAGE
        </div>
        <h2 
          className="text-4xl md:text-5xl font-display uppercase tracking-wider text-white mb-4"
          style={{ fontFamily: "'Dela Gothic One', sans-serif" }}
        >
          GUIDE PRATIQUE
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-mono">
          Consultez notre boîte à outils interactive pour simplifier vos transits, échanger vos devises, maîtriser la langue de base et honorer le savoir-vivre nippon.
        </p>
      </div>

      {/* Inner Tabs Navigation */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-white/5">
        <button
          onClick={() => setActiveTab("etiquette")}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
            activeTab === "etiquette"
              ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-605/20"
              : "bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white"
          }`}
        >
          <Scale className="w-3.5 h-3.5" /> Savoir-Vivre & Coutumes
        </button>
        <button
          onClick={() => setActiveTab("converter")}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
            activeTab === "converter"
              ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-605/20"
              : "bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white"
          }`}
        >
          <Coins className="w-3.5 h-3.5" /> Convertisseur Yen
        </button>
        <button
          onClick={() => setActiveTab("phrases")}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
            activeTab === "phrases"
              ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-605/20"
              : "bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white"
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" /> Vocabulaire Utile
        </button>
        <button
          onClick={() => setActiveTab("regional")}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
            activeTab === "regional"
              ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-605/20"
              : "bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Climat & Saisons
        </button>
      </div>

      {/* Main Tab Panels with Animate Presence */}
      <div id="tab-panels-wrapper" className="min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: SAVOIR-VIVRE */}
          {activeTab === "etiquette" && (
            <motion.div
              key="etiquette-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {etiquetteRules.map((rule) => {
                const isDo = rule.category === "do";
                return (
                  <div
                    key={rule.id}
                    className="p-6 bg-neutral-900/40 border border-white/5 hover:border-white/15 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg hover:shadow-black/40 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold ${
                          isDo 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : "bg-red-600/10 text-red-500 border border-red-600/20"
                        }`}>
                          {isDo ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                          {isDo ? "À FAVORISER" : "À ÉVITER"}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-600 tracking-wider">CODE #2026</span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-red-500 transition-colors uppercase">
                        {rule.title}
                      </h3>
                      <p className="text-xs font-bold text-neutral-300 italic font-mono mt-1 mb-2">
                        "{rule.concept}"
                      </p>
                      <p className="text-[11px] text-neutral-400 leading-relaxed font-mono">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 2: CONVERTISSEUR DE MONNAIE */}
          {activeTab === "converter" && (
            <motion.div
              key="converter-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl mx-auto bg-neutral-900/40 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              {/* background red sun blur aesthetic */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-red-600/10 blur-[60px]" />
              
              <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                <Coins className="text-red-600 w-5 h-5 animate-pulse" /> Yen Devise Calculateur
              </h3>
              <p className="text-xs text-neutral-400 mb-6 font-mono">
                Saisissez un montant pour obtenir la conversion immédiate. Taux de change approximatif de la plateforme : <span className="text-red-500 font-bold">1 EUR = {RATE} JPY</span>.
              </p>

              <div className="space-y-5">
                {/* Euro Input Card */}
                <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl relative">
                  <span className="absolute top-2 right-4 text-[9px] font-mono text-neutral-500 uppercase font-bold tracking-widest">EUROPE DEVISE</span>
                  <label className="text-xs text-neutral-400 font-mono block mb-1">Montant en Euros (€)</label>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={eurVal}
                      onChange={(e) => handleEurChange(e.target.value)}
                      placeholder="0"
                      className="text-2xl font-bold bg-transparent text-white border-none outline-none w-2/3"
                    />
                    <span className="text-lg font-mono font-bold text-red-500">EUR (€)</span>
                  </div>
                </div>

                {/* Swap Divider bar */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-px bg-white/5 w-full" />
                  <div className="relative z-10 w-8 h-8 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center text-neutral-400">
                    ⇅
                  </div>
                </div>

                {/* Yen Input Card */}
                <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl relative">
                  <span className="absolute top-2 right-4 text-[9px] font-mono text-neutral-500 uppercase font-bold tracking-widest">YEN JAPONAIS</span>
                  <label className="text-xs text-neutral-400 font-mono block mb-1">Montant en Yens (¥)</label>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={jpyVal}
                      onChange={(e) => handleJpyChange(e.target.value)}
                      placeholder="0"
                      className="text-2xl font-bold bg-transparent text-white border-none outline-none w-2/3"
                    />
                    <span className="text-lg font-mono font-bold text-red-500">JPY (¥)</span>
                  </div>
                </div>
              </div>

              {/* Instant guidelines / Tips with card packs */}
              <div className="mt-6 p-4 rounded-xl bg-red-600/5 border border-red-650/15 text-[11px] leading-relaxed font-mono text-neutral-350">
                <span className="font-bold text-white block mb-0.5">💡 Astuce Budget :</span>
                Au Japon, il est toujours recommandé d'avoir entre <span className="text-white font-bold">5000 et 10000 yens</span> en espèces pour les petites enseignes familiales de gastronomie rurale ou l'achat d'amulettes Omamori dans les Shinto Shrines.
              </div>
            </motion.div>
          )}

          {/* TAB 3: LEXIQUE / VOCABULAIRE INTERACTIF */}
          {activeTab === "phrases" && (
            <motion.div
              key="phrases-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="max-w-md mx-auto flex items-center h-11 px-4 rounded-full bg-neutral-900 border border-white/10">
                <input
                  type="text"
                  placeholder="Rechercher un mot (ex: Merci, Excusez-moi...)"
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs text-white placeholder-neutral-500 w-full font-mono"
                />
              </div>

              {/* Grid lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPhrases.length > 0 ? (
                  filteredPhrases.map((phrase, idx) => {
                    const isPlaying = activePhraseId === idx;
                    return (
                      <div
                        key={idx}
                        className="p-5 bg-neutral-900/40 border border-white/5 hover:border-red-600/20 rounded-xl flex items-center justify-between gap-4 transition-all duration-300 group"
                      >
                        <div className="space-y-1.5 flex-grow">
                          <div className="text-xl font-bold text-white tracking-wide">{phrase.japanese}</div>
                          <div className="text-xs font-bold text-red-500 font-mono tracking-wide">
                            {phrase.romaji}
                          </div>
                          <div className="text-xs text-neutral-400 font-mono">{phrase.meaning}</div>
                        </div>

                        {/* Interactive sound simulated feedback and duplicate copy */}
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleSimulateVoice(idx, phrase.japanese)}
                            className="w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 hover:text-white text-red-500 border border-white/5 hover:border-red-500 flex items-center justify-center transition-all cursor-pointer relative"
                            title="Écouter la prononciation"
                          >
                            <Volume2 className="w-4 h-4" />
                            {isPlaying && (
                              <span className="absolute -inset-1 rounded-full border border-red-500 animate-ping" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => handleCopy(`${phrase.japanese} (${phrase.romaji}) - ${phrase.meaning}`)}
                            className="w-10 h-10 rounded-full bg-black/40 hover:bg-neutral-800 text-neutral-450 hover:text-white border border-white/5 flex items-center justify-center transition-colors cursor-pointer"
                            title="Copier"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center col-span-3 py-10 font-mono text-xs text-neutral-550">
                    Aucune expression de survie ne correspond à votre recherche.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: REPO REGION CLIMAT */}
          {activeTab === "regional" && (
            <motion.div
              key="regional-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-neutral-900/40 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-widest text-[9px] border-b border-white/10">
                      <th className="p-4 pl-6">Région principale</th>
                      <th className="p-4">Climat type</th>
                      <th className="p-4">Meilleure période</th>
                      <th className="p-4">Plat Typique Secret</th>
                      <th className="p-4 pr-6">Atout Nature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6 font-bold text-white text-sm">Hokkaido (Sapporo)</td>
                      <td className="p-4">Subarctique - Neige légendaire</td>
                      <td className="p-4 text-emerald-400 font-bold">Janv. - Fév. & Juil. - Août</td>
                      <td className="p-4">Miso Ramen, Crabe des neiges</td>
                      <td className="p-4 pr-6 text-neutral-450">Champs de lavande et pistes de ski d'exception</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6 font-bold text-white text-sm">Honshu (Tokyo & Kyoto)</td>
                      <td className="p-4">Tempéré humide - 4 saisons marquées</td>
                      <td className="p-4 text-emerald-400 font-bold">Avril - Mai & Oct. - Nov.</td>
                      <td className="p-4">Sushi, Kaiseki, Ramen</td>
                      <td className="p-4 pr-6 text-neutral-450">Fervor sacrée des Sakuras & Érable rouge (Koyo)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6 font-bold text-white text-sm">Kyushu (Fukuoka)</td>
                      <td className="p-4">Chaud & volcanique</td>
                      <td className="p-4 text-emerald-400 font-bold">Mars - Mai & Oct. - Déc.</td>
                      <td className="p-4">Tonkotsu Ramen sacrée</td>
                      <td className="p-4 pr-6 text-neutral-450">Sources onsens au soufre pur, caldeira active</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6 font-bold text-white text-sm">Okinawa (Naha)</td>
                      <td className="p-4">Subtropical - Plages turquoises</td>
                      <td className="p-4 text-emerald-400 font-bold">Avril - Juin & Septembre</td>
                      <td className="p-4">Okinawa Soba, Goya Champuru</td>
                      <td className="p-4 pr-6 text-neutral-450">Fonds marins coralliens, baleines majestueuses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
