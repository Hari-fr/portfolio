import { useEffect, useRef } from "react";
import portrait from "../assets/hero_assets/hero_center.png";

// Particle portrait made of square "pixels" laid on an exact pixel grid.
//  - load:   scattered dust drifts, then flies into the face
//  - scroll: squares drift apart and fade (scrubbed; scroll back up to re-form)
//  - cursor: squares are pushed away and spring back
export default function ParticleFace({ src = portrait }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    let w, h, dpr, raf, timer, alive = true, visible = true, cleared = false, mouse = { x: -999, y: -999 };
    let P = [], stars = [], sp = 0, born = 0, sz = 4, data = null, iw = 1, ih = 1;

    // one square per grid slot where the portrait is bright
    const build = () => {
      if (!data) return;
      const S = Math.min((h * 0.8) / ih, (w * 1.05) / iw);
      const cell = w >= 1400 ? 5 : 4;                       // whole pixels -> even gaps, no grid lines
      sz = cell - 1;
      const offX = Math.round(w / 2 - (iw * S) / 2), offY = Math.round(w < 700 ? h * 0.16 : h * 0.12);
      const cols = Math.floor((iw * S) / cell), rows = Math.floor((ih * S) / cell);
      const settled = born && (performance.now() - born) / 1000 > 3;   // resize after the intro: no replay
      P = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const ix = Math.min(iw - 1, Math.floor(((i + 0.5) * cell) / S)), iy = Math.min(ih - 1, Math.floor(((j + 0.5) * cell) / S));
          const b = data[(iy * iw + ix) * 4] / 255;
          if (b < 0.12 || Math.random() > Math.min(1, b * 1.15)) continue;
          const spark = Math.random() < 0.22, u = Math.random();
          const k = spark ? (u < 0.45 ? [235, 245, 255] : u < 0.75 ? [150, 205, 255] : [205, 175, 255]) : [105, 122, 178];
          const m = spark ? 0.1 : b * 0.55;
          const tx = offX + i * cell, ty = offY + j * cell;
          P.push({
            b, spark, tx, ty, x: settled ? tx : Math.random() * w, y: settled ? ty : Math.random() * h, vx: 0, vy: 0,
            ux: (Math.random() - 0.5) * 0.6, uy: (Math.random() - 0.5) * 0.6,            // dust drift
            dl: Math.random() * 1.0,                                                     // when it joins the face
            sx: (Math.random() - 0.5) * 2, sy: (Math.random() - 0.5) * 2, sf: 0.4 + Math.random() * 0.9, // scroll drift
            tw: Math.random() * 6.28,
            col: `${Math.round(k[0] + (255 - k[0]) * m)},${Math.round(k[1] + (255 - k[1]) * m)},${Math.round(k[2] + (255 - k[2]) * m)}`,
          });
        }
      }
      if (!born) born = performance.now();
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.floor((w * h) / 7000) }, () => ({ x: Math.random() * w, y: Math.random() * h, a: 0.12 + Math.random() * 0.35, tw: Math.random() * 6.28 }));
      clearTimeout(timer); timer = setTimeout(build, 120);
    };
    const onScroll = () => { sp = Math.min(1, Math.max(0, window.scrollY / (h * 0.75))); };

    const img = new Image();
    img.onload = () => {
      iw = img.width; ih = img.height;
      const off = document.createElement("canvas");
      off.width = iw; off.height = ih;
      const octx = off.getContext("2d");
      octx.drawImage(img, 0, 0);
      data = octx.getImageData(0, 0, iw, ih).data;
      resize(); build(); onScroll();
    };
    img.src = src;

    const move = (e) => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    window.addEventListener("pointermove", move);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);

    let t = 0;
    const R = 130, R0 = 34; // cursor lens: radius of the effect / radius of the hole
    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      if (sp >= 1) { if (!cleared) { ctx.clearRect(0, 0, w, h); cleared = true; } return; }
      cleared = false;
      if (!visible) return;

      t += 0.03;
      const age = (performance.now() - born) / 1000, fade = Math.min(1, age / 0.6);
      const dim = 1 - Math.max(0, (sp - 0.5) / 0.5);
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#fff";                                 // faint star field
      for (const s of stars) { ctx.globalAlpha = s.a * (0.7 + 0.3 * Math.sin(t * 0.7 + s.tw)) * fade; ctx.fillRect(s.x, s.y, 1.5, 1.5); }
      ctx.globalAlpha = 1;

      for (const p of P) {
        let hov = false, ux = 0, uy = 0;
        if (age > 0.9 + p.dl) {                               // scattered dust first, then it flies into the face
          let bx = p.tx, by = p.ty;
          const rx = p.tx - mouse.x, ry = p.ty - mouse.y, rd2 = rx * rx + ry * ry;
          if (rd2 < R * R) {                                  // cursor lens: squares are pushed out of a small hole
            const rd = Math.sqrt(rd2);
            ux = rd > 0.5 ? rx / rd : Math.cos(p.tw); uy = rd > 0.5 ? ry / rd : Math.sin(p.tw);
            const nd = R0 + (rd * (R - R0)) / R;
            bx = mouse.x + ux * nd; by = mouse.y + uy * nd; hov = true;
          }
          bx += p.sx * p.sf * w * 0.5 * sp; by += p.sy * p.sf * h * 0.35 * sp;
          const k = age < 3.2 ? 0.03 : 0.09;
          p.vx += (bx - p.x) * k; p.vy += (by - p.y) * k;
          p.vx *= 0.84; p.vy *= 0.84; p.x += p.vx; p.y += p.vy;
        } else {
          p.x += p.ux; p.y += p.uy;
          if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
        }
        const tw = Math.sin(t * (p.spark ? 1.6 : 1) + p.tw) * (p.spark ? 0.3 : 0.06);
        const a = (p.spark ? 0.7 + p.b * 0.3 : 0.2 + p.b * 0.55) + tw;
        const al = a * fade * dim;
        if (al < 0.02) continue;
        ctx.fillStyle = `rgba(${p.col},${Math.min(al, 1)})`;
        const ds = hov ? Math.hypot(p.x - p.tx, p.y - p.ty) : 0;
        if (ds > 4) {                                         // stretch squares into rays near the cursor
          const L = Math.min(ds * 1.2, 26), cxp = p.x + sz / 2, cyp = p.y + sz / 2;
          ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = sz; ctx.beginPath();
          ctx.moveTo(cxp - (ux * L) / 2, cyp - (uy * L) / 2); ctx.lineTo(cxp + (ux * L) / 2, cyp + (uy * L) / 2); ctx.stroke();
        } else ctx.fillRect(Math.round(p.x), Math.round(p.y), sz, sz);
      }
    };
    loop();

    return () => {
      alive = false; cancelAnimationFrame(raf); clearTimeout(timer); io.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [src]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}
