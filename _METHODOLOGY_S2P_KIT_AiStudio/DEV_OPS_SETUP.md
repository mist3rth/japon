# 🌐 DEV OPS : Configuration des Environnements

Ce module prépare l'infrastructure technique du projet pour garantir un passage fluide du local à la pre-prod GitHub.

## 1. Gestion des Secrets (.env)
L'agent doit s'assurer que les clés d'API et configurations sensibles ne sont jamais en dur.
- Création systématique de `.env.example` (avec les clés vides).
- Création de `.env.local` pour le développement.
- Variables obligatoires à configurer :
    - `VITE_APP_URL` ou `NEXT_PUBLIC_SITE_URL`
    - `VITE_API_KEY` (si applicable)
    - `VITE_GA_ID` (Google Analytics)

## 2. Stratégie Git "Clean Flow"
Dès l'import du ZIP, l'agent prépare les branches :
- `main` : Code de production stable.
- `dev` : Intégration des nouvelles fonctionnalités.
- `feature/[nom]` : Pour chaque étape du refactoring (ex: `feature/refactor-ui`).

## 3. Pre-prod & Déploiement GitHub Actions
Préparation du fichier `.github/workflows/deploy.yml` pour un déploiement automatique sur **GitHub Pages** ou **Vercel**.

**Configuration type (GitHub Pages) :**
- Déclenchement sur push `main`.
- Build automatique (npm install, npm run build).
- Upload de l'artefact `/dist` ou `/.next`.

## 4. Scripts Utilitaires
L'agent doit proposer d'ajouter ces scripts au `package.json` :
- `"clean"` : pour vider les caches.
- `"lint"` : pour vérifier la qualité du code.
- `"optimize"` : pour compresser les assets locaux.

---
**ACTION IMMÉDIATE :** "Prépare les fichiers d'environnement et la structure Git pour ce projet."
