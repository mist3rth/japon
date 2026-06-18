# 🚀 EXPERTISES ÉLITE (RECOMMANDATIONS)

Ces modules optionnels peuvent être activés pour les projets à fort enjeu.

## 1. ARCHITECTURE PRO "ZERO LOGIC"
Pour maintenir une base de code saine, applique la règle du "Pure Orchestrator" :
- **`App.tsx` / `page.tsx` :** Ne doit contenir que des imports de composants. Aucune balise HTML brute (sauf `<main>`), aucun style inline.
- **Dossier `/ui` :** Composants atomiques (Boutons, Inputs, Badges).
- **Dossier `/components` :** Sections complexes (Hero, BentoGrid, Testimonials).
- **Dossier `/layouts` :** Squelettes réutilisables (Navigation, Footer, Sidebar).

## 2. INNOVATION VISUELLE : SORTIR DE LA BOUCLE
Pour éviter que tous les projets se ressemblent (le syndrome "SaaS Dark Mode") :
- **Textures & Grains :** Utilise des overlays de bruit (noise) ou des textures organiques pour casser le lissage numérique.
- **Grilles Asymétriques :** Ne pas tout centrer. Utiliser le "Negative Space" pour créer de la tension.
- **Typographies de Caractère :** Utiliser des polices avec des empattements (Serif) pour le luxe, ou des fontes "Display" pour l'impact.
- **Palettes Contrastées :** Oser des couleurs de fond "off-white" (crème, sable) ou des couleurs sourdes (vert sapin, terre de sienne).

## 3. SYSTÈME ADR (Architecture Decision Records)
Crée un fichier par décision majeure dans `docs/adr/0001-choix-stack.md`.
- **Format :** Titre, État, Contexte, Décision, Conséquences.
- **Utilité :** Évite de remettre en question les choix structurants en cours de projet.

## 4. MATRICE DE PERSUASION (DÉTAILLÉE)
Couple les composants UI aux leviers psychologiques.

| Composant | Biais / Levier | Skill MIT |
| :--- | :--- | :--- |
| Hero Header | **Ancrage / Clarté** | `headline-psychologist` |
| Section Tarifs | **Effet de Leurre / Ancrage** | `price-psychology-strategist` |
| Formulaire | **Engagement & Cohérence** | `onboarding-psychologist` |
| Footer | **Confiance (EEAT)** | `trust-calibrator` |

## 5. AUDIT ÉMOTIONNEL VISUEL
Avant de finaliser la DA, utilise le skill `visual-emotion-engineer` pour valider :
- La courbe de tension visuelle.
- L'impact des espaces blancs sur la perception de luxe/premium.
- La cohérence entre la promesse marketing et le ressenti visuel.
- **Note :** Utilise `stitch` pour matérialiser ces émotions avant de passer au code.

## 6. UX & ERGONOMIE D'ÉLITE (RÈGLES D'OR)
- **Zéro Cursor Skinning :** Ne jamais modifier l'apparence native du curseur système (effet "cheap" et perturbant).
- **CTA Interaction :** Utiliser systématiquement `cursor: pointer` sur tous les éléments cliquables (boutons, liens, cartes interactives).
- **Liens Externes :** Tout lien sortant du domaine doit être accompagné d'une icône indicative (ex: `ExternalLink` de Lucide) pour prévenir l'utilisateur.
- **Carousel Safety :** Sur mobile, s'assurer que les carrousels n'occupent pas 100% de la hauteur/largeur sans laisser de zone de scroll vertical (éviter les "traps").
