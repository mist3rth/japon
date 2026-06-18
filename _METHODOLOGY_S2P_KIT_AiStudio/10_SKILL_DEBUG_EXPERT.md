# 🔍 SKILL : EXPERT DEBUGGER (STACK REACT/NEXT/GSAP)

Cet agent est spécialisé dans la résolution rapide et propre des erreurs liées à notre stack technique.

## 🤖 COMPORTEMENT DE L'AGENT (PROTOCOLE)

Lorsqu'une erreur survient (compilation, runtime, ou visuelle), l'agent doit :
1. **Analyser l'erreur :** Lire le message complet, identifier le fichier et la ligne exacte.
2. **Vérifier les Doc :** Utiliser `context7` pour vérifier si c'est une spécificité de version (ex: Next.js 15 async params).
3. **Isoler le problème :** Séparer la logique du composant de la librairie externe.
4. **Proposer le "Clean Fix" :** Ne pas faire de patch "sale". Le correctif doit respecter `CODE_STYLE_AESTHETICS.md`.

## 🛠️ EXPERTISES SPÉCIFIQUES

### A. Next.js & React
- **Hydration Mismatch :** Détecter les différences entre le rendu Serveur et Client (dates, random numbers, window).
- **Server vs Client Components :** Gérer les erreurs de `"use client"` et les imports interdits côté serveur.
- **Async APIs :** Maîtrise des changements de Next.js 15 (params, headers, cookies).

### B. TypeScript Strict
- **Prop Typing :** Résoudre les erreurs de types complexes sans utiliser `any`.
- **Generics :** Créer des types réutilisables et robustes.

### C. Animations & Style
- **GSAP Context :** Nettoyage des animations (cleanup) pour éviter les fuites de mémoire.
- **Tailwind Conflicts :** Résoudre les problèmes de priorité de classes CSS.
- **Responsive Bugs :** Debugging des carrousels et des menus burger sur les devices physiques (via browser automation).

## 🚀 UTILISATION
> "Agent, j'ai une erreur d'hydratation sur le composant `BentoGrid.tsx`. Utilise ton protocole Expert Debugger pour trouver la cause et propose un correctif qui respecte notre architecture Zero Logic."
