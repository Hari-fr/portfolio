import { useEffect, useRef } from "react";
import { gsap, revealOnScroll } from "../lib/motion";
import { ME } from "../config/site";

export default function Project() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => gsap.utils.toArray(".pj").forEach((el) => revealOnScroll(el)), root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="project" ref={root} className="px-5 md:px-10 py-28">
      <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-16">SELECTED <span className="serif text-zinc-300">work</span></h2>
      <div className="space-y-24">
        {ME.projects.map((p, i) => (
          <article key={p.title} className="pj grid md:grid-cols-2 gap-8 items-center">
            <div className="group relative aspect-video rounded-2xl overflow-hidden grid place-items-center border border-white/10"
              style={p.image ? undefined : { background: `radial-gradient(circle at ${30 + i * 20}% 30%, #2a2f45, #0a0a0a 70%)` }}>
              {p.image
                ? <img src={p.image} alt={p.title + " screenshot"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                : <span className="text-zinc-500 text-xs">Add screenshot</span>}
              {p.imageLabel && <span className="absolute top-4 left-4 z-10 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[11px] tracking-widest text-zinc-200">{p.imageLabel.toUpperCase()}</span>}
            </div>
            <div>
              <p className="text-sm md:text-base text-zinc-500 mb-3">0{i + 1} · {p.stack}</p>
              <h3 className="text-4xl md:text-6xl font-black leading-tight">{p.title}</h3>
              <p className="text-lg md:text-xl text-zinc-400 my-6 max-w-xl">{p.desc}</p>
              <div className="flex gap-3">
                {p.live && p.live !== "#" && <a href={p.live} className="btn btn-l">Live Demo ↗</a>}
                {p.repo && p.repo !== "#" && <a href={p.repo} className="btn btn-d">GitHub ↗</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
