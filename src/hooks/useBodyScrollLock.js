import { useEffect } from "react";

/**
 * Prevents background page scroll while a modal/drawer is open.
 * Saves and restores the previous `overflow` value to avoid clobbering
 * styles set elsewhere.
 */
const useBodyScrollLock = (locked) => {
  useEffect(() => {
    if (!locked) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
};

export default useBodyScrollLock;
