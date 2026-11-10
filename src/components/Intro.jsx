import { useEffect, useRef } from "react";
import { gsap, lenis } from "../lib/motion";
import { ME } from "../config/site";

const FROM = ME.name.toUpperCase(); // letters that fly in
const TO = "PORTFOLIO";             // word they turn into (must be longer than FROM)
const STEM = FROM.indexOf("I");     // this letter starts as the stem of the "!" (-1 = none)

// Opening animation: a ball pops in, a stem rises above it ("!"), the stem tips
// over and the letters of your name shoot out, tumble and bounce into place,
// then roll over into "PORTFOLIO" and the word slides into the hero.
export default function Intro({ onStart, onDone }) {
  const root = useRef(null), word = useRef(null), ball = useRef(null), glow = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden"; window.scrollTo(0, 0); lenis?.stop();
    let cancelled = false, ctx;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const slots = [...word.current.querySelectorAll("[data-slot]")];
        const n = FROM.length, rnd = gsap.utils.random;
        const wr = word.current.getBoundingClientRect();
        const br = ball.current.getBoundingClientRect();
        const rad = br.width / 2, bx = br.left + rad, by = br.top + rad;
        const tl = gsap.timeline();

        // 0) glow fades in; the ball pops in at screen centre and settles below the word
        gsap.set(ball.current, { y: -(wr.height * 0.62 + rad), scale: 0 });
        gsap.to(glow.current, { scale: 1.15, repeat: -1, yoyo: true, duration: 1.4, ease: "sine.inOut" });
        tl.fromTo(glow.current, { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0)
          .to(ball.current, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(3)" }, 0.15)
          .to(ball.current, { y: 0, duration: 0.8, ease: "power2.inOut" }, 0.4);

        // 1) a stem rises above the ball ("!"), holds, then tips over
        let stemY = 0;
        if (STEM >= 0) {
          const s = slots[STEM], r = s.getBoundingClientRect();
          const sx = bx - (r.left + r.width / 2), sy = by - rad - 14 - r.bottom;
          stemY = sy + 16;
          gsap.set(s, { transformOrigin: "50% 100%", x: sx, y: sy, scaleY: 0, opacity: 1 });
          tl.to(s, { scaleY: 1, duration: 0.4, ease: "power3.out" }, 0.95)
            .to(s, { rotation: -50, y: stemY, duration: 0.3, ease: "power2.inOut" }, 1.5);
        }

        // 2) letters shoot out of the ball, tumble and bounce into place
        const t0 = 1.65, gap = 0.15;
        slots.slice(0, n).forEach((s, i) => {
          const t = t0 + i * gap;
          let dy = stemY;
          if (i !== STEM) {
            const r = s.getBoundingClientRect();
            const dx = bx - (r.left + r.width / 2); dy = by - (r.top + r.height / 2);
            gsap.set(s, { x: dx, y: dy, rotation: rnd(-320, 320), scale: 0.25 });
            tl.to(s, { opacity: 1, duration: 0.12 }, t);
          }
          tl.to(s, { x: 0, rotation: 0, scale: 1, duration: 0.85, ease: "power3.out" }, t)
            .to(s, { y: dy * 0.2 - rnd(130, 200), duration: 0.35, ease: "power2.out" }, t)
            .to(s, { y: 0, duration: 0.55, ease: "bounce.out" }, t + 0.35)
            .to(ball.current, { y: -22, scaleY: 1.2, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out" }, t - 0.1);
        });
        const landed = t0 + (n - 1) * gap + 0.9;
        tl.to(ball.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" }, landed)
          .to(glow.current, { opacity: 0.35, duration: 0.8 }, landed);

        // 3) letters roll over into PORTFOLIO (extra letters grow in)
        const morph = landed + 0.15, step = 0.07;
        slots.forEach((s, i) => {
          const t = morph + i * step;
          if (i < n) {
            tl.to(s, { yPercent: -45, opacity: 0, duration: 0.12, ease: "power2.in" }, t)
              .add(() => { s.textContent = TO[i]; }, t + 0.12)
              .fromTo(s, { yPercent: 45, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.2, ease: "power3.out", immediateRender: false }, t + 0.12);
          } else {
            s.style.width = "auto"; const w = s.getBoundingClientRect().width; s.style.width = "0px";
            tl.to(s, { width: w, duration: 0.3, ease: "power3.out" }, t)
              .fromTo(s, { yPercent: 45, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.25, ease: "power3.out", immediateRender: false }, t);
          }
        });

        // 4) slide into the hero spot, fade the screen away, particles start gathering
        const hand = morph + slots.length * step + 0.6;
        tl.add(() => {
          onStart();
          const tgt = document.getElementById("hero-title").getBoundingClientRect();
          const cur = word.current.getBoundingClientRect();
          gsap.to(word.current, { x: tgt.left - cur.left, y: tgt.top - cur.top, duration: 1.1, ease: "power3.inOut" });
          gsap.to(root.current, { backgroundColor: "rgba(0,0,0,0)", duration: 1.1, ease: "power2.inOut" });
          gsap.to(glow.current, { opacity: 0, duration: 0.8 });
        }, hand)
          .add(() => onDone(), hand + 1.15);
      }, root);
    });

    return () => { cancelled = true; if (ctx) ctx.revert(); html.style.overflow = ""; lenis?.start(); };
  }, []);

  const cls = "grad inline-block font-black tracking-tighter leading-[.85] text-[15vw]";
  return (
    <div ref={root} className="fixed inset-0 z-[100] grid place-items-center overflow-hidden" style={{ background: "#000" }}>
      <div ref={glow} className="absolute inset-0 pointer-events-none" style={{ opacity: 0, background: "radial-gradient(circle at 50% 42%, rgba(255,255,255,.16), transparent 38%)" }} />
      <div ref={word} className="relative inline-flex">
        {[...TO].map((_, i) => (
          <span key={i} data-slot className={cls} style={{ opacity: 0, ...(i >= FROM.length ? { width: 0 } : {}) }}>
            {i < FROM.length ? FROM[i] : TO[i]}
          </span>
        ))}
        <span ref={ball} className="absolute rounded-full bg-white" style={{ left: "40%", top: "112%", width: "clamp(13px,2.2vw,28px)", height: "clamp(13px,2.2vw,28px)", opacity: 0 }} />
      </div>
    </div>
  );
}
