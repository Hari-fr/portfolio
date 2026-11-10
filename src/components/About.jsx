import { useEffect, useRef } from "react";
import { gsap } from "../lib/motion";
import { ME } from "../config/site";
import SplitText from "./SplitText";

const fade = "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";

export default function About() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ab", { y: 60, opacity: 0, stagger: 0.2, duration: 1, scrollTrigger: { trigger: root.current, start: "top 70%" } });
      // endless marquee: 1st row moves right, 2nd row left, 3rd right, ...
      gsap.utils.toArray(".marq").forEach((el, i) => {
        const right = i % 2 === 0;
        const tw = gsap.fromTo(el, { xPercent: right ? -50 : 0 }, { xPercent: right ? 0 : -50, duration: 40 + i * 8, ease: "none", repeat: -1 });
        el.addEventListener("mouseenter", () => gsap.to(tw, { timeScale: 0, duration: 0.5 }));   // pause on hover
        el.addEventListener("mouseleave", () => gsap.to(tw, { timeScale: 1, duration: 0.5 }));
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="min-h-svh px-5 md:px-24 py-28 flex flex-col justify-between gap-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="ab">
          <p className="text-xs md:text-sm tracking-[.4em] text-zinc-500 mb-6">ABOUT ME</p>
          <SplitText text="Intro" className="text-8xl md:text-[13vw] leading-none font-black tracking-tighter" />
        </div>
        <p className="ab glass p-7 md:p-14 text-lg md:text-[26px] leading-[1.6] font-light text-zinc-300">{ME.intro}</p>
      </div>
      <div>
        <div className="ab flex items-center gap-6 mb-6">
          <span className="text-xs md:text-sm tracking-[.4em] text-zinc-500">THE STACK</span>
          <span className="flex-1 h-px bg-white/10" />
        </div>
        <div className="ab space-y-4 -mx-5 md:-mx-24 overflow-hidden" style={{ WebkitMaskImage: fade, maskImage: fade }}>
          {ME.skills.map((row, i) => (
            <div key={i} className="marq">
              {[...row, ...row, ...row, ...row, ...row, ...row].map((s, j) => <span key={j} className="chip">{s}</span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
