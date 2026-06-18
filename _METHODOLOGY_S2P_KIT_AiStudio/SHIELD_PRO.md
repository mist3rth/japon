# 🔐 SHIELD PRO : Sécurité & Stabilité

Assurer la robustesse de l'application et la facilité de maintenance.

## 1. Sécurité (Security Hardening)
- **Validation des Inputs :** Utilisation de `Zod` pour valider toutes les entrées de formulaires (Contact, Newsletter).
- **Prévention XSS :** Vérifier que les rendus dynamiques sont sécurisés.
- **Headers de sécurité :** Configuration de base pour la production (CSP, etc.).

## 2. Système de Debugging
L'agent doit mettre en place des outils pour faciliter le dev :
- **Custom Logger :** Un utilitaire `log.dev()` qui n'affiche les logs qu'en mode développement.
- **Error Boundaries :** Envelopper les sections critiques pour éviter un crash total de l'app si une section échoue.
- **Dev-only Components :** Affichage visuel des breakpoints ou des grilles de design en mode dev.

## 3. Qualité TypeScript
- Activation du mode `strict` dans `tsconfig.json`.
- Interdiction des `ts-ignore` sans justification documentée.

## 4. Tests & Validation
- Mise en place de scripts de smoke-tests (vérifier que les pages critiques chargent).
- Vérification des liens morts (404) avant déploiement.

---
**ACTION RECOMMANDÉE :** "Installe les Error Boundaries et le système de logs de développement."
