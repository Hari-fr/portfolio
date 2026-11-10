import { useEffect, useRef, useState } from "react";
import { gsap, lenis } from "../lib/motion";
import { ME, NAV } from "../config/site";

export default function Navbar({ ready = true }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const menu = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.45 }
    );
    NAV.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // slide the mobile menu in/out
  useEffect(() => {
    const el = menu.current;
    if (!mounted.current) { mounted.current = true; return; }
    if (open) {
      lenis?.stop(); document.body.style.overflow = "hidden";
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { yPercent: -100 }, { yPercent: 0, duration: 0.6, ease: "power4.out" });
      gsap.fromTo(el.querySelectorAll("a"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, delay: 0.2, duration: 0.5 });
    } else {
      lenis?.start(); document.body.style.overflow = "";
      gsap.to(el, { yPercent: -100, duration: 0.45, ease: "power3.in", onComplete: () => gsap.set(el, { display: "none" }) });
    }
  }, [open]);

  return (
    <>
      <header
        className={"fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-14 pb-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-1000 " + (ready ? "opacity-100" : "opacity-0")}
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + .9rem)" }}
      >
        <a href="#home" className="relative text-lg md:text-[26px] font-extrabold tracking-[.18em] after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-[calc(100%-.18em)] after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">{ME.name.toUpperCase()}</a>
        <nav className="hidden xl:flex gap-9">
          {NAV.map((n) => (
            <a key={n} href={"#" + n}
              className={"relative text-[15px] tracking-[.1em] uppercase pb-1 after:absolute after:left-0 after:bottom-0 after:h-px after:w-[calc(100%-.1em)] after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 " + (active === n ? "text-white after:scale-x-100" : "text-zinc-200 after:scale-x-0")}>
              {n}
            </a>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="xl:hidden text-sm tracking-widest uppercase" aria-label="Toggle menu">
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <div ref={menu} style={{ display: "none" }} className="fixed inset-0 z-40 bg-black flex-col justify-center gap-4 px-8 xl:hidden">
        {NAV.map((n) => (
          <a key={n} href={"#" + n} onClick={() => setOpen(false)}
            className={"text-4xl font-black uppercase tracking-tight " + (active === n ? "text-white" : "text-zinc-500")}>
            {n}
          </a>
        ))}
      </div>
    </>
  );
}
