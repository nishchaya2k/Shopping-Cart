import { useEffect, useState } from "react";

/**
 * Returns whether the window has scrolled past `threshold` pixels.
 * Used to add a subtle elevation/shadow to the navbar on scroll.
 */
const useScrollPosition = (threshold = 8) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
};

export default useScrollPosition;
