# 🚢 STRATÉGIE DE DÉPLOIEMENT & ENVIRONNEMENTS

Ce document définit la gestion des environnements (Local, Pre-Prod, Prod) et l'automatisation via GitHub.

## 🌍 1. GESTION DES ENVIRONNEMENTS (.env)

Dès le lancement du projet, trois fichiers doivent être initialisés :

- **`.env.local` :** Configuration pour le développement (ex: API de test, `BASE_URL=http://localhost:3000`).
- **`.env.preprod` :** Déploiement sur GitHub Pages (ex: `BASE_URL=/nom-du-repo/`).
- **`.env.production` :** Déploiement final (ex: `BASE_URL=https://www.monsite.com`).

**Règle d'or :** Toujours utiliser une variable `VITE_APP_BASE_URL` ou `NEXT_PUBLIC_BASE_URL` pour préfixer les chemins des assets et des liens internes.

## 🚀 2. DÉPLOIEMENT GITHUB (PRE-PROD)

- **Mode de déploiement :** GitHub Actions.
- **Déclencheur :** Uniquement à la demande explicite de l'utilisateur ("Déploie en pre-prod").
- **Anticipation des chemins :** 
    - Le projet doit être configuré pour supporter un sous-répertoire (ex: `base: process.env.BASE_URL` dans Vite).
    - Les images dans le code doivent utiliser le préfixe de base.

## 🛠️ 3. WORKFLOW GITHUB ACTIONS (Template)

Un fichier `.github/workflows/deploy.yml` doit être prêt dès le départ pour :
1. Installer les dépendances.
2. Builder le projet avec le fichier `.env.preprod`.
3. Déployer sur la branche `gh-pages`.

## 📂 4. ANTICIPATION DES CHEMINS ASSETS

```typescript
// Exemple d'usage dans le code
const baseUrl = import.meta.env.VITE_APP_BASE_URL || '';
const logoPath = `${baseUrl}/assets/logo.svg`;
```
Cela garantit que le logo s'affiche aussi bien sur `localhost:3000` que sur `utilisateur.github.io/projet/`.
