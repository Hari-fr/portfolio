import { useEffect, useRef } from "react";
import { gsap } from "../lib/motion";
import { ME } from "../config/site";
import SplitText from "./SplitText";

// Certifications & achievements. Cards turn cream on hover, like the other rows.
// Add a `logo` (imported image) to an entry in site.js to show an institute logo.
export default function Achievements() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ac-head", { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".ac-head", start: "top 88%" } });
      gsap.from(".ac-card", { y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".ac-grid", start: "top 85%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={root} className="py-28">
      <div className="ac-head px-5 md:px-14 mb-16">
        <p className="text-xs md:text-sm tracking-[.4em] text-zinc-500 mb-6">CERTIFICATIONS &amp; ACTIVITIES</p>
        <SplitText text="Achievements" className="text-[13vw] md:text-[9vw] leading-none font-black tracking-tighter" />
      </div>

      <div className="ac-grid grid md:grid-cols-3 gap-5 px-5 md:px-14">
        {ME.achievements.map((a, i) => (
          <article key={a.title} className="ac-card group rounded-3xl border border-white/10 p-7 md:p-9 flex flex-col min-h-[20rem] transition-colors duration-300 hover:bg-[#d9d3c3] hover:text-[#111]">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs tracking-[.3em] text-zinc-500 group-hover:text-zinc-700 transition-colors duration-300">{a.type}</p>
              {a.logo
                ? <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white overflow-hidden shrink-0"><img src={a.logo} alt={a.org + " logo"} className="w-full h-full object-contain" /></div>
                : <span className="text-3xl font-light opacity-60">0{i + 1}</span>}
            </div>
            <h3 className="mt-10 text-2xl md:text-3xl font-extrabold uppercase tracking-wide leading-tight">{a.title}</h3>
            <p className="mt-3 text-base md:text-lg text-zinc-400 group-hover:text-zinc-700 transition-colors duration-300">{a.org}</p>
            {a.topics.length > 0 && (
              <div className="mt-auto pt-8 flex flex-wrap gap-2">
                {a.topics.map((t) => (
                  <span key={t} className="rounded-full border border-white/20 group-hover:border-black/30 px-3.5 py-1.5 text-sm transition-colors duration-300">{t}</span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
