# TODO - Suivi des tâches

Suivi des implémentations et de l'industrialisation du portail Japon.

## ✅ Phase 1 : Consolidation & Traduction (Terminé)
- [x] Extraire la barre de navigation dans `components/Navbar.tsx`
- [x] Extraire l'en-tête dynamique dans `components/sections/HeroSection.tsx`
- [x] Traduire 100% des données textuelles de data.ts en français
- [x] Configurer un logger personnalisé de développement
- [x] Éliminer les `@ts-ignore` sur les images via des définitions globales dans `vite-env.d.ts`

## ✅ Phase 2 : Rétablissement des Animations Premium (Terminé)
- [x] Adapter le composant `ScrollExpandMedia` pour supprimer l'espace vide excessif
- [x] Rétablir l'effet de zoom progressif à 300vh dans `ZoomParallax`
- [x] Corriger le positionnement des images et le zoom de l'image centrale dans `ZoomParallax`
- [x] Traduire le bouton de la hero section de "EXPLORE" à "EXPLORER"

## ✅ Phase 3 : Médias Locaux & Contenu Éditorial (Terminé)
- [x] Remplacer les images Unsplash de Kyoto et Nara par des images locales (`/kyoto.jpeg`, `/nara.jpeg`)
- [x] Remplacer l'image de Tokyo par une image locale (`/tokyo.jpeg`)
- [x] Remplacer les 7 images Unsplash de la section ZoomParallax par 8 images webp locales
- [x] Mettre à jour le composant `ZoomParallax` pour supporter 8 images (positions + scales)
- [x] ### Zoom Parallax (Bento Grid)
- [x] Réécrire l'agencement "anarchique" en Bento Grid 4x3 centré (ZoomParallax).
- [x] Conserver l'effet de zoom immersif (Framer Motion).
- [x] Conserver l'image de fond (`dessin.webp`) intacte.
- [x] Régler le bug de l'image fantôme de WebKit avec un Transform display expert.
- [x] Ajouter l'apparition du texte poétique Ukiyo-e à la fin du scroll (400vh).
- [x] Refonte éditoriale de la section "Où Aller?" avec contenu détaillé par ville :
  - Deux points d'intérêt par ville (nom JP, description longue)
  - Tagline accrocheur pour chaque destination
  - Bouton "Lire la suite" pour déplier le texte complet
- [x] Ajouter le logo (`japon-logo.webp`) dans le footer et remplacer les emojis par des SVG
- [x] Section vidéo `0613.mp4` avec effet d'expansion au scroll (dessin.webp en arrière-plan)

## ✅ Phase 4 : Qualité & Performance (Terminé)
- [x] Valider que toutes les images locales se chargent correctement (aucun fallback Unsplash)
- [x] Valider le parcours complet au clavier (A11Y) — sémantique HTML5, balises `alt` descriptives
- [x] Audit SEO : vérifier la hiérarchie Hn, les meta-tags et le JSON-LD
- [x] Optimisation LCP : vérifier que les images principales sont en `loading="eager"` avec `fetchpriority="high"`
- [x] Refactoring : diviser les sous-composants volumineux restants de `App.tsx`

## ✅ Phase 5 : Layout interactif des Informations Pratiques (Terminé)
- [x] Mettre en œuvre le layout split-screen sticky pour la section `PracticalInfo`
- [x] Étoffer le contenu détaillé des 6 cartes (Période, Budget, Transport, Décalage, Visa, Langue)
- [x] Créer le panneau gauche sticky avec son Kanji géant et son compteur dynamique
- [x] Créer des animations premium d'apparition des cartes à droite et de transition à gauche
- [x] Valider l'accessibilité au clavier, le responsive et l'optimisation SEO

