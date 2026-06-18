# ARCHITECTURE - Portail Découverte Japon (Kit S2P)

Ce document décrit les choix d'architecture technique et la structure modulaire du projet.

## 📁 1. Structure du Projet

L'arborescence respecte la structure atomique définie dans la méthodologie S2P :
```
japon/
├── PRD.md (Spécifications)
├── ARCHITECTURE.md (Ce document)
├── TODO.md (Suivi des Stories)
├── src/
│   ├── main.tsx (Point d'entrée)
│   ├── App.tsx (Orchestrateur)
│   ├── types.ts (Modèles TypeScript)
│   ├── data.ts (Données localisées en français)
│   ├── index.css (Styles globaux)
│   ├── components/
│   │   ├── ErrorBoundary.tsx (Isolation des crashs UI)
│   │   ├── Navbar.tsx (Navigation premium)
│   │   ├── ui/ (Composants réutilisables d'animation)
│   │   │   ├── scroll-expansion-hero.tsx (Expansion de vidéo au scroll)
│   │   │   └── zoom-parallax.tsx (Effet de grille parallax)
│   │   └── sections/ (Composants de pages / sections)
│   │       └── HeroSection.tsx (En-tête de page)
│   └── lib/
│       └── logger.ts (Logger personnalisé de dev)
```

## ⚙️ 2. Choix Techniques Clés
- **Isolation des crashs** : Utilisation d'un `ErrorBoundary` autour des grandes sections pour éviter qu'un crash localisé ne bloque toute la page.
- **Optimisation du Scroll** : Remplacement des blocages de défilement globaux (`window.scrollTo`) par un `IntersectionObserver` ciblé dans `ScrollExpandMedia` pour garantir une expérience de scroll native en dehors de la section.
- **TypeScript strict** : Typage complet des données et des assets (fichiers JPG/SVG) pour éliminer les `@ts-ignore`.
