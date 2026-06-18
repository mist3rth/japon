# PRD - Portail Découverte Japon (Kit S2P)

Ce document décrit le cahier des charges et les exigences fonctionnelles pour l'industrialisation du portail interactif sur le Japon.

## 🎯 1. Objectifs Généraux
- Fournir une vitrine interactive, immersive et hautement esthétique du Japon.
- Proposer une navigation fluide et premium via des micro-interactions soignées (Framer Motion).
- Assurer une traduction intégrale en français.
- Garantir des performances optimales (LCP < 2.5s) et une accessibilité conforme aux standards WCAG AA.
- **Utiliser exclusivement des images locales** (assets fournis par le client, en `.webp` ou `.jpeg`). Aucune image Unsplash ou tierce ne doit subsister dans la version finale.

## 🛠️ 2. Fonctionnalités Clés

### 2.1 Hero Section Dynamique
Slider avec transitions fondues croisées pour les 4 villes (Tokyo, Kyoto, Osaka, Nara). Images locales sur fond full-screen. Soleil rouge central s'animant à l'arrivée. Vignettes circulaires navigables en bas.

### 2.2 Zoom Parallax Immersif
Grille mosaïque de **8 images locales** (.webp) interactive au scroll. Chaque image a son propre scale d'expansion. Fond illustré `dessin.webp`.

### 2.3 Cartographie Alternative — "Où Aller?"
Section avec vidéo `0613.mp4` s'étendant au scroll (fond `dessin.webp`). Contenu : 4 cards (Tokyo, Kyoto, Osaka, Nara), chacune avec 2 points d'intérêt détaillés (nom japonais, description éditoriale longue) et un bouton "Lire la suite".

### 2.4 Fiches Détail Destination
Sections éditoriales avec image immersive, faits clés, description longue et liste des attractions. Tiroir (Drawer) glissant pour les détails complets par ville.

### 2.5 Informations Pratiques Premium
Refonte complète de la section préparatifs. Layout de type split-screen :
- Panneau gauche sticky affichant un Kanji japonais géant qui change à chaque étape avec une animation de fondu/glissement fluide, accompagné du numéro de carte actif (01 à 06).
- Panneau droit défilant au scroll, avec 6 cartes aux contenus enrichis et détaillés sur les aspects logistiques clés du voyage au Japon (Période, Budget, Transport, Décalage horaire, Visa, Langue).
- Animations fluides gérées par Framer Motion (`motion/react`) pour une expérience utilisateur premium.

### 2.6 Footer Premium
Logo `japon-logo.webp`, liens avec icônes SVG animées.

## 📦 3. Assets Locaux Requis (dans `/public`)
| Fichier | Usage |
|---------|-------|
| `dessin.webp` | Fond section ZoomParallax & ScrollExpandMedia |
| `0613.mp4` | Vidéo intro section "Où Aller?" |
| `tokyo.jpeg` | Hero + card Tokyo |
| `kyoto.jpeg` | Hero + card Kyoto |
| `nara.jpeg` | Hero + card Nara |
| `shibuya_crossing.webp` | ZoomParallax |
| `arashiyama_bambouseraie_sagano.webp` | ZoomParallax |
| `fushimi_inari_taisha.webp` | ZoomParallax |
| `senso-ji.webp` | ZoomParallax |
| `dotonbori.webp` | ZoomParallax |
| `chateau_osaka.webp` | ZoomParallax |
| `parc_nara.webp` | ZoomParallax |
| `todai_ji.webp` | ZoomParallax |

## 📈 4. Exigences Techniques
- **Stack** : React (Vite), TypeScript Strict, Tailwind CSS, Framer Motion (via `motion/react` ou `motion`).
- **Internationalisation** : Textes et interfaces 100% en français.
- **Performance** : Médias en WebP/AVIF, `loading="lazy"` sur les images non-critiques, LCP < 2.5s.
- **A11Y** : Sémantique HTML5, navigation clavier complète, WCAG AA, balises `alt` descriptives.
- **SEO** : Hiérarchie Hn respectée, meta-tags, JSON-LD structuré.
