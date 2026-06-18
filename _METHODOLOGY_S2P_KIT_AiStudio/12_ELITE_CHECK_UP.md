# ✅ ELITE CHECK-UP (VALIDATION FINALE)

Ce document est la dernière étape avant la mise en ligne. Un projet n'est considéré comme "Elite" que si 100% de ces points sont validés.

## 🚀 1. PERFORMANCE & OPTIMISATION
- [ ] **LCP < 1.2s :** Le Hero s'affiche quasi instantanément.
- [ ] **Zéro Layout Shift (CLS) :** Les images et polices ont des dimensions réservées.
- [ ] **Assets :** Toutes les images sont en WebP/AVIF et les vidéos sont compressées.
- [ ] **Fonts :** Chargement optimisé (swap strategy) pour éviter le texte invisible.

## ♿ 2. ACCESSIBILITÉ (A11Y) & SEO
- [ ] **Contraste :** Les textes passent le test WCAG AA.
- [ ] **Sémantique :** Un seul `<h1>`, structure `<h2>`/`<h3>` logique.
- [ ] **Navigation Clavier :** Le site est entièrement navigable via la touche `Tab`.
- [ ] **Aria-Labels :** Présents sur tous les boutons-icônes.
- [ ] **AEO :** JSON-LD Schema généré et validé.

## 🖱️ 3. UX & INTERACTION
- [ ] **Cursor Pointer :** Vérifié sur tous les CTA.
- [ ] **Zéro Cursor Skinning :** Le curseur système est préservé.
- [ ] **External Links :** `target="_blank"` + `rel="noopener noreferrer"` + Icône présente.
- [ ] **Scroll Traps :** Les carrousels mobiles permettent le défilement vertical.
- [ ] **Burger Menu :** Testé et fonctionnel sur mobile.

## 🛡️ 4. QUALITÉ DU CODE & SÉCURITÉ
- [ ] **Zero Logic Page :** La page principale n'est qu'un orchestrateur.
- [ ] **Structure Pro :** Dossiers `/ui`, `/components`, `/layouts` respectés.
- [ ] **Typescript :** Zéro type `any`.
- [ ] **Headers de Sécurité :** Vérification des headers HTTP (via `security-auditor`).

## 🎨 5. ÉMOTION VISUELLE (DA)
- [ ] **Cohérence :** La promesse du brainstorming est respectée dans chaque bloc.
- [ ] **Micro-animations :** Courbes de bézier fluides et staggering validé.
- [ ] **Tone of Voice :** Micro-copy validée (pas de "slop" AI).
