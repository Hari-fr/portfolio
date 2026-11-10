import { useEffect, useRef } from "react";
import { gsap } from "../lib/motion";
import { ME } from "../config/site";
import ParticleFace from "./ParticleFace";

// started: the intro has begun handing over (particles start gathering)
// ready:   the intro is finished (title + subtitle are shown)
export default function Hero({ started, ready }) {
  const root = useRef(null);
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.from(".rv", { y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: "power4.out" });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  const [first, ...rest] = ME.role.split(" ");
  return (
    <section id="home" ref={root} className="relative h-svh min-h-[560px] overflow-hidden flex flex-col justify-end px-5 md:px-10 pb-12"
      style={{ background: "radial-gradient(ellipse at 50% 38%, #14161f 0%, #070709 55%, #050505 100%)" }}>
      {started && <ParticleFace />}
      <div className="relative mx-auto w-fit max-w-full">
        <h1 id="hero-title" className="grad w-fit font-black tracking-tighter leading-[.85] text-[15vw]" style={{ opacity: ready ? 1 : 0 }}>PORTFOLIO</h1>
        <div className="rv flex justify-between items-center mt-4 md:mt-6 md:px-4" style={ready ? undefined : { opacity: 0 }}>
          <p className="text-xl md:text-4xl"><b className="font-extrabold">{first}</b> <span className="font-light italic text-zinc-300">{rest.join(" ")}</span></p>
          <div className="flex gap-3">
            <a href="#contact" aria-label="Go to contact" className="btn btn-d !p-0 w-12 h-12 md:w-[60px] md:h-[60px] justify-center text-lg">↙</a>
            <a href="#contact" className="btn btn-d font-light italic">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}
