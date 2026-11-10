import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true }); // stop pinned sections jumping on phones

// Smooth scrolling (skipped when the visitor has reduced motion turned on)
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const lenis = calm ? null : new Lenis({ lerp: 0.1 });
if (lenis) {
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.addEventListener("click", (e) => {            // #section links scroll smoothly
    const a = e.target.closest?.('a[href^="#"]');
    const id = a && a.getAttribute("href");
    if (!id || id.length < 2) return;
    const el = document.querySelector(id);
    if (el) { e.preventDefault(); lenis.scrollTo(el, { force: true }); }
  });
}

// Fade + rise an element when it scrolls into view.
export const revealOnScroll = (el, start = "top 80%") =>
  gsap.from(el, { y: 70, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start } });

export { gsap, ScrollTrigger };
