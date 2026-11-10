import { useEffect, useRef } from "react";
import { gsap } from "../lib/motion";

// Custom cursor (dot + ring that grows over links) and magnetic buttons.
// Only on devices with a mouse; touch screens keep the normal behaviour.
export default function Effects() {
  const dot = useRef(null), ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" }), dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3" }), ry = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3" });
    const hotSel = 'a, button, [role="button"], .ex-row, .ac-card, .chip, .cursor-pointer';
    let shown = false, magnet = null;

    const move = (e) => {
      if (!shown) { shown = true; gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 }); }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      const b = e.target.closest?.(".btn");                       // magnetic buttons
      if (b) {
        const r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.35, duration: 0.3, ease: "power3.out" });
        magnet = b;
      } else if (magnet) { gsap.to(magnet, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.4)" }); magnet = null; }
    };
    const over = (e) => {
      const hot = !!e.target.closest?.(hotSel);
      gsap.to(ring.current, { scale: hot ? 1.9 : 1, duration: 0.3 });
      gsap.to(dot.current, { scale: hot ? 0 : 1, duration: 0.2 });
    };
    const leave = () => { shown = false; gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 }); };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="fixed top-0 left-0 z-[200] pointer-events-none w-10 h-10 rounded-full border border-white mix-blend-difference" style={{ opacity: 0 }} />
      <div ref={dot} className="fixed top-0 left-0 z-[200] pointer-events-none w-2 h-2 rounded-full bg-white mix-blend-difference" style={{ opacity: 0 }} />
    </>
  );
}
