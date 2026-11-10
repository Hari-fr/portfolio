import { useEffect, useState } from "react";
import { ScrollTrigger } from "./lib/motion";
import Intro from "./components/Intro";
import Effects from "./components/Effects";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Project from "./components/Project";
import Achievements from "./components/Achievements";
import Ricochet from "./components/Ricochet";
import Contact from "./components/Contact";

export default function App() {
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { if (ready) ScrollTrigger.refresh(); }, [ready]);
  return (
    <>
      {!ready && <Intro onStart={() => setStarted(true)} onDone={() => setReady(true)} />}
      <Effects />
      <Navbar ready={ready} />
      <Hero started={started} ready={ready} />
      <About />
      <Services />
      <Experience />
      <Project />
      <Achievements />
      <Ricochet />
      <Contact />
    </>
  );
}
