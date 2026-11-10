import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Smooth anchor scrolling across routes: scrolls to #hash if present, otherwise to the top. */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let tries = 0;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start" }); // CSS scroll-behavior handles smoothing and reduced motion.
      } else if (tries++ < 180) {
        frame = requestAnimationFrame(attempt);
      }
    };
    attempt();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
