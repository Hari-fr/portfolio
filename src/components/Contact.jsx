import { ME } from "../config/site";
import SplitText from "./SplitText";
import ContactBg from "./ContactBg";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden min-h-svh px-5 md:px-10 pt-28 pb-10 flex flex-col justify-between">
      <ContactBg />
      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center flex-1">
        <div>
          <span className="text-sm tracking-widest text-emerald-400">● AVAILABLE FOR WORK</span>
          <SplitText text="Get in touch" className="text-6xl md:text-8xl font-black tracking-tight my-5" />
          <p className="text-lg md:text-xl text-zinc-300 max-w-md mb-8">Open to full-time and internship roles for freshers. Email gets the fastest reply.</p>
          <div className="flex flex-wrap gap-3">
            <a href={"mailto:" + ME.email} className="btn btn-l">Send an email ✉</a>
            <a href={ME.resume} download className="btn btn-d">Download resume ↓</a>
          </div>
        </div>
        <div className="glass p-8 space-y-6 text-lg">
          {[["EMAIL", ME.email], ["PHONE", ME.phone], ["BASED IN", ME.location]].map(([k, v]) => (
            <div key={k}><p className="text-xs tracking-widest text-zinc-400">{k}</p><p className="break-words">{v}</p></div>
          ))}
          <div className="flex gap-3">
            <a href={ME.github} className="btn btn-d">GitHub</a>
            <a href={ME.linkedin} className="btn btn-d">LinkedIn</a>
          </div>
        </div>
      </div>
      <p className="relative z-10 text-sm text-zinc-500 pt-10">© 2026 {ME.name}. All rights reserved.</p>
    </section>
  );
}
