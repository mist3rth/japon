# 💎 CODE STYLE & AESTHETICS (ELITE STANDARDS)

Ce document définit les règles de développement pour garantir un code performant, maintenable et visuellement impeccable.

## 🏗️ 1. ORGANISATION DES DOSSIERS (CLEAN ARCHITECTURE)

```text
src/
├── layouts/          # Squelettes globaux (MainLayout, Navbar, Footer)
├── components/       # Blocs de sections uniques (Hero, BentoGrid, Team)
│   └── [SectionName]/
│       ├── index.tsx
│       └── components/ # Sous-composants spécifiques à cette section
├── ui/              # Composants atomiques (Button, Badge, Input, Typography)
├── styles/          # Design Tokens (colors.css, animations.css, variables.css)
├── hooks/           # Logique réutilisable (useScrollSpy, useIntersection)
└── assets/          # Médias optimisés (WebP, SVGs)
```

## 🧩 2. ANATOMIE D'UN COMPOSANT ÉLITE

- **Un fichier par composant.**
- **Interface de Props explicite :** Toujours typer les entrées.
- **Zéro Logique dans le Render :** Les calculs complexes se font au-dessus du `return`.
- **Sémantique HTML5 :** Utiliser `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`.

```tsx
// Exemple de structure de composant
interface HeroProps {
  title: string;
  ctaText: string;
}

export const Hero = ({ title, ctaText }: HeroProps) => {
  // 1. Hooks & Logique
  const { scrollY } = useScroll();

  // 2. Fonctions Helpers locales
  const handleScroll = () => { /* ... */ };

  // 3. Render (Sémantique & Propre)
  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <h1 className="text-display-1">{title}</h1>
      <Button onClick={handleScroll} variant="primary">
        {ctaText}
      </Button>
    </section>
  );
};
```

## 🎨 3. RÈGLES D'OR DE L'ESTHÉTIQUE CODE/UX

### A. CTA & Interactions
- **Cursor Pointer :** Obligatoire sur tous les éléments interactifs.
- **Hover State :** Toujours prévoir une transition douce (minimum 300ms).
- **Active State :** Un feedback visuel au clic (ex: `scale: 0.98`).

### B. Liens & Navigation
- **Liens Externes :** Toujours `target="_blank"` + `rel="noopener noreferrer"`.
- **Icône Externe :** Toujours ajouter un indicateur visuel (ex: flèche haut-droite).
- **Burger Menu :** Obligatoire en mobile, doit être accessible au clavier.

### C. Performance & Médias
- **Images :** Utiliser `next/image` ou équivalent avec `priority` pour le Hero.
- **Formats :** WebP pour les photos, SVG pour les icônes, WebM pour les vidéos.
- **Scroll Traps :** Interdiction de bloquer le scroll vertical sur les carrousels mobiles.

## 🎬 4. ANIMATIONS & SHADERS
- **GSAP/Motion :** Ne jamais animer les propriétés de layout (`top`, `left`, `margin`). Toujours utiliser `transform` (`x`, `y`, `scale`) et `opacity`.
- **Staggering :** Les éléments d'une liste ou d'une grille doivent apparaître avec un léger décalage pour un effet "Premium".
- **Interaction au Scroll :** Utiliser `IntersectionObserver` pour ne déclencher les animations que lorsque le composant est visible.

## ♿ 5. ACCESSIBILITÉ (A11Y)
- **Alt Text :** Obligatoire et descriptif pour les images.
- **Focus Rings :** Ne jamais supprimer le contour de focus (le styliser au besoin).
- **Aria-Labels :** Sur les boutons qui ne contiennent que des icônes.
