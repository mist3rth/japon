export function cn(...classes: (string | undefined | null | boolean | { [key: string]: boolean })[]) {
  return classes
    .filter(Boolean)
    .map((c) => {
      if (typeof c === "object" && c !== null) {
        return Object.entries(c)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(" ");
      }
      return c;
    })
    .join(" ");
}
