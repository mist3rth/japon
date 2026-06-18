# 🏗️ REFACTORING : Passage au Mode Industriel

Ce guide définit la méthode pour déconstruire proprement l'export AI Studio et reconstruire une architecture atomique.

## 1. Phase de Découpage (Slicing)
On ne code rien tant que le plan d'audit n'est pas validé.
- **Extraction des Sections :** Chaque section identifiée (Hero, About, etc.) devient un fichier dans `/src/components/sections/`.
- **Extraction de l'UI :** Les éléments atomiques (Boutons, Badges, Inputs) vont dans `/src/components/ui/`.
- **Nettoyage d'App.tsx :** Le fichier racine ne doit contenir que :
    - Les imports de sections.
    - L'orchestration du scroll / layout global.
    - Les fournisseurs de contexte (Theme, Auth).

## 2. Mutualisation (Dry Mode)
- **Identification des Doublons :** Si deux boutons ont 90% de styles identiques, on crée un composant `Button` générique avec des variantes (props).
- **Centralisation des Constantes :** Les textes répétitifs, les URLs et les configurations vont dans un dossier `/src/constants/`.

## 3. Typage TypeScript Strict
AI Studio peut générer du code peu typé.
- Remplacement systématique des `any` par des interfaces ou types précis.
- Typage des props de tous les nouveaux composants créés.

## 4. Nettoyage (Purge)
- Suppression des fichiers inutiles hérités de l'export (ex: `favicon.ico` par défaut, logos inutilisés).
- Formatage du code avec Prettier/ESLint pour garantir la cohérence.

---
**COMMANDE TYPE :** "Applique le plan de découpage pour la section [NOM] et crée les composants UI associés."
