import { useEffect, useRef } from "react";
import { gsap } from "../lib/motion";

// Big gradient heading whose letters rise in one by one when scrolled into view.
// Use "\n" in `text` for a line break.
export default function SplitText({ text, className = "", as: Tag = "h2" }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ch", { y: 70, opacity: 0, duration: 0.9, stagger: 0.035, ease: "power4.out", scrollTrigger: { trigger: ref.current, start: "top 88%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <Tag ref={ref} className={className} aria-label={text.replace("\n", " ")}>
      {text.split("\n").map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(" ").map((word, wi) => (
            <span key={wi}>
              {wi > 0 && " "}
              <span className="inline-block whitespace-nowrap">
                {[...word].map((c, ci) => <span key={ci} className="ch grad inline-block">{c}</span>)}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
