import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/motion";
import { ME } from "../config/site";
import SplitText from "./SplitText";

const CREAM = "#d9d3c3";

function Row({ i, s, open, toggle }) {
  const body = useRef(null), row = useRef(null);
  const [hover, setHover] = useState(false);
  const lit = open || hover; // cream while hovered or opened

  useEffect(() => {
    gsap.to(body.current, { height: open ? "auto" : 0, duration: 0.5, ease: "power3.inOut" });
  }, [open]);
  useEffect(() => {
    gsap.to(row.current, { backgroundColor: lit ? CREAM : "rgba(217,211,195,0)", color: lit ? "#111" : "#f4f4f5", duration: 0.3, ease: "power2.out" });
  }, [lit]);

  return (
    <div ref={row} onClick={toggle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className="border-t border-white/10 px-5 md:px-14 py-7 md:py-9 cursor-pointer" style={{ backgroundColor: "rgba(217,211,195,0)" }}>
      <div className="flex justify-between items-center text-base md:text-3xl font-extrabold uppercase tracking-wide">
        <span><span className="font-light mr-6 md:mr-16 text-xl md:text-4xl opacity-80">0{i + 1}</span>{s[0]}</span>
        <span className="text-2xl md:text-4xl">{open ? "↗" : "↘"}</span>
      </div>
      <div ref={body} className="overflow-hidden h-0">
        <div className="grid md:grid-cols-2 gap-6 pt-6 text-base md:text-xl md:ml-28"><p>{s[1]}</p><p>{s[2]}</p></div>
      </div>
    </div>
  );
}

export default function Services() {
  const [open, setOpen] = useState(-1); // nothing open until you click
  return (
    <section id="service" className="py-28">
      <SplitText text={"WHAT I\nCAN DO"} className="text-right px-5 md:px-14 text-6xl md:text-9xl font-black tracking-tighter leading-[.9] mb-14" />
      {ME.services.map((s, i) => <Row key={i} i={i} s={s} open={open === i} toggle={() => setOpen(open === i ? -1 : i)} />)}
    </section>
  );
}
