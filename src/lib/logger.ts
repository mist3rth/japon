/**
 * Custom Logger pour le développement.
 * N'affiche les logs que si l'environnement est en mode développement.
 */
export const log = {
  dev: (...args: any[]) => {
    if (process.env.NODE_ENV === "development" || import.meta.env?.DEV) {
      console.log("[DEV-LOG]", ...args);
    }
  },
  error: (...args: any[]) => {
    console.error("[ERROR-LOG]", ...args);
  },
  warn: (...args: any[]) => {
    if (process.env.NODE_ENV === "development" || import.meta.env?.DEV) {
      console.warn("[WARN-LOG]", ...args);
    }
  }
};
