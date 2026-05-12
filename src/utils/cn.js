/**
 * Lightweight `clsx`-style helper. Joins truthy class strings with spaces.
 * Avoids adding a runtime dep just for class composition.
 *
 * @param  {...(string | false | null | undefined | Record<string, boolean>)} args
 * @returns {string}
 */
export const cn = (...args) => {
  const out = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === "string") {
      out.push(arg);
    } else if (typeof arg === "object") {
      for (const [key, value] of Object.entries(arg)) {
        if (value) out.push(key);
      }
    }
  }
  return out.join(" ");
};
