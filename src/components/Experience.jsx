import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/motion";
import { ME } from "../config/site";
import SplitText from "./SplitText";

// One timeline row: collapsed by default, expands on hover (tap on touch screens)
// and turns cream, like the "What I Can Do" rows.
function Row({ n, period, title, org, logo, points, score }) {
  const [open, setOpen] = useState(false);
  const sub = "text-zinc-400 group-hover:text-zinc-700 transition-colors duration-300";
  const cols = "md:grid-cols-[1.1fr_2fr_auto]";
  const toggle = () => { if (window.matchMedia("(hover: none)").matches) setOpen(!open); };

  return (
    <div onClick={toggle} className="ex-row group border-t border-white/10 px-5 md:px-14 py-7 md:py-9 transition-colors duration-300 hover:bg-[#d9d3c3] hover:text-[#111]">
      <div className={"grid grid-cols-[1fr_auto] " + cols + " gap-x-5 gap-y-3 md:gap-10 items-center"}>
        <div className="col-span-2 md:col-span-1">
          <p className="text-xl md:text-4xl font-light opacity-80">{n}</p>
          <p className={"mt-1 md:mt-2 text-base md:text-xl " + sub}>{period}</p>
        </div>
        <div>
          <h3 className="text-xl md:text-3xl font-extrabold uppercase tracking-wide">{title}</h3>
          <p className={"mt-2 text-base md:text-xl " + sub}>{org}</p>
        </div>
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-white overflow-hidden justify-self-end">
          {logo && <img src={logo} alt={org + " logo"} className="w-full h-full object-contain" />}
        </div>
      </div>

      {/* details slide open on hover */}
      <div className={"grid transition-[grid-template-rows] duration-500 ease-out " + (open ? "grid-rows-[1fr]" : "grid-rows-[0fr] group-hover:grid-rows-[1fr]")}>
        <div className="overflow-hidden">
          <div className={"grid " + cols + " md:gap-10 pt-6 md:pt-8"}>
            <div className="hidden md:block" />
            {points ? (
              <ul className="space-y-3 text-base md:text-xl text-zinc-300 group-hover:text-zinc-800 transition-colors duration-300">
                {points.map((p) => <li key={p} className="flex gap-3"><span className="opacity-50">–</span>{p}</li>)}
              </ul>
            ) : (
              <p className="text-4xl md:text-6xl font-black tracking-tight">{score}</p>
            )}
            <div className="hidden md:block md:w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

const Label = ({ children }) => (
  <div className="ex-row flex items-center gap-6 px-5 md:px-14 mb-6 mt-14 first:mt-0">
    <span className="text-xs md:text-sm tracking-[.4em] text-zinc-500">{children}</span>
    <span className="flex-1 h-px bg-white/10" />
  </div>
);

export default function Experience() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".ex-head, .ex-row").forEach((el) =>
        gsap.from(el, { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } })
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const degree = ME.education[0]; // engineering degree only
  return (
    <section id="experience" ref={root} className="py-28">
      <div className="ex-head px-5 md:px-14 mb-16">
        <p className="text-xs md:text-sm tracking-[.4em] text-zinc-500 mb-6">CAREER &amp; EXPERIENCE</p>
        <SplitText text="Experience" className="text-[14vw] md:text-[11vw] leading-none font-black tracking-tighter" />
      </div>

      <Label>INTERNSHIPS</Label>
      {ME.internships.map((it, i) => (
        <Row key={it.company} n={"0" + (i + 1)} period={it.period} title={it.role} org={it.company} logo={it.logo} points={it.points} />
      ))}

      <Label>ENGINEERING</Label>
      <Row n="01" period={degree.period} title={degree.detail} org={degree.school} logo={degree.logo} score={degree.score} />
      <div className="border-t border-white/10" />
    </section>
  );
}
