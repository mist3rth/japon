# PRD : Kit Méthodologique S2P (Stitch to Production)

## 🎯 Vision
Transformer un prototype fonctionnel (issu de Stitch -> AI Studio) en une application de production robuste, sécurisée et ultra-performante sans dénaturer le design original.

## 🛠️ Contraintes Techniques & Règles d'Or
- **Fidélité Visuelle :** L'agent ne doit JAMAIS modifier les couleurs, espacements ou typographies décidés dans Stitch sans ordre explicite.
- **Intégrité du Contenu :** Pas de remplacement de textes ou d'images par des placeholders.
- **Stack :** React, TypeScript Strict, Tailwind/Vanilla CSS.
- **Architecture :** Passage d'un monolithe à une structure atomique (/ui, /components, /sections).

## 📂 Structure du Kit

### 1. 🛡️ Manifeste (Engagement de l'Agent)
- Définition des limites de l'IA (Interdiction de modifier le design/contenu sans aval).
- Priorité à la structure et à la mutualisation.

### 2. 🌐 Environnement & DevOps
- Setup automatique des fichiers `.env.example` et `.env.local`.
- Configuration des scripts de déploiement (GitHub Actions pour GitHub Pages/Vercel).
- Préparation de la Pre-prod.

### 3. 🔍 Audit & Analyse (Le "Skill")
- Scan complet du projet importé.
- Identification des répétitions de code (DRY).
- Proposition d'un plan de découpage avant action.

### 4. 🏗️ Refactoring Industriel
- Nettoyage du fichier principal (App.tsx).
- Extraction des composants UI réutilisables.
- Mise en place d'un routing propre.

### 5. ⚡ Performance & Polish
- Intégration de GSAP pour le "feel" premium (animations fluides).
- Optimisation SEO (Meta, JSON-LD, Sitemap).
- Accessibilité (A11Y) et sémantique HTML5.

### 🔐 Sécurité & Debug
- Mise en place d'Error Boundaries.
- Validation des types TS.
- Logger de développement personnalisé.

## ✅ Critères de Succès
1. Le site est identique au design Stitch.
2. Le code est propre, modulaire et sans répétition.
3. Le déploiement est automatisé vers GitHub Pages.
4. Les performances (Lighthouse) sont > 90.
